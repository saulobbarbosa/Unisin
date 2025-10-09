import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Style from "./loja.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoLoja() {
    const carrosselBorda = useRef(null);
    const carrosselFundo = useRef(null);
    const carrosselAvatar = useRef(null);
    const [itens, setItens] = useState(null);

    useEffect(() => {
        axios
        .get("/loja.json") // caminho dentro da pasta 'public/data'
        .then((response) => setItens(response.data))
        .catch((error) => console.error("Erro ao carregar JSON:", error));
    }, []);
    
    if (!itens) return <p>Carregando...</p>;

    const scroll = (ref, direction) => {
        const { current } = ref;
        if (!current) return;
        const scrollAmount = 300;
        current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <div className={Style.divTituloTop}>
                    <h1>Faça Atividades, ganhe pontos</h1>
                    <h2>Personalize seu perfil no Unisin</h2>
                </div>

                {/* Bloco de Bordas */}
                <div className={Style.divContainerBloco}>
                    <div className={Style.navbarTop}>
                        <h1>Bordas</h1>
                        <hr className={Style.linhaNav} />
                        <i className="fa-solid fa-chevron-left" style={{ fontSize: '2rem', color: '#fff' }}
                        onClick={() => scroll(carrosselBorda, "left")}></i>
                        <i className="fa-solid fa-chevron-right" style={{ fontSize: '2rem', color: '#fff' }}
                        onClick={() => scroll(carrosselBorda, "right")}></i>
                    </div>
                    <div className={Style.carrosselItens} ref={carrosselBorda}>
                        {itens.bordas.map((borda) => (
                            <div key={borda.id} className={Style.cardItem}>
                                <div className={Style.preview}                                    
                                    style={{
                                        border: `0.8rem solid ${borda.color}`,
                                        boxShadow: `0 0 10px ${borda.color}`,
                                    }}
                                >
                                </div>
                                <p style={{ marginTop: "1rem" }}>{borda.nome}</p>
                                <div className={Style.divPreco}>
                                    <img src={require("../../../imgs/moeda.png")} className={Style.imgMoeda}
                                    alt="moeda" draggable="false" />
                                    <p style={{ fontSize: "1.5rem" }}><b>{borda.preco}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Bloco de Fundos */}
                <div className={Style.divContainerBloco}>
                    <div className={Style.navbarTop}>
                        <h1>Fundos</h1>
                        <hr className={Style.linhaNav} />
                        <i className="fa-solid fa-chevron-left" style={{ fontSize: '2rem', color: '#fff' }}
                        onClick={() => scroll(carrosselFundo, "left")}></i>
                        <i className="fa-solid fa-chevron-right" style={{ fontSize: '2rem', color: '#fff' }}
                        onClick={() => scroll(carrosselFundo, "right")}></i>
                    </div>
                    <div className={Style.carrosselItens} ref={carrosselFundo}>
                        {itens.fundos.map((fundo) => (
                            <div key={fundo.id} className={Style.cardItem}>
                                <div className={Style.preview}
                                    style={{
                                        backgroundColor: fundo.color,
                                        boxShadow: `0 0 10px ${fundo.color}`,
                                    }}
                                >
                                </div>
                                <p style={{ marginTop: "1rem" }}>{fundo.nome}</p>
                                <div className={Style.divPreco}>
                                    <img src={require("../../../imgs/moeda.png")} className={Style.imgMoeda}
                                    alt="moeda" draggable="false" />
                                    <p style={{ fontSize: "1.5rem" }}><b>{fundo.preco}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Bloco de Avatares */}
                <div className={Style.divContainerBloco}>
                    <div className={Style.navbarTop}>
                        <h1>Avatares</h1>
                        <hr className={Style.linhaNav} />
                        <i className="fa-solid fa-chevron-left" style={{ fontSize: '2rem', color: '#fff' }}
                        onClick={() => scroll(carrosselAvatar, "left")}></i>
                        <i className="fa-solid fa-chevron-right" style={{ fontSize: '2rem', color: '#fff' }}
                        onClick={() => scroll(carrosselAvatar, "right")}></i>
                    </div>
                    <div className={Style.carrosselItens} ref={carrosselAvatar}>
                        {itens.avatares.map((avatar) => (
                            <div key={avatar.id} className={Style.cardItem}>
                                <img
                                    src={avatar.img}
                                    alt="Avatar Loja"
                                    className={Style.preview}
                                    draggable="false"
                                />
                                <p style={{ marginTop: "1rem" }}>{avatar.nome}</p>
                                <div className={Style.divPreco}>
                                    <img src={require("../../../imgs/moeda.png")} className={Style.imgMoeda}
                                    alt="moeda" draggable="false" />
                                    <p style={{ fontSize: "1.5rem" }}><b>{avatar.preco}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
