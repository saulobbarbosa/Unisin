<?php

namespace App\Http\Controllers;

use App\Models\AlunoModuloEnsino;
use Illuminate\Http\Request;

class AlunoModuloEnsinoController extends Controller
{
    public function index()
    {
        $alunoModulos = AlunoModuloEnsino::with(['aluno', 'moduloEnsino'])->get();
        return response()->json($alunoModulos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'aluno_id_usuario'               => 'required|integer|exists:alunos,id_usuario',
            'modulo_ensino_id_modulo_ensino' => 'required|integer|exists:modulos_ensino,id_modulo_ensino',
        ]);

        $existe = AlunoModuloEnsino::where('aluno_id_usuario', $validated['aluno_id_usuario'])
                                   ->where('modulo_ensino_id_modulo_ensino', $validated['modulo_ensino_id_modulo_ensino'])
                                   ->first();

        if ($existe) {
            return response()->json(['message' => 'Esse módulo já foi atribuído a esse aluno.'], 409);
        }

        $alunoModulo = AlunoModuloEnsino::create($validated);

        return response()->json([
            'message' => 'Módulo atribuído ao aluno com sucesso!',
            'alunoModulo' => $alunoModulo
        ], 201);
    }

    public function show($alunoId, $moduloId)
    {
        $alunoModulo = AlunoModuloEnsino::where('aluno_id_usuario', $alunoId)
                                        ->where('modulo_ensino_id_modulo_ensino', $moduloId)
                                        ->with(['aluno', 'moduloEnsino'])
                                        ->first();

        if (!$alunoModulo) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        return response()->json($alunoModulo);
    }

    public function destroy($alunoId, $moduloId)
    {
        $alunoModulo = AlunoModuloEnsino::where('aluno_id_usuario', $alunoId)
                                        ->where('modulo_ensino_id_modulo_ensino', $moduloId)
                                        ->first();

        if (!$alunoModulo) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        $alunoModulo->delete();

        return response()->json(['message' => 'Módulo removido do aluno com sucesso!']);
    }
}
