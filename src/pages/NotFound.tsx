
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page non trouvée</h1>
        <p className="mt-2 text-gray-600">
          La page que vous recherchez n'existe pas.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/dashboard')}>
            Retourner au tableau de bord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
