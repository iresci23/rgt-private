<?php 
namespace App\Repositories;

use App\Models\SystemComponent;
use App\Models\SystemUseCase;
use App\Models\Project;
use App\Models\Component;
use App\Models\UseCase;

class SystemDataRepository
{

    /**
     * Auto generate components and use cases defined by system
     */
    public static function generateRequirements(Project $project)
    {
        $requirements = [];
        // get the components
        $components = SystemComponent::get();

        foreach ($components as $item) {

            // add to `components`
            $component = new Component;

            $component->project_id = $project->id;
            $component->name = $item->name;
            $component->code = $item->code;
            $component->source = 'system';
            $component->sort_order = $item->sort_order;

            if ( $component->save() ) {
                
                $use_cases = $item->useCasesTree();
                
                foreach ($use_cases as $uc) {
                    // add to `use_cases`
                    self::saveUseCase($component, $uc, $uc->parent_id);
                }
            }
            array_push($requirements, [
                'name' => $item->name,
                'code' => $item->code,
                'sort_order' => $item->sort_order,
                'use_cases' => $item->useCasesTree() // get the nested use cases (parent-child relation)
            ]);
        }

        return $requirements;
    }

    public static function saveUseCase($component, $uc, $parent_id = null)
    {
        $use_case = new UseCase;
        $use_case->component_id = $component->id;
        $use_case->project_id = $component->project_id;
        $use_case->parent_id = $parent_id;
        $use_case->name = $uc->name;
        $use_case->type = $uc->type;
        $use_case->status = 'To Do';
        $use_case->sort_order = $uc->sort_order;
        $use_case->created_by = \Auth::id();
        
        if ($use_case->save()) {
            // if $uc still has children_recursive, process the children
            if ( $uc->has('childrenRecursive') ) {
                foreach ($uc->childrenRecursive as $uc) {
                    self::saveUseCase($component, $uc, $use_case->id);
                }
            }
        }
    }
}