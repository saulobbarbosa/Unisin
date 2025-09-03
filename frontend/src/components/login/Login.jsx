import React, { useState } from "react";
import LoginStyle from "./login.module.css";

export default function LoginModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login enviado:", { email, senha });

    };

    return (
        <div className={LoginStyle.modalOverlay}>
            <div className={LoginStyle.modalBox}>
                <button className={LoginStyle.closeBtn} onClick={onClose}>
                    <i className="pi pi-times" style={{ fontSize: "1.5rem", color: "#000" }}></i>
                </button>
                    <h2 className={LoginStyle.modalTitle}>Login</h2>
                    <img src={require('../../imgs/logo.jpg')} className={LoginStyle.loginLogo}/>

                    <form onSubmit={handleSubmit}>
                        <label>E-mail</label>
                        <input
                          type="email"
                          placeholder="Insira seu e-mail aqui"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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

                        <p className={LoginStyle.registerLink}>
                          Não tem Conta? <a href="#">Cadastre-se Agora!!!</a>
                        </p>

                        <button type="submit" className={LoginStyle.loginBtn}>Entrar</button>
                    </form>
              </div>
          </div>
      );
}
