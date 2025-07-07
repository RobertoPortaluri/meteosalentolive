# Guida alla Pubblicità - MeteoSalento

## Tipi di Pubblicità Implementati

### 1. Google AdSense 
- **Banner orizzontale** (728x90) - Header della pagina
- **Banner quadrato** (300x250) - Footer e sidebar
- **Banner verticale** (160x600) - Sidebar desktop

### 2. Pubblicità Personalizzata
- **Annunci sponsorizzati** - Contenuti promozionali personalizzati
- **Call-to-action** - Promozione app mobile e servizi

## Configurazione Google AdSense

### Passo 1: Registrazione AdSense
1. Vai su [Google AdSense](https://www.google.com/adsense/)
2. Registra il tuo sito web
3. Attendi l'approvazione (può richiedere fino a 14 giorni)

### Passo 2: Configurazione nel codice
1. Sostituisci `ca-pub-XXXXXXXXXXXXXXXXX` in `src/config/adsConfig.ts` con il tuo Publisher ID
2. Crea le unità pubblicitarie nel pannello AdSense
3. Sostituisci gli slot ID:
   - `YOUR_BANNER_SLOT_ID` - per banner orizzontali
   - `YOUR_SQUARE_SLOT_ID` - per banner quadrati
   - `YOUR_VERTICAL_SLOT_ID` - per banner verticali

### Passo 3: Aggiorna AdBanner.tsx
```typescript
// In src/components/AdBanner.tsx
<AdSense.Google
  client="ca-pub-TUO_PUBLISHER_ID" // Il tuo Publisher ID reale
  slot="TUO_SLOT_ID"               // Il tuo Slot ID reale
  // ... altre configurazioni
/>
```

## Posizionamento degli Annunci

### Strategia attuale:
1. **Header** - Banner orizzontale per massima visibilità
2. **Inline Content** - Annunci tra contenuto meteo e informazioni
3. **Footer** - Banner quadrato prima della chiusura pagina

### Best Practices:
- ✅ Non più di 3 annunci per pagina
- ✅ Equilibrio tra contenuto e pubblicità (80/20)
- ✅ Annunci chiaramente etichettati come "Pubblicità"
- ✅ Design integrato con l'estetica del sito

## Personalizzazione Annunci

### Modifica annunci in `src/config/adsConfig.ts`:

```typescript
{
  title: 'Il tuo titolo',
  description: 'Descrizione accattivante',
  imageUrl: 'url-della-tua-immagine',
  linkUrl: 'https://link-di-destinazione.com',
  type: 'simple'
}
```

### Funzioni disponibili:
- `getRandomAd()` - Ottiene un annuncio casuale
- `getAdsByKeyword(keyword)` - Filtra annunci per parola chiave

## Ottimizzazione delle Performance

### Metriche da monitorare:
- **CTR (Click-Through Rate)** - Percentuale di click sugli annunci
- **Viewability** - Percentuale di annunci visualizzati
- **Revenue** - Guadagni generati

### Suggerimenti:
1. Testa diverse posizioni
2. Usa A/B testing per titoli e descrizioni
3. Monitora le performance nel pannello AdSense
4. Adatta i contenuti al target (meteo/Salento)

## Compliance e Privacy

### GDPR/Cookie Policy:
- Implementa consenso cookie per AdSense
- Informa gli utenti sulla raccolta dati
- Fornisci opzioni di opt-out

### Esempio implementazione:
```typescript
// In futuro, aggiungere:
const [cookieConsent, setCookieConsent] = useState(false);

{cookieConsent && <AdBanner />}
```

## Monetizzazione Aggiuntiva

### Altre opzioni da considerare:
1. **Affiliate Marketing** - Promozione prodotti meteo
2. **Sponsored Content** - Articoli sponsorizzati
3. **Premium Features** - Versione pro dell'app
4. **Local Business** - Pubblicità attività locali del Salento

## Note Tecniche

### Lazy Loading:
Gli annunci sono caricati automaticamente quando visibili per ottimizzare le performance.

### Responsive Design:
Tutti gli annunci si adattano automaticamente alle dimensioni dello schermo.

### Performance:
- Utilizzare `react-adsense` per gestione ottimizzata
- Evitare troppe richieste simultanee
- Implementare fallback per annunci non caricati
