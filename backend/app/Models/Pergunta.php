<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pergunta extends Model
{
    use HasFactory;

    protected $table = 'perguntas';
    
    protected $fillable = [
        'enunciado',
        'tipo',
        'nivel',
        'professor_id_usuario',
        'modulo_ensino_id', // Novo campo
    ];

    // Relação: Pergunta pertence a um Professor
    public function professor()
    {
        return $this->belongsTo(Professor::class, 'professor_id_usuario');
    }

    // Relação: Pergunta pertence a um Módulo
    public function moduloEnsino()
    {
        return $this->belongsTo(ModuloEnsino::class, 'modulo_ensino_id', 'id_modulo_ensino');
    }

    // Relação: Pergunta tem muitas Opções
    public function opcoes()
    {
        return $this->hasMany(Opcao::class, 'pergunta_id');
    }
    
    // Relação: Alunos que responderam (Pivot)
    public function alunos()
    {
        return $this->belongsToMany(Aluno::class, 'alunos_has_perguntas', 'pergunta_id', 'aluno_id_usuario')
                    ->withPivot('status')
                    ->withTimestamps();
    }
}