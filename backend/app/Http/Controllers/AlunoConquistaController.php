<?php

namespace App\Http\Controllers;

use App\Models\AlunoConquista;
use Illuminate\Http\Request;

class AlunoConquistaController extends Controller
{
    public function index()
    {
        $relacoes = AlunoConquista::with(['aluno', 'conquista'])->get();
        return response()->json($relacoes);
    }
}
