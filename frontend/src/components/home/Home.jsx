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
        </div>
    )
}