<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. LIMPEZA DE DEPENDÊNCIAS ANTIGAS
        Schema::dropIfExists('alunos_has_conteudos');

        if (Schema::hasColumn('atividades', 'conteudo_id_conteudo')) {
            Schema::table('atividades', function (Blueprint $table) {
                $table->dropForeign(['conteudo_id_conteudo']);
                $table->dropColumn('conteudo_id_conteudo');
            });
        }

        if (Schema::hasColumn('modulos_ensino', 'nivel_ensino_id_nivel_ensino')) {
            Schema::table('modulos_ensino', function (Blueprint $table) {
                $table->dropForeign(['nivel_ensino_id_nivel_ensino']);
                $table->dropColumn('nivel_ensino_id_nivel_ensino');
            });
        }

        Schema::dropIfExists('conteudos');
        Schema::dropIfExists('niveis_ensino');


        // 2. TRANSFORMAR 'ATIVIDADES' EM 'PERGUNTAS' E ADICIONAR RELAÇÃO COM MÓDULO
        Schema::rename('atividades', 'perguntas');

        Schema::table('perguntas', function (Blueprint $table) {
            $table->renameColumn('id_atividade', 'id');
            $table->renameColumn('pergunta', 'enunciado');
            $table->dropColumn('resposta');

            $table->integer('nivel');
            $table->unsignedBigInteger('professor_id_usuario');
            
            // NOVO: Relação com Módulo de Ensino
            // Usamos 'nullable' caso existam perguntas antigas sem módulo, 
            // mas idealmente deve ser obrigatório.
            $table->unsignedBigInteger('modulo_ensino_id')->nullable(); 

            $table->foreign('professor_id_usuario')
                ->references('id_usuario')->on('professores')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            // FK para modulos_ensino
            $table->foreign('modulo_ensino_id')
                ->references('id_modulo_ensino')->on('modulos_ensino')
                ->onDelete('cascade');
        });


        // 3. ATUALIZAR TABELA ALUNOS
        Schema::table('alunos', function (Blueprint $table) {
            $table->string('avatar')->nullable();
            $table->string('borda')->default('padrao');
            $table->string('fundo')->default('padrao');
        });


        // 4. ATUALIZAR TABELA MODULOS_ENSINO
        Schema::table('modulos_ensino', function (Blueprint $table) {
            $table->integer('nivel');
        });


        // 5. CRIAR TABELA DE OPCOES
        Schema::create('opcoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pergunta_id');
            $table->string('texto_opcao', 255);
            $table->boolean('eh_correta')->default(false);

            $table->foreign('pergunta_id')
                  ->references('id')->on('perguntas')
                  ->onDelete('cascade');
            
            $table->timestamps();
        });


        // 6. CRIAR TABELA INTERMEDIÁRIA (ALUNOS <-> PERGUNTAS)
        Schema::create('alunos_has_perguntas', function (Blueprint $table) {
            $table->unsignedBigInteger('aluno_id_usuario');
            $table->unsignedBigInteger('pergunta_id');
            $table->string('status', 45)->default('pendente'); 

            $table->primary(['aluno_id_usuario', 'pergunta_id']);

            $table->foreign('aluno_id_usuario')
                ->references('id_usuario')->on('alunos')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('pergunta_id')
                ->references('id')->on('perguntas')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alunos_has_perguntas');
        Schema::dropIfExists('opcoes');

        Schema::table('alunos', function (Blueprint $table) {
            $table->dropColumn(['avatar', 'borda', 'fundo']);
        });

        Schema::table('modulos_ensino', function (Blueprint $table) {
            $table->dropColumn('nivel');
            $table->unsignedBigInteger('nivel_ensino_id_nivel_ensino')->nullable();
        });

        Schema::table('perguntas', function (Blueprint $table) {
            $table->dropForeign(['professor_id_usuario']);
            $table->dropForeign(['modulo_ensino_id']); // Drop da FK nova
            $table->dropColumn(['professor_id_usuario', 'nivel', 'modulo_ensino_id']); // Drop da coluna nova
            
            $table->string('resposta', 255)->nullable();
            $table->renameColumn('enunciado', 'pergunta');
            $table->renameColumn('id', 'id_atividade');
            $table->unsignedBigInteger('conteudo_id_conteudo')->nullable();
        });
        
        Schema::rename('perguntas', 'atividades');

        Schema::create('niveis_ensino', function (Blueprint $table) {
            $table->id('id_nivel_ensino');
            $table->string('nome', 45);
        });

        Schema::create('conteudos', function (Blueprint $table) {
            $table->id('id_conteudo');
            $table->unsignedBigInteger('id_nivel_ensino');
            $table->string('nome_conteudo', 45);
            $table->unsignedBigInteger('professor_id_usuario');
        });
    }
};