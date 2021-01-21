<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractalistic\ArraySerializer;
use App\Transformers\EstimateTransformer;
use App\Models\Project;
use App\Models\Estimate;
use App\Models\TimelineCost;
use App\Models\Component;

class EstimateController extends Controller
{
    public function save(Request $request)
    {
        /** create or update estimate row */

        $estimate = Estimate::updateOrCreate([
            'component_id' => $request->input('component_id'), 
            'use_case_id' => $request->input('use_case_id')
        ],[
            'component_id' => $request->input('component_id'), 
            'use_case_id' => $request->input('use_case_id'),
            'project_id' => $request->input('project_id'),
            'scope' => $request->input('scope'),
            'ba_hours' => $request->input('ba_hours'),
            'dev_hours' => $request->input('dev_hours'),
            'qa_hours' => $request->input('qa_hours'),
            'pm_hours' => $request->input('pm_hours'),
            'notes' => $request->input('notes')
        ]);

        /** Recalculate component subtotal */
        $siblings = $estimate->siblings();
        $component = $estimate->parent()->first();

        if ( !$component ) {
            // create when not exist
            $component = new Estimate;
            $component->component_id = $estimate->component_id;
            $component->use_case_id = null;
        }

        $component->ba_hours = $siblings->sum('ba_hours');
        $component->dev_hours = $siblings->sum('dev_hours');
        $component->qa_hours = $siblings->sum('qa_hours');
        $component->pm_hours = $siblings->sum('pm_hours');
        $component->save();

        /** Every estimate update, regenerate time and cost table by removing old data */
        TimelineCost::ofProject(
            $request->input('project_id')
        )->forceDelete();

        /** Return transformed result */
        $transformed    = fractal($estimate,
                            new EstimateTransformer()
                          )
                          ->includeParent()
                          ->serializeWith(new ArraySerializer())
                          ->toArray();

        return response()->json($transformed);
    }

    /**
     * Get time and cost values from Estimates table and TimelineCost Table
     */
    public function getTimeAndCost(Request $request)
    {
        $timeAndCost = [];
        $projectId = $request->input('project_id');

        /** gets the list of components */
        $components = Component::where('project_id', $projectId)
                        ->with('estimateDetails')
                        ->orderByRaw('sort_order = 0', 'ASC', 'sort_order')
                        ->get();

        /** get the project hourly rate */
        $rate       = Project::where('id', $projectId)
                        ->select('ba_rate','dev_rate','qa_rate','pm_rate')
                        ->first();

        foreach ($components as $key => $component) {

            /** component has values from estimate tab */

            if ( $component->estimateDetails->count() > 0 ) {

                /** group by scope, calculare total hours by scope */
                $groupsByScope = $component->estimateDetails->groupBy('scope')->map(function ($row) {
                    return (object) [
                        'ba_hours' => $row->sum('ba_hours'),
                        'dev_hours' => $row->sum('dev_hours'),
                        'qa_hours' => $row->sum('qa_hours'),
                        'pm_hours' => $row->sum('pm_hours'),
                    ];
                });

                foreach($groupsByScope as $scope => $group){

                    $total_hours    = $group->ba_hours + $group->dev_hours + $group->qa_hours + $group->pm_hours;

                    $total_cost     = ($group->ba_hours * $rate->ba_rate) + 
                                      ($group->dev_hours * $rate->dev_rate) + 
                                      ($group->qa_hours * $rate->qa_rate) + 
                                      ($group->pm_hours * $rate->pm_rate);

                    /** If values has been override in T&C, show it */
                    $timelineCost = TimelineCost::ComponentByScope(
                        $projectId, $component->id, $scope
                    )->first();

                    array_push($timeAndCost, [
                        'component_id' => $component->id,
                        'name' => $component->name,
                        'scope' => $scope,
                        'ba_hours' => $group->ba_hours,
                        'dev_hours' => $group->dev_hours,
                        'qa_hours' => $group->qa_hours,
                        'pm_hours' => $group->pm_hours,
                        'rate' => $rate,
                        'total_hours' => $timelineCost ? $timelineCost->hours : $total_hours,
                        'total_days' => $timelineCost ? $timelineCost->days :  $total_hours / 6,
                        'total_cost' => $timelineCost ? $timelineCost->cost :  $total_cost
                    ]);
                }

            } else {

                /** If values has been override in T&C, show it */
                $timelineCost = TimelineCost::ComponentByScope(
                    $projectId, $component->id, 'mvp'
                )->first();

                /** component has no estimate values, default scope is mvp */
                array_push($timeAndCost, [
                    'component_id' => $component->id,
                    'name' => $component->name,
                    'scope' => 'mvp',
                    'ba_hours' => 0,
                    'dev_hours' => 0,
                    'qa_hours' => 0,
                    'pm_hours' => 0,
                    'rate' => $rate,
                    'total_hours' => $timelineCost ? $timelineCost->hours : 0,
                    'total_days' => $timelineCost ? $timelineCost->days : 0,
                    'total_cost' => $timelineCost ? $timelineCost->cost : 0
                ]);
            }
        }

        $timeAndCost = collect($timeAndCost);

        return response()->json($timeAndCost->groupBy('scope'));
    }

    /**
     * Save the timeline and cost data row
     */
    public function saveTimeAndCost(Request $request)
    {
        $timeAndCost = TimelineCost::updateOrCreate([
            'project_id' => $request->input('project_id'),
            'component_id' => $request->input('item.component_id'), 
            'scope' => $request->input('item.scope')
        ],[
            'hours' => $request->input('item.total_hours'),
            'days' => $request->input('item.total_days'),
            'cost' => $request->input('item.total_cost')
        ]);

        return response()->json($timeAndCost);
    }

    /**
     * Reset timeline and cost table of a project 
     * by deleting the affected data on table
     */
    public function resetTimeAndCost(Request $request)
    {
        $timeAndCost = TimelineCost::ofProject(
            $request->input('project_id')
        )->forceDelete();

        return response()->json([ 'success' => $timeAndCost ]);
    }
}