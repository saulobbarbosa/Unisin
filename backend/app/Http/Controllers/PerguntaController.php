<?php

namespace App\Http\Controllers;

use App\Models\Pergunta;
use App\Models\Opcao;
use App\Models\ModuloNivelPergunta;
use App\Models\Nivel;
use App\Models\AlunoPergunta; // Importante para buscar o status
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerguntaController extends Controller
{
    /**
     * Retorna todas as perguntas (ADMIN)
     */
    public function index()
    {
        return response()->json(Pergunta::with(['opcoes', 'contexto.modulo', 'contexto.nivel'])->get());
    }

    /**
     * QUIZ: Retorna perguntas filtradas por Modulo, Numero do Nivel e STATUS do Aluno
     * Rota: /api/quiz/{id_modulo}/{numero_nivel}/{id_aluno}
     */
    public function quiz($id_modulo, $numero_nivel, $id_aluno)
    {
        // 1. Descobrir o ID do nível baseado no número
        $nivelModel = Nivel::where('nivel', $numero_nivel)->first();

        if (!$nivelModel) {
            return response()->json([]);
        }

        // 2. Busca na tabela DE RELACIONAMENTO (ModuloNivelPergunta)
        $relacoes = ModuloNivelPergunta::where('modulo_ensino_id', $id_modulo)
                                       ->where('nivel_id', $nivelModel->id)
                                       ->with(['pergunta.opcoes'])
                                       ->get();

        if ($relacoes->isEmpty()) {
            return response()->json([]);
        }

        // 3. Buscar o status das perguntas para ESTE aluno
        // Pegamos todos os IDs de pergunta encontrados
        $perguntasIds = $relacoes->pluck('pergunta_id');

        // Buscamos no banco apenas os status dessas perguntas para esse aluno
        $statusMap = AlunoPergunta::where('aluno_id_usuario', $id_aluno)
                                  ->whereIn('pergunta_id', $perguntasIds)
                                  ->pluck('status', 'pergunta_id'); 
                                  // Retorna array tipo: [id_pergunta => 'correto', id_pergunta => 'incorreto']

        // 4. Formata a saída mesclando com o status
        $formatadas = $relacoes->map(function ($relacao) use ($numero_nivel, $statusMap) {
            $p = $relacao->pergunta;
            
            if (!$p) return null;

            $opcaoCorreta = $p->opcoes->where('eh_correta', true)->first();

            // Pega o status do map ou define como 'pendente' se não existir
            $statusAluno = $statusMap[$p->id] ?? 'pendente';

            return [
                'id' => $p->id,
                'pergunta' => $p->enunciado,
                'respostas' => $p->opcoes->pluck('texto_opcao')->values()->toArray(),
                'correta' => $opcaoCorreta ? $opcaoCorreta->texto_opcao : null,
                'modulo_id' => $relacao->modulo_ensino_id,
                'nivel' => $numero_nivel,
                'status' => $statusAluno // Campo novo solicitado
            ];
        })->filter();

        return response()->json($formatadas->values());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enunciado' => 'required|string',
            'tipo' => 'required|string',
            'professor_id_usuario' => 'required|integer|exists:professores,id_usuario',
            
            // IDs para a tabela de relacionamento
            'modulo_ensino_id' => 'required|integer|exists:modulos_ensino,id_modulo_ensino',
            'nivel_id' => 'required|integer|exists:niveis,id',
            
            'opcoes' => 'array|min:1', 
            'opcoes.*.texto_opcao' => 'required|string',
            'opcoes.*.eh_correta' => 'boolean',
        ]);

        $pergunta = DB::transaction(function () use ($validated) {
            $pergunta = Pergunta::create([
                'enunciado' => $validated['enunciado'],
                'tipo' => $validated['tipo'],
                'professor_id_usuario' => $validated['professor_id_usuario'],
            ]);

            ModuloNivelPergunta::create([
                'modulo_ensino_id' => $validated['modulo_ensino_id'],
                'nivel_id' => $validated['nivel_id'],
                'pergunta_id' => $pergunta->id
            ]);

            if (isset($validated['opcoes'])) {
                foreach ($validated['opcoes'] as $opcaoData) {
                    Opcao::create([
                        'pergunta_id' => $pergunta->id,
                        'texto_opcao' => $opcaoData['texto_opcao'],
                        'eh_correta' => $opcaoData['eh_correta'] ?? false,
                    ]);
                }
            }
            return $pergunta;
        });

        return response()->json($pergunta->load(['opcoes', 'contexto']), 201);
    }

    public function show($id)
    {
        $pergunta = Pergunta::with(['opcoes', 'contexto'])->findOrFail($id);
        return response()->json($pergunta);
    }

    public function update(Request $request, $id)
    {
        $pergunta = Pergunta::findOrFail($id);

        $validated = $request->validate([
            'enunciado' => 'sometimes|string',
            'tipo' => 'sometimes|string',
            'modulo_ensino_id' => 'sometimes|integer|exists:modulos_ensino,id_modulo_ensino',
            'nivel_id' => 'sometimes|integer|exists:niveis,id',
        ]);

        $pergunta->update($request->only(['enunciado', 'tipo']));

        if ($request->has('modulo_ensino_id') || $request->has('nivel_id')) {
            $contexto = ModuloNivelPergunta::where('pergunta_id', $pergunta->id)->first();
            
            if ($contexto) {
                $contexto->update($request->only(['modulo_ensino_id', 'nivel_id']));
            } else {
                 if ($request->has('modulo_ensino_id') && $request->has('nivel_id')) {
                    ModuloNivelPergunta::create([
                        'modulo_ensino_id' => $request->modulo_ensino_id,
                        'nivel_id' => $request->nivel_id,
                        'pergunta_id' => $pergunta->id
                    ]);
                 }
            }
        }

        return response()->json($pergunta->load(['opcoes', 'contexto']));
    }

    public function destroy($id)
    {
        $pergunta = Pergunta::findOrFail($id);
        $pergunta->delete(); 
        return response()->json(null, 204);
    }
}