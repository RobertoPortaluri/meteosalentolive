import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserRole } from '../services/userService';
import './InitialSetup.css';

const InitialSetup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState({
    adminEmail: 'admin@meteosalento.it',
    adminPassword: 'Admin123!',
    adminName: 'Roberto Admin',
    meteoroEmail: 'meteo@meteosalento.it',
    meteoroPassword: 'Meteo123!',
    meteoroName: 'Meteorologo Salento'
  });

  const setupUsers = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Crea Admin
      const adminCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.adminEmail, 
        formData.adminPassword
      );

      const adminRole: UserRole = {
        uid: adminCredential.user.uid,
        email: formData.adminEmail,
        role: 'admin',
        name: formData.adminName,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'user-roles', adminCredential.user.uid), adminRole);

      // Crea Meteorologo
      const meteoroCredential = await createUserWithEmailAndPassword(
        auth,
        formData.meteoroEmail,
        formData.meteoroPassword
      );

      const meteoroRole: UserRole = {
        uid: meteoroCredential.user.uid,
        email: formData.meteoroEmail,
        role: 'meteorologo',
        name: formData.meteoroName,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'user-roles', meteoroCredential.user.uid), meteoroRole);

      setMessage({ 
        type: 'success', 
        text: 'Setup completato! Admin e Meteorologo creati con successo. Ricarica la pagina.' 
      });

    } catch (error: any) {
      console.error('Errore setup:', error);
      let errorMessage = 'Errore durante il setup';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email già in uso. Gli utenti potrebbero essere già stati creati.';
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="initial-setup">
      <div className="setup-container">
        <h2>🚀 Setup Iniziale Sistema</h2>
        <p>Configura gli utenti admin e meteorologo</p>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="setup-form">
          <div className="user-section">
            <h3>👑 Admin</h3>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="user-section">
            <h3>🌤️ Meteorologo</h3>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="meteoroEmail"
                value={formData.meteoroEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="meteoroPassword"
                value={formData.meteoroPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="meteoroName"
                value={formData.meteoroName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={setupUsers} 
          disabled={isLoading}
          className="setup-btn"
        >
          {isLoading ? 'Configurando...' : 'Configura Sistema'}
        </button>

        <div className="setup-info">
          <p><strong>Cosa farà questo setup:</strong></p>
          <ul>
            <li>✅ Crea la collezione user-roles</li>
            <li>✅ Crea l'utente Admin con accesso completo</li>
            <li>✅ Crea l'utente Meteorologo per le previsioni</li>
            <li>✅ Configura automaticamente tutti i permessi</li>
          </ul>
          <p><em>Esegui questo setup solo una volta!</em></p>
        </div>
      </div>
    </div>
  );
};

export default InitialSetup;
