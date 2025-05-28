
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
import { Plus, Search, Mail, Phone, GraduationCap, Building, User } from 'lucide-react';
import CreateParticipantForm from '@/components/forms/CreateParticipantForm';
import { toast } from '@/hooks/use-toast';

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  studentId?: string;
  company?: string;
  companyResponsible?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  apprenticeshipSupervisor?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  trainingTitle?: string;
  sessionsAttended: number;
  totalHours: number;
  createdAt: string;
  isActive: boolean;
}

// Updated demo data
const demoParticipants: Participant[] = [
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Dupont',
    email: 'pierre.dupont@ecole.fr',
    phone: '06 11 22 33 44',
    studentId: 'ETU2024001',
    company: 'TechCorp',
    trainingTitle: 'Formation React Avancé',
    companyResponsible: {
      firstName: 'Marie',
      lastName: 'Durand',
      phone: '01 23 45 67 89',
      email: 'marie.durand@techcorp.fr'
    },
    apprenticeshipSupervisor: {
      firstName: 'Jean',
      lastName: 'Martin',
      phone: '01 98 76 54 32',
      email: 'jean.martin@techcorp.fr'
    },
    sessionsAttended: 5,
    totalHours: 28,
    createdAt: '2024-01-03',
    isActive: true,
  },
  {
    id: '5',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@ecole.fr',
    phone: '06 55 66 77 88',
    studentId: 'ETU2024002',
    trainingTitle: 'Formation JavaScript',
    sessionsAttended: 3,
    totalHours: 18,
    createdAt: '2024-01-05',
    isActive: false,
  },
  {
    id: '6',
    firstName: 'Emma',
    lastName: 'Rousseau',
    email: 'emma.rousseau@example.com',
    phone: '06 99 88 77 66',
    studentId: 'ETU2024003',
    trainingTitle: 'Formation Python Avancé',
    sessionsAttended: 8,
    totalHours: 45,
    createdAt: '2024-01-04',
    isActive: true,
  },
];

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>(demoParticipants);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredParticipants = participants.filter(participant =>
    participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (participant.company && participant.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (participant.studentId && participant.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (participant.trainingTitle && participant.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateParticipant = (participant: Participant) => {
    const newParticipant = {
      ...participant,
      sessionsAttended: 0,
      totalHours: 0,
    };
    setParticipants([...participants, newParticipant]);
    setIsCreateDialogOpen(false);
  };

  const handleViewDetails = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDetailsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <PageLayout 
      title="Gestion des Participants"
      subtitle="Gérez vos participants et suivez leur progression"
    >
      <div className="space-y-6">
        {/* Header avec recherche et bouton d'ajout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau participant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un participant</DialogTitle>
                <DialogDescription>
                  Créez une fiche complète pour un nouveau participant
                </DialogDescription>
              </DialogHeader>
              <CreateParticipantForm 
                onParticipantCreated={handleCreateParticipant}
                onCancel={() => setIsCreateDialogOpen(false)}
                existingParticipants={participants}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{participants.length}</div>
              <p className="text-sm text-gray-600">Total participants</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {participants.filter(p => p.isActive).length}
              </div>
              <p className="text-sm text-gray-600">Actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {participants.filter(p => p.company).length}
              </div>
              <p className="text-sm text-gray-600">En entreprise</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {participants.reduce((total, p) => total + p.totalHours, 0)}h
              </div>
              <p className="text-sm text-gray-600">Heures totales</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant) => (
            <Card key={participant.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetails(participant)}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                      {participant.firstName.charAt(0)}{participant.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {participant.firstName} {participant.lastName}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Mail className="mr-1 h-3 w-3" />
                      {participant.email}
                    </div>
                    {participant.phone && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Phone className="mr-1 h-3 w-3" />
                        {participant.phone}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Informations académiques et formation */}
                <div className="space-y-2">
                  {participant.studentId && (
                    <div className="flex items-center text-sm">
                      <GraduationCap className="mr-2 h-4 w-4 text-blue-600" />
                      <span className="font-medium">{participant.studentId}</span>
                    </div>
                  )}
                  {participant.company && (
                    <div className="flex items-center text-sm">
                      <Building className="mr-2 h-4 w-4 text-purple-600" />
                      <span>{participant.company}</span>
                    </div>
                  )}
                  {participant.trainingTitle && (
                    <div className="flex items-center text-sm">
                      <GraduationCap className="mr-2 h-4 w-4 text-green-600" />
                      <span className="font-medium">{participant.trainingTitle}</span>
                    </div>
                  )}
                </div>

                {/* Statut */}
                <div className="flex items-center space-x-2">
                  <Badge className={participant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {participant.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                  {participant.company && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Apprentissage
                    </Badge>
                  )}
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-600">{participant.sessionsAttended}</div>
                    <div className="text-gray-600">Sessions</div>
                  </div>
                  <div>
                    <div className="font-medium text-green-600">{participant.totalHours}h</div>
                    <div className="text-gray-600">Heures</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-600">
                    Inscrit le {formatDate(participant.createdAt)}
                  </span>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de détails du participant */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Détails du participant</DialogTitle>
              <DialogDescription>
                Informations complètes et historique de participation
              </DialogDescription>
            </DialogHeader>
            {selectedParticipant && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
                    <div className="space-y-2">
                      <div><strong>Nom:</strong> {selectedParticipant.firstName} {selectedParticipant.lastName}</div>
                      <div><strong>Email:</strong> {selectedParticipant.email}</div>
                      {selectedParticipant.phone && <div><strong>Téléphone:</strong> {selectedParticipant.phone}</div>}
                      {selectedParticipant.studentId && <div><strong>Numéro étudiant:</strong> {selectedParticipant.studentId}</div>}
                      {selectedParticipant.trainingTitle && <div><strong>Formation:</strong> {selectedParticipant.trainingTitle}</div>}
                      <div><strong>Inscrit le:</strong> {formatDate(selectedParticipant.createdAt)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Statistiques de participation</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-blue-600">{selectedParticipant.sessionsAttended}</div>
                          <p className="text-sm text-gray-600">Sessions suivies</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-green-600">{selectedParticipant.totalHours}h</div>
                          <p className="text-sm text-gray-600">Heures de formation</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-purple-600">
                            {selectedParticipant.totalHours > 0 ? Math.round((selectedParticipant.totalHours / selectedParticipant.sessionsAttended) * 10) / 10 : 0}h
                          </div>
                          <p className="text-sm text-gray-600">Moyenne par session</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Informations entreprise */}
                {selectedParticipant.company && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informations entreprise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Entreprise</h4>
                        <div><strong>Nom:</strong> {selectedParticipant.company}</div>
                        
                        {selectedParticipant.companyResponsible && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Responsable en entreprise</h4>
                            <div className="space-y-1 text-sm">
                              <div><strong>Nom:</strong> {selectedParticipant.companyResponsible.firstName} {selectedParticipant.companyResponsible.lastName}</div>
                              <div><strong>Téléphone:</strong> {selectedParticipant.companyResponsible.phone}</div>
                              <div><strong>Email:</strong> {selectedParticipant.companyResponsible.email}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {selectedParticipant.apprenticeshipSupervisor && (
                        <div>
                          <h4 className="font-medium mb-2">Maître d'apprentissage</h4>
                          <div className="space-y-1 text-sm">
                            <div><strong>Nom:</strong> {selectedParticipant.apprenticeshipSupervisor.firstName} {selectedParticipant.apprenticeshipSupervisor.lastName}</div>
                            <div><strong>Téléphone:</strong> {selectedParticipant.apprenticeshipSupervisor.phone}</div>
                            <div><strong>Email:</strong> {selectedParticipant.apprenticeshipSupervisor.email}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Participants;
