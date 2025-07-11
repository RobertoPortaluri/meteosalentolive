import React from 'react';
import './AdBanner.css';

interface AdPlaceholderProps {
  adType?: 'banner' | 'square' | 'vertical';
  className?: string;
  title?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ 
  adType = 'banner',
  className = '',
  title
}) => {
  const getAdInfo = () => {
    switch (adType) {
      case 'banner':
        return {
          icon: '📰',
          name: 'Banner Pubblicitario',
          dimensions: '728x90',
          description: 'Spazio per banner orizzontale'
        };
      case 'square':
        return {
          icon: '🎯',
          name: 'Annuncio Quadrato',
          dimensions: '300x250',
          description: 'Spazio per annuncio quadrato'
        };
      case 'vertical':
        return {
          icon: '📱',
          name: 'Banner Verticale',
          dimensions: '160x600',
          description: 'Spazio per banner verticale'
        };
      default:
        return {
          icon: '📢',
          name: 'Pubblicità',
          dimensions: 'Responsive',
          description: 'Spazio pubblicitario'
        };
    }
  };

  const adInfo = getAdInfo();

  return (
    <div className={`ad-banner ${adType} ${className} ad-placeholder`}>
      <div className="ad-label">Pubblicità</div>
      <div className="ad-placeholder-content">
        <div className="ad-placeholder-icon">{adInfo.icon}</div>
        <div className="ad-placeholder-text">
          <h4>{title || adInfo.name}</h4>
          <p>{adInfo.description}</p>
          <small>{adInfo.dimensions}</small>
        </div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
