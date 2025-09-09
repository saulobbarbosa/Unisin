import React, { useState } from "react";
import LoginStyle from "./login.module.css";

export default function LoginModal({ mostra, fecha }) {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [telefone, setTelefone] = useState("");



    if (!mostra) return null;


    return (
        <div className={LoginStyle.modalOverlay}>
            <div className={LoginStyle.modalBox}>
                <button className={LoginStyle.closeBtn} onClick={fecha}>
                    <i className="pi pi-times" style={{ fontSize: "1.5rem", color: "#000" }}></i>
                </button>
                {/* Primeira Parte */}
                <h2 className={LoginStyle.modalTitle}>Cadastro Professor</h2>

                {/* Formulario */}
                <form>
                    <label>Nome</label>
                    <input
                      type="text"
                      placeholder="Insira seu nome aqui"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                    <label>Data de Nascimento</label>
                    <input
                      type="date"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      required
                    />
                    <label>E-mail</label>
                    <input
                      type="email"
                      placeholder="Insira seu e-mail aqui"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label>Telefone</label>
                    <input
                      type="tel"
                      placeholder="Insira seu telefone aqui"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      required
                    />
                    <label>Senha</label>
                    <input
                      type="password"
                      placeholder="Insira sua senha aqui"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                    <label>Confirmar Senha</label>
                    <input
                      type="password"
                      placeholder="Confirme sua senha aqui"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
                    />
                    <p className={LoginStyle.registerLink}>
                      Ja tem Conta? <a href="./Login.jsx">Faça Login Aqui!!!</a>
                    </p>
                    <button type="submit" className={LoginStyle.loginBtn}>Cadastrar</button>
                </form>
              </div>
          </div>
      );
}