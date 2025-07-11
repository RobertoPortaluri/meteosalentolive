// Configurazione pubblicità per MeteoSalento

// Controllo globale AdSense
export const ADSENSE_CONTROL = {
  // Imposta su false per mostrare solo placeholder durante lo sviluppo
  enableAdSense: process.env.NODE_ENV === 'production' && false, // Disabilitato per ora
  
  // Configurazioni di sviluppo
  development: {
    showPlaceholders: true,
    logErrors: true,
    delayLoad: 1000 // Ritardo in ms per caricare gli annunci
  },
  
  // Configurazioni di produzione
  production: {
    showPlaceholders: false,
    logErrors: false,
    delayLoad: 100
  }
};

export interface AdConfig {
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  type: 'banner' | 'square' | 'simple';
}

// Configurazione Google AdSense
// NOTA: Dopo aver creato le unità pubblicitarie su AdSense, 
// sostituisci questi placeholder con i tuoi slot ID reali:
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-6254733480668093',
  slots: {
    banner: 'YOUR_BANNER_SLOT_ID',        // Es: '1234567890'
    square: 'YOUR_SQUARE_SLOT_ID',        // Es: '0987654321' 
    vertical: 'YOUR_VERTICAL_SLOT_ID'     // Es: '1122334455'
  }
};

// Pubblicità personalizzate/sponsorizzate
export const CUSTOM_ADS: AdConfig[] = [
  {
    title: '🌟 Scopri le migliori offerte per le tue vacanze!',
    description: 'Prenota ora e risparmia fino al 40% su hotel e voli. Offerta limitata!',
    imageUrl: 'https://via.placeholder.com/100x100/667eea/ffffff?text=🏖️',
    linkUrl: 'https://example.com/offerte',
    type: 'simple'
  },
  {
    title: '📱 Scarica la nostra App Mobile',
    description: 'Porta il meteo sempre con te! Notifiche in tempo reale e molto altro.',
    imageUrl: 'https://via.placeholder.com/100x100/764ba2/ffffff?text=📱',
    linkUrl: 'https://example.com/app',
    type: 'simple'
  },
  {
    title: '☀️ Protezione Solare Premium',
    description: 'Crema solare SPF 50+ resistente all\'acqua. Perfetta per le giornate al mare.',
    imageUrl: 'https://via.placeholder.com/100x100/ffd700/ffffff?text=☀️',
    linkUrl: 'https://example.com/protezione-solare',
    type: 'simple'
  },
  {
    title: '🌊 Escursioni in Barca nel Salento',
    description: 'Scopri le grotte marine e le spiagge più belle con le nostre escursioni.',
    imageUrl: 'https://via.placeholder.com/100x100/0077be/ffffff?text=🌊',
    linkUrl: 'https://example.com/escursioni',
    type: 'simple'
  },
  {
    title: '🍕 Ristoranti Tipici Salentini',
    description: 'Gusta i sapori autentici del Salento nei migliori ristoranti della zona.',
    imageUrl: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=🍕',
    linkUrl: 'https://example.com/ristoranti',
    type: 'simple'
  }
];

// Funzione per ottenere un annuncio casuale
export const getRandomAd = (): AdConfig => {
  const randomIndex = Math.floor(Math.random() * CUSTOM_ADS.length);
  return CUSTOM_ADS[randomIndex];
};

// Funzione per ottenere annunci per categoria
export const getAdsByKeyword = (keyword: string): AdConfig[] => {
  return CUSTOM_ADS.filter(ad => 
    ad.title.toLowerCase().includes(keyword.toLowerCase()) ||
    ad.description.toLowerCase().includes(keyword.toLowerCase())
  );
};
