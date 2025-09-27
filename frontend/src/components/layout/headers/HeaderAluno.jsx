import React, { useState } from "react";
import HeaderStyle from "./header.module.css";

// Import Componentes

export default function CompHeaderAluno(){
    return(
        <div className={HeaderStyle.headerContainer}>
            <img src={require('../../../imgs/logo.png')} alt="logo do unisin"
            className={HeaderStyle.logo} draggable="false" />
            {/* Parte do Menu */}
            <div className={HeaderStyle.headerMenu}>
                <h1 className={HeaderStyle.opcoes}><a href="#home">Home</a></h1>
                <h1 className={HeaderStyle.opcoes}><a href="#materias">Matérias</a></h1>
                <h1 className={HeaderStyle.opcoes}><a href="#sobre">Sobre Nós</a></h1>
                <h1 className={HeaderStyle.opcoes}><a href="#beneficios">Beneficios</a></h1>
                <h1 className={HeaderStyle.opcoes}><a href="#escola">Escola</a></h1>
            </div>
        </div>
    );
}