<?php

namespace App\Http\Controllers;

use App\Models\Conteudo;
use Illuminate\Http\Request;

class ConteudoController extends Controller
{
    public function index()
    {
        return response()->json(Conteudo::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id_nivel_ensino'     => 'required|integer|exists:niveis_ensino,id_nivel_ensino',
            'nome_conteudo'       => 'required|string|max:255',
            'professor_id_usuario'=> 'required|integer|exists:professores,id_usuario',
        ]);

        $conteudo = Conteudo::create($data);
        return response()->json($conteudo, 201);
    }

    public function show($id)
    {
        $conteudo = Conteudo::findOrFail($id);
        return response()->json($conteudo);
    }

    public function update(Request $request, $id)
    {
        $conteudo = Conteudo::findOrFail($id);

        $data = $request->validate([
            'id_nivel_ensino'     => 'required|integer|exists:niveis_ensino,id_nivel_ensino',
            'nome_conteudo'       => 'required|string|max:255',
            'professor_id_usuario'=> 'required|integer|exists:professores,id_usuario',
        ]);

        $conteudo->update($data);
        return response()->json($conteudo);
    }

    public function destroy($id)
    {
        $conteudo = Conteudo::findOrFail($id);
        $conteudo->delete();
        return response()->json(null, 204);
    }
}
