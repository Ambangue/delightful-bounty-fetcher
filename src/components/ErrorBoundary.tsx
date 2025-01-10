import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900">Oops! Une erreur est survenue</h1>
            <p className="text-gray-600">Nous nous excusons pour ce désagrément.</p>
            <div className="space-x-4">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Rafraîchir la page
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="default"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;