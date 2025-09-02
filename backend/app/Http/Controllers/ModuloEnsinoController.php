<?php

namespace App\Http\Controllers;

use App\Models\ModuloEnsino;
use Illuminate\Http\Request;

class ModuloEnsinoController extends Controller
{
    public function index()
    {
        $modulos = ModuloEnsino::with('nivelEnsino')->get();
        return response()->json($modulos);
    }
}
