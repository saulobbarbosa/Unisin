import React from "react";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import de Componentes
import Home from "./components/home/Home";
import AlunoHome from "./components/aluno/home/AlunoHome";
import AlunoTrilha from "./components/aluno/trilha/Trilha";

export default function App() { 
    return(
        <Routers>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aluno/home" element={<AlunoHome />} />

                {/* Todas as Matérias que vão para Trilha  */}
                <Route path="/aluno/matematica" element={<AlunoTrilha teste="matematica" />} />
                <Route path="/aluno/portugues" element={<AlunoTrilha teste="portugues" />} />
                <Route path="/aluno/ingles" element={<AlunoTrilha teste="ingles" />} />
                <Route path="/aluno/historia" element={<AlunoTrilha teste="historia" />} />
                <Route path="/aluno/geografia" element={<AlunoTrilha teste="geografia" />} />
                <Route path="/aluno/quimica" element={<AlunoTrilha teste="quimica" />} />
                <Route path="/aluno/fisica" element={<AlunoTrilha teste="fisica" />} />
                <Route path="/aluno/artes" element={<AlunoTrilha teste="artes" />} />
                <Route path="/aluno/ed-fisica" element={<AlunoTrilha teste="ed-fisica" />} />
            </Routes>
        </Routers>
    );
}