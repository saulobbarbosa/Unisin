import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Style from "./atividade.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";
import Barra from "../barra-top/BarraTop";

export default function TelaAtividade(){
    const { materia, id } = useParams();
    const [atividade, setAtividade] = useState(null);
    const [level, setLevel] = useState("4");

    useEffect(() => {
        axios.get("/atividades.json").then((res) => {
            const data = res.data;
            const lista = data[materia] || [];
            const encontrada = lista.find((a) => a.id === parseInt(id));
            setAtividade(encontrada);
        });
    }, [materia, id]);

    if (!atividade) return <p>Carregando...</p>;

    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <Barra level={level}/>
                <div className={Style.divAtividade}>
                    <div className={Style.divPergunta + " " + Style.generalizacao}>
                        <h2>{atividade.pergunta}</h2>
                    </div>
                    <div className={Style.ajusteDivResposta}>
                        {atividade.respostas.map((resp, i) => (
                            <div className={Style.divResposta + " " + Style.generalizacao}>
                                <p key={i}>{resp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}