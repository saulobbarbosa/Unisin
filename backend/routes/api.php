<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResponsavelController;
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

Route::get('/responsaveis', [ResponsavelController::class, 'index']);
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


// Rota para login (gerar token)
Route::post('/login', [AuthController::class, 'login']);

