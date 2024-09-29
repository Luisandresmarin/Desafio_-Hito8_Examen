import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext'; 
import { GlobalContext } from '../context/UserContext'; 
import './CartPage.css';

const CartPage = () => {
  const { cart, getTotalPrice } = useContext(CartContext);
  const { authUser } = useContext(GlobalContext); // Obtener authUser
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const handleCheckout = async () => {
    if (!authUser.token) {
      alert("Debes iniciar sesión para realizar la Compra.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Enviar el token como Bearer
        },
        body: JSON.stringify(cart), // Enviar el carrito en el cuerpo de la solicitud
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("¡Compra realizada exitosamente!"); 
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error en la Compra:", error);
      alert("Hubo un problema al procesar tu pedido.");
    }
  };

  return (
    <div className="carrito" >
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-image" /> 
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.count}</p>
                  <button onClick={() => decreaseQuantity(item.id)}> - </button> 
                  <button onClick={() => addToCart(item)}> + </button> 
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ${getTotalPrice()}</h2>
          <button onClick={handleCheckout} className="btn btn-success">Comprar </button>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
        </>
      )}
    </div>
  );
};

export default CartPage;