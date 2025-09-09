import React, { useState } from "react";
import HeaderStyle from "./header.module.css";

// Import Componentes
import Login from "../login/Login";
import Professor from "../login/Professor";


export default function CompHeaderHome(){
    const [mostrar, setMostrar] = useState(false);

    const cricano = () => {
        alert("Tá Cricando");
    }
/* 
export default function CompHeaderHome(){
    const [mostrar, setMostrar] = useState(false);

    const cricano = () => {
        alert("Tá Cricando");
    }
/* 
 <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Cadastrar</button>
<Escola mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
*/ 
    return(
        <div className={HeaderStyle.headerContainer}>
            <img src={require('../../imgs/logo.jpg')} alt="logo do unisin"
            className={HeaderStyle.logo} draggable="false" />
            {/* Parte do Menu */}
            <div className={HeaderStyle.headerMenu}>
                <h1 className={HeaderStyle.opcoes} onClick={()=>{cricano()}}>Home</h1>
                <h1 className={HeaderStyle.opcoes} onClick={()=>{cricano()}}>Matérias</h1>
                <h1 className={HeaderStyle.opcoes} onClick={()=>{cricano()}}>Sobre Nós</h1>
                <h1 className={HeaderStyle.opcoes} onClick={()=>{cricano()}}>Beneficios</h1>

                <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Logar</button>
                <button className={HeaderStyle.btnLogar} onClick={() => setMostrar(true)}>Cadastrar</button>
             
            </div>
            <Login mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
            <Professor mostra={mostrar} fecha={()=>{setMostrar(false)}}/>
          
        </div>
    );
}