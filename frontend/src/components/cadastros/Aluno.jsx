// import React, { useState } from "react";
// import AlunoStyle from "../login/login.module.css";

// export default function LoginModal({ mostra, fecha }) {
//     const [nome, setNome] = useState("");
//     const [data_nascimento, setData_nascimento] = useState("");
//     const [email, setEmail] = useState("");
//     const [senha, setSenha] = useState("");
//     const [confirmarSenha, setConfirmarSenha] = useState("");
//     const [telefone, setTelefone] = useState("");

//     if (!mostra) return null;

//     return (
//         <div className={AlunoStyle.modalOverlay}>
//             <div className={AlunoStyle.modalBoxEscola}>
//                 <button className={AlunoStyle.closeBtn} onClick={fecha}>
//                     <i className="fa-solid fa-circle-xmark" style={{ fontSize: "1.5rem", color: "#000" }}></i>
//                 </button>
//                 {/* Primeira Parte */}
//                 <h2 className={AlunoStyle.modalTitleEscola}>Cadastro Escola</h2>

//                 {/* Formulario */}
//                 <form className={AlunoStyle.cadastroForm}>
//                     <div className={AlunoStyle.cadastroEscola}>
//                     <label>Nome</label>
//                     <input
//                       type="text"
//                       placeholder="Insira seu nome aqui"
//                       value={nome}
//                       onChange={(e) => setNome(e.target.value)}
//                       required
//                     />
//                     </div>
//                     <div className={AlunoStyle.cadastroEscola}>
//                     <label>Estado</label>
//                     <input
//                       type="text"
//                       placeholder="Insira seu estado aqui"
//                       value={estado}
//                       onChange={(e) => setEstado(e.target.value)}
//                       required
//                     />
//                     </div>
//                     {/* Segunda Parte */}
//                     <div className={AlunoStyle.cadastroEscola}>
//                     <label>E-mail</label>
//                     <input
//                       type="email"
//                       placeholder="Insira seu e-mail aqui"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     </div>
//                     <div className={AlunoStyle.cadastroEscola}>
//                     <label>Telefone</label>
//                     <input
//                       type="tel"
//                       placeholder="Insira seu telefone aqui"
//                       value={telefone}
//                       onChange={(e) => setTelefone(e.target.value)}
//                       required
//                     />
//                     </div>
//                     <div className={AlunoStyle.cadastroEscola}>
//                     <label>Senha</label>
//                     <input
//                       type="password"
//                       placeholder="Insira sua senha aqui"
//                       value={senha}
//                       onChange={(e) => setSenha(e.target.value)}
//                       required
//                     />
//                     </div>
//                     <div className={AlunoStyle.cadastroEscola}>
//                     <label>Confirmar Senha</label>
//                     <input
//                       type="password"
//                       placeholder="Confirme sua senha aqui"
//                       value={confirmarSenha}
//                       onChange={(e) => setConfirmarSenha(e.target.value)}
//                       required
//                     />
//                     </div>
//                     <p className={AlunoStyle.registerLink}>
//                       Ja tem Conta? <a href="./Login.jsx">Faça Login Aqui!!!</a>
//                     </p>
//                     <button type="submit" className={AlunoStyle.loginBtn}>Cadastrar</button>
//                 </form>
//             </div>
//         </div>
//     );
// }