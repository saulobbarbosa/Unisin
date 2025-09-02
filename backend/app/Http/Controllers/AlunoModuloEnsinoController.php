<?php

namespace App\Http\Controllers;

use App\Models\AlunoModuloEnsino;
use Illuminate\Http\Request;

class AlunoModuloEnsinoController extends Controller
{
    public function index()
    {
        $relacoes = AlunoModuloEnsino::with(['aluno', 'moduloEnsino'])->get();
        return response()->json($relacoes);
    }
}
