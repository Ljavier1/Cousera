import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css"; // Importa el archivo CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    // Llamada a la API para iniciar sesión (reemplaza "usuario" por el nombre del endpoint)
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Inicio de sesión exitoso
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      history.push("/");
    } else {
      // Error al iniciar sesión
      const errorData = await response.json();
      setErrors([errorData.message]);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!email) {
      errors.push("El email es obligatorio");
    }

    if (!password) {
      errors.push("La contraseña es obligatoria");
    }

    return errors;
  };

  return (
    <main>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </main>
  );
};

export default Login;
