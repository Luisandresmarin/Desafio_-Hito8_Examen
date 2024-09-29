import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePizza } from '../context/PizzaContext';

const PizzaPage = () => {
  const { id } = useParams(); // Obtener el ID de la pizza desde la URL
  const { pizza, fetchPizzaById, loading, error } = usePizza(); // Obtener pizza, función y estados del contexto
  const { addToCart } = useCart(); 
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  useEffect(() => {
    fetchPizzaById(id); // Obtener los detalles de la pizza por ID
  }, [id, fetchPizzaById]);

  if (loading) {
    return <p>Cargando...</p>; // Mostrar mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p>Error: {error}</p>; // Mostrar mensaje de error si ocurre alguno
  }

  if (!pizza) {
    return <p>Pizza no encontrada.</p>; // Manejo si no se encuentra la pizza
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
      padding: '2px',
      margin: 'auto'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: '0px',
      }}>
        {pizza.name}
      </h1>
        <img 
        src={pizza.img} 
        alt={pizza.name} 
        style={{
          width: '400px',
          height: 'auto',
          marginBottom: '0px',
        }} 
      />
      <p style={{
        textAlign: 'justify',
        maxWidth: '1000px',
        marginBottom: '20px',
      }}>
        {pizza.desc}
      </p>
      <h4 style={{
        textAlign: 'center',
        marginBottom: '0px',
      }}>Ingredientes:</h4>
      <ul style={{
        listStyleType: 'none',
        padding: '0',
        textAlign: 'center',
        marginBottom: '0px',
      }}>
        {pizza.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0px',
      }}>
        Precio: ${pizza.price.toFixed()}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '0px',
      }}>
        <button 
          onClick={() => addToCart(pizza)} 
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            borderRadius: '8%',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            width: '150px',
            textAlign: 'center',
          }}
        >
          Agregar
        </button>
        <button 
          onClick={() => navigate('/')} 
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            borderRadius: '5%',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            width: '150px',
            textAlign: 'center',
          }}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default PizzaPage;
