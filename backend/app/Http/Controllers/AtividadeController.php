<?php

namespace App\Http\Controllers;

use App\Models\Atividade;
use Illuminate\Http\Request;

class AtividadeController extends Controller
{
    public function index()
    {
        return response()->json(Atividade::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo' => 'required|string',
            'pergunta' => 'required|string',
            'resposta' => 'required|string',
            'conteudo_id_conteudo' => 'required|integer|exists:conteudos,id_conteudo',
        ]);

        $atividade = Atividade::create($data);
        return response()->json($atividade, 201);
    }

    public function show($id)
    {
        $atividade = Atividade::findOrFail($id);
        return response()->json($atividade);
    }

    public function update(Request $request, $id)
    {
        $atividade = Atividade::findOrFail($id);

        $data = $request->validate([
            'tipo' => 'required|string',
            'pergunta' => 'required|string',
            'resposta' => 'required|string',
            'conteudo_id_conteudo' => 'required|integer|exists:conteudos,id_conteudo',
        ]);

        $atividade->update($data);
        return response()->json($atividade);
    }

    public function destroy($id)
    {
        $atividade = Atividade::findOrFail($id);
        $atividade->delete();
        return response()->json(null, 204);
    }
}
