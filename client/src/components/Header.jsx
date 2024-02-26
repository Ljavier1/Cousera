import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "./header.css"; // Importa el archivo CSS

const Header = ({ user, handleLogout }) => {
  const { user } = useContext(UserContext);

  return (
    <header className="header-container">
      <h1 className="header-titulo">COUSERA</h1>
      {user && (
        <div className="header-opciones">
          <Link to="/services" className="header-enlace">Servicios</Link>
          <Link to="/profile" className="header-enlace">Perfil</Link>
          <button className="header-boton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
