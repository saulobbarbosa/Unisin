<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;

    protected $table = 'alunos';
    protected $primaryKey = 'id_usuario';
    public $incrementing = false; // porque a PK não é auto_increment
    protected $keyType = 'int';

    protected $fillable = [
        'id_usuario',
        'responsavel_id_usuario',
        'moedas',
    ];

    // Relacionamentos (opcional)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function responsavel()
    {
        return $this->belongsTo(Responsavel::class, 'responsavel_id_usuario');
    }
}
