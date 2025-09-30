import React from "react";
import { useNavigate } from "react-router-dom";

import Style from "./alunoHome.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoHome(){
    const navigate = useNavigate("");

    const array = [
        {text: "Matemática", cor: "#1565C0", url: "matematica"},
        {text: "Português", cor: "#E53935", url: "portugues"},
        {text: "Inglês", cor: "#9575CD", url: "ingles"},
        {text: "História", cor: "#8D6E63", url: "historia"},
        {text: "Geografia", cor: "#26A69A", url: "geografia"},
        {text: "Química", cor: "#43A047", url: "quimica"},
        {text: "Física", cor: "#366091", url: "fisica"},
        {text: "Artes", cor: "#FF7043", url: "artes"},
        {text: "Educação Física", cor: "#6C6C6C", url: "ed-fisica"},
    ];

    return(
        <div>
            <Header />
            <div className={Ajuste.container}>
                <h1 className={Style.tituloHome}>O que Vamos Estudar?</h1>
                <div className={Style.divMenu}>
                    {array.map(({ text, cor, url }) => (
                        <div className={Style.divEscolha} style={{ color: cor }} 
                            onClick={()=>{navigate(`/aluno/${url}`)}}
                        >
                            <h2>{text}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}