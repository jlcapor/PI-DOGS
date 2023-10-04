import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/layout/NavBar/NavBar';
import Footer from '../components/layout/Footer/Footer';

const RootLayout = () => {
  return (
    <div className='container'>
    <NavBar/>
    <div>
       <main className='main-container'>
        <Outlet/>
      </main>
    </div>
    <Footer />
  </div>
  );
}

export default RootLayout;
