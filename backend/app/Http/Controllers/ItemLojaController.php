<?php

namespace App\Http\Controllers;

use App\Models\ItemLoja;
use Illuminate\Http\Request;

class ItemLojaController extends Controller
{
    public function index()
    {
        return response()->json(ItemLoja::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'     => 'required|string|max:255', // Validação do nome
            'preco'    => 'required|numeric',
            'conteudo' => 'required|string|max:255',
            'tipo'     => 'required|string|max:255',
        ]);

        $item = ItemLoja::create($data);
        return response()->json($item, 201);
    }

    public function show($id)
    {
        $item = ItemLoja::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = ItemLoja::findOrFail($id);

        $data = $request->validate([
            'nome'     => 'sometimes|string|max:255',
            'preco'    => 'sometimes|numeric',
            'conteudo' => 'sometimes|string|max:255',
            'tipo'     => 'sometimes|string|max:255',
        ]);

        $item->update($data);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = ItemLoja::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}