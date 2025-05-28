
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, Clock, Euro, BookOpen, Mail, Phone } from 'lucide-react';
import CreateTrainerForm from '@/components/ui/create-trainer-form';
import { toast } from '@/hooks/use-toast';

interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialties: string[];
  hourlyRate?: number;
  totalHours: number;
  totalEarnings: number;
  sessionsCount: number;
  bio?: string;
  createdAt: string;
  isActive: boolean;
}

interface SessionHours {
  sessionId: string;
  sessionTitle: string;
  date: string;
  hours: number;
  rate: number;
  earnings: number;
}

// Données de démonstration
const demoTrainers: Trainer[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@formation.fr',
    phone: '06 12 34 56 78',
    specialties: ['React', 'TypeScript', 'UX Design'],
    hourlyRate: 65,
    totalHours: 142,
    totalEarnings: 9230,
    sessionsCount: 15,
    bio: '10 ans d\'expérience en développement web et formation',
    createdAt: '2024-01-01',
    isActive: true,
  },
  {
    id: '2',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@formation.fr',
    phone: '06 98 76 54 32',
    specialties: ['JavaScript', 'Node.js', 'Database'],
    hourlyRate: 55,
    totalHours: 89,
    totalEarnings: 4895,
    sessionsCount: 8,
    bio: 'Développeuse senior et formatrice passionnée',
    createdAt: '2024-01-02',
    isActive: true,
  },
];

const demoSessionHours: Record<string, SessionHours[]> = {
  '1': [
    {
      sessionId: '1',
      sessionTitle: 'Formation React Avancé',
      date: '2024-01-15',
      hours: 8,
      rate: 65,
      earnings: 520,
    },
    {
      sessionId: '3',
      sessionTitle: 'Workshop UX/UI Design',
      date: '2024-01-10',
      hours: 2,
      rate: 65,
      earnings: 130,
    },
  ],
  '2': [
    {
      sessionId: '2',
      sessionTitle: 'Initiation TypeScript',
      date: '2024-01-16',
      hours: 2,
      rate: 55,
      earnings: 110,
    },
  ],
};

const Trainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>(demoTrainers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCreateTrainer = (trainer: Trainer) => {
    setTrainers([...trainers, trainer]);
    setIsCreateDialogOpen(false);
  };

  const handleViewDetails = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsDetailsDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <PageLayout 
      title="Gestion des Formateurs"
      subtitle="Gérez vos formateurs et comptabilisez leurs heures"
    >
      <div className="space-y-6">
        {/* Header avec recherche et bouton d'ajout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un formateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau formateur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Ajouter un formateur</DialogTitle>
                <DialogDescription>
                  Créez une fiche complète pour un nouveau formateur
                </DialogDescription>
              </DialogHeader>
              <CreateTrainerForm 
                onTrainerCreated={handleCreateTrainer}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{trainers.length}</div>
              <p className="text-sm text-gray-600">Total formateurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {trainers.filter(t => t.isActive).length}
              </div>
              <p className="text-sm text-gray-600">Actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {trainers.reduce((total, trainer) => total + trainer.totalHours, 0)}h
              </div>
              <p className="text-sm text-gray-600">Heures totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(trainers.reduce((total, trainer) => total + trainer.totalEarnings, 0))}
              </div>
              <p className="text-sm text-gray-600">Gains totaux</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des formateurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <Card key={trainer.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetails(trainer)}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {trainer.firstName.charAt(0)}{trainer.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {trainer.firstName} {trainer.lastName}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Mail className="mr-1 h-3 w-3" />
                      {trainer.email}
                    </div>
                    {trainer.phone && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Phone className="mr-1 h-3 w-3" />
                        {trainer.phone}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Spécialités */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Spécialités</div>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">{trainer.totalHours}h</div>
                      <div className="text-gray-600">Heures</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Euro className="mr-2 h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">{formatCurrency(trainer.totalEarnings)}</div>
                      <div className="text-gray-600">Gains</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-purple-600" />
                    <div>
                      <div className="font-medium">{trainer.sessionsCount}</div>
                      <div className="text-gray-600">Sessions</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 text-orange-600">€/h</div>
                    <div>
                      <div className="font-medium">{formatCurrency(trainer.hourlyRate || 0)}</div>
                      <div className="text-gray-600">Tarif</div>
                    </div>
                  </div>
                </div>

                {/* Statut */}
                <div className="flex justify-between items-center">
                  <Badge className={trainer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {trainer.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de détails du formateur */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Détails du formateur</DialogTitle>
              <DialogDescription>
                Informations complètes et historique des sessions
              </DialogDescription>
            </DialogHeader>
            {selectedTrainer && (
              <div className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
                    <div className="space-y-2">
                      <div><strong>Nom:</strong> {selectedTrainer.firstName} {selectedTrainer.lastName}</div>
                      <div><strong>Email:</strong> {selectedTrainer.email}</div>
                      {selectedTrainer.phone && <div><strong>Téléphone:</strong> {selectedTrainer.phone}</div>}
                      <div><strong>Membre depuis:</strong> {formatDate(selectedTrainer.createdAt)}</div>
                    </div>
                    {selectedTrainer.bio && (
                      <div className="mt-4">
                        <strong>Biographie:</strong>
                        <p className="text-gray-600 mt-1">{selectedTrainer.bio}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Résumé financier</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-blue-600">{selectedTrainer.totalHours}h</div>
                          <p className="text-sm text-gray-600">Heures totales enseignées</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedTrainer.totalEarnings)}</div>
                          <p className="text-sm text-gray-600">Gains totaux</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-purple-600">{formatCurrency(selectedTrainer.hourlyRate || 0)}</div>
                          <p className="text-sm text-gray-600">Tarif horaire</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Historique des sessions */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Historique des sessions</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {(demoSessionHours[selectedTrainer.id] || []).map((session, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{session.sessionTitle}</div>
                          <div className="text-sm text-gray-600">{formatDate(session.date)}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{session.hours}h × {formatCurrency(session.rate)}</div>
                          <div className="text-green-600 font-medium">{formatCurrency(session.earnings)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Trainers;
