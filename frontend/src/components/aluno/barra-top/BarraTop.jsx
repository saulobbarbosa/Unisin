import React from "react";
import { useNavigate } from "react-router-dom";

import Style from "./barraTop.module.css";

export default function CompBarraTop({ nomeMateria, level }){
    const navigate = useNavigate();

    return(
        <div className={Style.divBarraTop}>
            <i className="fa-solid fa-left-long"
                style={{ fontSize: "3rem", color: "#fff", cursor: "pointer", padding: "2rem 1rem" }}
                onClick={()=>{navigate(-1)}}
            ></i>
            <h1 className={Style.nome} onClick={()=>{navigate(-1)}}>{ nomeMateria }</h1>
            <h1 className={Style.lv}>Level { level }</h1>
        </div>
    )
}