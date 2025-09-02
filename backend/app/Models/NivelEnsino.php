<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NivelEnsino extends Model
{
    use HasFactory;

    protected $table = 'niveis_ensino';
    protected $primaryKey = 'id_nivel_ensino';
    public $timestamps = false;

    protected $fillable = [
        'nome',
    ];
}
