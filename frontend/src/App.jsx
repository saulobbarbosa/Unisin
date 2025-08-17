import React from "react";
import {BrowserRouter as Routers, Routes, Route} from "react-router-dom"

// Import de Componentes
import Home from "./pages/home/Home";

export default function App() { 
    return(
        <>
            <Routers>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Routers>
        </>
    );
}