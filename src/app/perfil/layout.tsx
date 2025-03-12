import React from 'react';
import ProfileServer from './ProfileServer';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PerfilLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000, backgroundColor: '#32CD32' }}>
        <Header/>
      </header>

      <main style={{ 
        flex: 1, 
        marginTop: '80px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <h3>Perfil de Usuario</h3>
        <div style={{ 
          border: '1px solid black', 
          padding: '20px', 
          width: '300px', 
          textAlign: 'center', 
          backgroundColor: '#444', 
          color: 'white', 
          borderRadius: '10px' 
        }}>
          <ProfileServer />
          <Link 
            href="/api/auth/logout" 
            style={{ 
              display: 'block', 
              marginTop: '10px', 
              backgroundColor: '#333', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '5px', 
              textDecoration: 'none' 
            }}
          >
            Logout
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerfilLayout;