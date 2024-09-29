import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState({ email: "", token: false });

  // Método para cerrar sesión
  const logOut = () => {
    setAuthUser({ email: "", token: false });
    localStorage.removeItem("token"); // Eliminar el token de localStorage al salir
    navigate("/"); // Redirigir a la página principal
  };

  // Método para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setAuthUser({ email: data.email, token: data.token });
        localStorage.setItem("token", data.token); // Guardar el token en localStorage, momentaneamente
        navigate("/"); 
      } else {
        throw new Error(data.error); // Lanza un error si la respuesta no es ok
      }
    } catch (error) {
      console.error("Error en el login:", error);
      throw new Error("Email o contraseña incorrectos."); // Lanza un error personalizado
    }
  };

  // Método para registrar un nuevo usuario
  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setAuthUser({ email: data.email, token: data.token });
        localStorage.setItem("token", data.token); 
        navigate("/");
      } else {
        throw new Error(data.error); 
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      throw new Error("Error al registrar el usuario."); 
    }
  };

  // Método para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Enviar el token como Bearer (acompañante)
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setAuthUser({ email: data.email, token: true }); // Actualiza el estado con la información del perfil
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  return (
    <GlobalContext.Provider value={{ authUser, setAuthUser, logOut, login, register, getProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;