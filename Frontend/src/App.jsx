// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import PizzaPage from './pages/PizzaPage';
import { GlobalContext } from "./context/UserContext";
import { useContext } from "react";

function App() {
  const { authUser } = useContext(GlobalContext);
  const token = authUser.token;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/pizza/:id" element={<PizzaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;