import React, { useState } from "react";
import HomeStyle from "./home.module.css";

// Import Componentes
import Header from "../headers/HeaderHome";
import Carrossel from "../carrossels/home-carrossel/HCarrossel";
import Cards from "../carrossels/home-cards/HCards";
import HeaderStyle from "../headers/header.module.css";
import Escola from "../login/Escola";

/* 
 <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Cadastrar</button>
<Escola mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
*/ 

export default function TelaHome(){
    const [mostrar, setMostrar] = useState(false);
    return(
        <div className={HomeStyle.container}>
            <Header />
            <Carrossel />
            <Cards />
            <div className={HomeStyle.divSobre}>
                <h1 className={HomeStyle.tituloSobre}>
                    Sobre Nós
                </h1>
                <p className={HomeStyle.paragrafoSobre}>
                    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type 
                    and scrambled it to make a type specimen book. 
                </p>
            </div>
            <div>
                <h1 className={HeaderStyle.tituloSobre}>Escola</h1></div>
            <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Cadastrar</button>
            <div>
                <Escola mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
            </div>
        </div>
    )
}