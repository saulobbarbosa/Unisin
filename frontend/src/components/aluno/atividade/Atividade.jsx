import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

import Style from "./atividade.module.css";
import Ajuste from "../../containerPadrao.module.css";

// Import Componentes
import Header from "../../layout/headers/HeaderAluno";
import Barra from "../barra-top/BarraTop";

export default function TelaAtividade() {
    const navigate = useNavigate();
    const { materia, id } = useParams();
    const [atividade, setAtividade] = useState(null);
    const [level, setLevel] = useState("4");
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:8000/api/quiz", { id: parseInt(id) })
            .then(res => {
                setAtividade(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    const acerto = () => {
        Swal.fire({
            title: "Você Acertou!!!",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#295384"
        }).then(() => {
            navigate(-1);
        });
    }
    const errou = () => {
        Swal.fire({
            title: "Você Errou :(",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#295384"
        }).then(() => {
            navigate(-1);
        });
    }

    const handleRespostaClick = (resp) => {
        if (respostaSelecionada) return;
        setRespostaSelecionada(resp);

        if (resp === atividade.correta) {
            acerto();
        } else {
            errou();
        }
    }

    if (!atividade) return <p>Carregando...</p>;

    return (
        <div className={Ajuste.wrapper}>
            <Header />
            <main className={Ajuste.container}>
                <Barra level={level} />
                <div className={Style.divAtividade}>
                    <div className={Style.divPergunta + " " + Style.generalizacao}>
                        <h2>{atividade.pergunta}</h2>
                    </div>
                    <div className={Style.ajusteDivResposta}>
                        {atividade.respostas.map((resp, index) => (
                            <div className={Style.divResposta + " " + Style.generalizacao} key={index}
                                onClick={() => handleRespostaClick(resp)}
                            >
                                <p>{resp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}