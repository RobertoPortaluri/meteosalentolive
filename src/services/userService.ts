import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';

export interface UserRole {
  uid: string;
  email: string;
  role: 'admin' | 'meteorologo' | 'user';
  name?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

// Ottenere il ruolo di un utente
export const getUserRole = async (user: User): Promise<UserRole | null> => {
  try {
    const userDocRef = doc(db, 'user-roles', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserRole;
    } else {
      // Se non esiste, crea un ruolo di default
      const defaultRole: UserRole = {
        uid: user.uid,
        email: user.email || '',
        role: 'user', // Ruolo di default
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await setDoc(userDocRef, defaultRole);
      return defaultRole;
    }
  } catch (error) {
    console.error('Errore nel recuperare il ruolo utente:', error);
    return null;
  }
};

// Aggiornare l'ultimo login
export const updateLastLogin = async (user: User): Promise<void> => {
  try {
    const userDocRef = doc(db, 'user-roles', user.uid);
    await setDoc(userDocRef, {
      lastLogin: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Errore nell\'aggiornare ultimo login:', error);
  }
};

// Creare un utente con ruolo specifico (solo per admin)
export const createUserWithRole = async (userRole: UserRole): Promise<void> => {
  try {
    const userDocRef = doc(db, 'user-roles', userRole.uid);
    await setDoc(userDocRef, {
      ...userRole,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Errore nella creazione utente con ruolo:', error);
    throw error;
  }
};

// Verificare se un utente può aggiungere previsioni
export const canAddForecasts = (userRole: UserRole | null): boolean => {
  if (!userRole) return false;
  const role = userRole.role.toLowerCase();
  return role === 'admin' || role === 'meteorologo';
};

// Verificare se un utente è admin
export const isAdmin = (userRole: UserRole | null): boolean => {
  if (!userRole) return false;
  return userRole.role.toLowerCase() === 'admin';
};

// Verificare se un utente è meteorologo
export const isMeteorologist = (userRole: UserRole | null): boolean => {
  if (!userRole) return false;
  return userRole.role.toLowerCase() === 'meteorologo';
};
