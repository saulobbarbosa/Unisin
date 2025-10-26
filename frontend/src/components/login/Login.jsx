import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import LoginStyle from "./login.module.css";
import CadastroAlunoModal from "../cadastros/Aluno"; 

// Import Componente

export default function LoginModal({ mostra, fecha }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    if (!mostra) return null;

    const alertError = ()=>{
      Swal.fire({
        title: 'O usuário ou senha está Incorreto!',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#295384'
      });
    }

    const handleSubmitJSON = async (e) => {
      e.preventDefault();
        
      try {
        // Lê o JSON completo
        const response = await axios.get("/usuarios.json");
        const usuarios = response.data;
      
        // Procura usuário que bate com email e senha
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);
      
        if(usuario) {        
          // Salva dados do usuário no localStorage
          localStorage.setItem("usuarioId", usuario.id);
          localStorage.setItem("tipoUsuario", usuario.tipo);
          
          let destino = "/aluno/home";
          
          if(usuario.tipo === "professor"){
            destino = "/professor/home";
          }else if(usuario.tipo === "escola"){
            destino = "/escola/home";
          }

          setTimeout(() => {
            navigate(destino);
          }, 2000);
        } else {
          alertError();
        }
      
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível carregar os usuários.",
        });
      }
    };

    return (
        <div className={LoginStyle.modalOverlay}>
          <div className={LoginStyle.modalBox}>
                <button className={LoginStyle.closeBtn} onClick={fecha}>
                    <i className="fa-solid fa-circle-xmark" style={{ fontSize: "1.5rem", color: "#000" }}></i>
                </button>
                {/* Primeira Parte */}
                <h2 className={LoginStyle.modalTitle}>Login</h2>
                <img src={require('../../imgs/logo.jpg')} className={LoginStyle.loginLogo}/>
                {/* Formulario */}
                <form onSubmit={handleSubmitJSON}>
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
                        Não tem conta?{" "}
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setMostrarCadastro(true); // abre cadastro
                          }} > Cadastre-se Agora!!!
                        </a>
                      </p>
                    <button type="submit" className={LoginStyle.loginBtn}>
                      Entrar
                    </button>
                </form>
              </div>
                  <CadastroAlunoModal // O componente ta que nem no header home
                  mostra={mostrarCadastro}
                  fecha={() => setMostrarCadastro(false)}
                  abrirLogin={() => setMostrarCadastro(false)} // quando clicar "Já tem conta"
                  />
        </div>
      );
}
