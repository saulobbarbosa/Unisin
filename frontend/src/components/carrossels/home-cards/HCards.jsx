import React from "react";

import CardsStyle from "./card.module.css";

import LogoLoop from "../../react-bits/logo-loop/LogoLoop";

// Lista com os nomes das matérias
const array = [
  {text: "Matemática", icon: "pi pi-calculator"},
  {text: "Português", icon: "pi pi-book"},
  {text: "Inglês", icon: "fas fa-comments"},
  {text: "História", icon: "fas fa-landmark"},
  {text: "Geografia", icon: "pi pi-map"},
  {text: "Química", icon: "fa-solid fa-flask"},
  {text: "Física", icon: "fas fa-atom"},
  {text: "Artes", icon: "pi pi-palette"},
  {text: "Ed. Física", icon: "fa-solid fa-volleyball"},
];

// Montando o array para o LogoLoop
const techLogos = array.map(({ text, icon }) => ({
  node: (
    <div className={CardsStyle.logoItem}>
      <i className={icon} style={{ fontSize: "8rem", color: "#fff" }}></i>
      <span>{text}</span>
    </div>
  )
}));

export default function Home_Card(){
    return(
        <div className={CardsStyle.divCards} id="materias">
            <div className={CardsStyle.divTitulo}>
                <span>Matérias Disponíveis</span>
            </div>
            
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={0}
              gap={100}
              pauseOnHover
              scaleOnHover
              ariaLabel="Partner logos"
            />
        </div>
    )
}