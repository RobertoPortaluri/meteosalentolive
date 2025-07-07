declare module 'react-adsense' {
  import React from 'react';

  interface GoogleAdSenseProps {
    client: string;
    slot: string;
    style?: React.CSSProperties;
    responsive?: boolean;
    format?: string;
    layoutKey?: string;
    className?: string;
  }

  export namespace AdSense {
    export const Google: React.FC<GoogleAdSenseProps>;
  }

  export default AdSense;
}
