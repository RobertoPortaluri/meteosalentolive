import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserRole } from '../services/userService';
import CreateUser from './CreateUser';
import './UserManager.css';

interface UserManagerProps {
  currentUserRole: UserRole;
}

const UserManager: React.FC<UserManagerProps> = ({ currentUserRole }) => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const usersCollection = collection(db, 'user-roles');
      const snapshot = await getDocs(usersCollection);
      
      const usersData = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserRole[];
      
      setUsers(usersData);
    } catch (error) {
      console.error('Errore nel caricamento utenti:', error);
      setMessage({ type: 'error', text: 'Errore nel caricamento utenti' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserRole.role === 'admin') {
      loadUsers();
    }
  }, [currentUserRole]);

  const updateUserRole = async (userId: string, newRole: 'admin' | 'meteorologo' | 'user') => {
    try {
      const userDoc = doc(db, 'user-roles', userId);
      await updateDoc(userDoc, { role: newRole });
      
      setUsers(prev => prev.map(user => 
        user.uid === userId ? { ...user, role: newRole } : user
      ));
      
      setMessage({ type: 'success', text: 'Ruolo aggiornato con successo!' });
    } catch (error) {
      console.error('Errore nell\'aggiornamento ruolo:', error);
      setMessage({ type: 'error', text: 'Errore nell\'aggiornamento ruolo' });
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      try {
        const userDoc = doc(db, 'user-roles', userId);
        await deleteDoc(userDoc);
        
        setUsers(prev => prev.filter(user => user.uid !== userId));
        setMessage({ type: 'success', text: 'Utente eliminato con successo!' });
      } catch (error) {
        console.error('Errore nell\'eliminazione utente:', error);
        setMessage({ type: 'error', text: 'Errore nell\'eliminazione utente' });
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#e74c3c';
      case 'meteorologo': return '#3498db';
      case 'user': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return '👑';
      case 'meteorologo': return '🌤️';
      case 'user': return '👤';
      default: return '👤';
    }
  };

  if (currentUserRole.role !== 'admin') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="user-manager">
        <div className="loading">Caricamento utenti...</div>
      </div>
    );
  }

  return (
    <div className="user-manager">
      <h2>Gestione Utenti</h2>
      
      {/* Componente per creare nuovi utenti */}
      <CreateUser 
        currentUser={auth.currentUser!} 
        currentUserRole={currentUserRole} 
        onUserCreated={loadUsers}
      />
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.uid} className="user-card">
            <div className="user-header">
              <span className="user-icon">{getRoleIcon(user.role)}</span>
              <div className="user-info">
                <h3>{user.name || user.email}</h3>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="user-details">
              <div className="role-section">
                <label>Ruolo:</label>
                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user.uid, e.target.value as any)}
                  style={{ borderColor: getRoleColor(user.role) }}
                  disabled={user.uid === currentUserRole.uid} // Non può cambiare il proprio ruolo
                >
                  <option value="user">Utente</option>
                  <option value="meteorologo">Meteorologo</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="user-meta">
                {user.lastLogin && (
                  <p>Ultimo accesso: {new Date(user.lastLogin).toLocaleDateString('it-IT')}</p>
                )}
                {user.createdAt && (
                  <p>Creato: {new Date(user.createdAt).toLocaleDateString('it-IT')}</p>
                )}
              </div>
            </div>

            {user.uid !== currentUserRole.uid && (
              <div className="user-actions">
                <button
                  onClick={() => deleteUser(user.uid)}
                  className="delete-btn"
                >
                  Elimina
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="no-users">
          <p>Nessun utente trovato</p>
        </div>
      )}
    </div>
  );
};

export default UserManager;
