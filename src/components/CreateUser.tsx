import React, { useState } from 'react';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserRole } from '../services/userService';
import './CreateUser.css';

interface CreateUserProps {
  currentUser: User;
  currentUserRole: UserRole;
  onUserCreated: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ currentUser, currentUserRole, onUserCreated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as 'admin' | 'meteorologo' | 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Crea l'utente in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const newUser = userCredential.user;

      // Crea il documento del ruolo in Firestore
      const userRole: UserRole = {
        uid: newUser.uid,
        email: formData.email,
        role: formData.role,
        name: formData.name,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'user-roles', newUser.uid), userRole);

      setMessage({ type: 'success', text: `Utente ${formData.role} creato con successo!` });
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        name: '',
        role: 'user'
      });

      onUserCreated();

    } catch (error: any) {
      console.error('Errore nella creazione utente:', error);
      let errorMessage = 'Errore nella creazione dell\'utente';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email già in uso';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password troppo debole (minimo 6 caratteri)';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email non valida';
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Solo admin possono creare utenti
  if (currentUserRole.role !== 'admin') {
    return null;
  }

  return (
    <div className="create-user">
      <h3>Crea Nuovo Utente</h3>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="utente@meteosalento.it"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Minimo 6 caratteri"
              minLength={6}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Ruolo:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="user">👤 Utente</option>
              <option value="meteorologo">🌤️ Meteorologo</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>
        </div>

        <div className="role-descriptions">
          <div className="role-desc">
            <strong>👤 Utente:</strong> Può solo visualizzare le previsioni
          </div>
          <div className="role-desc">
            <strong>🌤️ Meteorologo:</strong> Può aggiungere e modificare previsioni
          </div>
          <div className="role-desc">
            <strong>👑 Admin:</strong> Accesso completo (previsioni + gestione utenti + dashboard)
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="create-btn">
          {isLoading ? 'Creando...' : 'Crea Utente'}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
