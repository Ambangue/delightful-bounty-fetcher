import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-buntu-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900">Page non trouvée</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="default"
            className="space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;