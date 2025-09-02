<?php

namespace App\Http\Controllers;

use App\Models\Atividade;
use Illuminate\Http\Request;

class AtividadeController extends Controller
{
    public function index()
    {
        $atividades = Atividade::with('conteudo')->get();
        return response()->json($atividades);
    }
}
