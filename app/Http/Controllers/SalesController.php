<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractalistic\ArraySerializer;

use App\Models\Project;
use App\Models\TargetGroup;

use App\Transformers\WidgetTransformer;

class SalesController extends Controller
{
    private $slug = 'projects';

    /**
     * Show project sales page
     * 
     * @param  \Illuminate\Http\Request $request, int  $id project_id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $Project = Project::findOrFail($id);

        $dataType = new \stdClass();
        $dataType->slug = $this->slug;

        return view('projects.sales', compact('Project','dataType'));
    }
    
    /**
     * Gets the target group of the project
     *
     * @param \Illuminate\Http\Request $request, int  $id
     * @param Filter data by int qwidget_id
     * @return \Illuminate\Http\Response
     */
    public function getTargetGroups(Request $request, $id)
    {
        $qwidget_id = $request->input('qwidget_id');

        $model = Project::findOrFail($id);

        $collection = $model->targetGroups->filter(function ($group) use ($qwidget_id) {
                        return $group->question_widget_id == $qwidget_id;
                      });

        $transformed    = fractal($collection, 
                            new WidgetTransformer((object)['widget' => 'TargetGroupWidget'])
                          )
                            ->serializeWith(new ArraySerializer())
                            ->toArray();

        return response()->json($transformed);
    }

    /**
     * Saves the target group resource by storing it if not yet existing or updating otherwise 
     * 
     * @param \Illuminate\Http\Request $request, int  $id
     * @return \Illuminate\Http\Response
     */
    public function saveTargetGroup(Request $request)
    {
        $request->validate([
            'name'       => 'bail|required|max:255',
            'project_id' => 'required'
        ]);

        $model = TargetGroup::updateOrCreate(['id' => $request->input('id')],[
                   'project_id'         =>  $request->input('project_id'),
                   'question_widget_id' =>  $request->input('question_widget_id'),
                   'name'       => $request->input('name'),
                   'user_able_to_do' => $request->input('user_able_to_do'),
                   'user_access_to'  => $request->input('user_access_to'),
                   'user_main_actions' => $request->input('user_main_actions'),
                   'age'        => $request->input('demographics.age'),
                   'location'   => $request->input('demographics.location'),
                   'gender'     => $request->input('demographics.gender'),
                   'income_level'   => $request->input('demographics.income_level'),
                   'occupation'     => $request->input('demographics.occupation'),
                   'education_level'  => $request->input('demographics.education_level'),
                   'personality'    => $request->input('psychographics.personality'),
                   'interest'       => $request->input('psychographics.interest')
                ]);

        $is_new = $model->wasRecentlyCreated;

        $transformed    = fractal($model, 
                            new WidgetTransformer((object)['widget' => 'TargetGroupWidget'])
                          )
                            ->serializeWith(new ArraySerializer())
                            ->toArray();

        return response()->json(['is_new' => $is_new, 'record' => $transformed]);
    }
}
