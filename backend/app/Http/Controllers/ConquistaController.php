<?php

namespace App\Http\Controllers;

use App\Models\Conquista;
use Illuminate\Http\Request;

class ConquistaController extends Controller
{
    public function index()
    {
        $conquistas = Conquista::all();
        return response()->json($conquistas);
    }
}
