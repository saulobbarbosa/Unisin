import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Style from "./perfil.module.css";
import Ajuste from "../../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoPerfil() {
    // const navigate = useNavigate();
    const [usuario, setUsuario] = useState({});
    const { alunoId } = useParams();
    const [materias, setMaterias] = useState([
        { text: "Matemática", cor: "#1565C0", progresso: 10, total: 25 },
        { text: "Português", cor: "#E53935", progresso: 15, total: 30 },
        { text: "Inglês", cor: "#9575CD", progresso: 8, total: 20 },
        { text: "História", cor: "#8D6E63", progresso: 12, total: 25 },
        { text: "Geografia", cor: "#26A69A", progresso: 5, total: 25 },
        { text: "Química", cor: "#43A047", progresso: 7, total: 25 },
        { text: "Física", cor: "#366091", progresso: 9, total: 25 },
        { text: "Artes", cor: "#FF7043", progresso: 6, total: 20 },
        { text: "Educação-Física", cor: "#6C6C6C", progresso: 4, total: 15 },
    ]);

    useEffect(() => {
        if (!alunoId) return;

        axios.get(`http://localhost:8000/api/alunos/${alunoId}/dados`)
        .then(res => {
            setUsuario(res.data);
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}
                style={{ background: usuario.fundo }}
            >
                <div className={Style.container}>
                    <div className={Style.divGeral}>
                        <div className={Style.divFotoNome}>
                            <img src={usuario.avatar || "/imgs/perfil/boy_black.webp"}
                                className={Style.imgPerfil}
                                alt="Imagem de Perfil" draggable="false"
                                style={{
                                    border: `0.8rem solid ${usuario.borda}`,
                                    boxShadow: `0 0 10px ${usuario.borda}`,
                                }} />
                            <h1 className={Style.nomeAluno}>{usuario.nome}</h1>
                        </div>
                        <div className={Style.divNivelEditar}>
                            <h1 className={Style.divNivel}>
                                Nível
                                <span className={Style.nivel}>
                                    {usuario.nivel}
                                </span>
                            </h1>
                            <div className={Style.divInsigna}>
                                <div className={Style.insigna}>
                                    <img src={require('../../../imgs/insigna.png')} draggable="false"
                                        alt="é só um teste" />
                                    <p>Warlord</p>
                                </div>
                            </div>
                            <button className={Style.editar}
                                onClick={() => { alert("Calma que ainda não tem isso!!!") }}
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                    <hr className={Style.divisao} />
                    {/* Segunda Parte do Perfil */}
                    <div className={Style.divDashboard}>
                        <div>
                            {materias.map((materia, index) => (
                                <div key={index}>
                                    <div className={Style.divMateria}>
                                        <div style={{ backgroundColor: "#fff", width: "15rem", height: "8rem" }}></div>
                                        <h1>{materia.text}</h1>
                                    </div>
                                    <div className={Style.divProgresso}>
                                        <p><b>Progresso na matéria:</b> {materia.progresso} de {materia.total}</p>
                                        <div className={Style.barraProgresso}>
                                            <div className={Style.barraCheia}
                                                style={{
                                                    width: `${(materia.progresso / materia.total) * 100}%`,
                                                    backgroundColor: materia.cor
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={Style.divConquistasRecentes}>
                            <h1>Conquistas<br />Recentes</h1>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}