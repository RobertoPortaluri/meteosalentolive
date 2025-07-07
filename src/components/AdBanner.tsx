import React from 'react';
import AdSense from 'react-adsense';
import './AdBanner.css';

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
  // Configurazioni per diversi tipi di annunci
  const adConfigs = {
    banner: {
      width: '728',
      height: '90',
      slot: 'YOUR_BANNER_SLOT_ID'
    },
    square: {
      width: '300',
      height: '250',
      slot: 'YOUR_SQUARE_SLOT_ID'
    },
    vertical: {
      width: '160',
      height: '600',
      slot: 'YOUR_VERTICAL_SLOT_ID'
    }
  };

  const config = adConfigs[adType];

  return (
    <div className={`ad-banner ${adType} ${className}`}>
      <div className="ad-label">Pubblicità</div>
      <AdSense.Google
        client="ca-pub-6254733480668093" // Il tuo publisher ID reale
        slot={config.slot}
        style={{
          width: adStyle === 'responsive' ? '100%' : config.width,
          height: config.height,
          display: 'block'
        }}
        responsive={adStyle === 'responsive'}
        format={adStyle === 'responsive' ? 'auto' : undefined}
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
