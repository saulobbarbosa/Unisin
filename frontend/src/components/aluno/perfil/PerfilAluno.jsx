import React, { useState, useEffect, use } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Style from "./perfil.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoPerfil(){
    // const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [nivel, setNivel] = useState("");
    const [avatar, setAvatar] = useState("");
    const [borda, setBorda] = useState("");
    const [fundo, setFundo] = useState("");

    useEffect(() => {
        const usuarioId = localStorage.getItem("usuarioId");

        if (usuarioId) {
            axios.get("/usuarios.json")
            .then(res => {
                const usuarios = res.data;
                const usuario = usuarios.find(u => u.id === parseInt(usuarioId));
                if (usuario) {
                    setNome(usuario.nome);
                    setNivel(usuario.nivel);
                    setAvatar(usuario.avatar);
                    setBorda(usuario.borda);
                    setFundo(usuario.fundo);
                }
            })
            .catch(error => console.error(error));
        }
    }, []);

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}
                style={{ background: fundo }}
            >
                <div className={Style.container}>
                    <div className={Style.divGeral}>
                        <div className={Style.divFotoNome}>
                            <img src={avatar} className={Style.imgPerfil}
                            alt="Imagem de Perfil" draggable="false"
                            style={{
                                border: `0.8rem solid ${borda}`,
                                boxShadow: `0 0 10px ${borda}`,
                            }} />
                            <h1 className={Style.nomeAluno}>{nome}</h1>
                        </div>
                        <div className={Style.divNivelEditar}>
                            <h1>
                                Nível 
                                <span className={Style.nivel}>
                                    {nivel}
                                </span>
                            </h1>
                            <div className={Style.divInsigna}>
                                <div className={Style.insigna}>
                                    <img src={require('../../../imgs/insigna.png')} draggable="false" 
                                    alt="é só um teste"/>
                                    <p>Warlord</p>
                                </div>
                            </div>
                            <button className={Style.editar}
                                onClick={()=>{alert("Calma que ainda não tem isso!!!")}}
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                    <hr className={Style.divisao} />
                    <div className={Style.divDashboard}>
                        <div>
                            <div>
                                <div>
                                
                                </div>
                                <h1>Matématica</h1>
                            </div>
                            <div>
                                <p>Progresso na matéria {`10`} de {`25`}</p>
                                <div></div>
                                <div>
                                    <div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>Conquistas Recentes</h1>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}