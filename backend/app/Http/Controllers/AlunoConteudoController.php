<?php

namespace App\Http\Controllers;

use App\Models\AlunoConteudo;
use Illuminate\Http\Request;

class AlunoConteudoController extends Controller
{
    public function index()
    {
        $alunoConteudos = AlunoConteudo::with(['aluno', 'conteudo'])->get();
        return response()->json($alunoConteudos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'aluno_id_usuario'      => 'required|integer|exists:alunos,id_usuario',
            'conteudo_id_conteudo'  => 'required|integer|exists:conteudos,id_conteudo',
            'status_conteudo'       => 'required|string|max:50',
        ]);

        $existe = AlunoConteudo::where('aluno_id_usuario', $validated['aluno_id_usuario'])
                               ->where('conteudo_id_conteudo', $validated['conteudo_id_conteudo'])
                               ->first();

        if ($existe) {
            return response()->json(['message' => 'Esse conteúdo já foi associado a esse aluno.'], 409);
        }

        $alunoConteudo = AlunoConteudo::create($validated);

        return response()->json([
            'message' => 'Conteúdo associado ao aluno com sucesso!',
            'alunoConteudo' => $alunoConteudo
        ], 201);
    }

    public function show($alunoId, $conteudoId)
    {
        $alunoConteudo = AlunoConteudo::where('aluno_id_usuario', $alunoId)
                                      ->where('conteudo_id_conteudo', $conteudoId)
                                      ->with(['aluno', 'conteudo'])
                                      ->first();

        if (!$alunoConteudo) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        return response()->json($alunoConteudo);
    }

    public function update(Request $request, $alunoId, $conteudoId)
    {
        $alunoConteudo = AlunoConteudo::where('aluno_id_usuario', $alunoId)
                                      ->where('conteudo_id_conteudo', $conteudoId)
                                      ->first();

        if (!$alunoConteudo) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        $validated = $request->validate([
            'status_conteudo' => 'required|string|max:50',
        ]);

        $alunoConteudo->update($validated);

        return response()->json([
            'message' => 'Status do conteúdo atualizado com sucesso!',
            'alunoConteudo' => $alunoConteudo
        ]);
    }

    public function destroy($alunoId, $conteudoId)
    {
        $alunoConteudo = AlunoConteudo::where('aluno_id_usuario', $alunoId)
                                      ->where('conteudo_id_conteudo', $conteudoId)
                                      ->first();

        if (!$alunoConteudo) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        $alunoConteudo->delete();

        return response()->json(['message' => 'Conteúdo removido do aluno com sucesso!']);
    }
}

