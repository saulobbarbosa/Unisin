import React, { useState } from "react";
import HeaderStyle from "./header.module.css";

// Import Componentes

export default function CompHeaderAluno(){
    const [mostrar, setMostrar] = useState(false);
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
                <div className={HeaderStyle.divPerfil + " " + HeaderStyle.divNMP}
                    onClick={() => { setMostrar(!mostrar) }}
                >
                    <i className="fa-solid fa-user" style={{ fontSize: "2.5rem", color: "#000" }}></i>
                </div>
            </div>
            {/* Parte do Modal */}
            <div className={`${HeaderStyle.divModalNavegacao} ${mostrar ? HeaderStyle.show : HeaderStyle.hide}`}>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-house" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Home</h1>
                </div>
                <hr className={HeaderStyle.linhaModal}/>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-people-group" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Amigos</h1>
                </div>
                <hr className={HeaderStyle.linhaModal}/>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-store" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Loja</h1>
                </div>
                <hr className={HeaderStyle.linhaModal}/>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-medal" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Conquistas</h1>
                </div>
                <hr className={HeaderStyle.linhaModal}/>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-ranking-star" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Ranking</h1>
                </div>
                <hr className={HeaderStyle.linhaModal}/>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-user" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Perfil</h1>
                </div>
                <hr className={HeaderStyle.linhaModal}/>
                <div className={HeaderStyle.divEscolhas}>
                    <i className="fa-solid fa-right-from-bracket" style={{ fontSize: "2.5rem", color: "#000", 
                    marginLeft: "2rem" }}></i>
                    <h1 className={HeaderStyle.textEscolhas}>Sair</h1>
                </div>
            </div>
        </div>
    );
}