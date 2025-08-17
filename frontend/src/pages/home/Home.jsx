import React from "react";

import HomeStyle from "./home.module.css";

// Import Componentes
import Header from "../../components/headers/HeaderHome";
import TextType from "../../components/react-bits/text-type/TextType";

export default function TelaHome(){
    return(
        <div>
            <Header />
            <div className={HomeStyle.carrossel}>
                <TextType 
                    text={["Melhor Rede de Ensino", "Focado em ensinar os alunos", "Venha fazer Parte!!!"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="_"
                />
            </div>
        </div>
    )
}