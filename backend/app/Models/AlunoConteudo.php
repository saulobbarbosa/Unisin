<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlunoConteudo extends Model
{
    use HasFactory;

    protected $table = 'alunos_has_conteudos';
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = null;

    protected $fillable = [
        'aluno_id_usuario',
        'conteudo_id_conteudo',
        'status_conteudo',
    ];

    public function aluno()
    {
        return $this->belongsTo(Aluno::class, 'aluno_id_usuario');
    }

    public function conteudo()
    {
        return $this->belongsTo(Conteudo::class, 'conteudo_id_conteudo');
    }
}
