<?php

namespace App\Http\Controllers;

use App\Models\Pergunta;
use App\Models\Opcao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerguntaController extends Controller
{
    /**
     * Retorna a lista padrão para ADMIN (com todos os detalhes e relações)
     */
    public function index()
    {
        // Agora trazemos também o relacionamento 'moduloEnsino'
        return response()->json(Pergunta::with(['opcoes', 'moduloEnsino'])->get());
    }

    /**
     * Retorna o formato simplificado ESPECÍFICO para o Jogo (Quiz)
     * Rota: /api/quiz/{id_modulo}/{nivel}
     * Formato: { id, pergunta, respostas[], correta, modulo_id }
     */
    public function quiz($id_modulo, $nivel)
    {
        // Busca perguntas filtrando pelos parâmetros da rota
        $perguntas = Pergunta::with('opcoes')
            ->where('modulo_ensino_id', $id_modulo)
            ->where('nivel', $nivel)
            ->get();

        // Formata para o padrão simplificado do jogo
        $formatadas = $perguntas->map(function ($p) {
            // Encontra a opção correta
            $opcaoCorreta = $p->opcoes->where('eh_correta', true)->first();

            return [
                'id' => $p->id,
                'pergunta' => $p->enunciado,
                // Pluck pega apenas o texto das opções e transforma num array simples
                'respostas' => $p->opcoes->pluck('texto_opcao')->values()->toArray(),
                // Retorna o texto da correta ou null se não tiver
                'correta' => $opcaoCorreta ? $opcaoCorreta->texto_opcao : null,
                'modulo_id' => $p->modulo_ensino_id
            ];
        });

        return response()->json($formatadas);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enunciado' => 'required|string',
            'tipo' => 'required|string', // EX: MULTIPLA_ESCOLHA
            'nivel' => 'required|integer',
            'professor_id_usuario' => 'required|integer|exists:professores,id_usuario',
            'modulo_ensino_id' => 'required|integer|exists:modulos_ensino,id_modulo_ensino',
            // Validar array de opções
            'opcoes' => 'array|min:1', 
            'opcoes.*.texto_opcao' => 'required|string',
            'opcoes.*.eh_correta' => 'boolean',
        ]);

        // Usar Transaction para garantir que cria pergunta + opções ou nada
        $pergunta = DB::transaction(function () use ($validated) {
            $pergunta = Pergunta::create([
                'enunciado' => $validated['enunciado'],
                'tipo' => $validated['tipo'],
                'nivel' => $validated['nivel'],
                'professor_id_usuario' => $validated['professor_id_usuario'],
                'modulo_ensino_id' => $validated['modulo_ensino_id'],
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

        return response()->json($pergunta->load(['opcoes', 'moduloEnsino']), 201);
    }

    public function show($id)
    {
        $pergunta = Pergunta::with(['opcoes', 'moduloEnsino'])->findOrFail($id);
        return response()->json($pergunta);
    }

    public function update(Request $request, $id)
    {
        $pergunta = Pergunta::findOrFail($id);

        $validated = $request->validate([
            'enunciado' => 'sometimes|string',
            'tipo' => 'sometimes|string',
            'nivel' => 'sometimes|integer',
            'modulo_ensino_id' => 'sometimes|integer|exists:modulos_ensino,id_modulo_ensino',
        ]);

        $pergunta->update($validated);

        return response()->json($pergunta->load(['opcoes', 'moduloEnsino']));
    }

    public function destroy($id)
    {
        $pergunta = Pergunta::findOrFail($id);
        $pergunta->delete(); 
        return response()->json(null, 204);
    }
}