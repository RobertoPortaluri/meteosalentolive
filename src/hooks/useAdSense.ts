import { useEffect, useRef } from 'react';

interface UseAdSenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

export const useAdSense = ({ client, slot, format, responsive }: UseAdSenseProps) => {
  const adRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      // Verifica se AdSense è caricato
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        const adElement = adRef.current;
        
        // Controlla se l'elemento esiste e non è già stato processato
        if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
          // Aggiungi un ritardo per evitare conflitti
          setTimeout(() => {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
              console.log('AdSense initialization deferred');
            }
          }, 100);
        }
      }
    } catch (error) {
      console.log('AdSense not available');
    }
  }, [client, slot, format, responsive]);

  return adRef;
};

export default useAdSense;
