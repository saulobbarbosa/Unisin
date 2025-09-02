<?php

namespace App\Http\Controllers;

use App\Models\Amigo;
use Illuminate\Http\Request;

class AmigoController extends Controller
{
    public function index()
    {
        $amigos = Amigo::with(['aluno1', 'aluno2'])->get();
        return response()->json($amigos);
    }
}
