import React from "react";
import { useNavigate } from "react-router-dom";

import Style from "./alunoHome.module.css";
import Ajuste from "../../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoHome(){
    const navigate = useNavigate();

    const array = [
        {text: "Matemática", cor: "#1565C0"},
        {text: "Português", cor: "#E53935"},
        {text: "Inglês", cor: "#9575CD"},
        {text: "História", cor: "#8D6E63"},
        {text: "Geografia", cor: "#26A69A"},
        {text: "Química", cor: "#43A047"},
        {text: "Física", cor: "#366091"},
        {text: "Artes", cor: "#FF7043"},
        {text: "Educação-Física", cor: "#6C6C6C"},
    ];

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <h1 className={Style.tituloHome}>Área de estudo: escolha seu destino</h1>
                <div className={Style.divMenu}>
                    {array.map(({ text, cor }, index) => (
                        <div key={index} className={Style.divEscolha} style={{ color: cor }} 
                            onClick={()=>{navigate(`/aluno/${text}`)}}
                        >
                            <h2>{text}</h2>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}