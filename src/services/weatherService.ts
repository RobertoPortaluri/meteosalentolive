import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  where,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Tipi per le previsioni meteo
export interface WeatherForecast {
  id?: string;
  date: string; // formato: "YYYY-MM-DD"
  location: string;
  temperature: {
    min: number;
    max: number;
  };
  weather: string; // es. "Soleggiato", "Nuvoloso", "Pioggia"
  humidity: number; // percentuale
  wind: {
    speed: number; // km/h
    direction: string; // es. "NE", "SW"
  };
  precipitation: number; // mm
  description?: string; // descrizione dettagliata
  period: 'daily' | '3days';
  createdBy: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const COLLECTION_NAME = 'weather-forecasts';

// Aggiungere una nuova previsione
export const addWeatherForecast = async (forecast: Omit<WeatherForecast, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...forecast,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Errore nell\'aggiungere la previsione:', error);
    throw error;
  }
};

// Ottenere tutte le previsioni (ordinate per data)
export const getAllForecasts = async (): Promise<WeatherForecast[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WeatherForecast[];
  } catch (error) {
    console.error('Errore nel recuperare le previsioni:', error);
    throw error;
  }
};

// Ottenere le previsioni per una data specifica
export const getForecastsByDate = async (date: string): Promise<WeatherForecast[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '==', date),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WeatherForecast[];
  } catch (error) {
    console.error('Errore nel recuperare le previsioni per data:', error);
    throw error;
  }
};

// Ottenere le ultime N previsioni
export const getLatestForecasts = async (limitCount: number = 10): Promise<WeatherForecast[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('date', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WeatherForecast[];
  } catch (error) {
    console.error('Errore nel recuperare le ultime previsioni:', error);
    throw error;
  }
};

// Aggiornare una previsione esistente
export const updateWeatherForecast = async (id: string, updates: Partial<WeatherForecast>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Errore nell\'aggiornare la previsione:', error);
    throw error;
  }
};

// Eliminare una previsione
export const deleteWeatherForecast = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Errore nell\'eliminare la previsione:', error);
    throw error;
  }
};

// Utility per formattare la data
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Utility per ottenere la data di oggi
export const getTodayDate = (): string => {
  return formatDate(new Date());
};
