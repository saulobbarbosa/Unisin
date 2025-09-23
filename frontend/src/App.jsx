import React from "react";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import de Componentes
import Home from "./components/home/Home";
import Padrao from "./components/home/Home";

export default function App() { 
    return(
        <>
            <Routers>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aluno/home" element={<Padrao />} />
                </Routes>
            </Routers>
        </>
    );
}