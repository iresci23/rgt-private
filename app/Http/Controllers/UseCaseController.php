<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractalistic\ArraySerializer;
use App\Transformers\UseCaseTransformer;
use App\Models\Component;
use App\Models\UseCase;

class UseCaseController extends Controller
{
    //
    public function all(Request $request)
    {
        $model =  UseCase::where('component_id', $request->input('component_id'))
                        ->whereNull('parent_id')
                        ->with('childrenRecursive')
                        ->orderByRaw('sort_order = 0', 'ASC', 'sort_order')
                        ->get();

        $transformed    = fractal($model,
                            new UseCaseTransformer()
                        )
                        ->serializeWith(new ArraySerializer())
                        ->toArray();

        return response()->json($transformed);
    }

    public function sort(Request $request, $id)
    {
        $model = UseCase::findOrFail($id);
        $model->parent_id = $request->input('parent_id');
        $model->sort_order = $request->input('sort_order');
        $model->save();

        return response()->json($request->input());
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'name' => ['required', 'max:255'],
            'component_id' => ['required'],
            'project_id' => ['required'],
            'sort_order' => ['required']
        ]);

        $model = new UseCase;
        $model->name = $request->input('name');
        $model->project_id = $request->input('project_id');
        $model->component_id = $request->input('component_id');
        $model->sort_order = $request->input('sort_order') ?: 1;
        $model->status = 'To Do';
        $model->save();
        
        $transformed    = fractal($model,
                            new UseCaseTransformer()
                          )
                          ->serializeWith(new ArraySerializer())
                          ->toArray();

        return response()->json($transformed);
    }

    public function duplicate(Request $request)
    {
        $validatedData = $request->validate([
            'id' => ['required'],
            'sort_order' => ['required']
        ]);

        // find the source component
        $use_case = UseCase::findOrFail($request->input('id'));

        // create a duplicate
        $clone = UseCase::create([
            'name' => $use_case->name . ' copy',
            'component_id' => $use_case->component_id,
            'parent_id' => $use_case->parent_id,
            'project_id' => $use_case->project_id,
            'sort_order' => $request->input('sort_order'),
            'status' => 'To Do'
        ]);

        if ( $clone->save() ) {

            // create duplicate for the use cases
            foreach ($use_case->children as $uc) {
                // save to `use_cases`
                UseCase::create([
                    'name' => $uc->name . ' copy',
                    'parent_id' => $clone->id,
                    'component_id' => $uc->component_id,
                    'project_id' => $uc->project_id,
                    'sort_order' => $uc->sort_order,
                    'status' => 'To Do'
                ]);

            }
        }

        $transformed    = fractal($clone,
            new UseCaseTransformer()
            )
            ->serializeWith(new ArraySerializer())
            ->toArray();

        return response()->json($transformed);
    }

    public function delete(Request $request, $id)
    {
       return response()->json(['success' => UseCase::findOrFail($id)->delete()]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:255']
        ],[
            'name.required' => 'Use case name is required!',
        ]);

        $model = UseCase::findOrFail($id);
        $model->name = $request->input('name');
        $model->save();

        return response()->json(['success' => true]);
    }
}
