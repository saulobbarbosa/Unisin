import React from "react";

import Style from "./trilha.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoTrilha({ teste }){
    return(
        <div>
            <Header />
            <div className={Ajuste.container}>
                <h1>teste {teste}</h1>
            </div>
        </div>
    )
}