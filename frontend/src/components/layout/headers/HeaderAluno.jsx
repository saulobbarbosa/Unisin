import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import HeaderStyle from "./header.module.css";

// Import Componentes

export default function CompHeaderAluno(){
    const navigate = useNavigate("");
    const [mostrar, setMostrar] = useState(false);
    const [nivel, setNivel] = useState("");
    const [moeda, setMoeda] = useState("");

    const alertSair = () =>{
        Swal.fire({
            title: "Quer Realmente Sair?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim, Quero Sair!",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#295384"
        }).then((result) => {
            if (result.isConfirmed) {
                sair();
            }
        });
    }

    const sair = async () => {
        try {
            localStorage.removeItem("usuarioId");
            navigate('/');
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    };

    useEffect(() => {
        const usuarioId = localStorage.getItem("usuarioId");

        if (usuarioId) {
            axios.get("/usuarios.json")
            .then(res => {
                const usuarios = res.data;
                const usuario = usuarios.find(u => u.id === parseInt(usuarioId));
                if (usuario) {
                    setNivel(usuario.nivel);
                    setMoeda(usuario.moedas);
                }
            })
            .catch(error => console.error(error));
        }
    }, []);

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
                    <h1 className={HeaderStyle.textEscolhas} onClick={alertSair}>Sair</h1>
                </div>
            </div>
        </div>
    );
}