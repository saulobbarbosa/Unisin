<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;

    protected $table = 'alunos';
    protected $primaryKey = 'id_usuario';
    public $incrementing = false; // PK continua sendo o mesmo ID do usuário
    protected $keyType = 'int';

    protected $fillable = [
        'id_usuario',
        'moedas',
    ];

    // Relacionamento com usuário
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}

