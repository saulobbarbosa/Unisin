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
            'preco' => 'required|numeric',
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
            'preco' => 'required|numeric',
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
