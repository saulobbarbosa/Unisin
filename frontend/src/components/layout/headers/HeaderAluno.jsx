import React, { useState } from "react";
import HeaderStyle from "./header.module.css";

// Import Componentes

export default function CompHeaderAluno(){
    const [nivel, setNivel] = useState(20);
    const [moeda, setMoeda] = useState(2500);

    return(
        <div className={HeaderStyle.headerContainer}>
            <img src={require('../../../imgs/logo.png')} alt="logo do unisin"
            className={HeaderStyle.logo} draggable="false" />
            {/* Parte das Info */}
            <div className={HeaderStyle.headerMenu}>
                <div className={HeaderStyle.divNMP}>
                    <p>Nível</p>
                    <p>{nivel}</p>
                </div>
                <div className={HeaderStyle.divNMP}>
                    <img src={require('../../../imgs/moeda.png')} alt="icone de moeda"
                    className={HeaderStyle.imgMoeda} draggable="false" />
                    <p>{moeda}</p>
                </div>
                <div className={HeaderStyle.divPerfil + " " + HeaderStyle.divNMP}>
                    <i className="fa-solid fa-user" style={{ fontSize: "2.5rem", color: "#000" }}></i>
                </div>
            </div>
            {/* Parte do Modal */}
            
        </div>
    );
}