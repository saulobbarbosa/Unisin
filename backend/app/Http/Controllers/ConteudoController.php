<?php

namespace App\Http\Controllers;

use App\Models\Conteudo;
use Illuminate\Http\Request;

class ConteudoController extends Controller
{
    public function index()
    {
        $conteudos = Conteudo::with(['nivelEnsino', 'professor'])->get();
        return response()->json($conteudos);
    }
}
