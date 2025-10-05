// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// import Style from "./loja.module.css";
// import Ajuste from "../containerPadrao.module.css";

// // Import Componentes
// import Header from "../../layout/headers/HeaderAluno";

// export default function TelaAlunoLoja(){
//     return(
//         <div className={Ajuste.wrapper}>
//             <Header />
//             <main className={Ajuste.container}>
//                 <div className={Style.divTituloTop}>
//                     <h1>Faça Atividades, ganhe pontos</h1>
//                     <h2>Personalize seu perfil Unisin</h2>
//                 </div>
//                 <div className={Style.divContainerBloco}>
//                     <div className={Style.navbarTop}>
//                         <h1>Bordas</h1>
//                         <hr className={Style.linhaNav} />
//                         <i className="pi pi-chevron-left" style={{ fontSize: '2rem', color: '#fff', cursor: "pointer" }}></i>
//                         <i className="pi pi-chevron-right" style={{ fontSize: '2rem', color: '#fff', cursor: "pointer" }}></i>
//                     </div>
//                     <div className={Style.carrosselItens}>
//                         <div className={Style.cardItem}>
//                             <div></div>
//                             <p>Borda de Avatar Vermelha</p>
//                             <div>
//                                 <img src={require('../../../imgs/moeda.png')} alt="moeda"
//                                 className={Style.imgsMoeda} draggable="false" />
//                                 <p>800</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={Style.divContainerBloco}>
//                     <div className={Style.navbarTop}>
//                         <h1>Fundos</h1>
//                         <hr className={Style.linhaNav} />
//                         <i className="pi pi-chevron-left" style={{ fontSize: '2rem', color: '#fff', cursor: "pointer" }}></i>
//                         <i className="pi pi-chevron-right" style={{ fontSize: '2rem', color: '#fff', cursor: "pointer" }}></i>
//                     </div>
//                 </div>
//                 <div className={Style.divContainerBloco}>
//                     <div className={Style.navbarTop}>
//                         <h1>Avatares</h1>
//                         <hr className={Style.linhaNav} />
//                         <i className="pi pi-chevron-left" style={{ fontSize: '2rem', color: '#fff', cursor: "pointer" }}></i>
//                         <i className="pi pi-chevron-right" style={{ fontSize: '2rem', color: '#fff', cursor: "pointer" }}></i>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Style from "./loja.module.css";
import Ajuste from "../containerPadrao.module.css";
import Header from "../../layout/headers/HeaderAluno";

export default function TelaAlunoLoja() {
    const carrosselRef = useRef(null);

    const scroll = (direction) => {
        const { current } = carrosselRef;
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
                        <i className="pi pi-chevron-left" onClick={() => scroll("left")}></i>
                        <i className="pi pi-chevron-right" onClick={() => scroll("right")}></i>
                    </div>

                    <div className={Style.carrosselItens} ref={carrosselRef}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={Style.cardItem}>
                                <div className={Style.previewBorda}></div>
                                <p>Borda de Avatar #{i + 1}</p>
                                <div className={Style.divPreco}>
                                    <img src={require("../../../imgs/moeda.png")} alt="moeda" draggable="false" />
                                    <p>800</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
