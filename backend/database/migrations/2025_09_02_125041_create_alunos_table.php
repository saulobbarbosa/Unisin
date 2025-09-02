<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alunos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario')->primary();
            $table->unsignedBigInteger('responsavel_id_usuario');
            $table->integer('moedas')->default(0);

            // Foreign keys
            $table->foreign('id_usuario')
                ->references('id_usuario')->on('usuarios')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('responsavel_id_usuario')
                ->references('id_usuario')->on('responsaveis')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};
