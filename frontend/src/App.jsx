import React from "react";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import de Componentes
import Home from "./components/home/Home";
import AlunoHome from "./components/aluno/home/AlunoHome";

export default function App() { 
    return(
        <>
            <Routers>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aluno/home" element={<AlunoHome />} />
                </Routes>
            </Routers>
        </>
    );
}