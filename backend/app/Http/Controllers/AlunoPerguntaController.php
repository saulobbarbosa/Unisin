<?php

namespace App\Http\Controllers;

use App\Models\AlunoPergunta;
use Illuminate\Http\Request;

class AlunoPerguntaController extends Controller
{
    public function index()
    {
        // Listar todo histórico
        return response()->json(AlunoPergunta::with(['aluno.usuario', 'pergunta'])->get());
    }

    // Registrar que um aluno respondeu ou visualizou (Método Genérico)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'aluno_id_usuario' => 'required|integer|exists:alunos,id_usuario',
            'pergunta_id' => 'required|integer|exists:perguntas,id',
            'status' => 'required|string', 
        ]);

        $registro = AlunoPergunta::updateOrCreate(
            [
                'aluno_id_usuario' => $validated['aluno_id_usuario'],
                'pergunta_id' => $validated['pergunta_id']
            ],
            [
                'status' => $validated['status']
            ]
        );

        return response()->json([
            'message' => 'Status da pergunta atualizado.',
            'data' => $registro
        ], 200);
    }

    /**
     * Rota específica para atualizar status via Body
     * Recebe: aluno_id, pergunta_id, status
     */
    public function atualizarStatus(Request $request)
    {
        $validated = $request->validate([
            'aluno_id' => 'required|integer|exists:alunos,id_usuario',
            'pergunta_id' => 'required|integer|exists:perguntas,id',
            'status' => 'required|string', // ex: 'correto', 'errado'
        ]);

        $registro = AlunoPergunta::updateOrCreate(
            [
                'aluno_id_usuario' => $validated['aluno_id'],
                'pergunta_id' => $validated['pergunta_id']
            ],
            [
                'status' => $validated['status']
            ]
        );

        return response()->json([
            'message' => 'Status atualizado com sucesso!',
            'status_atual' => $registro->status
        ]);
    }

    public function show($alunoId, $perguntaId)
    {
        $registro = AlunoPergunta::where('aluno_id_usuario', $alunoId)
                                 ->where('pergunta_id', $perguntaId)
                                 ->first();

        if (!$registro) {
            return response()->json(['message' => 'Registro não encontrado'], 404);
        }

        return response()->json($registro);
    }
}