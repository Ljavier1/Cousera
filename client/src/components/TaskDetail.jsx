import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoggedUserContext from "./contexts/LoggedUserContext";
import "./taskDetail.css";

const TaskDetails = () => {
  const { loggedUser } = useContext(LoggedUserContext);
  const history = useHistory();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [solutionFile, setSolutionFile] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${id}`);
      if (response.ok) {
        const jsonData = await response.json();
        setTask(jsonData);
        setIsCompleted(jsonData.completed);
      } else {
        history.push("/services");
      }
    };

    fetchTask();
  }, [id, history]);

  const handleCompleteTask = async () => {
    const response = await fetch(`/api/tasks/${id}/complete`, {
      method: "PUT",
    });

    if (response.ok) {
      setIsCompleted(true);
    } else {
      console.error("Error al completar la tarea");
    }
  };

  const handleFileChange = (event) => {
    setSolutionFile(event.target.files[0]);
  };

  const handleUploadSolution = async () => {
    const formData = new FormData();
    formData.append("solutionFile", solutionFile);

    const response = await fetch(`/api/tasks/${id}/upload-solution`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTask(updatedTask);
    } else {
      console.error("Error al subir la solución");
    }
  };

  if (!task) {
    return <div>Cargando...</div>;
  }

  return (
    <main>
      <h2>Detalles de la tarea</h2>
      <p>
        <strong>Título:</strong> {task.title}
      </p>
      <p>
        <strong>Descripción:</strong> {task.description}
      </p>
      <p>
        <strong>Creado por:</strong> {task.usuario}
      </p>
      <p>
        <strong>Completada:</strong> {isCompleted ? "Sí" : "No"}
      </p>
      {loggedUser && task.userId === loggedUser.id && (
        <>
          <button onClick={handleCompleteTask}>
            {isCompleted ? "Marcar como incompleta" : "Marcar como completada"}
          </button>

          <label htmlFor="solutionFile">Subir solución:</label>
          <input type="file" id="solutionFile" onChange={handleFileChange} />
          <button onClick={handleUploadSolution}>Subir</button>
        </>
      )}
    </main>
  );
};

export default TaskDetails;
