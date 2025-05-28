
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Calendar, MapPin, User, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SignatureSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

// Données de démonstration pour la session
const demoSessionData: Record<string, SignatureSession> = {
  '1': {
    id: '1',
    title: 'Formation React Avancé',
    instructor: 'Marie Martin',
    date: '15 janvier 2024',
    time: '09:00 - 17:00',
    location: 'Salle A1',
    description: 'Formation approfondie sur React avec hooks, context et performance',
    status: 'in-progress',
  },
  '2': {
    id: '2',
    title: 'Initiation TypeScript',
    instructor: 'Sophie Bernard',
    date: '16 janvier 2024',
    time: '14:00 - 16:00',
    location: 'Salle B2',
    description: 'Découverte des bases de TypeScript pour débutants',
    status: 'scheduled',
  },
};

const Signature = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<SignatureSession | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pin: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId && demoSessionData[sessionId]) {
      setSession(demoSessionData[sessionId]);
    }
  }, [sessionId]);

  if (!sessionId || !session) {
    return <Navigate to="/404" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation des champs
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Veuillez remplir tous les champs obligatoires');
      setIsLoading(false);
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      setIsLoading(false);
      return;
    }

    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulation de la signature réussie
    setIsSuccess(true);
    setIsLoading(false);
    
    toast({
      title: "Signature enregistrée",
      description: "Votre présence a été confirmée avec succès",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'En cours';
      case 'scheduled':
        return 'Programmée';
      case 'completed':
        return 'Terminée';
      default:
        return 'Inconnue';
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
        <Card className="w-full max-w-md text-center shadow-lg border-0">
          <CardContent className="p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Signature confirmée !</h1>
            <p className="text-gray-600 mb-6">
              Votre présence à la session "{session.title}" a été enregistrée avec succès.
            </p>
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
              <p><strong>Nom :</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email :</strong> {formData.email}</p>
              <p><strong>Heure de signature :</strong> {new Date().toLocaleString('fr-FR')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header avec logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">EduSign Pro</h1>
          <p className="text-gray-600">Signature de présence</p>
        </div>

        {/* Informations de la session */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{session.title}</CardTitle>
              <Badge className={getStatusColor(session.status)}>
                {getStatusLabel(session.status)}
              </Badge>
            </div>
            <CardDescription>{session.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span><strong>Formateur :</strong> {session.instructor}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span><strong>Date :</strong> {session.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span><strong>Horaire :</strong> {session.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span><strong>Lieu :</strong> {session.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de signature */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Confirmer votre présence</CardTitle>
            <CardDescription>
              Veuillez remplir le formulaire ci-dessous pour signer votre présence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Adresse email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label htmlFor="pin">Code PIN (optionnel)</Label>
                <Input
                  id="pin"
                  type="text"
                  placeholder="Code de validation"
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  disabled={isLoading}
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Si un code PIN vous a été fourni, veuillez le saisir ici
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signature en cours...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Confirmer ma présence
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">À propos de cette signature</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Votre signature sera horodatée automatiquement</p>
                <p>• Les données sont sécurisées et conformes au RGPD</p>
                <p>• Un accusé de réception sera envoyé par email</p>
                <p>• En cas de problème, contactez le formateur</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signature;
