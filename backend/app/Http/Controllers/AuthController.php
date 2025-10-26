<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use App\Models\Aluno;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Busca o usuário pelo email
        $usuario = Usuario::where('email', $request->email)->first();

        // 2. Verifica se o usuário existe E se a senha está correta
        if (! $usuario || ! Hash::check($request->senha, $usuario->senha)) {
            return response()->json([
                'success' => false,
                'message' => 'As credenciais fornecidas estão incorretas.'
            ], 401);
        }

        // 3. Se tudo estiver certo, cria e retorna um token para o usuário
        $token = $usuario->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login realizado com sucesso.',
            'usuario' => $usuario,
            'token' => $token
        ]);
    }

        public function register(Request $request)
    {
        try {
            // 1. A validação ocorre primeiro. Se falhar, lança uma exceção antes de tocar no banco.
            $validated = $request->validate([
                'nome' => 'required|string|max:255',
                'dt_nasc' => 'required|date',
                'email' => 'required|string|email|max:255|unique:usuarios,email',
                'senha' => 'required|string|min:6',
            ]);

            // 2. Inicia a transação. Tudo dentro da closure será desfeito em caso de erro.
            $aluno = DB::transaction(function () use ($validated) {

                // Cria o registro na tabela 'usuarios'
                $usuario = Usuario::create([
                    'nome' => $validated['nome'],
                    'dt_nasc' => $validated['dt_nasc'],
                    'email' => $validated['email'],
                    'senha' => bcrypt($validated['senha']),
                ]);

                // Cria o registro na tabela 'alunos', usando o ID do usuário recém-criado.
                // Se esta linha falhar por qualquer motivo, a criação do usuário acima será desfeita.
                $aluno = Aluno::create([
                    'id_usuario' => $usuario->id_usuario, // Supondo que a PK de Usuario seja 'id_usuario'
                    'moedas' => 0,
                ]);

                return $aluno;
            });

            // 3. Se a transação for concluída com sucesso, retorna a resposta de sucesso.
            return response()->json([
                'message' => 'Aluno cadastrado com sucesso!',
                'aluno' => $aluno
            ], 201);

        } catch (ValidationException $e) {
            // Captura erros de validação e retorna uma resposta 422
            return response()->json([
                'error' => 'Dados inválidos fornecidos.',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // Captura qualquer outro erro (falha de banco, etc.) e retorna uma resposta 500
            // A transação já foi desfeita automaticamente pelo Laravel.
            return response()->json([
                'error' => 'Ocorreu um erro inesperado ao cadastrar o aluno.',
                // Em ambiente de desenvolvimento, você pode querer ver o erro exato:
                // 'message' => $e->getMessage() 
            ], 500);
        }
    }

}