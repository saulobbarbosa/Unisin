import React from "react";

// import HomeStyle from "./home.module.css";

// Import Componentes
import Header from "../../components/headers/HeaderHome";
import Carrossel from "../../components/carrossels/home-carrossel/HCarrossel";
import Cards from "../../components/carrossels/home-cards/HCards";

export default function TelaHome(){
    return(
        <div style={{backgroundColor: '#141531', height: '86.5vh'}}>
            <Header />
            <Carrossel />
            <Cards />
        </div>
    )
}