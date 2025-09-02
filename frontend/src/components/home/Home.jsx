import React from "react";

import HomeStyle from "./home.module.css";

// Import Componentes
import Header from "../headers/HeaderHome";
import Carrossel from "../carrossels/home-carrossel/HCarrossel";
import Cards from "../carrossels/home-cards/HCards";

export default function TelaHome(){
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
                
            </div>
        </div>
    )
}