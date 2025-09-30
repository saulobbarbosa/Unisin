<?php

namespace App\Http\Controllers;

use App\Models\NivelEnsino;
use Illuminate\Http\Request;

class NivelEnsinoController extends Controller
{
    public function index()
    {
        return response()->json(NivelEnsino::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $nivel = NivelEnsino::create($data);
        return response()->json($nivel, 201);
    }

    public function show($id)
    {
        $nivel = NivelEnsino::findOrFail($id);
        return response()->json($nivel);
    }

    public function update(Request $request, $id)
    {
        $nivel = NivelEnsino::findOrFail($id);

        $data = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $nivel->update($data);
        return response()->json($nivel);
    }

    public function destroy($id)
    {
        $nivel = NivelEnsino::findOrFail($id);
        $nivel->delete();
        return response()->json(null, 204);
    }
}
