<?php

namespace App\Http\Controllers;

use App\Models\AlunoItemLoja;
use App\Models\Aluno;
use App\Models\ItemLoja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlunoItemLojaController extends Controller
{
    public function index()
    {
        $alunoItens = AlunoItemLoja::with(['aluno', 'itemLoja'])->get();
        return response()->json($alunoItens);
    }

    /**
     * Realiza a compra e equipa o item no aluno.
     * Rota: POST /loja/comprar/{alunoId}/{itemId}
     */
    public function comprarItem($alunoId, $itemId)
    {
        // 1. Buscar Aluno e Item
        $aluno = Aluno::find($alunoId);
        $item  = ItemLoja::find($itemId);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado.'], 404);
        }

        if (!$item) {
            return response()->json(['message' => 'Item não encontrado.'], 404);
        }

        // 2. Verificar se tem moedas suficientes
        if ($aluno->moedas < $item->preco) {
            return response()->json([
                'message' => 'Saldo insuficiente.',
                'saldo_atual' => $aluno->moedas,
                'preco_item' => $item->preco
            ], 400); // Bad Request
        }

        // 3. Transação: Descontar moedas + Atualizar atributo + Registrar compra
        try {
            DB::transaction(function () use ($aluno, $item) {
                // A. Desconta as moedas
                $aluno->moedas -= $item->preco;

                // B. Altera o atributo do usuário de acordo com o tipo do item
                // Verifica o tipo e atualiza a coluna correspondente na tabela 'alunos'
                // Tipos esperados: 'borda', 'fundo', 'avatar'
                switch ($item->tipo) {
                    case 'borda':
                        $aluno->borda = $item->conteudo;
                        break;
                    case 'fundo':
                        $aluno->fundo = $item->conteudo;
                        break;
                    case 'avatar':
                        $aluno->avatar = $item->conteudo;
                        break;
                    // Adicione outros casos se houver novos tipos no futuro
                }

                $aluno->save();

                // C. Opcional: Registrar que o aluno possui o item na tabela de relacionamento
                // Use firstOrCreate para não duplicar se ele comprar novamente (caso a lógica permita)
                AlunoItemLoja::firstOrCreate([
                    'aluno_id_usuario' => $aluno->id_usuario,
                    'item_loja_id_item_loja' => $item->id_item_loja
                ]);
            });

            return response()->json([
                'message' => 'Compra realizada com sucesso!',
                'aluno' => $aluno, // Retorna o aluno atualizado
                'item_equipado' => $item->nome
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao processar a compra.', 'error' => $e->getMessage()], 500);
        }
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