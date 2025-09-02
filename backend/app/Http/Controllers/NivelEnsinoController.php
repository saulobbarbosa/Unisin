<?php

namespace App\Http\Controllers;

use App\Models\NivelEnsino;
use Illuminate\Http\Request;

class NivelEnsinoController extends Controller
{
    public function index()
    {
        $niveis = NivelEnsino::all();
        return response()->json($niveis);
    }
}
