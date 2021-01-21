<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractalistic\ArraySerializer;

use App\Models\Question;
use App\Models\Answer;
use App\Models\Estimate;

use App\Transformers\QuestionTransformer;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource via JSON
     *
     * @return \Illuminate\Http\Response JSON
     */
    public function all(Request $request)
    {  
        $projectId = $request->input('project_id');
        $section = $request->input('section');

        /** generate the default app design / proposal sections */
        if ( in_array($section, ['app-design','proposal']) ) {

            $collection = Question::forProject($projectId)->filterBySection($section)->get();

            if( $collection->count() < 1) {
                $collection = Question::seedData($section, $projectId)->forProject($projectId)->filterBySection($section)->get();
            }

        } else {
            $collection = Question::forProject(null)->filterBySection($section)->get();
        }

        $transformed    = fractal($collection, 
                            new QuestionTransformer((object)['project_id' => $projectId])
                          )
                            ->serializeWith(new ArraySerializer())
                            ->includeAnswer()->toArray();

        return response()->json($transformed);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $model = Question::findOrFail($id);

        if ($request->has('options')) {
            $model->options = @serialize($request->input('options'));
        }

        if ($request->has('trigger_widget')) {
            $model->trigger_widget = $request->input('trigger_widget');
        }

        if ($request->has('question')) {

            $request->validate([
                'question' => ['required']
            ],[
                'question.required' => 'Name is required!',
            ]);

            $model->question = $request->input('question');
        }

        if ($request->has('sort_order')) {
            $model->sort_order = $request->input('sort_order');
        }

        $model->updated_by = \Auth::id();

        $model->save();

        return response()->json($model);
    }

    public function duplicate(Request $request)
    {

        $validatedData = $request->validate([
            'id' => ['required'],
            'sort_order' => ['required']
        ]);

        // find the source
        $model = Question::findOrFail($request->input('id'));

        // create a duplicate
        $clone = $model->replicate();
        $clone->question = $model->question . ' copy';
        $clone->sort_order = $request->input('sort_order');

        if ( $clone->save() ) {

            // duplicate the answers
            foreach ($model->answers as $answer) {
                $newAnswer = $answer->replicate();
                $newAnswer->question_id = $clone->id;
                $newAnswer->save();
            }
            
        }

        $model = Question::findOrFail($clone->id);

        $transformed    = fractal($model, 
                            new QuestionTransformer((object)['project_id' => $model->project_id])
                          )->serializeWith(new ArraySerializer())
                          ->includeAnswer()->toArray();

        return response()->json($transformed);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => ['required'],
            'question' => ['required', 'max:255'],
            'section' => ['required'],
            'layout' => ['required'],
            'sort_order' => ['required']
        ]);

        $model = new Question;
        $model->project_id = $request->input('project_id');
        $model->question = $request->input('question');
        $model->section = $request->input('section');
        $model->layout = $request->input('layout');
        $model->sort_order = $request->input('sort_order');
        $model->save();
        
        $transformed    = fractal($model, 
                            new QuestionTransformer((object)['project_id' => $model->project_id])
                          )->serializeWith(new ArraySerializer())
                          ->includeAnswer()->toArray();

        return response()->json($transformed);
    }

    public function delete(Request $request, $id)
    {
        $question = Question::findOrFail($id);

        /** When estimate tab is removed, delete the Estimates values */
        if ( $question->trigger_widget == 'estimates-widget' ) {
            Estimate::ofProject($question->project_id)->delete();
        }

        return response()->json(['success' => $question->delete()]);
    }

}
