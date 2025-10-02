import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Style from "./trilha.module.css";
import Ajuste from "../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";
import Barra from "../barra-top/BarraTop";

const classes = [
    "primeiro", "segundo", "terceiro",
    "quarto", "quinto", "sexto",
]

export default function TelaAlunoTrilha(){
    const navigate = useNavigate();
    const { materia } = useParams();
    const [atividades, setAtividades] = useState([]);
    const [level, setLevel] = useState("4");

    useEffect(() => {
        axios.get("/atividades.json").then((res) => {
        const data = res.data;
        if (data[materia]) {
            setAtividades(data[materia]);
        }
        });
    }, [materia]);
    
    return(
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <Barra level={level}/>
                <div className={Style.divConquista}>
                    <h2 className={Style.tituloConquista}>Conquistas</h2>
                </div>
                <div className={Style.trilha}>
                    {atividades.map((atv, index) => {
                        const classeExtra = classes[index % classes.length];
                        const deslocamento = Math.sin(index * 0.7) * 6; // amplitude horizontal
                        return (
                        <div
                            key={atv}
                            className={`${Style.etapa} ${Style[classeExtra]}`}
                            style={{ marginLeft: `${deslocamento}rem`, marginTop: "1rem" }}
                            onClick={()=>{navigate(`/aluno/${materia}/atividade/${atv.id}`)}}
                        >
                            {atv.id}
                        </div>
                        );
                    })}
                </div>
            </main>
        </div>
    )
}