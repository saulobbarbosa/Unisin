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

    // Registrar que um aluno respondeu ou visualizou
    public function store(Request $request)
    {
        $validated = $request->validate([
            'aluno_id_usuario' => 'required|integer|exists:alunos,id_usuario',
            'pergunta_id' => 'required|integer|exists:perguntas,id',
            'status' => 'required|string', // Ex: 'correto', 'incorreto', 'pendente'
        ]);

        // Verifica se já existe registro (ex: aluno tentando responder de novo)
        // Aqui usamos updateOrCreate para permitir atualizar o status (tentativa nova)
        // ou você pode bloquear se já estiver 'correto'.
        
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