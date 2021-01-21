<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use TCG\Voyager\Facades\Voyager;
use Spatie\Fractalistic\ArraySerializer;

use App\Models\Project;
use App\Models\ProjectType;

use App\Transformers\ProjectTransformer;
use App\Repositories\VoyagerBaseRepository;

class ProjectController extends Controller
{
    private $slug = 'projects';

    public function index(Request $request)
    {
        $dataType = new \stdClass();
        $dataType->slug = $this->slug;
        $dataType->icon = '';
        $dataType->model_name = 'App\Models\Project';
        $dataType->display_name_plural = 'Projects';
        $dataType->display_name_singular = 'Project';
        
        return view('projects.list', compact('dataType'));
    }

    /**
     * Get all projects
     */
    public function all(Request $request)
    {

        $state = $request->input('state', 'Active');
        $keyword = $request->input('keyword', null);
        
        /**  Filter project by its status */
        $projects = Project::query();

        if ( $state == 'Archived' ){
            $projects->withArchived();
        } else if ( $state == 'Deleted' ){
            $projects->withDeleted();
        } else {
            $projects->withActive();
        }
        
        /** Filter by $keyword */
        if ( $keyword ) {
            $projects->whereKeyword($keyword);
        }

        /** Transform result */
        $transformed    = fractal($projects->get(),
                            new ProjectTransformer()
                          )
                          ->serializeWith(new ArraySerializer())
                          ->toArray();

        return response()->json($transformed);
    }


    /**
     * Get single project
     */
    public function get(Request $request, $id)
    {

        $transformed    = fractal(Project::findOrFail($id),
                            new ProjectTransformer()
                          )
                          ->serializeWith(new ArraySerializer())
                          ->toArray();

        return response()->json($transformed);
    }

    /**
     * Upsert a project via Ajax
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {

        $validatedData = $request->validate([
            'name' => ['required', 'max:255'],
            'type_id' => ['required'],
            'client_id' => ['required'],
        ]);

        $model = Project::updateOrCreate(['id' => $request->input('id')],[
            'name' =>  $request->input('name'),
            'type_id' =>  $request->input('type_id'),
            'client_id' => $request->input('client_id'),
            'status_id' => 1
        ]);

        return response()->json($model);
    }

    public function saveRates(Request $request)
    {
        $rates = $request->input('rates');

        $model = Project::findOrFail($request->input('id')); 
        $model->ba_rate = $rates['ba_rate'];
        $model->dev_rate = $rates['dev_rate'];
        $model->qa_rate = $rates['qa_rate'];
        $model->pm_rate = $rates['pm_rate'];
        $model->save();

        return response()->json($model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        return response()->json(['success' => Project::destroy($request->input('ids'))]);
    }

    /**
     * Archive the specified resource from storage.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function archive(Request $request)
    {

        $result = Project::whereIn('id', $request->input('ids'))->update([
            'archived_at' => \Carbon\Carbon::now()
        ]);

        return response()->json(['success' => $result]);
    }

    /**
     * Restores archived/deleted resource from storage.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function restore(Request $request, $id)
    {

        $state =  $request->input('state');

        if ( $state == 'deleted' ) {
            $result = Project::onlyTrashed()->findOrFail($id)->update([
                'deleted_at' => null
            ]);
        } else if ( $state == 'archived' ) {
            $result = Project::findOrFail($id)->update([
                'archived_at' => null
            ]);
        }

        return response()->json(['success' => $result]);

    }

    /**
     * Get project types
     */
    public function getTypes(Request $request)
    {
        return response()->json(ProjectType::get());
    }

    public function phpInfo()
    {

        echo serialize(["Stock or Template UI","Custom Branded UI","Animated UI","Game Animations","I don't know"]);
        // phpinfo();
        exit;
    }
}
