import React, { useState, useEffect } from 'react';

interface RevenueData {
  adsense: number;
  sponsors: number;
  affiliates: number;
  month: string;
}

interface RevenueTrackerProps {
  isVisible?: boolean;
}

const RevenueTracker: React.FC<RevenueTrackerProps> = ({ isVisible = false }) => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [currentMonth, setCurrentMonth] = useState({
    adsense: 0,
    sponsors: 0,
    affiliates: 0,
    pageViews: 0,
    clicks: 0
  });

  // Simulazione dati per demo (in produzione, connettere alle API reali)
  useEffect(() => {
    const demoData: RevenueData[] = [
      { adsense: 25.50, sponsors: 100, affiliates: 15.30, month: '2025-01' },
      { adsense: 45.20, sponsors: 250, affiliates: 28.90, month: '2025-02' },
      { adsense: 78.90, sponsors: 400, affiliates: 52.10, month: '2025-03' },
    ];
    setRevenueData(demoData);
  }, []);

  const totalRevenue = revenueData.reduce(
    (sum, month) => sum + month.adsense + month.sponsors + month.affiliates, 
    0
  );

  const currentTotal = currentMonth.adsense + currentMonth.sponsors + currentMonth.affiliates;

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      minWidth: '300px',
      zIndex: 1000,
      border: '1px solid #ddd'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
        💰 Revenue Dashboard
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Totale Guadagni: €{totalRevenue.toFixed(2)}</strong>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Mese Corrente:</h4>
        <div>AdSense: €{currentMonth.adsense.toFixed(2)}</div>
        <div>Sponsor: €{currentMonth.sponsors.toFixed(2)}</div>
        <div>Affiliati: €{currentMonth.affiliates.toFixed(2)}</div>
        <div><strong>Totale: €{currentTotal.toFixed(2)}</strong></div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Metriche:</h4>
        <div>Page Views: {currentMonth.pageViews.toLocaleString()}</div>
        <div>Ad Clicks: {currentMonth.clicks}</div>
        <div>CTR: {currentMonth.pageViews ? ((currentMonth.clicks / currentMonth.pageViews) * 100).toFixed(2) : 0}%</div>
      </div>

      <div style={{ fontSize: '12px', color: '#666' }}>
        <strong>Proiezione annuale:</strong><br/>
        Scenario conservativo: €{(currentTotal * 12 * 1.5).toFixed(0)}<br/>
        Scenario ottimistico: €{(currentTotal * 12 * 3).toFixed(0)}
      </div>

      <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
        <strong>💡 Prossimi Obiettivi:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
          <li>Raggiungere 1000 utenti/giorno</li>
          <li>5 sponsor locali entro estate</li>
          <li>CTR AdSense &gt; 1%</li>
        </ul>
      </div>
    </div>
  );
};

export default RevenueTracker;
