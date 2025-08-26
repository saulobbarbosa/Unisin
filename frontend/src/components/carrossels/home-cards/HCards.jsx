import React from "react";

import CardsStyle from "./card.module.css";

import CircularGallery from '../../react-bits/circular-gallery/CircularGallery';

// Import Imagens
import img1 from "../../../imgs/carrossel-imgs/img1.webp";
import img2 from "../../../imgs/carrossel-imgs/img2.webp";
import img3 from "../../../imgs/carrossel-imgs/img3.webp";

const images = [
    { image: img1, text: "Matemática" },
    { image: img2, text: "Português" },
    { image: img3, text: "Ciências" },
    { image: img1, text: "História" },
    { image: img2, text: "Educação Física" },
    { image: img3, text: "Informática" },
];

export default function Home_Card(){
    return(
        <div style={{ height: '600px', position: 'relative', overflowX: 'none'}}>
            <CircularGallery items={images} bend={0} textColor="#ffffff" borderRadius={0.0}
            scrollSpeed={2.5} scrollEase={0.2}/>
        </div>
    )
}