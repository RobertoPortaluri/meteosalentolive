# 🚀 Guida Deploy MeteoSalento - Da GitHub a LIVE

## ✅ **OPZIONE 1: VERCEL (CONSIGLIATA)**

### Passaggi:
1. **Vai su [vercel.com](https://vercel.com)**
2. **"Sign up with GitHub"** 
3. **"Import Git Repository"**
4. **Seleziona la tua repo "meteosalentolive"**
5. **Deploy automatico!**

### Risultato:
- **URL**: `https://meteosalentolive.vercel.app`
- **Deploy automatici** ad ogni push
- **SSL gratuito**
- **CDN globale**

---

## ✅ **OPZIONE 2: NETLIFY**

### Passaggi:
1. **Vai su [netlify.com](https://netlify.com)**
2. **"Sign up with GitHub"**
3. **"New site from Git"**
4. **Seleziona GitHub → tua repo**
5. **Build command**: `npm run build`
6. **Publish directory**: `build`
7. **Deploy!**

### Risultato:
- **URL**: `https://meteosalentolive.netlify.app`

---

## ✅ **OPZIONE 3: GITHUB PAGES**

### Passaggi:
1. **Installa gh-pages** (già fatto ✅)
2. **Aggiungi script al package.json**:
```json
"homepage": "https://tuousername.github.io/meteosalentolive",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. **Esegui**: `npm run deploy`

### Risultato:
- **URL**: `https://tuousername.github.io/meteosalentolive`

---

## 🎯 **DOPO IL DEPLOY: COLLEGARE ADSENSE**

### 1. Ottieni l'URL del sito
Esempio: `https://meteosalentolive.vercel.app`

### 2. Aggiungi il sito ad AdSense:
1. **Vai su [adsense.google.com](https://adsense.google.com)**
2. **"Siti" → "Aggiungi sito"**
3. **Inserisci l'URL**: `meteosalentolive.vercel.app`
4. **Seleziona paese**: Italia

### 3. Verifica proprietà sito:
- **Metodo HTML**: Già fatto ✅ (codice in index.html)
- **Google Search Console**: Consigliato per SEO

### 4. Attendi approvazione:
- **Tempo**: 1-14 giorni
- **Requisiti**: Traffico minimo + contenuto di qualità
- **Policy**: No contenuti vietati

### 5. Sostituisci Publisher ID:
Nel file `src/config/adsConfig.ts`:
```typescript
publisherId: 'ca-pub-TUO_NUMERO_REALE'
```

---

## 🔧 **CONFIGURAZIONI POST-DEPLOY**

### API Keys da Sostituire:

#### 1. OpenWeather API:
```typescript
// In src/components/WeatherSearch.tsx
const API_KEY = 'TUA_OPENWEATHER_API_KEY';
```

#### 2. Firebase Config:
```typescript
// In src/firebase.ts
const firebaseConfig = {
  apiKey: "tua-firebase-api-key",
  authDomain: "tuo-project.firebaseapp.com",
  // ... resto configurazione
};
```

#### 3. AdSense Publisher ID:
```typescript
// In src/config/adsConfig.ts
publisherId: 'ca-pub-TUO_PUBLISHER_ID'
```

---

## 📊 **SETUP ANALYTICS & TRACKING**

### 1. Google Analytics:
1. **Vai su [analytics.google.com](https://analytics.google.com)**
2. **Crea proprietà** per il tuo dominio
3. **Aggiungi tracking code** in `public/index.html`
4. **Collega ad AdSense**

### 2. Google Search Console:
1. **Vai su [search.google.com/search-console](https://search.google.com/search-console)**
2. **Aggiungi proprietà** 
3. **Verifica dominio**
4. **Invia sitemap**: `tuosito.com/sitemap.xml`

---

## 🎯 **CHECKLIST POST-DEPLOY**

### Immediato:
- [ ] Sito online e funzionante
- [ ] Aggiunto ad AdSense
- [ ] API meteo configurata
- [ ] Firebase auth funzionante

### Prima settimana:
- [ ] Google Analytics installato
- [ ] Search Console configurato
- [ ] Primo contenuto SEO
- [ ] Social media setup

### Primo mese:
- [ ] AdSense approvato
- [ ] Primi guadagni
- [ ] 5+ articoli/contenuti
- [ ] Contatti sponsor locali

---

## 🚨 **POSSIBILI PROBLEMI & SOLUZIONI**

### Build Fails:
```bash
# Se il build fallisce, controlla:
npm run build
# Risolvi errori TypeScript
```

### AdSense Rejection:
- **Aggiungi contenuto**: Privacy Policy, About, Contatti
- **Traffico minimo**: 100+ visitatori/giorno
- **Conformità**: No click-bait, contenuto originale

### API Limits:
- **OpenWeather**: 60 calls/minuto (gratuito)
- **Quota exceeded**: Upgrade a pagamento

---

## 💰 **MONETIZZAZIONE IMMEDIATA**

### Sponsor Locali (anche senza AdSense):
1. **Ristoranti**: €50-200/mese
2. **Hotel/B&B**: €100-400/mese
3. **Lidi**: €150-500/mese (estate)
4. **Tour operator**: €100-300/mese

### Esempio Email Sponsor:
```
Oggetto: Partnership MeteoSalento Live - Visibilità turisti estate 2025

Ciao [Nome],

Sono Roberto, creatore di MeteoSalento Live, la nuova piattaforma meteo 
per il Salento che sta crescendo rapidamente.

Offro partnership pubblicitarie per la stagione estiva:
- Banner dedicato nella homepage
- Targeting utenti interessati al meteo/turismo Salento
- Package da €150/mese (luglio-settembre)

Interessato a una call di 10 minuti per discuterne?

Best,
Roberto
MeteoSalento Live
```

---

## 🎯 **PROSSIMI PASSI CONSIGLIATI**

1. **OGGI**: Deploy su Vercel
2. **Domani**: Richiesta AdSense + Analytics
3. **Questa settimana**: Prime email sponsor locali
4. **Questo mese**: Contenuti SEO + social media

**RISULTATO**: Sito live + monetizzazione attiva entro 30 giorni! 🚀
