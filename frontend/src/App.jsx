import React from "react";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import
import Home from "./components/home/Home";
// Import Telas Aluno
import AlunoHome from "./components/aluno/home/AlunoHome";
import AlunoTrilha from "./components/aluno/trilha/Trilha";
import Atividade from "./components/aluno/atividade/Atividade";
import AlunoPerfil from "./components/aluno/perfil/PerfilAluno";
import AlunoLoja from "./components/aluno/loja/Loja";
import AlunoAmigos from "./components/aluno/amigos/Amigos";
import AlunoRanking from "./components/aluno/ranking/Ranking";
import AlunoConquistas from "./components/aluno/conquistas/Conquistas";
// Import Telas ADM
import EscolaHome from "./components/adm/escola/EscolaHome";
// Import Telas ADM Atividade cadastro
import AtividadesCriadas from "./components/Atividades/AtividadesCriadas";



// Import Telas ADM Professor
import ProfHome from "./components/adm/professor/home/ProfHome";
import ListaProfessores from "./components/Professores/ListaProfessores";

export default function App() { 
    return(
        <Routers>
            <Routes>
                {/* Rotas Padrões */}
                <Route path="/" element={<Home />} />

                {/* Rotas Aluno */}
                <Route path="/aluno/home" element={<AlunoHome />} />
                <Route path="/aluno/:materia" element={<AlunoTrilha />} />
                <Route path="/aluno/:materia/atividade/:id" element={<Atividade />} />
                <Route path="/aluno/perfil" element={<AlunoPerfil />} />
                <Route path="/aluno/loja" element={<AlunoLoja />} />
                <Route path="/aluno/amigos" element={<AlunoAmigos />} />
                <Route path="/aluno/ranking" element={<AlunoRanking />} />
                <Route path="/aluno/conquistas" element={<AlunoConquistas />} />

                <Route path="/atividade" element={<AtividadesCriadas />} />



                {/* Rotas ADM */}
                <Route path="/escola/home " element={<EscolaHome />} />
                <Route path="/professor/home " element={<ProfHome />} />
                <Route path="/professores" element={<ListaProfessores />} />
            </Routes>
        </Routers>
    );
}