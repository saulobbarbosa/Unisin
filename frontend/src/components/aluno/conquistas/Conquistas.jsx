import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Style from "./conquistas.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaConquistas(){
    const navigate = useNavigate();

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <div className={Style.divTitulo}>
                    <h1 className={Style.tituloTop}>Conquistas</h1>
                </div>
                <div className={Style.divConquistas}>

                </div>
            </main>
        </div>
    )
}