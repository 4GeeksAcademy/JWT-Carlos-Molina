import React, { useState, useContext } from "react";
import '../../styles/home.css';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await actions.logIn(email, password);
    
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="container">
      
      <h3>Introduce tu cuenta</h3>

	  <br></br>

      <div className='form'>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>

	  <br></br>
	  <br></br>
	  
	  <div className="separator-with-text">
        <span>¿No tienes cuenta aún?</span>
      </div>

	  <Link to="/Register">
        <button className='btnRegister'>Regístrate</button>
      </Link>

    </div>
  );
}
