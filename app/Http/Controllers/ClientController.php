<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource via JSON
     *
     * @return \Illuminate\Http\Response JSON
     */
    public function all(Request $request)
    {  
        return response()->json(Client::orderBy('name')->get());
    }
}
