<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelperController extends Controller
{
   
    /**
     * Save sorder order of a model
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveSort(Request $request)
    {
        $validatedData = $request->validate([
            'list' => ['required', 'max:255'],
            'model' => ['required', 'max:255']
        ]);

        $list = $request->input('list');
        $model_name = $request->input('model');

        $model = app("App\\Models\\".$model_name);   

        $order = 1;
        foreach ($list as $id) {
            $model->where('id', $id)->update(['sort_order' => $order]);
            $order++;
        }

        return response()->json($list);
    }
}
