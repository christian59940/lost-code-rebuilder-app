import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search, Calendar, Clock, Users, CheckCircle, Link as LinkIcon, Play, Eye, X, UserPlus, GraduationCap, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import CreateActionSessionForm from '@/components/forms/CreateActionSessionForm';
import CreateApprenticeshipSessionForm from '@/components/forms/CreateApprenticeshipSessionForm';

interface Session {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  participants: string[];
  maxParticipants: number;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  signatures: Array<{
    participantId: string;
    participantName: string;
    signedAt: string;
  }>;
  createdAt: string;
}

// Données de démonstration
const demoSessions: Session[] = [
  {
    id: '1',
    title: 'Formation React Avancé',
    description: 'Formation approfondie sur React avec hooks, context et performance',
    instructor: 'Marie Martin',
    instructorId: '2',
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    startTime: '09:00',
    endTime: '17:00',
    participants: ['3', '5', '6', '7'],
    maxParticipants: 20,
    location: 'Salle A1',
    status: 'in-progress',
    signatures: [
      { participantId: '3', participantName: 'Pierre Dupont', signedAt: '2024-01-15T09:05:00Z' },
      { participantId: '5', participantName: 'Lucas Petit', signedAt: '2024-01-15T09:03:00Z' },
    ],
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Initiation TypeScript',
    description: 'Découverte des bases de TypeScript pour débutants',
    instructor: 'Sophie Bernard',
    instructorId: '4',
    startDate: '2024-01-16',
    endDate: '2024-01-16',
    startTime: '14:00',
    endTime: '16:00',
    participants: ['3', '6'],
    maxParticipants: 15,
    location: 'Salle B2',
    status: 'scheduled',
    signatures: [],
    createdAt: '2024-01-12T14:30:00Z',
  },
  {
    id: '3',
    title: 'Workshop UX/UI Design',
    description: 'Atelier pratique sur les principes de design UX/UI',
    instructor: 'Marie Martin',
    instructorId: '2',
    startDate: '2024-01-10',
    endDate: '2024-01-10',
    startTime: '10:00',
    endTime: '12:00',
    participants: ['3', '5', '6'],
    maxParticipants: 12,
    location: 'Lab Design',
    status: 'completed',
    signatures: [
      { participantId: '3', participantName: 'Pierre Dupont', signedAt: '2024-01-10T10:02:00Z' },
      { participantId: '5', participantName: 'Lucas Petit', signedAt: '2024-01-10T10:01:00Z' },
      { participantId: '6', participantName: 'Emma Rousseau', signedAt: '2024-01-10T10:03:00Z' },
    ],
    createdAt: '2024-01-08T16:00:00Z',
  },
];

// Données de démonstration pour les utilisateurs disponibles
const availableUsers = [
  { id: '3', name: 'Pierre Dupont', email: 'pierre.dupont@example.com', role: 'student' },
  { id: '5', name: 'Lucas Petit', email: 'lucas.petit@example.com', role: 'student' },
  { id: '6', name: 'Emma Rousseau', email: 'emma.rousseau@example.com', role: 'student' },
  { id: '7', name: 'Sophie Martin', email: 'sophie.martin@example.com', role: 'student' },
  { id: '8', name: 'Thomas Bernard', email: 'thomas.bernard@example.com', role: 'student' },
  { id: '9', name: 'Julie Durand', email: 'julie.durand@example.com', role: 'student' },
  { id: '10', name: 'Marc Lefebvre', email: 'marc.lefebvre@example.com', role: 'student' },
];

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>(demoSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActionSessionDialogOpen, setIsActionSessionDialogOpen] = useState(false);
  const [isApprenticeshipSessionDialogOpen, setIsApprenticeshipSessionDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateActionSession = (sessionData: any) => {
    const session: Session = {
      id: Date.now().toString(),
      title: sessionData.title,
      description: sessionData.description,
      instructor: 'Marie Martin',
      instructorId: '2',
      startDate: sessionData.actionTraining.trainingDates[0]?.date || '',
      endDate: sessionData.actionTraining.trainingDates[sessionData.actionTraining.trainingDates.length - 1]?.date || '',
      startTime: sessionData.actionTraining.trainingDates[0]?.startTime || '09:00',
      endTime: sessionData.actionTraining.trainingDates[0]?.endTime || '17:00',
      participants: [],
      maxParticipants: parseInt(sessionData.maxParticipants) || 20,
      location: sessionData.location,
      status: 'scheduled',
      signatures: [],
      createdAt: new Date().toISOString(),
    };

    setSessions([session, ...sessions]);
    setIsActionSessionDialogOpen(false);
    
    toast({
      title: "Session par action créée",
      description: `${session.title} a été programmée avec ${sessionData.actionTraining.numberOfDays} jour(s) de formation`,
    });
  };

  const handleCreateApprenticeshipSession = (sessionData: any) => {
    const session: Session = {
      id: Date.now().toString(),
      title: sessionData.title,
      description: sessionData.description,
      instructor: 'Marie Martin',
      instructorId: '2',
      startDate: sessionData.apprenticeshipTraining.startDate,
      endDate: sessionData.apprenticeshipTraining.endDate,
      startTime: sessionData.apprenticeshipTraining.startTime,
      endTime: sessionData.apprenticeshipTraining.endTime,
      participants: [],
      maxParticipants: parseInt(sessionData.maxParticipants) || 20,
      location: sessionData.location,
      status: 'scheduled',
      signatures: [],
      createdAt: new Date().toISOString(),
    };

    setSessions([session, ...sessions]);
    setIsApprenticeshipSessionDialogOpen(false);
    
    const weekDays = ['', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const dayName = weekDays[parseInt(sessionData.apprenticeshipTraining.weekDay)] || 'jour sélectionné';
    
    toast({
      title: "Session par apprentissage créée",
      description: `${session.title} aura lieu chaque ${dayName} du ${sessionData.apprenticeshipTraining.startDate} au ${sessionData.apprenticeshipTraining.endDate}`,
    });
  };

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Session['status']) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'in-progress':
        return 'En cours';
      case 'scheduled':
        return 'Programmée';
      case 'cancelled':
        return 'Annulée';
      default:
        return 'Inconnue';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getSignatureRate = (session: Session) => {
    if (session.participants.length === 0) return 0;
    return Math.round((session.signatures.length / session.participants.length) * 100);
  };

  const copySignatureLink = (sessionId: string) => {
    const url = `${window.location.origin}/signature/${sessionId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Lien copié",
      description: "Le lien de signature a été copié dans le presse-papiers",
    });
  };

  const handleViewDetails = (session: Session) => {
    setSelectedSession(session);
    setIsDetailsDialogOpen(true);
  };

  const handleStartSession = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'in-progress' as const }
        : session
    ));
    
    toast({
      title: "Session démarrée",
      description: "La session est maintenant en cours",
    });
  };

  const handleGoToSignature = (sessionId: string) => {
    navigate(`/signature/${sessionId}`);
  };

  const handleToggleParticipant = (userId: string) => {
    
  };

  const handleManageParticipants = (session: Session) => {
    setSelectedSession(session);
    setIsParticipantsDialogOpen(true);
  };

  const handleAddParticipantToSession = (sessionId: string, userId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId
        ? { ...session, participants: [...session.participants, userId] }
        : session
    ));
    
    const userName = availableUsers.find(u => u.id === userId)?.name;
    toast({
      title: "Participant ajouté",
      description: `${userName} a été ajouté à la session`,
    });
  };

  const handleRemoveParticipantFromSession = (sessionId: string, userId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId
        ? { 
            ...session, 
            participants: session.participants.filter(id => id !== userId),
            signatures: session.signatures.filter(sig => sig.participantId !== userId)
          }
        : session
    ));
    
    const userName = availableUsers.find(u => u.id === userId)?.name;
    toast({
      title: "Participant retiré",
      description: `${userName} a été retiré de la session`,
    });
  };

  const getParticipantName = (participantId: string) => {
    return availableUsers.find(u => u.id === participantId)?.name || 'Utilisateur inconnu';
  };

  return (
    <PageLayout 
      title="Gestion des Sessions"
      subtitle="Planifiez et gérez vos sessions de formation"
    >
      <div className="space-y-6">
        {/* Header avec recherche et boutons d'ajout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une session..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {/* Bouton Formation par Action */}
            <Dialog open={isActionSessionDialogOpen} onOpenChange={setIsActionSessionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="mr-2 h-4 w-4" />
                  Session par action
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Nouvelle session par action
                  </DialogTitle>
                  <DialogDescription>
                    Créez une session de formation avec des dates spécifiques et une durée déterminée
                  </DialogDescription>
                </DialogHeader>
                <CreateActionSessionForm 
                  onSubmit={handleCreateActionSession}
                  onCancel={() => setIsActionSessionDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Bouton Formation par Apprentissage */}
            <Dialog open={isApprenticeshipSessionDialogOpen} onOpenChange={setIsApprenticeshipSessionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Session par apprentissage
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    Nouvelle session par apprentissage
                  </DialogTitle>
                  <DialogDescription>
                    Créez une session de formation récurrente avec un jour fixe chaque semaine
                  </DialogDescription>
                </DialogHeader>
                <CreateApprenticeshipSessionForm 
                  onSubmit={handleCreateApprenticeshipSession}
                  onCancel={() => setIsApprenticeshipSessionDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{sessions.length}</div>
              <p className="text-sm text-gray-600">Total sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {sessions.filter(s => s.status === 'in-progress').length}
              </div>
              <p className="text-sm text-gray-600">En cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">
                {sessions.filter(s => s.status === 'scheduled').length}
              </div>
              <p className="text-sm text-gray-600">Programmées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {sessions.filter(s => s.status === 'completed').length}
              </div>
              <p className="text-sm text-gray-600">Terminées</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des sessions */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                      <Badge className={getStatusColor(session.status)}>
                        {getStatusLabel(session.status)}
                      </Badge>
                    </div>
                    
                    {session.description && (
                      <p className="text-gray-600 mb-3">{session.description}</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(session.startDate)}
                          {session.endDate && session.endDate !== session.startDate && (
                            ` - ${formatDate(session.endDate)}`
                          )}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(session.startTime)}
                          {session.endTime && ` - ${formatTime(session.endTime)}`}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{session.participants.length}/{session.maxParticipants} participants</span>
                      </div>
                    </div>

                    {session.location && (
                      <div className="mt-2 text-sm text-gray-600">
                        📍 {session.location}
                      </div>
                    )}

                    <div className="mt-3 text-sm text-gray-600">
                      Formateur: <span className="font-medium">{session.instructor}</span>
                    </div>

                    {/* Liste des participants */}
                    {session.participants.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">Participants:</div>
                        <div className="flex flex-wrap gap-1">
                          {session.participants.slice(0, 3).map((participantId) => (
                            <Badge key={participantId} variant="outline" className="text-xs">
                              {getParticipantName(participantId)}
                            </Badge>
                          ))}
                          {session.participants.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{session.participants.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Barre de progression des signatures */}
                    {session.participants.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Signatures</span>
                          <span className="text-sm text-gray-600">
                            {session.signatures.length}/{session.participants.length} ({getSignatureRate(session)}%)
                          </span>
                        </div>
                        <Progress value={getSignatureRate(session)} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(session)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Détails
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleManageParticipants(session)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <UserPlus className="mr-1 h-3 w-3" />
                      Participants
                    </Button>
                    
                    {session.status !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copySignatureLink(session.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <LinkIcon className="mr-1 h-3 w-3" />
                        Lien signature
                      </Button>
                    )}
                    
                    {session.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleStartSession(session.id)}
                      >
                        <Play className="mr-1 h-3 w-3" />
                        Démarrer
                      </Button>
                    )}

                    {(session.status === 'in-progress' || session.status === 'scheduled') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleGoToSignature(session.id)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Signature
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog de gestion des participants */}
        <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gérer les participants</DialogTitle>
              <DialogDescription>
                Ajoutez ou retirez des participants pour la session "{selectedSession?.title}"
              </DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                {/* Participants actuels */}
                <div>
                  <Label className="text-sm font-medium">Participants actuels ({selectedSession.participants.length})</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {selectedSession.participants.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">Aucun participant</p>
                    ) : (
                      selectedSession.participants.map((participantId) => {
                        const participant = availableUsers.find(u => u.id === participantId);
                        return (
                          <div key={participantId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <span className="font-medium">{participant?.name || 'Utilisateur inconnu'}</span>
                              <span className="text-sm text-gray-500 ml-2">{participant?.email}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveParticipantFromSession(selectedSession.id, participantId)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Ajouter des participants */}
                <div>
                  <Label className="text-sm font-medium">Ajouter des participants</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {availableUsers
                      .filter(user => !selectedSession.participants.includes(user.id))
                      .map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-gray-500 ml-2">{user.email}</span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddParticipantToSession(selectedSession.id, user.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Session Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Détails de la session</DialogTitle>
              <DialogDescription>
                Informations complètes sur la session de formation
              </DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Titre</Label>
                    <p className="font-medium">{selectedSession.title}</p>
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Badge className={getStatusColor(selectedSession.status)}>
                      {getStatusLabel(selectedSession.status)}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label>Description</Label>
                  <p className="text-gray-600">{selectedSession.description || 'Aucune description'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Formateur</Label>
                    <p className="font-medium">{selectedSession.instructor}</p>
                  </div>
                  <div>
                    <Label>Lieu</Label>
                    <p className="font-medium">{selectedSession.location || 'Non spécifié'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date et heure</Label>
                    <p className="font-medium">
                      {formatDate(selectedSession.startDate)} de {selectedSession.startTime} à {selectedSession.endTime}
                    </p>
                  </div>
                  <div>
                    <Label>Participants</Label>
                    <p className="font-medium">{selectedSession.participants.length}/{selectedSession.maxParticipants}</p>
                  </div>
                </div>

                {selectedSession.signatures.length > 0 && (
                  <div>
                    <Label>Signatures ({selectedSession.signatures.length})</Label>
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                      {selectedSession.signatures.map((signature, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium">{signature.participantName}</span>
                          <span className="text-sm text-gray-600">
                            {new Date(signature.signedAt).toLocaleString('fr-FR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {filteredSessions.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session trouvée</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Aucune session ne correspond à votre recherche.' : 'Commencez par créer votre première session de formation.'}
              </p>
              {!searchTerm && (
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => setIsActionSessionDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Zap className="mr-2 h-4 w-4" />
                    Session par action
                  </Button>
                  <Button onClick={() => setIsApprenticeshipSessionDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Session par apprentissage
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Sessions;