<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\EscolaController;
use App\Http\Controllers\ModuloEnsinoController;
use App\Http\Controllers\AlunoModuloEnsinoController;
use App\Http\Controllers\PerguntaController; 
use App\Http\Controllers\AlunoPerguntaController; 
use App\Http\Controllers\AmigoController;
use App\Http\Controllers\ConquistaController;
use App\Http\Controllers\AlunoConquistaController;
use App\Http\Controllers\ItemLojaController;
use App\Http\Controllers\AlunoItemLojaController;
use App\Http\Controllers\NivelController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- AUTENTICAÇÃO ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// --- LISTAGENS ---
Route::get('/usuarios', [UsuarioController::class, 'index'])->middleware('auth:sanctum');
Route::get('/alunos', [AlunoController::class, 'index']);
Route::get('/escolas', [EscolaController::class, 'index']);
Route::get('/professores', [ProfessorController::class, 'index']);
Route::get('/modulos-ensino', [ModuloEnsinoController::class, 'index']);
Route::get('/niveis', [NivelController::class, 'index']); 


// --- QUIZ GAME ROUTES ---
Route::post('/quiz', [PerguntaController::class, 'quiz']);
Route::put('/perguntas/status', [AlunoPerguntaController::class, 'atualizarStatus']);


// --- LOJA / COMPRAS ---
// Rota de Compra (Atualiza Aluno e Desconta Moedas)
Route::post('/loja/comprar/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'comprarItem']);


// --- ROTAS GERAIS ---
Route::get('/perguntas', [PerguntaController::class, 'index']);
Route::get('/conquistas', [ConquistaController::class, 'index']);
Route::get('/itens-loja', [ItemLojaController::class, 'index']);
Route::get('/amigos', [AmigoController::class, 'index']);


// --- API RESOURCES ---
Route::apiResource('alunos', AlunoController::class);
Route::apiResource('escolas', EscolaController::class);
Route::apiResource('professores', ProfessorController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('modulos-ensino', ModuloEnsinoController::class);
Route::apiResource('niveis', NivelController::class); 
Route::apiResource('perguntas', PerguntaController::class);
Route::apiResource('conquistas', ConquistaController::class);
Route::apiResource('itens-loja', ItemLojaController::class);


// --- RELACIONAMENTOS ---

// 1. Alunos <-> Modulos
Route::post('/alunos-modulos', [AlunoModuloEnsinoController::class, 'store']);
Route::get('/alunos/{id}/modulos', [AlunoModuloEnsinoController::class, 'modulosPorAluno']);
Route::get('/alunos-modulos/{alunoId}/{moduloId}/{nivelId}', [AlunoModuloEnsinoController::class, 'show']);
Route::delete('/alunos-modulos/{alunoId}/{moduloId}/{nivelId}', [AlunoModuloEnsinoController::class, 'destroy']);

// 2. Alunos <-> Perguntas
Route::post('/alunos-perguntas', [AlunoPerguntaController::class, 'store']); 
Route::get('/alunos-perguntas/{alunoId}/{perguntaId}', [AlunoPerguntaController::class, 'show']); 

// 3. Alunos <-> Conquistas
Route::post('/alunos-conquistas', [AlunoConquistaController::class, 'store']);
Route::get('/alunos-conquistas/{alunoId}/{conquistaId}', [AlunoConquistaController::class, 'show']);
Route::delete('/alunos-conquistas/{alunoId}/{conquistaId}', [AlunoConquistaController::class, 'destroy']);

// 4. Alunos <-> Itens da Loja
Route::post('/alunos-itens', [AlunoItemLojaController::class, 'store']);
Route::get('/alunos-itens/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'show']);
Route::delete('/alunos-itens/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'destroy']);

// 5. Amigos
Route::post('amigos', [AmigoController::class, 'store']);
Route::get('amigos/{id1}/{id2}', [AmigoController::class, 'show']);
Route::put('amigos/{id1}/{id2}', [AmigoController::class, 'update']);
Route::delete('amigos/{id1}/{id2}', [AmigoController::class, 'destroy']);