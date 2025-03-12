import React from 'react';
import ProfileServer from './ProfileServer';

const PerfilLayout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/perfil">Profile</a></li>
            <li><a href="/api/auth/logout">Logout</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>My Profile</h1>
        <ProfileServer />
        <a href="/api/auth/logout">Logout</a>
      </main>
      <footer>
        <p>&copy; 2025 Ueats</p>
      </footer>
    </div>
  );
};

export default PerfilLayout;