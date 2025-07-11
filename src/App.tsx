import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { getUserRole, updateLastLogin, UserRole, canAddForecasts, isAdmin } from './services/userService';
import Header from './components/Header';
import WeatherSearch from './components/WeatherSearch';
import RevenueDashboard from './components/RevenueDashboard';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import AdminLogin from './components/AdminLogin';
import UserManager from './components/UserManager';
import InitialSetup from './components/InitialSetup';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Ottieni il ruolo dell'utente
          const role = await getUserRole(currentUser);
          setUserRole(role);
          
          // Aggiorna ultimo login
          await updateLastLogin(currentUser);
          setNeedsSetup(false);
        } catch (error) {
          console.error('Errore nel recuperare ruolo:', error);
          // Se c'è un errore nel recuperare il ruolo, potrebbe essere che la collezione non esiste
          setNeedsSetup(true);
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleForecastAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
  };

  // Mostra setup iniziale se necessario
  if (needsSetup && !user) {
    return <InitialSetup />;
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Caricamento MeteoSalento...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header user={user} setUser={setUser} userRole={userRole} />
      <main className="main-content">
        <WeatherSearch />
        
        {/* Sezione per visualizzare previsioni meteo (sempre visibile) */}
        <section className="weather-display-section">
          <WeatherDisplay refreshTrigger={refreshTrigger} />
        </section>
        
        {/* Pulsante per accesso meteorologo/admin */}
        {!user && !showAdminLogin && !needsSetup && (
          <section className="admin-access">
            <div className="admin-access-container">
              <h3>Sei un meteorologo o admin?</h3>
              <p>Accedi per aggiungere nuove previsioni o gestire il sistema</p>
              <div className="access-buttons">
                <button 
                  onClick={() => setShowAdminLogin(true)}
                  className="admin-access-btn"
                >
                  🌤️ Accesso Staff
                </button>
                <button 
                  onClick={() => setNeedsSetup(true)}
                  className="setup-access-btn"
                >
                  ⚙️ Setup Iniziale
                </button>
              </div>
            </div>
          </section>
        )}
        
        {/* Form login per meteorologo/admin */}
        {showAdminLogin && !user && (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )}
        
        {/* Form per aggiungere previsioni (solo per meteorologo e admin) */}
        {user && canAddForecasts(userRole) && (
          <section className="weather-management">
            <div className="role-indicator">
              <span className="role-badge">
                {userRole?.role.toLowerCase() === 'admin' ? '👑 Admin' : '🌤️ Meteorologo'}
              </span>
            </div>
            <WeatherInput onForecastAdded={handleForecastAdded} />
          </section>
        )}
        
        {/* Gestione utenti (solo per admin) */}
        {user && isAdmin(userRole) && (
          <section className="user-management">
            <UserManager currentUserRole={userRole!} />
          </section>
        )}
        
        {/* Messaggio per utenti normali */}
        {user && userRole?.role === 'user' && (
          <section className="user-message">
            <div className="user-message-container">
              <h3>👤 Benvenuto!</h3>
              <p>Hai effettuato l'accesso come utente. Puoi visualizzare le previsioni ma non aggiungerne di nuove.</p>
              <p>Per richiedere privilegi di meteorologo, contatta l'amministratore.</p>
            </div>
          </section>
        )}
      </main>
      {/* Dashboard Ricavi - visibile solo per admin */}
      {isAdmin(userRole) && <RevenueDashboard />}
    </div>
  );
};

export default App;
