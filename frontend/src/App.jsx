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
                <Route path="/aluno/matematica" element={<AlunoTrilha nomeMateria="Matemática" />} />
                <Route path="/aluno/portugues" element={<AlunoTrilha nomeMateria="Português" />} />
                <Route path="/aluno/ingles" element={<AlunoTrilha nomeMateria="Inglês" />} />
                <Route path="/aluno/historia" element={<AlunoTrilha nomeMateria="História" />} />
                <Route path="/aluno/geografia" element={<AlunoTrilha nomeMateria="Geografia" />} />
                <Route path="/aluno/quimica" element={<AlunoTrilha nomeMateria="Química" />} />
                <Route path="/aluno/fisica" element={<AlunoTrilha nomeMateria="Física" />} />
                <Route path="/aluno/artes" element={<AlunoTrilha nomeMateria="Artes" />} />
                <Route path="/aluno/ed-fisica" element={<AlunoTrilha nomeMateria="Ed. Física" />} />
            </Routes>
        </Routers>
    );
}