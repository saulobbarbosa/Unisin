<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Responsavel extends Model
{
    //

    use HasFactory;

    protected $table = 'responsaveis';
    protected $primaryKey = 'id_usuario';
    public $incrementing = false;
    protected $fillable = ['id_usuario'];
    public $timestamps = false;
}
