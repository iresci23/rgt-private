<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Project;
use App\Repositories\SystemDataRepository;

class RequirementController extends Controller
{
    private $slug = 'projects';
    //
    public function show(Request $request, $id)
    {
        $Project = Project::withCount('components')->findOrFail($id);

        $dataType = new \stdClass();
        $dataType->slug = $this->slug;

        return view('projects.requirements', compact('Project','dataType'));
    }
}
