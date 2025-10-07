import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Style from "./amigos.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAmigos(){
    const navigate = useNavigate();

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <h1 className={Style.tituloTop}>Amizades</h1>
                <div className={Style.divAcoes}>
                    <i className="fa-solid fa-user-plus" style={{ fontSize: "3rem", color: "#000", 
                    marginLeft: "2rem", cursor: "pointer" }}></i>
                    <div>
                        <i className="fa-solid fa-user" style={{ fontSize: "3rem", color: "#000", 
                        marginLeft: "2rem", cursor: "pointer" }}></i>
                    </div>
                </div>
                <div className={Style.divAmigos}>
                    <table>
                        <thead>
                            <td></td>
                            <td>
                                Nome
                            </td>
                            <td>
                                Por Nivel
                            </td>
                            <td>
                                Por Moeda
                            </td>
                            <td>
                                Ação
                            </td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Perfil
                                </td>
                                <td>Fuilherme Greitas</td>
                                <td>
                                    Nivel 20
                                </td>
                                <td>
                                    2000
                                </td>
                                <td>
                                    icon
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}