import React, { useEffect, useState } from "react";
import axios from "axios";

import Style from "./inventario.module.css";
import Ajuste from "../../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoHome() {
    const [itemsEquipados, setItemsEquipados] = useState({
        avatar: null,
        borda: null,
        fundo: null
    });
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("/inventario.json") // troque para sua rota real
            .then(response => {
                const dados = response.data;

                // separa por tipo
                const avatars = dados.filter(i => i.tipo === "avatar");
                const bordas = dados.filter(i => i.tipo === "borda");
                const fundos = dados.filter(i => i.tipo === "fundo");

                // salva no state
                setItems(dados);

                // equipa automaticamente o primeiro item
                setItemsEquipados({
                    avatar: avatars[0] || null,
                    borda: bordas[0] || null,
                    fundo: fundos[1] || null
                });
            })
            .catch(err => console.error(err));
    }, []);

    const equipar = (tipo, item) => {
        setItemsEquipados(prev => ({
            ...prev,
            [tipo]: item
        }));
    }

    return (
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <h1 className={Style.titulo}>Inventário de Cosméticos</h1>
                <div className={Style.layoutPrincipal}>
                    {/* Primeiro Bloco do Inventario */}
                    <div className={Style.divPreviewEstilo}>
                        <div className={Style.divPreview}
                            style={{
                                backgroundColor: itemsEquipados.fundo?.color,
                            }}
                        >
                            <img src={itemsEquipados.avatar?.img} alt="avatar"
                                className={Style.imgAvatar}
                                style={{
                                    border: `0.5rem solid ${itemsEquipados.borda?.color}`
                                }}
                            />
                        </div>
                        <h1>Nome Usuário</h1>
                        <div className={Style.divEspecificacao}>
                            <div className={Style.cardEspecificacao}>
                                <h1>Avatar</h1>
                                <h2>{itemsEquipados.avatar?.nome}</h2>
                            </div>
                            <div className={Style.cardEspecificacao}>
                                <h1>Borda</h1>
                                <h2>{itemsEquipados.borda?.nome}</h2>
                            </div>
                            <div className={Style.cardEspecificacao}>
                                <h1>Fundo</h1>
                                <h2>{itemsEquipados.fundo?.nome}</h2>
                            </div>
                        </div>
                    </div>
                    {/* Segundo Bloco do Inventario */}
                    <div className={Style.divTodosItems}>
                        {items.map(item => (
                            <div key={`${item.tipo}-${item.itemId}`}
                                className={Style.divPreviewMini}
                            >
                                {item.tipo === "avatar" && (
                                    <img
                                        src={item.img}
                                        alt={item.nome}
                                        className={Style.imgAvatarMini}
                                    />
                                )}
                                
                                {item.tipo === "borda" && (
                                    <div
                                        className={Style.fundoBordaAvatar}
                                        style={{ border: `0.5rem solid ${item.color}` }}
                                    ></div>
                                )}

                                {item.tipo === "fundo" && (
                                    <div
                                        className={Style.fundoBordaAvatar}
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                )}

                                <h1>{item.nome}</h1>

                                <div
                                    className={Style.btnEquipar}
                                    onClick={() => equipar(item.tipo, item)}
                                >
                                    <h1>Equipar</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}