import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import RevenueDashboard from './components/RevenueDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Caricamento MeteoSalento...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="App">
        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-toggle-icon">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

        <Header user={user} setUser={setUser} />
        <main className="main-content">
          <ErrorBoundary>
            <WeatherSearch />
          </ErrorBoundary>
        </main>
        {/* Dashboard Ricavi - visibile solo per admin/developer */}
        <ErrorBoundary>
          <RevenueDashboard />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default App;
