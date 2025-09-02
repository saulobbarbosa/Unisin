<?php

namespace App\Http\Controllers;

use App\Models\AlunoItemLoja;
use Illuminate\Http\Request;

class AlunoItemLojaController extends Controller
{
    public function index()
    {
        $relacoes = AlunoItemLoja::with(['aluno', 'itemLoja'])->get();
        return response()->json($relacoes);
    }
}
