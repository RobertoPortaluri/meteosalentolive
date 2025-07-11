import React, { useState } from 'react';
import useAdSense from '../hooks/useAdSense';
import { ADSENSE_CONTROL } from '../config/adsConfig';
import './AdBanner.css';

// Dichiarazione del tipo per AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  adType?: 'banner' | 'square' | 'vertical';
  adStyle?: 'display' | 'responsive';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  adType = 'banner', 
  adStyle = 'responsive',
  className = ''
}) => {
  const [showFallback, setShowFallback] = useState(false);

  // Configurazioni per diversi tipi di annunci
  const adConfigs = {
    banner: {
      width: '728',
      height: '90',
      slot: '1234567890'
    },
    square: {
      width: '300',
      height: '250',
      slot: '2345678901'
    },
    vertical: {
      width: '160',
      height: '600',
      slot: '3456789012'
    }
  };

  const config = adConfigs[adType];
  
  const adRef = useAdSense({
    client: 'ca-pub-6254733480668093',
    slot: config.slot,
    format: adStyle === 'responsive' ? 'auto' : undefined,
    responsive: adStyle === 'responsive'
  });

  // Mostra sempre il fallback se AdSense è disabilitato
  if (!ADSENSE_CONTROL.enableAdSense || showFallback || typeof window === 'undefined') {
    return (
      <div className={`ad-banner ${adType} ${className} ad-placeholder`}>
        <div className="ad-label">Pubblicità</div>
        <div className="ad-placeholder-content">
          <div className="ad-placeholder-icon">
            {adType === 'banner' ? '📰' : adType === 'square' ? '🎯' : '📱'}
          </div>
          <div className="ad-placeholder-text">
            <h4>📢 Spazio Pubblicitario</h4>
            <p>Annuncio {adType === 'banner' ? 'Banner' : adType === 'square' ? 'Quadrato' : 'Verticale'}</p>
            <small>{config.width}x{config.height}</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner ${adType} ${className}`}>
      <div className="ad-label">Pubblicità</div>
      <ins 
        ref={adRef as any}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: adStyle === 'responsive' ? '100%' : `${config.width}px`,
          height: `${config.height}px`
        }}
        data-ad-client="ca-pub-6254733480668093"
        data-ad-slot={config.slot}
        data-ad-format={adStyle === 'responsive' ? 'auto' : undefined}
        data-full-width-responsive={adStyle === 'responsive' ? 'true' : undefined}
        onError={() => setShowFallback(true)}
      />
    </div>
  );
};

// Componente per pubblicità semplice (senza AdSense)
interface SimpleAdProps {
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  className?: string;
}

export const SimpleAd: React.FC<SimpleAdProps> = ({
  title,
  description,
  imageUrl,
  linkUrl,
  className = ''
}) => {
  const handleClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank');
    }
  };

  return (
    <div className={`simple-ad ${className}`} onClick={handleClick}>
      <div className="ad-label">Pubblicità</div>
      <div className="ad-content">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="ad-image" />
        )}
        <div className="ad-text">
          <h4 className="ad-title">{title}</h4>
          <p className="ad-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
