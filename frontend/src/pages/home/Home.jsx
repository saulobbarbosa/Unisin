import React from "react";

// import HomeStyle from "./home.module.css";

// Import Componentes
import Header from "../../components/headers/HeaderHome";
import Carrossel from "../../components/carrossels/home-carrossel/HCarrossel";

export default function TelaHome(){
    return(
        <div>
            <Header />
            <Carrossel />
        </div>
    )
}