import React, { useState } from 'react';
import AdBanner, { SimpleAd } from './AdBanner';
import { getRandomAd } from '../config/adsConfig';
import './WeatherSearch.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Ottieni annunci dinamici
  const randomAd1 = getRandomAd();
  const randomAd2 = getRandomAd();

  const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Sostituisci con la tua API key

  const searchWeather = async (): Promise<void> => {
    if (!city.trim()) {
      setError('Inserisci il nome di una città');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`
      );

      if (!response.ok) {
        throw new Error('Città non trovata');
      }

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante la ricerca');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className="weather-search">
      {/* Pubblicità header - Banner orizzontale */}
      <AdBanner adType="banner" className="ad-header" />

      <div className="search-container">
        <h2>Cerca il meteo della tua città</h2>
        <div className="search-box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Inserisci il nome della città..."
            className="search-input"
          />
          <button 
            onClick={searchWeather} 
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Cercando...' : 'Cerca'}
          </button>
        </div>
        
        {error && <p className="error-message">{error}</p>}
      </div>

      {weather && (
        <>
          <div className="weather-result">
            <div className="weather-header">
              <h3>{weather.name}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
            </div>
            
            <div className="weather-info">
              <div className="temperature">
                <span className="temp-value">{Math.round(weather.main.temp)}°C</span>
                <span className="temp-description">{weather.weather[0].description}</span>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="label">Percepita:</span>
                  <span className="value">{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">Umidità:</span>
                  <span className="value">{weather.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="label">Vento:</span>
                  <span className="value">{weather.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pubblicità inline dopo i risultati meteo */}
          <SimpleAd
            title={randomAd1.title}
            description={randomAd1.description}
            imageUrl={randomAd1.imageUrl}
            linkUrl={randomAd1.linkUrl}
            className="ad-inline"
          />
        </>
      )}

      <div className="welcome-message">
        <span className="welcome-emoji">🌤️</span>
        <h3>Benvenuto in MeteoSalento Live!</h3>
        <p>Scopri le previsioni meteo aggiornate in tempo reale per il Salento e tutte le località italiane.</p>
        <p>Digita il nome di una città per iniziare! ✨</p>
        
        {/* Pubblicità tra le informazioni generali */}
        <SimpleAd
          title={randomAd2.title}
          description={randomAd2.description}
          imageUrl={randomAd2.imageUrl}
          linkUrl={randomAd2.linkUrl}
          className="ad-inline"
        />

        <div className="features">
          <div className="feature">
            <h4>🌤️ Previsioni Accurate</h4>
            <p>Dati meteo aggiornati in tempo reale</p>
          </div>
          <div className="feature">
            <h4>🌍 Località Multiple</h4>
            <p>Cerca il meteo per qualsiasi città</p>
          </div>
          <div className="feature">
            <h4>📱 Responsive</h4>
            <p>Ottimizzato per tutti i dispositivi</p>
          </div>
        </div>
      </div>

      {/* Pubblicità footer */}
      <div className="ad-footer">
        <AdBanner adType="square" />
      </div>
    </div>
  );
};

export default WeatherSearch;
