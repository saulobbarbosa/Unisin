import React, { useState } from "react";
import AlunoStyle from "../login/login.module.css";

export default function CadastroAlunoModal({ mostra, fecha, abrirLogin }) {
    const [nome, setNome] = useState("");
    const [datanascimento, setDataNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    

    
    if (!mostra) return null;

    return (
        <div className={AlunoStyle.modalOverlay}>
            <div className={AlunoStyle.modalboxAluno}>
                <button className={AlunoStyle.closeBtn} onClick={fecha}>
                    <i className="fa-solid fa-circle-xmark" style={{ fontSize: "1.5rem", color: "#000" }}></i>
                </button>
                {/* Primeira Parte */}
                <h2 className={AlunoStyle.modalTitleEscola}>Cadastro Aluno</h2>

                {/* Formulario */}
                <form className={AlunoStyle.cadastroFormAluno}>
                    <div className={AlunoStyle.cadastroAluno}>
                    <label>Nome</label>
                    <input
                      type="text"
                      placeholder="Insira seu nome aqui"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                    </div>
                    <div className={AlunoStyle.cadastroAluno}>
                    <label>Data de Nascimento</label>
                    <input
                      type="date"
                      placeholder="Insira sua data de nascimento aqui"
                      value={datanascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      required
                    />
                    </div>
                    <div className={AlunoStyle.cadastroAluno}>
                    <label>E-mail</label>
                    <input
                      type="email"
                      placeholder="Insira seu e-mail aqui"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    </div>
                    <div className={AlunoStyle.cadastroAluno}>
                    <label>Senha</label>
                    <input
                      type="password"
                      placeholder="Insira sua senha aqui"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                    </div>
                    <div className={AlunoStyle.cadastroAluno}>
                    <label>Confirmar Senha</label>
                    <input
                      type="password"
                      placeholder="Confirme sua senha aqui"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
                    />
                    </div>
                    <div className={AlunoStyle.cadastroAluno}>
                    <label>Telefone</label>
                    <input
                      type="tel"
                      placeholder="Insira seu telefone aqui"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      required
                    />

                    </div>
                     <p className={AlunoStyle.registerLink}>
                        Já tem conta?{" "}
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          fecha();      // fecha cadastro
                          abrirLogin(); // volta login
                        }}>
                          Faça Login Aqui!!!
                        </a>
                    </p>
                    <button type="submit" className={AlunoStyle.loginBtn}>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}