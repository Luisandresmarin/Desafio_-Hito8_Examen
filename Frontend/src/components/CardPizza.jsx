import React from 'react';
import { Link } from 'react-router-dom';

const CardPizza = ({ pizza }) => {
  return (
    <div className="pizza-card">
      <img src={pizza.img} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.desc}</p>
      <p>Precio: ${pizza.price}</p>
    
      <Link to={`/pizza/${pizza.id}`} className="btn btn-primary">Ver más</Link>
    </div>
  );
};

export default CardPizza;