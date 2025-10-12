import React from "react";
import { useNavigate } from "react-router-dom";

import Style from "./lobby.module.css";
import Ajuste from "../../containerPadrao.module.css";

// Import Componentes
import Header from "../../../layout/headers/HeaderAluno";

export default function TelaPvpLobby(){
    const navigate = useNavigate();

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>

            </main>
        </div>
    )
}