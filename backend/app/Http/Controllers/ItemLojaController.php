<?php

namespace App\Http\Controllers;

use App\Models\ItemLoja;
use Illuminate\Http\Request;

class ItemLojaController extends Controller
{
    public function index()
    {
        $itens = ItemLoja::all();
        return response()->json($itens);
    }
}
