import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LoggedUserContext from "./contexts/LoggedUserContext";
import "./servicesList.css"; // Importa el archivo CSS

const ServicesList = () => {
  const { loggedUser } = useContext(LoggedUserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!loggedUser) {
      history.push("/");
    } else {
      // Función async para la llamada a la API
      const fetchServices = async () => {
        setLoading(true);
        const response = await fetch("/api/services");
        const jsonData = await response.json();
        setLoading(false);

        if (response.ok) {
          setServices(jsonData);
        } else {
          setErrorMessage(jsonData.message);
        }
      };

      // Llamada a la función async
      fetchServices();
    }
  }, [loggedUser, history]);

  return (
    <main>
      <h2>Lista de servicios</h2>
      {loading && <p className="loading">Cargando...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {loggedUser && !errorMessage && services.length > 0 && (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <Link to={`/services/${service.id}`}>{service.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {loggedUser && !errorMessage && services.length === 0 && (
        <p>No hay servicios disponibles en este momento.</p>
      )}
      {!loggedUser && (
        <p>
          Para acceder a los detalles de los servicios y realizar solicitudes,
          necesitas iniciar sesión.
        </p>
      )}
      {!loggedUser && (
        <Link to="/login">Iniciar sesión</Link>
      )}
      {!loggedUser && (
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      )}
    </main>
  );
};

export default ServicesList;
