import React, { useState, useEffect } from "react";

import CarrosselStyle from "./carrossel.module.css";

// Import de Componentes
import TextType from "../../react-bits/text-type/TextType";

// Import Imagens
import img1 from "../../../imgs/carrossel-imgs/img1.webp";
import img2 from "../../../imgs/carrossel-imgs/img2.webp";
import img3 from "../../../imgs/carrossel-imgs/img3.webp";

const images = [
    { src: img1, text: "Melhor Rede de Ensino" },
    { src: img2, text: "Educação de Qualidade" },
    { src: img3, text: "Apoio ao Aluno" },
];

export default function Home_Carrossel(){
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [current]);
    
    return(
        <div className={CarrosselStyle.carouselContainer}>
            {images.map((item, index) => (
                <div key={index}>
                    {index === current && (
                        <>
                            <img src={item.src} alt="slide" className={CarrosselStyle.image} draggable="false"/>
                            <div className={CarrosselStyle.divText}>
                                <h2 className={CarrosselStyle.text}>
                                    <TextType
                                    text={item.text}
                                    typingSpeed={75}
                                    pauseDuration={1500}
                                    showCursor={true}
                                    cursorCharacter="_"
                                    />
                                </h2>
                            </div>
                        </>
                    )}
                </div>
            ))}
            
            <div className={CarrosselStyle.divArrows}>
                <button className={CarrosselStyle.arrow} onClick={prevSlide}>
                    <i className="pi pi-chevron-left" style={{ fontSize: '2rem', color: '#000' }}></i>
                </button>
                <button className={CarrosselStyle.arrow} onClick={nextSlide}>
                    <i className="pi pi-chevron-right" style={{ fontSize: '2rem', color: '#000' }}></i>
                </button>
            </div>

            <div className={CarrosselStyle.divDot}>
                {images.map((_, index) => (
                    <span
                    key={index}
                    className={`${CarrosselStyle.dot} ${index === current ? CarrosselStyle.active : ""}`}
                    onClick={() => setCurrent(index)}
                    ></span>
                ))}
            </div>
        </div>
    )
}