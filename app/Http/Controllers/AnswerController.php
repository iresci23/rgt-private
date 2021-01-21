<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Fractalistic\ArraySerializer;

use App\Transformers\AnswerTransformer;
use App\Models\Answer;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Store or update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $question_id = $request->input('key');
        $answer      = $request->input('value');
        $layout      = $request->input('layout');
        $project_id  = $request->input('project_id');

        if($answer){
            $model = Answer::updateOrCreate(['question_id' => $question_id, 'project_id' => $project_id],[
                'answer' => $answer,
                'layout' => $layout
            ]);
        }else{
            $model = Answer::answerByProject($project_id, $question_id)->delete();
        }

        $transformed    = fractal($model,
            new AnswerTransformer()
            )
            ->serializeWith(new ArraySerializer())
            ->toArray();

        return response()->json($transformed);

    }
      
}
