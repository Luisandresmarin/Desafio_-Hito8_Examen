import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/UserContext';

const Login = () => {
  const { login } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password); // Llama al método login del contexto
      setErrorMessage(""); // Limpiar el mensaje de error si el login es exitoso
    } catch (error) {
      // Aquí se maneja el error
      setErrorMessage("Email o contraseña incorrectos."); // Mostrar mensaje de error
    }
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
         <h1 className="login">Login</h1>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </>
  );
};

export default Login;