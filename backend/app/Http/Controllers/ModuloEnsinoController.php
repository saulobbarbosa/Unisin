<?php

namespace App\Http\Controllers;

use App\Models\ModuloEnsino;
use Illuminate\Http\Request;

class ModuloEnsinoController extends Controller
{
    public function index()
    {
        return response()->json(ModuloEnsino::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'                     => 'required|string|max:255',
            'nivel_ensino_id_nivel_ensino' => 'required|integer|exists:niveis_ensino,id_nivel_ensino',
        ]);

        $modulo = ModuloEnsino::create($data);
        return response()->json($modulo, 201);
    }

    public function show($id)
    {
        $modulo = ModuloEnsino::findOrFail($id);
        return response()->json($modulo);
    }

    public function update(Request $request, $id)
    {
        $modulo = ModuloEnsino::findOrFail($id);

        $data = $request->validate([
            'nome'                     => 'required|string|max:255',
            'nivel_ensino_id_nivel_ensino' => 'required|integer|exists:niveis_ensino,id_nivel_ensino',
        ]);

        $modulo->update($data);
        return response()->json($modulo);
    }

    public function destroy($id)
    {
        $modulo = ModuloEnsino::findOrFail($id);
        $modulo->delete();
        return response()->json(null, 204);
    }
}
