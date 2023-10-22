import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from "./pages/MainPage";
import CatalogPage from './pages/CatalogPage';
import FavoritesPage from 'pages/FavoritesPage';


import './styles/globals.scss';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
