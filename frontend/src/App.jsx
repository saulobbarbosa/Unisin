import React from "react";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import de Componentes
import Home from "./components/home/Home";
import AlunoHome from "./components/aluno/home/AlunoHome";
import AlunoTrilha from "./components/aluno/trilha/Trilha";
import Atividade from "./components/aluno/atividade/Atividade";

export default function App() { 
    return(
        <Routers>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aluno/home" element={<AlunoHome />} />

                <Route path="/aluno/:materia" element={<AlunoTrilha />} />
                <Route path="/aluno/:materia/atividade/:id" element={<Atividade />} />
            </Routes>
        </Routers>
    );
}