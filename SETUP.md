# Configurazione MeteoSalento

Questa app è scritta in **TypeScript** e richiede due configurazioni per funzionare completamente:

## 1. Configurazione Firebase (per l'autenticazione Google)

### Passaggi per configurare Firebase:

1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuovo progetto (o usa uno esistente)
3. Vai su "Authentication" → "Sign-in method"
4. Abilita "Google" come provider di accesso
5. Vai su "Project Settings" (icona ingranaggio) → "General"
6. Nella sezione "Your apps", clicca su "Web app" (icona </>) 
7. Registra la tua app e copia la configurazione

### Aggiorna il file src/firebase.ts:

Sostituisci i valori di esempio con la tua configurazione reale:

```typescript
const firebaseConfig = {
  apiKey: "la-tua-api-key",
  authDomain: "il-tuo-project-id.firebaseapp.com",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-project-id.appspot.com",
  messagingSenderId: "il-tuo-sender-id",
  appId: "il-tuo-app-id"
};
```

## 2. Configurazione API Meteo (OpenWeatherMap)

### Passaggi per ottenere l'API Key:

1. Registrati su [OpenWeatherMap](https://openweathermap.org/api)
2. Vai al tuo account e crea una nuova API key
3. L'API key sarà attiva in circa 10-15 minuti

### Aggiorna il file src/components/WeatherSearch.tsx:

Alla riga 27, sostituisci:
```typescript
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
```

Con:
```typescript
const API_KEY = 'la-tua-api-key-openweather';
```

## 3. Avviare l'applicazione

Dopo aver configurato entrambe le API:

```bash
npm start
```

L'app sarà disponibile su http://localhost:3000

## 4. Funzionalità dell'app

- **Header con login Google**: In alto a destra
- **Ricerca meteo**: Campo di ricerca per qualsiasi città
- **Meteo predefinito**: Mostra Lecce all'avvio
- **Informazioni dettagliate**: Temperatura, umidità, vento, pressione, visibilità
- **Design responsive**: Funziona su desktop e mobile

## 5. Note aggiuntive

- L'app è già configurata per il Salento (Lecce come città predefinita)
- L'interfaccia è in italiano
- Il design è moderno e user-friendly
- L'autenticazione Google è opzionale per l'utente

## 6. Possibili miglioramenti futuri

- Previsioni a 5 giorni
- Geolocalizzazione automatica
- Salvataggio città preferite (per utenti loggati)
- Grafici delle temperature
- Notifiche meteo
- Tema scuro/chiaro
