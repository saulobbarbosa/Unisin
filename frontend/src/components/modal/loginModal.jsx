import { useState } from "react";
import "./loginModal.css";
import "./logo.jpg";
import "@fontsource/inter"; 
import "@fontsource/inter/700.css";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login enviado:", { email, senha });

  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>x</button>
        <h2 className="modal-title">Login</h2>
        <img src={require('../../imgs/logo.jpg')} className="login-logo"/>

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

          <p className="register-link">
            Não tem Conta? <a href="#">Cadastre-se Agora!!!</a>
          </p>

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}
