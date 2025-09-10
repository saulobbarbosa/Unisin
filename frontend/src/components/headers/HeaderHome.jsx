import React, { useState } from "react";
import HeaderStyle from "./header.module.css";

// Import Componentes
import Login from "../login/Login";
import Professor from "../login/Professor";

export default function CompHeaderHome(){
    const [mostrar, setMostrar] = useState(false);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
        <div className={HeaderStyle.headerContainer}>
            <img src={require('../../imgs/logo.jpg')} alt="logo do unisin"
            className={HeaderStyle.logo} draggable="false" />
            {/* Parte do Menu */}
            <div className={HeaderStyle.headerMenu}>
                <h1 className={HeaderStyle.opcoes} onClick={()=> scrollToSection("home")}>Home</h1>
                <h1 className={HeaderStyle.opcoes} onClick={()=> scrollToSection("materias")}>Matérias</h1>
                <h1 className={HeaderStyle.opcoes} onClick={()=> scrollToSection("sobre")}>Sobre Nós</h1>
                <h1 className={HeaderStyle.opcoes} onClick={()=> scrollToSection("beneficios")}>Beneficios</h1>

                <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Logar</button>
                <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Cadastrar</button>
             
            </div>
            <Login mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
            <Professor mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
          
        </div>
    );
}