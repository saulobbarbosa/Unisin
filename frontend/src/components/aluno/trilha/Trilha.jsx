import React, { useState } from "react";

import Style from "./trilha.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";
import Barra from "../barra-top/BarraTop";

const etapas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const classes = [
    "primeiro", "segundo", "terceiro",
    "quarto", "quinto", "sexto",
]

export default function TelaAlunoTrilha({ nomeMateria }){
    const [level, setLevel] = useState("4");
    
    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <Barra nomeMateria={nomeMateria} level={level}/>
                
                <div className={Style.divConquista}>
                    <h2 className={Style.tituloConquista}>Conquistas</h2>
                </div>

                <div className={Style.trilha}>
                    {etapas.map((etapa, index) => {
                        const classeExtra = classes[index % classes.length];
                        const deslocamento = Math.sin(index * 0.7) * 6; // amplitude horizontal
                        return (
                        <div
                            key={etapa}
                            className={`${Style.etapa} ${Style[classeExtra]}`}
                            style={{ marginLeft: `${deslocamento}rem`, marginTop: "1rem" }}
                        >
                            {etapa}
                        </div>
                        );
                    })}
                </div>
            </main>
        </div>
    )
}