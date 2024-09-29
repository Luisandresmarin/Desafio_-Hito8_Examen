import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/UserContext';

const Register = () => { 
    const { register } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // Validaciones
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError(true); 
            setMessage('Todos los campos son obligatorios');
            return; 
        }

        if (password.length < 6) {
            setError(true);
            setMessage('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError(true);
            setMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await register(email, password); // Llama al método register del contexto
            setMessage('Registro exitoso!');
            setError(false);
        } catch (error) {
            setError(true);
            setMessage(error.message); // Manejo de errores
        }
    };

    return (
       <>
           <form className="formulario" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>Error: {message}</p>}
                {!error && message && <p style={{ color: 'green' }}>Éxito: {message}</p>}
                <h1 className="register"> Register </h1>
                <div className="form-group"> 
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        className="form-control" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Ingresa tu email"
                    />
                </div>
                <div className="form-group"> 
                    <label>Contraseña</label>
                    <input  
                        type="password" 
                        name="contraseña" 
                        className="form-control" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                <div className="form-group"> 
                    <label>Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        name="confirmar" 
                        className="form-control" 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder="Confirma tu contraseña"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                Enviar</button> 
           </form>
       </>
    ) 
}

export default Register;