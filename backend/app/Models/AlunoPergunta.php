<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlunoPergunta extends Model
{
    use HasFactory;

    protected $table = 'alunos_has_perguntas';
    public $incrementing = false;
    // Definimos chave composta no banco, mas o Eloquent lida melhor se não definirmos PK aqui ou usarmos traits especificas.
    // Para simplificar uso em controllers:
    protected $primaryKey = null; 
    
    protected $fillable = [
        'aluno_id_usuario',
        'pergunta_id',
        'status',
    ];

    public function aluno()
    {
        return $this->belongsTo(Aluno::class, 'aluno_id_usuario');
    }

    public function pergunta()
    {
        return $this->belongsTo(Pergunta::class, 'pergunta_id');
    }
}