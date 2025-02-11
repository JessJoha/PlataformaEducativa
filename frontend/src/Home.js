import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Bienvenido</h1>
      <nav>
        <Link to="/register">Registrarse</Link>
      </nav>
    </div>
  );
};

export default Home;
