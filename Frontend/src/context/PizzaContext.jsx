import React, { createContext, useContext, useState, useEffect } from 'react';

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener todas las pizzas
  const fetchPizzas = async () => {
    if (pizzas.length > 0) return; // No hacer la solicitud si ya tenemos pizzas

    const controller = new AbortController();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/pizzas', {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Error al obtener las pizzas');
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener una pizza por ID
  const fetchPizzaById = async (id) => {
    if (pizza && pizza.id === id) return; // Evitar la solicitud si ya tenemos la pizza correcta

    setLoading(true);
    const controller = new AbortController();
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Error al obtener la pizza');
      const data = await response.json();
      setPizza(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //useEffect para cargar las pizzas al iniciar la app
  useEffect(() => {
    fetchPizzas();
  }, []); // Solo se ejecuta una vez al montar

  return (
    <PizzaContext.Provider value={{ pizzas, pizza, fetchPizzaById, loading, error }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizza = () => useContext(PizzaContext);
  