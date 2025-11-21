<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers de Autenticação e Usuários
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\EscolaController;

// Controllers de Ensino e Conteúdo
use App\Http\Controllers\ModuloEnsinoController;
use App\Http\Controllers\AlunoModuloEnsinoController;
use App\Http\Controllers\PerguntaController; // Substitui AtividadeController
use App\Http\Controllers\AlunoPerguntaController; // Novo controller de status

// Controllers de Gamificação e Social
use App\Http\Controllers\AmigoController;
use App\Http\Controllers\ConquistaController;
use App\Http\Controllers\AlunoConquistaController;
use App\Http\Controllers\ItemLojaController;
use App\Http\Controllers\AlunoItemLojaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rota de Usuário Autenticado (Sanctum)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- AUTENTICAÇÃO ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// --- LISTAGENS GERAIS (GET) ---
// Útil para preencher selects ou listagens rápidas
Route::get('/usuarios', [UsuarioController::class, 'index'])->middleware('auth:sanctum');
Route::get('/alunos', [AlunoController::class, 'index']);
Route::get('/escolas', [EscolaController::class, 'index']);
Route::get('/professores', [ProfessorController::class, 'index']);
Route::get('/modulos-ensino', [ModuloEnsinoController::class, 'index']);
Route::get('/perguntas', [PerguntaController::class, 'index']); // Antigas atividades
Route::get('/conquistas', [ConquistaController::class, 'index']);
Route::get('/itens-loja', [ItemLojaController::class, 'index']);
Route::get('/amigos', [AmigoController::class, 'index']);


// --- LISTAGENS DE RELACIONAMENTOS (GET) ---
Route::get('/alunos-modulos', [AlunoModuloEnsinoController::class, 'index']);
Route::get('/alunos-perguntas', [AlunoPerguntaController::class, 'index']); // Histórico de respostas
Route::get('/alunos-conquistas', [AlunoConquistaController::class, 'index']);
Route::get('/alunos-itens-loja', [AlunoItemLojaController::class, 'index']);


// --- API RESOURCES (CRUD PADRÃO) ---
// Cria automaticamente as rotas: index, store, show, update, destroy
Route::apiResource('alunos', AlunoController::class);
Route::apiResource('escolas', EscolaController::class);
Route::apiResource('professores', ProfessorController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('modulos-ensino', ModuloEnsinoController::class);
Route::apiResource('perguntas', PerguntaController::class); // Substitui atividades
Route::apiResource('conquistas', ConquistaController::class);
Route::apiResource('itens-loja', ItemLojaController::class);


// --- ROTAS ESPECÍFICAS DE RELACIONAMENTOS (MANUAL) ---

// 1. Alunos <-> Perguntas (Responder/Visualizar)
Route::post('/alunos-perguntas', [AlunoPerguntaController::class, 'store']); // Registrar resposta/status
Route::get('/alunos-perguntas/{alunoId}/{perguntaId}', [AlunoPerguntaController::class, 'show']); // Ver status específico

// 2. Alunos <-> Conquistas
Route::post('/alunos-conquistas', [AlunoConquistaController::class, 'store']);
Route::get('/alunos-conquistas/{alunoId}/{conquistaId}', [AlunoConquistaController::class, 'show']);
Route::delete('/alunos-conquistas/{alunoId}/{conquistaId}', [AlunoConquistaController::class, 'destroy']);

// 3. Alunos <-> Itens da Loja
Route::post('/alunos-itens', [AlunoItemLojaController::class, 'store']);
Route::get('/alunos-itens/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'show']);
Route::delete('/alunos-itens/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'destroy']);

// 4. Alunos <-> Módulos de Ensino
Route::post('/alunos-modulos', [AlunoModuloEnsinoController::class, 'store']);
Route::get('/alunos-modulos/{alunoId}/{moduloId}', [AlunoModuloEnsinoController::class, 'show']);
Route::delete('/alunos-modulos/{alunoId}/{moduloId}', [AlunoModuloEnsinoController::class, 'destroy']);

// 5. Amigos
Route::post('amigos', [AmigoController::class, 'store']);
Route::get('amigos/{id1}/{id2}', [AmigoController::class, 'show']);
Route::put('amigos/{id1}/{id2}', [AmigoController::class, 'update']);
Route::delete('amigos/{id1}/{id2}', [AmigoController::class, 'destroy']);

// Quiz
Route::get('/quiz/{id_modulo}/{nivel}', [PerguntaController::class, 'quiz']);