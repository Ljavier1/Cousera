import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <main className="main-container">
      <h1 className="titulo-principal">Bienvenido a COUSERA</h1>
      <p className="texto-parrafo">
        COUSERA es una plataforma para ayudarte a gestionar tus tareas y necesidades.
      </p>
      <p className="texto-parrafo">
        ¿Eres nuevo? <Link to="/register" className="enlace-registro">Regístrate</Link>
      </p>
      <p className="texto-parrafo">
        Ya tienes cuenta? <Link to="/login" className="enlace-login">Inicia sesión</Link>
      </p>
      <p className="texto-parrafo">
        <Link to="/services" className="enlace-servicios">Ver lista de servicios</Link>
      </p>
    </main>
  );
};

export default Home;
