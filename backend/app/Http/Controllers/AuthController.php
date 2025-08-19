<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Busca o usuário pelo email
        $usuario = Usuario::where('email', $request->email)->first();

        // 2. Verifica se o usuário existe E se a senha está correta
        if (! $usuario || ! Hash::check($request->senha, $usuario->senha)) {
            // Se não estiver, retorna um erro de autenticação
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        // 3. Se tudo estiver certo, cria e retorna um token para o usuário
        $token = $usuario->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ]);
    }
}