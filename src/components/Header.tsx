import React from 'react';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { UserRole } from '../services/userService';
import './Header.css';

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
  userRole?: UserRole | null;
}

const Header: React.FC<HeaderProps> = ({ user, setUser, userRole }) => {
  const signInWithGoogle = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <span className="logo-icon">🌤️</span>
          MeteoSalento Live
        </h1>
        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <img 
                src={user.photoURL || ''} 
                alt="Avatar" 
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">{user.displayName}</span>
                {userRole && (
                  <span className={`role-badge ${userRole.role.toLowerCase()}`}>
                    {userRole.role.toLowerCase() === 'admin' ? '👑 Admin' : 
                     userRole.role.toLowerCase() === 'meteorologo' ? '🌤️ Meteorologo' : 
                     '👤 Utente'}
                  </span>
                )}
              </div>
              <button onClick={handleSignOut} className="auth-button logout">
                Logout
              </button>
            </>
          ) : (
            <button onClick={signInWithGoogle} className="auth-button login-button">
              🚀 Accedi con Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
