import React, { useState } from 'react';
import { addWeatherForecast, WeatherForecast, getTodayDate } from '../services/weatherService';
import './WeatherInput.css';

interface WeatherInputProps {
  onForecastAdded?: (forecast: WeatherForecast) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ onForecastAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    location: 'Salento',
    tempMin: '',
    tempMax: '',
    weather: '',
    humidity: '',
    windSpeed: '',
    windDirection: '',
    precipitation: '0',
    description: '',
    period: 'daily' as 'daily' | '3days',
    createdBy: 'MeteoAmico'
  });

  const weatherOptions = [
    'Soleggiato',
    'Parzialmente nuvoloso',
    'Nuvoloso',
    'Coperto',
    'Pioggia leggera',
    'Pioggia',
    'Pioggia intensa',
    'Temporale',
    'Nebbia',
    'Vento forte'
  ];

  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const forecast: Omit<WeatherForecast, 'id' | 'createdAt' | 'updatedAt'> = {
        date: formData.date,
        location: formData.location,
        temperature: {
          min: parseInt(formData.tempMin),
          max: parseInt(formData.tempMax)
        },
        weather: formData.weather,
        humidity: parseInt(formData.humidity),
        wind: {
          speed: parseInt(formData.windSpeed),
          direction: formData.windDirection
        },
        precipitation: parseFloat(formData.precipitation),
        description: formData.description,
        period: formData.period,
        createdBy: formData.createdBy
      };

      const id = await addWeatherForecast(forecast);
      
      setMessage({ type: 'success', text: 'Previsione aggiunta con successo!' });
      
      // Reset form per previsioni consecutive
      setFormData(prev => ({
        ...prev,
        tempMin: '',
        tempMax: '',
        weather: '',
        humidity: '',
        windSpeed: '',
        windDirection: '',
        precipitation: '0',
        description: ''
      }));

      if (onForecastAdded) {
        onForecastAdded({ ...forecast, id });
      }

    } catch (error) {
      console.error('Errore nell\'aggiungere la previsione:', error);
      setMessage({ type: 'error', text: 'Errore nell\'aggiungere la previsione. Riprova.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-input">
      <h2>Aggiungi Previsione Meteo</h2>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="weather-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Data:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Località:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="period">Periodo:</label>
            <select
              id="period"
              name="period"
              value={formData.period}
              onChange={handleInputChange}
              required
            >
              <option value="daily">Giornaliera</option>
              <option value="3days">3 Giorni</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tempMin">Temp. Min (°C):</label>
            <input
              type="number"
              id="tempMin"
              name="tempMin"
              value={formData.tempMin}
              onChange={handleInputChange}
              required
              min="-10"
              max="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tempMax">Temp. Max (°C):</label>
            <input
              type="number"
              id="tempMax"
              name="tempMax"
              value={formData.tempMax}
              onChange={handleInputChange}
              required
              min="-10"
              max="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="humidity">Umidità (%):</label>
            <input
              type="number"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleInputChange}
              required
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weather">Condizioni:</label>
            <select
              id="weather"
              name="weather"
              value={formData.weather}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleziona condizioni</option>
              {weatherOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="windSpeed">Vento (km/h):</label>
            <input
              type="number"
              id="windSpeed"
              name="windSpeed"
              value={formData.windSpeed}
              onChange={handleInputChange}
              required
              min="0"
              max="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="windDirection">Direzione:</label>
            <select
              id="windDirection"
              name="windDirection"
              value={formData.windDirection}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleziona direzione</option>
              {windDirections.map(dir => (
                <option key={dir} value={dir}>{dir}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="precipitation">Precipitazioni (mm):</label>
            <input
              type="number"
              id="precipitation"
              name="precipitation"
              value={formData.precipitation}
              onChange={handleInputChange}
              required
              min="0"
              max="500"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="createdBy">Meteorologo:</label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Descrizione dettagliata:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Aggiungi dettagli aggiuntivi sulla previsione..."
          />
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? 'Aggiungendo...' : 'Aggiungi Previsione'}
        </button>
      </form>
    </div>
  );
};

export default WeatherInput;
