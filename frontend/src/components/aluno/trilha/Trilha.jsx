import React, { useState } from "react";

import Style from "./trilha.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";
import Barra from "../barra-top/BarraTop";

const etapas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function TelaAlunoTrilha({ nomeMateria }){
    const [level, setLevel] = useState("4");
    
    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <Barra nomeMateria={nomeMateria} level={level}/>
                
            </main>
        </div>
    )
}