<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    // Método index: listar todos os alunos
    public function index()
    {
        $alunos = Aluno::all();
        return response()->json($alunos);
    }
}
