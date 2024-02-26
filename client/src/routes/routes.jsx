const Routes = () => {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route path="/acerca-de" component={About} />
  
        {/* Rutas para tareas */}
        <Route exact path="/tareas" component={TasksList} />
        <Route path="/tareas/:tareaId" component={TaskDetail} />
        <Route path="/tareas/:tareaId/soluciones" component={TaskSolutions} />
        <Route path="/tareas/:tareaId/comentarios" component={TaskComments} />
  
        {/* Rutas para usuarios registrados */}
        <Route path="/iniciar-sesion" component={Login} />
        <Route path="/registrarse" component={Register} />
  
        {/* Rutas para acciones de usuarios registrados */}
        <Route path="/tareas/nueva" component={NewTask} />
        <Route path="/tareas/:tareaId/soluciones/nueva" component={NewSolution} />
        <Route path="/tareas/:tareaId/comentarios/nuevo" component={NewComment} />
        <Route path="/tareas/:tareaId/estado" component={TaskStatus} />
      </>
    );
  };
  
  export default Routes;
  