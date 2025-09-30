<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    public function index()
    {
        $alunos = Aluno::all();
        return response()->json($alunos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_usuario' => 'required|integer|unique:alunos,id_usuario',
            'moedas'     => 'required|integer|min:0',
        ]);

        $aluno = Aluno::create($validated);

        return response()->json([
            'message' => 'Aluno criado com sucesso!',
            'aluno'   => $aluno
        ], 201);
    }

    public function show($id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        return response()->json($aluno);
    }

    public function update(Request $request, $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $validated = $request->validate([
            'moedas' => 'sometimes|integer|min:0',
        ]);

        $aluno->update($validated);

        return response()->json([
            'message' => 'Aluno atualizado com sucesso!',
            'aluno'   => $aluno
        ]);
    }

    public function destroy($id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $aluno->delete();

        return response()->json(['message' => 'Aluno removido com sucesso!']);
    }
}
