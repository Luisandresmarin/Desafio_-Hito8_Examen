import React from 'react';
import { Link } from 'react-router-dom';
import { usePizza } from '../context/PizzaContext'; 
import { useCart } from '../context/CartContext'; 

const HomePage = () => {
  const { pizzas, error } = usePizza(); 
  const { addToCart } = useCart(); // Obtener addToCart del CartContext

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <div className='titulo-principal'>
      <h1>Nuestras Pizzas</h1>
      <div className="pizza-list">
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <div key={pizza.id} className="pizza-card">
              <img src={pizza.img} alt={pizza.name} />
              <h2>{pizza.name}</h2>
              <p>{pizza.desc}</p>
              <p>Precio: ${pizza.price}</p>
              <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Añadir al Carrito</button>
              <Link to={`/pizza/${pizza.id}`} className="btn btn-primary">Ver más</Link>
            </div>
          ))
        ) : (
          <p>No hay pizzas disponibles</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;