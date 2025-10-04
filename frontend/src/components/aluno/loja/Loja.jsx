import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Style from "./loja.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoLoja(){
    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>

            </main>
        </div>
    )
}