import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./src/components/Header.jsx";
import Footer from "./src/components/Footer.jsx";
import Home from "./src/components/Home.jsx";
import Login from "./src/components/Login.jsx";
import Register from "./src/components/Register.jsx";
import ServicesList from "./src/components/ServicesList.jsx";
import ServiceDetail from "./components/ServiceDetail.js";
import CreateService from "./src/components/CreateService.jsx";
import AddComment from "./components/AddComment.js";
import LoggedUserContext from "./contexts/LoggedUserContext.js";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      <Router>
        <LoggedUserContext.Provider value={loggedUser}>
          <Header user={loggedUser} handleLogout={handleLogout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} handleLogin={handleLogin} />
            <Route path="/register" component={Register} />
            <Route path="/services" component={ServicesList} />
            <Route path="/services/:serviceId" component={ServiceDetail} />
            <Route path="/services/create" component={CreateService} />
            <Route
              path="/services/:serviceId/comments/add"
              component={AddComment}
            />
          </Switch>
        </LoggedUserContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
