<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atividade extends Model
{
    use HasFactory;

    protected $table = 'atividades';
    protected $primaryKey = 'id_atividade';
    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'pergunta',
        'resposta',
        'conteudo_id_conteudo',
    ];

    public function conteudo()
    {
        return $this->belongsTo(Conteudo::class, 'conteudo_id_conteudo');
    }
}
