import React, { useState, useContext } from "react";
import '../../styles/home.css';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const success = await actions.signUp(email, password, isActive);

        if (success) {
            alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
            navigate("/");
        } else {
            alert("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="container">
            
            <h3>Crea una nueva cuenta</h3>

			<br></br>

            <div className='form'>
                <form onSubmit={handleRegister}>
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

                    <button type="submit">Regístrate</button>
                </form>
            </div>

			<br></br>
			<br></br>

			<div className="separator-with-text">
                <Link to="/">Regresar</Link>
            </div>

        </div>
    );
}
