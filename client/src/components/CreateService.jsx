import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoggedUserContext from "./contexts/LoggedUserContext";
import "./createService.css";

const CreateService = () => {
  const { loggedUser } = useContext(LoggedUserContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!loggedUser) {
      history.push("/");
    }
  }, [loggedUser, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    // Llamada a la API para crear la tarea (sin el campo de precio)
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, user_id: loggedUser.id }),
    });

    if (response.ok) {
      // Tarea creada exitosamente
      history.push("/services");
    } else {
      // Error al crear la tarea
      const errorData = await response.json();
      setErrors([errorData.message]);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!name) {
      errors.push("El nombre de la tarea es obligatorio");
    }

    if (!description) {
      errors.push("La descripción de la tarea es obligatoria");
    }

    return errors;
  };

  return (
    <main>
      <h2>Crear tarea</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre de la tarea</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Descripción de la tarea</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Crear tarea</button>
      </form>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default CreateService;
