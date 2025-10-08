import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Style from "./amigos.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAmigos(){
    const navigate = useNavigate();
    const [amigos, setAmigos] = useState([]);
    const [ordem, setOrdem] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        axios.get("/usuarios.json")
        .then(res => setAmigos(res.data))
        .catch(err => console.error(err));
    }, []);

    const ordenar = (key) => {
        let direction = 'asc';
        if (ordem.key === key && ordem.direction === 'asc') {
            direction = 'desc';
        }
        setOrdem({ key, direction });
    };

    const amigosOrdenados = [...amigos].sort((a, b) => {
        if (!ordem.key) return 0;

        const key = ordem.key;

        if (typeof a[key] === 'string') {
            // string comparison
            if (ordem.direction === 'asc') return a[key].localeCompare(b[key]);
            else return b[key].localeCompare(a[key]);
        } else {
            // number comparison
            if (ordem.direction === 'asc') return a[key] - b[key];
            else return b[key] - a[key];
        }
    });

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <h1 className={Style.tituloTop}>Amizades</h1>
                <div className={Style.divAcoes}>
                    <i className="fa-solid fa-user-plus" style={{ fontSize: "3rem", color: "#000", 
                    marginLeft: "2rem", cursor: "pointer" }}></i>
                    <div>
                        <i className="fa-solid fa-user" style={{ fontSize: "3rem", color: "#000", 
                        marginLeft: "2rem", cursor: "pointer" }}></i>
                    </div>
                </div>
                <div className={Style.gridAmigos}>
                    {/* Topo da Tabela */}
                    <div></div>
                    <div className={Style.textoTopoTabela} onClick={() => ordenar('nome')}>
                        Nome {ordem.key === 'nome' ? (ordem.direction === 'asc' ? '▲' : '▼') : ''}
                    </div>
                    <div className={Style.textoTopoTabela} onClick={() => ordenar('nivel')} 
                    style={{ textAlign: "center" }}>
                        Nível {ordem.key === 'nivel' ? (ordem.direction === 'asc' ? '▲' : '▼') : ''}
                    </div>
                    <div className={Style.textoTopoTabela} onClick={() => ordenar('moedas')}
                    style={{ textAlign: "center" }}>
                        Moedas {ordem.key === 'moedas' ? (ordem.direction === 'asc' ? '▲' : '▼') : ''}
                    </div>
                    <div className={Style.textoTopoTabela} style={{ textAlign: "center" }}>
                        Ação
                    </div>
                    {/* Dados */}
                    {amigosOrdenados.map(amigo => (
                        <React.Fragment key={amigo.id}>
                            <div>
                                <img src={amigo.avatar} alt={amigo.nome} className={Style.img}
                                style={{border: `0.3rem solid ${amigo.borda}`}} />
                            </div>
                            <div>
                                {amigo.nome}
                            </div>
                            <div className={Style.destaqueNM}>
                                <p>Nível</p>
                                <p>{amigo.nivel}</p>
                            </div>
                            <div className={Style.destaqueNM}>
                                <img src={require('../../../imgs/moeda.png')} alt="icone de moeda" 
                                className={Style.img} draggable="false" />
                                {amigo.moedas}
                            </div>
                            <div className={Style.divAcao}>
                                <i className="fa-solid fa-ellipsis" style={{ fontSize: "2.5rem", cursor: "pointer", color: "#000" }}></i>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </div>
    )
}