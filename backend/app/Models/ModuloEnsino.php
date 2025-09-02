<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuloEnsino extends Model
{
    use HasFactory;

    protected $table = 'modulos_ensino';
    protected $primaryKey = 'id_modulo_ensino';
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'nivel_ensino_id_nivel_ensino',
    ];

    // Relacionamento
    public function nivelEnsino()
    {
        return $this->belongsTo(NivelEnsino::class, 'nivel_ensino_id_nivel_ensino');
    }
}
