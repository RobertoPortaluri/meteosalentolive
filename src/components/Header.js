import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  if (loading) {
    return (
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🌤️ MeteoSalento</h1>
          <div className="auth-section">
            <span>Caricamento...</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🌤️ MeteoSalento</h1>
        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="profile-image"
              />
              <span className="welcome-text">Ciao, {user.displayName?.split(' ')[0]}</span>
              <button 
                onClick={handleSignOut} 
                className="auth-button logout-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle} 
              className="auth-button login-button"
            >
              🚀 Login con Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
