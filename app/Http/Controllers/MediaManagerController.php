<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Project;

class MediaManagerController extends Controller
{

    public $project_dir = 'public/projects/';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {
        $files = Storage::allFiles('public');

    }


    public function byProject(Request $request)
    {

        $project_id     = $request->input('project_id') ?? '';

        $is_dir         = filter_var($request->input('is_dir'), FILTER_VALIDATE_BOOLEAN);

        $project_path      = 'public/projects/'. $project_id .'/';

        if ($is_dir) {

            $path           = $request->input('path') ? $request->input('path') . '/' : '';

            /* Use the default project path when there is no passed in request params */
            if (!$path) {
                $path = $project_path;
            }

        } else {
            return response()->json(['success' => false, 'msg' => 'Not a directory']);
        }

        $directories = Storage::directories($path);

        $main_files  = [];

        foreach (Storage::files($path) as $key => $file) {

            array_push($main_files, [
                'is_dir' => false,
                'path' =>  Storage::url($file),
                'name' => basename($file),
                'dir_path' => dirname($file),
                'type' => Storage::mimeType($file)
            ]);
        }

        $generated = [
            'path' => $path,
            'name' => basename($path),
            'files' => $main_files,
            'folders' => [],
            'parent_path' => dirname($path),
            'project_path' => $project_path
        ];

        foreach ($directories as $key => $dir) {

            $sub_files  = [];

            foreach (Storage::files($dir) as $file) {
                array_push($sub_files, [
                    'is_dir' => false,
                    'path' => Storage::url($file),
                    'name' => basename($file),
                    'dir_path' => dirname($file),
                    'type' => Storage::mimeType($file)
                ]);
            }

            array_push($generated['folders'], [
                'is_dir' => true,
                'path' => $dir,
                'name' => basename($dir),
                'files' => $sub_files,
                'parent_path' => dirname($dir),
                'project_path' => $project_path
            ]);
        }

        return response()->json(['success' => true, 'data' => $generated ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
       
        $file = $request->file('file');

        $storage_path = $request->input('current_path', 'public/uploaded');

        $path = $file->storeAs(
                    $storage_path, $file->getClientOriginalName()
                );

        return $path;
    }

    /** Generic upload function */
    public function upload(Request $request)
    {   
        $file = $request->file('upload');

        $storage_path = $request->input('current_path', 'public/uploaded');

        $path = $file->storeAs(
                    $storage_path, $file->getClientOriginalName()
                );

        return response()->json(['success' => false, 'url' => '/storage/uploaded/'.$file->getClientOriginalName()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeMultiple(Request $request)
    {
        $files = $request->file('files');

        return response()->json($files);

        $storage_path = $request->input('current_path');

        $path = $file->storeAs(
                    $storage_path, $file->getClientOriginalName()
                );

        return $path;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = (object) $request->all();

        $is_dir = filter_var($data->is_dir, FILTER_VALIDATE_BOOLEAN);

        $original = $data->dir_path.'/'.$data->original;
        $new = $data->dir_path.'/'.$data->name;

        if(!Storage::exists($new)) {

            if ($is_dir) {
                $return = Storage::rename($original, $new);
            } else {
                $return = Storage::move($original, $new);
            }

            return response()->json(['success' => $return, 'message' => 'Updated!']);
        }

        return response()->json(['success' => false, 'message' => 'File already exists']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = (object) $request->all();

        $is_dir = filter_var($data->is_dir, FILTER_VALIDATE_BOOLEAN);

        if ($is_dir) {
            $return = Storage::deleteDirectory($data->path);
        } else {
            $return = Storage::delete($data->dir_path.'/'.$data->name);
        }

        return response()->json(['success' => $return]);
    }

    public function saveDirectory(Request $request)
    {
        $data = (object) $request->all();

        $directory = $data->path . $data->name;

        if(!Storage::exists($directory)) {
            Storage::makeDirectory($directory, 0777);
        } else {
            // get all directories containing the same name
            $folders = Storage::directories($data->path);
            $directory = $data->path . $data->name . ' ('.count($folders).')';
            Storage::makeDirectory($directory, 0777);
        }

        $directories = Storage::allDirectories($data->path);

        return response()->json($directories);
    }
}
