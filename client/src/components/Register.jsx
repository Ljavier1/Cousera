import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css"; // Importa el archivo CSS

const Register = ({ handleRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    // Aquí se debería hacer la llamada a la API para registrarse
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      // Registro exitoso
      handleRegister({ name, email, password });
      history.push("/login");
    } else {
      // Error al registrarse
      const errorData = await response.json();
      setErrors([errorData.message]);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!name) {
      errors.push("El nombre es obligatorio");
    }

    if (!email) {
      errors.push("El email es obligatorio");
    }

    if (!password) {
      errors.push("La contraseña es obligatoria");
    }

    if (password !== confirmPassword) {
      errors.push("Las contraseñas no coinciden");
    }

    return errors;
  };

  return (
    <main>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  );
};

export default Register;
