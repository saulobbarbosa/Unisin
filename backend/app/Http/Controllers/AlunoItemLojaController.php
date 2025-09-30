<?php

namespace App\Http\Controllers;

use App\Models\AlunoItemLoja;
use Illuminate\Http\Request;

class AlunoItemLojaController extends Controller
{
    public function index()
    {
        $alunoItens = AlunoItemLoja::with(['aluno', 'itemLoja'])->get();
        return response()->json($alunoItens);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'aluno_id_usuario'        => 'required|integer|exists:alunos,id_usuario',
            'item_loja_id_item_loja'  => 'required|integer|exists:itens_loja,id_item_loja',
        ]);

        $existe = AlunoItemLoja::where('aluno_id_usuario', $validated['aluno_id_usuario'])
                               ->where('item_loja_id_item_loja', $validated['item_loja_id_item_loja'])
                               ->first();

        if ($existe) {
            return response()->json(['message' => 'Esse item já foi atribuído a esse aluno.'], 409);
        }

        $alunoItem = AlunoItemLoja::create($validated);

        return response()->json([
            'message' => 'Item atribuído ao aluno com sucesso!',
            'alunoItem' => $alunoItem
        ], 201);
    }

    public function show($alunoId, $itemId)
    {
        $alunoItem = AlunoItemLoja::where('aluno_id_usuario', $alunoId)
                                  ->where('item_loja_id_item_loja', $itemId)
                                  ->with(['aluno', 'itemLoja'])
                                  ->first();

        if (!$alunoItem) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        return response()->json($alunoItem);
    }

    public function destroy($alunoId, $itemId)
    {
        $alunoItem = AlunoItemLoja::where('aluno_id_usuario', $alunoId)
                                  ->where('item_loja_id_item_loja', $itemId)
                                  ->first();

        if (!$alunoItem) {
            return response()->json(['message' => 'Relacionamento não encontrado'], 404);
        }

        $alunoItem->delete();

        return response()->json(['message' => 'Item removido do aluno com sucesso!']);
    }
}
