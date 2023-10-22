import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import './styles/globals.scss';

const MainPage = lazy(() => import('./pages/MainPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const Layout  = lazy(() => import('./components/Layout/Layout'));






function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
