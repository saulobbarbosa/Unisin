<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        // 1. Usa o Model para buscar todos os usuários no banco de dados
        $usuarios = Usuario::all();

        // 2. Retorna a lista de usuários como uma resposta JSON
        return response()->json($usuarios);
    }
}
