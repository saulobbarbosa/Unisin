<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\EscolaController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\NivelEnsinoController;
use App\Http\Controllers\ModuloEnsinoController;
use App\Http\Controllers\AlunoModuloEnsinoController;
use App\Http\Controllers\AmigoController;
use App\Http\Controllers\ConteudoController;
use App\Http\Controllers\AlunoConteudoController;
use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\ConquistaController;
use App\Http\Controllers\AlunoConquistaController;
use App\Http\Controllers\ItemLojaController;
use App\Http\Controllers\AlunoItemLojaController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rota para listar todos os usuários
Route::get('/usuarios', [UsuarioController::class, 'index'])->middleware('auth:sanctum');

Route::get('/alunos', [AlunoController::class, 'index']);
Route::get('/escolas', [EscolaController::class, 'index']);
Route::get('/professores', [ProfessorController::class, 'index']);
Route::get('/niveis-ensino', [NivelEnsinoController::class, 'index']);
Route::get('/modulos-ensino', [ModuloEnsinoController::class, 'index']);
Route::get('/alunos-modulos', [AlunoModuloEnsinoController::class, 'index']);
Route::get('/amigos', [AmigoController::class, 'index']);
Route::get('/conteudos', [ConteudoController::class, 'index']);
Route::get('/alunos-conteudos', [AlunoConteudoController::class, 'index']);
Route::get('/atividades', [AtividadeController::class, 'index']);
Route::get('/conquistas', [ConquistaController::class, 'index']);
Route::get('/alunos-conquistas', [AlunoConquistaController::class, 'index']);
Route::get('/itens-loja', [ItemLojaController::class, 'index']);
Route::get('/alunos-itens-loja', [AlunoItemLojaController::class, 'index']);



Route::apiResource('alunos', AlunoController::class);
Route::apiResource('atividades', AtividadeController::class);
Route::apiResource('conquistas', ConquistaController::class);
Route::apiResource('conteudos', ConteudoController::class);
Route::apiResource('escolas', EscolaController::class);
Route::apiResource('itens-loja', ItemLojaController::class);
Route::apiResource('modulos-ensino', ModuloEnsinoController::class);
Route::apiResource('niveis-ensino', NivelEnsinoController::class);
Route::apiResource('professores', ProfessorController::class);
Route::apiResource('usuarios', UsuarioController::class);



Route::post('/alunos-conquistas', [AlunoConquistaController::class, 'store']);
Route::get('/alunos-conquistas/{alunoId}/{conquistaId}', [AlunoConquistaController::class, 'show']);
Route::delete('/alunos-conquistas/{alunoId}/{conquistaId}', [AlunoConquistaController::class, 'destroy']);


Route::post('/alunos-conteudos', [AlunoConteudoController::class, 'store']);
Route::get('/alunos-conteudos/{alunoId}/{conteudoId}', [AlunoConteudoController::class, 'show']);
Route::put('/alunos-conteudos/{alunoId}/{conteudoId}', [AlunoConteudoController::class, 'update']);
Route::delete('/alunos-conteudos/{alunoId}/{conteudoId}', [AlunoConteudoController::class, 'destroy']);


Route::post('/alunos-itens', [AlunoItemLojaController::class, 'store']);
Route::get('/alunos-itens/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'show']);
Route::delete('/alunos-itens/{alunoId}/{itemId}', [AlunoItemLojaController::class, 'destroy']);


Route::post('/alunos-modulos', [AlunoModuloEnsinoController::class, 'store']);
Route::get('/alunos-modulos/{alunoId}/{moduloId}', [AlunoModuloEnsinoController::class, 'show']);
Route::delete('/alunos-modulos/{alunoId}/{moduloId}', [AlunoModuloEnsinoController::class, 'destroy']);


Route::post('amigos', [AmigoController::class, 'store']);
Route::get('amigos/{id1}/{id2}', [AmigoController::class, 'show']);
Route::put('amigos/{id1}/{id2}', [AmigoController::class, 'update']);
Route::delete('amigos/{id1}/{id2}', [AmigoController::class, 'destroy']);


// Rota para login (gerar token)
Route::post('/login', [AuthController::class, 'login']);

