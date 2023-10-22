import React from 'react';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      
    </>
  );
};

export default Layout;
