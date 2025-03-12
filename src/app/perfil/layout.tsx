import React from 'react';
import ProfileServer from './ProfileServer';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PerfilLayout: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <h1 style={{ textAlign: 'center' }}>Perfil de Usuario</h1>
        <div style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>
          <ProfileServer />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ border: '1px solid black', padding: '20px', width: '300px', textAlign: 'center', backgroundColor: 'gray', color: 'white' }}>
            <img src="/default-profile.png" alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h2>Nombre del Usuario</h2>
            <p>correo@ejemplo.com</p>
            <Link href="/api/auth/logout" style={{ color: 'white' }}>Logout</Link>
          </div>
        </div>
      </main>
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <Footer />
      </footer>
    </div>
  );
};

export default PerfilLayout;