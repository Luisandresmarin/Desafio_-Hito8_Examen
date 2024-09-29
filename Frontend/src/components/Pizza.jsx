import React, { useEffect, useState } from 'react';

function Pizza() {
  const [pizza, setPizza] = useState(null); // Estado para almacenar una sola pizza

  useEffect(() => {
    const fetchPizza = async () => {
      const response = await fetch('http://localhost:5000/api/pizzas/p004'); 
      if (response.ok) {
        const data = await response.json();
        setPizza(data); // Asigna el objeto una pizza directamente 
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return <p>Cargando...</p>; // si no corre el npm start backend
  }

  return (
    <div className='home'>
      <h1>Nuestras Pizzas</h1>
      <div className="Pizzacard2">
          <img src={pizza.img} alt={pizza.name} />
        <div className="info">
          <h2>{pizza.name}</h2>
          <p>{pizza.desc}</p>
          <h4>Ingredientes:</h4>
          <ul>
            {pizza.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li> // Renderiza un <li> por cada ingrediente
            ))}
          </ul>
          <p>Precio: ${pizza.price}</p>
          <button variant="outline-dark" className="btn" style={{ fontSize: 'small' }}>
            <span className="material-icons"></span> Ver más 👀
          </button>
          <button variant="dark" className="btn" style={{ fontSize: 'small' }}>
            <span className="material-icons"></span> Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pizza;