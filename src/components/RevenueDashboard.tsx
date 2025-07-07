import React, { useState, useEffect } from 'react';
import './RevenueDashboard.css';

interface RevenueMetrics {
  adsense: {
    earnings: number;
    impressions: number;
    clicks: number;
    ctr: number;
    rpm: number;
  };
  sponsors: {
    activeSponsors: number;
    monthlyRevenue: number;
    pendingPayments: number;
  };
  affiliates: {
    commissions: number;
    conversions: number;
    conversionRate: number;
  };
  traffic: {
    pageViews: number;
    uniqueVisitors: number;
    averageSessionDuration: number;
  };
}

interface MonthlyData {
  month: string;
  total: number;
  adsense: number;
  sponsors: number;
  affiliates: number;
}

const RevenueDashboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    adsense: { earnings: 0, impressions: 0, clicks: 0, ctr: 0, rpm: 0 },
    sponsors: { activeSponsors: 0, monthlyRevenue: 0, pendingPayments: 0 },
    affiliates: { commissions: 0, conversions: 0, conversionRate: 0 },
    traffic: { pageViews: 0, uniqueVisitors: 0, averageSessionDuration: 0 }
  });
  
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  // Simulazione dati (in produzione, connetti alle API reali)
  useEffect(() => {
    const simulateMetrics = (): RevenueMetrics => ({
      adsense: {
        earnings: 87.45,
        impressions: 45230,
        clicks: 428,
        ctr: 0.95,
        rpm: 1.93
      },
      sponsors: {
        activeSponsors: 3,
        monthlyRevenue: 450.00,
        pendingPayments: 150.00
      },
      affiliates: {
        commissions: 23.80,
        conversions: 8,
        conversionRate: 2.1
      },
      traffic: {
        pageViews: 45230,
        uniqueVisitors: 12450,
        averageSessionDuration: 142
      }
    });

    const simulateMonthlyData = (): MonthlyData[] => [
      { month: '2024-12', total: 234.50, adsense: 45.50, sponsors: 150.00, affiliates: 39.00 },
      { month: '2025-01', total: 312.75, adsense: 62.75, sponsors: 200.00, affiliates: 50.00 },
      { month: '2025-02', total: 445.20, adsense: 95.20, sponsors: 300.00, affiliates: 50.00 },
      { month: '2025-03', total: 567.85, adsense: 117.85, sponsors: 400.00, affiliates: 50.00 },
      { month: '2025-04', total: 623.90, adsense: 123.90, sponsors: 450.00, affiliates: 50.00 },
      { month: '2025-05', total: 745.25, adsense: 145.25, sponsors: 550.00, affiliates: 50.00 },
      { month: '2025-06', total: 856.30, adsense: 156.30, sponsors: 650.00, affiliates: 50.00 }
    ];

    setMetrics(simulateMetrics());
    setMonthlyData(simulateMonthlyData());
  }, [selectedPeriod]);

  const totalEarnings = metrics.adsense.earnings + metrics.sponsors.monthlyRevenue + metrics.affiliates.commissions;
  const yearlyProjection = totalEarnings * 12;

  const exportToCSV = () => {
    const csvData = [
      ['Mese', 'Totale', 'AdSense', 'Sponsor', 'Affiliati'],
      ...monthlyData.map(row => [row.month, row.total, row.adsense, row.sponsors, row.affiliates])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meteosalento-ricavi-${new Date().toISOString().slice(0, 7)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Simulazione export PDF (in produzione, usa una libreria come jsPDF)
    alert('Funzione PDF in sviluppo. Per ora usa CSV o collegati direttamente a Google AdSense.');
  };

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="revenue-toggle-btn"
        title="Visualizza Dashboard Ricavi"
      >
        💰 Dashboard
      </button>
    );
  }

  return (
    <div className="revenue-dashboard-overlay">
      <div className="revenue-dashboard">
        <div className="dashboard-header">
          <h2>💰 Dashboard Ricavi MeteoSalento</h2>
          <div className="header-controls">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="period-selector"
            >
              <option value="today">Oggi</option>
              <option value="week">Questa settimana</option>
              <option value="month">Questo mese</option>
              <option value="year">Quest'anno</option>
            </select>
            <button onClick={() => setIsVisible(false)} className="close-btn">✕</button>
          </div>
        </div>

        <div className="metrics-grid">
          {/* Totale Guadagni */}
          <div className="metric-card total">
            <h3>💰 Totale Mese</h3>
            <div className="metric-value">€{totalEarnings.toFixed(2)}</div>
            <div className="metric-change">+15.3% vs mese scorso</div>
          </div>

          {/* AdSense */}
          <div className="metric-card adsense">
            <h3>📊 Google AdSense</h3>
            <div className="metric-value">€{metrics.adsense.earnings.toFixed(2)}</div>
            <div className="metric-details">
              <div>👁️ {metrics.adsense.impressions.toLocaleString()} impressioni</div>
              <div>🖱️ {metrics.adsense.clicks} click</div>
              <div>📈 CTR: {metrics.adsense.ctr}%</div>
              <div>💵 RPM: €{metrics.adsense.rpm}</div>
            </div>
          </div>

          {/* Sponsor */}
          <div className="metric-card sponsors">
            <h3>🤝 Sponsor Locali</h3>
            <div className="metric-value">€{metrics.sponsors.monthlyRevenue.toFixed(2)}</div>
            <div className="metric-details">
              <div>✅ {metrics.sponsors.activeSponsors} sponsor attivi</div>
              <div>⏳ €{metrics.sponsors.pendingPayments} in attesa</div>
            </div>
          </div>

          {/* Affiliati */}
          <div className="metric-card affiliates">
            <h3>🔗 Affiliati</h3>
            <div className="metric-value">€{metrics.affiliates.commissions.toFixed(2)}</div>
            <div className="metric-details">
              <div>🛒 {metrics.affiliates.conversions} conversioni</div>
              <div>📊 {metrics.affiliates.conversionRate}% tasso conversione</div>
            </div>
          </div>

          {/* Traffico */}
          <div className="metric-card traffic">
            <h3>📈 Traffico</h3>
            <div className="metric-value">{metrics.traffic.uniqueVisitors.toLocaleString()}</div>
            <div className="metric-details">
              <div>👁️ {metrics.traffic.pageViews.toLocaleString()} visualizzazioni</div>
              <div>⏱️ {metrics.traffic.averageSessionDuration}s sessione media</div>
            </div>
          </div>

          {/* Proiezione */}
          <div className="metric-card projection">
            <h3>🔮 Proiezione Annuale</h3>
            <div className="metric-value">€{yearlyProjection.toFixed(0)}</div>
            <div className="metric-change">Basata su trend attuale</div>
          </div>
        </div>

        {/* Grafico Andamento Mensile */}
        <div className="monthly-chart">
          <h3>📊 Andamento Mensile</h3>
          <div className="chart-container">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ height: `${(month.total / 1000) * 100}%` }}
                  title={`${month.month}: €${month.total}`}
                >
                  <div className="bar-adsense" style={{ height: `${(month.adsense / month.total) * 100}%` }}></div>
                  <div className="bar-sponsors" style={{ height: `${(month.sponsors / month.total) * 100}%` }}></div>
                  <div className="bar-affiliates" style={{ height: `${(month.affiliates / month.total) * 100}%` }}></div>
                </div>
                <div className="bar-label">{month.month.slice(-2)}</div>
                <div className="bar-value">€{month.total}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span className="legend-item adsense">AdSense</span>
            <span className="legend-item sponsors">Sponsor</span>
            <span className="legend-item affiliates">Affiliati</span>
          </div>
        </div>

        {/* Azioni Export */}
        <div className="export-actions">
          <h3>📥 Esporta Dati</h3>
          <div className="export-buttons">
            <button onClick={exportToCSV} className="export-btn csv">
              📊 Scarica CSV
            </button>
            <button onClick={exportToPDF} className="export-btn pdf">
              📄 Scarica PDF
            </button>
            <button 
              onClick={() => window.open('https://www.google.com/adsense/', '_blank')} 
              className="export-btn adsense-link"
            >
              🔗 Vai ad AdSense
            </button>
          </div>
        </div>

        {/* Links Utili */}
        <div className="useful-links">
          <h3>🔗 Collegamenti Utili</h3>
          <div className="links-grid">
            <a href="https://www.google.com/adsense/" target="_blank" rel="noopener noreferrer">
              Google AdSense Dashboard
            </a>
            <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
              Google Analytics
            </a>
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
              Search Console
            </a>
            <a href="https://www.google.com/adsense/new/u/0/pub-0000000000000000/reporting" target="_blank" rel="noopener noreferrer">
              Report AdSense Dettagliati
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
