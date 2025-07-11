import React, { useState, useEffect } from 'react';
import { getLatestForecasts, WeatherForecast } from '../services/weatherService';
import './WeatherDisplay.css';

interface WeatherDisplayProps {
  refreshTrigger?: number;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ refreshTrigger }) => {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadForecasts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getLatestForecasts(10);
      setForecasts(data);
    } catch (err) {
      console.error('Errore nel caricamento delle previsioni:', err);
      setError('Errore nel caricamento delle previsioni');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForecasts();
  }, [refreshTrigger]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getWeatherIcon = (weather: string): string => {
    const weatherMap: { [key: string]: string } = {
      'Soleggiato': '☀️',
      'Parzialmente nuvoloso': '⛅',
      'Nuvoloso': '☁️',
      'Coperto': '☁️',
      'Pioggia leggera': '🌦️',
      'Pioggia': '🌧️',
      'Pioggia intensa': '⛈️',
      'Temporale': '⛈️',
      'Nebbia': '🌫️',
      'Vento forte': '💨'
    };
    return weatherMap[weather] || '🌤️';
  };

  const getWindDirection = (direction: string): string => {
    const directionMap: { [key: string]: string } = {
      'N': 'Nord',
      'NE': 'Nord-Est',
      'E': 'Est',
      'SE': 'Sud-Est',
      'S': 'Sud',
      'SW': 'Sud-Ovest',
      'W': 'Ovest',
      'NW': 'Nord-Ovest'
    };
    return directionMap[direction] || direction;
  };

  if (isLoading) {
    return (
      <div className="weather-display">
        <div className="loading">
          <div className="spinner"></div>
          <p>Caricamento previsioni...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-display">
        <div className="error">
          <p>{error}</p>
          <button onClick={loadForecasts} className="retry-btn">
            Riprova
          </button>
        </div>
      </div>
    );
  }

  if (forecasts.length === 0) {
    return (
      <div className="weather-display">
        <div className="no-data">
          <p>Nessuna previsione disponibile</p>
          <p>Aggiungi la prima previsione usando il modulo sopra!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-display">
      <h2>Previsioni Meteo - Salento</h2>
      
      <div className="forecasts-grid">
        {forecasts.map((forecast) => (
          <div key={forecast.id} className="forecast-card">
            <div className="forecast-header">
              <div className="date-info">
                <h3>{formatDate(forecast.date)}</h3>
                <span className="period-badge">{forecast.period === 'daily' ? 'Giornaliera' : '3 Giorni'}</span>
              </div>
              <div className="weather-icon">
                {getWeatherIcon(forecast.weather)}
              </div>
            </div>

            <div className="forecast-content">
              <div className="main-info">
                <div className="temperature">
                  <span className="temp-max">{forecast.temperature.max}°</span>
                  <span className="temp-min">{forecast.temperature.min}°</span>
                </div>
                <div className="weather-condition">
                  {forecast.weather}
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Umidità:</span>
                  <span className="value">{forecast.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="label">Vento:</span>
                  <span className="value">{forecast.wind.speed} km/h {getWindDirection(forecast.wind.direction)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Precipitazioni:</span>
                  <span className="value">{forecast.precipitation} mm</span>
                </div>
                <div className="detail-item">
                  <span className="label">Località:</span>
                  <span className="value">{forecast.location}</span>
                </div>
              </div>

              {forecast.description && (
                <div className="description">
                  <p>{forecast.description}</p>
                </div>
              )}

              <div className="forecast-footer">
                <span className="author">di {forecast.createdBy}</span>
                {forecast.createdAt && (
                  <span className="timestamp">
                    {new Date(forecast.createdAt.toDate()).toLocaleDateString('it-IT')}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="refresh-section">
        <button onClick={loadForecasts} className="refresh-btn">
          🔄 Aggiorna Previsioni
        </button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
