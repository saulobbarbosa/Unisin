import React from "react";

import Style from "./alunoHome.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoHome(){

    const array = [
        {text: "Matemática", cor: "#1565C0"},
        {text: "Português", cor: "#E53935"},
        {text: "Inglês", cor: "#9575CD"},
        {text: "História", cor: "#8D6E63"},
        {text: "Geografia", cor: "#26A69A"},
        {text: "Química", cor: "#43A047"},
        {text: "Física", cor: "#366091"},
        {text: "Artes", cor: "#FF7043"},
        {text: "Educação Física", cor: "#6C6C6C"},
    ];

    return(
        <div>
            <Header />
            <div className={Style.containerHome}>
                <h1 className={Style.tituloHome}>O que Vamos Estudar?</h1>
                <div className={Style.divMenu}>
                    {array.map(({ text, cor }) => (
                        <div className={Style.divEscolha} style={{ color: cor }}>
                            <h2>{text}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}