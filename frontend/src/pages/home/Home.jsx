import React from "react";

// import HomeStyle from "./home.module.css";

// Import Componentes
import Header from "../../components/headers/HeaderHome";
import Carousel from "../../components/carousels/home-carrossel/HCarousel";

export default function TelaHome(){
    return(
        <div>
            <Header />
            <Carousel />
        </div>
    )
}