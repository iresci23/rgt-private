<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractalistic\ArraySerializer;
use App\Transformers\ComponentTransformer;
use App\Repositories\SystemDataRepository;
use App\Models\Project;
use App\Models\Component;

class ComponentController extends Controller
{
    //
    public function all(Request $request)
    {
       
        $project = Project::withCount('components')->findOrFail($request->input('project_id'));

        $firstInit = !$project->components_count;

        /** When no components yet, load the system defaults */
        if ( $firstInit ) {
            SystemDataRepository::generateRequirements($project);
        }

        $model = Component::where('project_id', $project->id)
                        ->orderByRaw('sort_order = 0', 'ASC', 'sort_order')
                        ->get();

        /** Process request parameters */
        $includes = array_map('trim', explode(',', $request->input('include')));
        
        $transformer = new ComponentTransformer();

        if (in_array('with_estimates', $includes)) {
            $transformer->setWithEstimates(true);
        }
        
        $transformed    = fractal($model, 
                            $transformer
                          )->serializeWith(new ArraySerializer())
                          ->includeEstimate();

        if (in_array('with_use_cases', $includes)) {
            $transformed = $transformed->includeUseCases();
        }

        return response()->json([
            'data' => $transformed->toArray(),
            'is_init' => $firstInit
        ]);

    }

    public function sort(Request $request, $id)
    {
        $model = Component::findOrFail($id);
        $model->sort_order = $request->input('sort_order');
        $model->save();

        return response()->json(['success' => true]);
    }

    public function duplicate(Request $request)
    {

        $validatedData = $request->validate([
            'id' => ['required'],
            'sort_order' => ['required']
        ]);

        // find the source component
        $component = Component::findOrFail($request->input('id'));
        $use_cases = $component->useCasesTree();

        // create a duplicate
        $clone = Component::create([
            'name' => $component->name . ' copy',
            'project_id' => $component->project_id,
            'sort_order' => $request->input('sort_order')
        ]);

        if ( $clone->save() ) {

            // create duplicate for the use cases
            foreach ($use_cases as $uc) {
                // save to `use_cases`
                SystemDataRepository::saveUseCase($clone, $uc, $uc->parent_id);
            }
        }

        $transformed    = fractal($clone,
            new ComponentTransformer()
            )
            ->serializeWith(new ArraySerializer())
            ->toArray();

        return response()->json($transformed);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:255'],
            'project_id' => ['required'],
            'sort_order' => ['required']
        ]);

        $model = new Component;
        $model->name = $request->input('name');
        $model->project_id = $request->input('project_id');
        $model->sort_order = $request->input('sort_order');
        $model->save();
        
        $transformed    = fractal($model,
                            new ComponentTransformer()
                          )
                          ->serializeWith(new ArraySerializer())
                          ->toArray();

        return response()->json($transformed);
    }

    public function delete(Request $request, $id)
    {
       return response()->json(['success' => Component::findOrFail($id)->delete()]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:255']
        ], [
            'name.required' => 'Component name is required!',
        ]);

        $model = Component::findOrFail($id);
        $model->name = $request->input('name');
        $model->save();

        return response()->json(['success' => true]);
    }
}
