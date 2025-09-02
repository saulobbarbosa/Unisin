<?php

namespace App\Http\Controllers;

use App\Models\Escola;
use Illuminate\Http\Request;

class EscolaController extends Controller
{
    // Método index: listar todas as escolas
    public function index()
    {
        $escolas = Escola::all();
        return response()->json($escolas);
    }
}
