<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rota para listar todos os usuários
Route::get('/usuarios', [UsuarioController::class, 'index'])->middleware('auth:sanctum');

// Rota para login (gerar token)
Route::post('/login', [AuthController::class, 'login']);