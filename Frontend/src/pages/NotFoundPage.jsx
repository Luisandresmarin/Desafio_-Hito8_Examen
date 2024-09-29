
import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1>404 - Página No Encontrada</h1>
            <p>La página que estás buscando no existe.</p>
            <Link to="/" className="btn btn-primary">Regresar al Inicio</Link>
        </div>
    );
};

export default NotFoundPage;