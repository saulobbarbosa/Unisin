<?php

namespace App\Http\Controllers;

use App\Models\AlunoConteudo;
use Illuminate\Http\Request;

class AlunoConteudoController extends Controller
{
    public function index()
    {
        $relacoes = AlunoConteudo::with(['aluno', 'conteudo'])->get();
        return response()->json($relacoes);
    }
}

