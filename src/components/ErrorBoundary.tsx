import React, { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Aggiorna lo state per mostrare il fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log dell'errore solo se non è un errore AdSense noto
    if (!error.message.includes('adsbygoogle')) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      // Se è un errore AdSense, non mostrare nulla
      if (this.state.error?.message.includes('adsbygoogle')) {
        return null;
      }

      // Mostra il fallback personalizzato o quello di default
      return this.props.fallback || (
        <div className="error-boundary">
          <h3>⚠️ Qualcosa è andato storto</h3>
          <p>Si è verificato un errore imprevisto. Prova a ricaricare la pagina.</p>
          <button 
            onClick={() => window.location.reload()}
            className="error-boundary-button"
          >
            Ricarica Pagina
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
