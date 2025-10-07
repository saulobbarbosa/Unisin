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
import AlunoConquistas from "./components/aluno/conquistas/Conquistas";
// Import Telas ADM

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
                <Route path="/aluno/conquistas" element={<AlunoConquistas />} />

                {/* Rotas ADM */}
            </Routes>
        </Routers>
    );
}