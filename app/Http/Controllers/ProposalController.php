<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Project;

class ProposalController extends Controller
{
    private $slug = 'projects';
    //
    public function show(Request $request, $id)
    {
        $Project = Project::findOrFail($id);

        $dataType = new \stdClass();
        $dataType->slug = $this->slug;

        return view('projects.proposal', compact('Project','dataType'));
    }
}
