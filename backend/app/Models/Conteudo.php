<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conteudo extends Model
{
    use HasFactory;

    protected $table = 'conteudos';
    protected $primaryKey = 'id_conteudo';
    public $timestamps = false;

    protected $fillable = [
        'id_nivel_ensino',
        'nome_conteudo',
        'professor_id_usuario',
    ];

    public function nivelEnsino()
    {
        return $this->belongsTo(NivelEnsino::class, 'id_nivel_ensino');
    }

    public function professor()
    {
        return $this->belongsTo(Professores::class, 'professor_id_usuario');
    }
}
