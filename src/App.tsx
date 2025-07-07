import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import RevenueDashboard from './components/RevenueDashboard';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <main className="main-content">
        <WeatherSearch />
      </main>
      {/* Dashboard Ricavi - visibile solo per admin/developer */}
      <RevenueDashboard />
    </div>
  );
};

export default App;
