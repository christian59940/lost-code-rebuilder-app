
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  BookOpen,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ExcelExport } from '@/components/export/ExcelExport';
import { DateRangeFilter } from '@/components/ui/date-range-filter';

// Données de démonstration pour les sessions étudiantes
const studentSessionsData = [
  {
    id: '1',
    title: 'Formation React Avancé',
    instructor: 'Marie Formatrice',
    date: '2024-01-15',
    time: '09:00-17:00',
    location: 'Salle A - Paris',
    participants: 25,
    status: 'in-progress' as const,
    attendance: 'present' as const,
    completion: 75,
    description: 'Approfondir vos connaissances en React avec les hooks avancés, la gestion d\'état et les patterns modernes.',
  },
  {
    id: '2',
    title: 'Initiation TypeScript',
    instructor: 'Jean Formateur',
    date: '2024-01-10',
    time: '14:00-16:00',
    location: 'Salle B - Paris',
    participants: 15,
    status: 'completed' as const,
    attendance: 'present' as const,
    completion: 100,
    description: 'Découverte du typage statique avec TypeScript pour améliorer la robustesse de vos applications.',
  },
  {
    id: '3',
    title: 'Workshop UX/UI Design',
    instructor: 'Sophie Designer',
    date: '2024-01-20',
    time: '10:00-12:00',
    location: 'Lab Design - Lyon',
    participants: 20,
    status: 'scheduled' as const,
    attendance: 'pending' as const,
    completion: 0,
    description: 'Apprendre les principes fondamentaux du design d\'interface et d\'expérience utilisateur.',
  },
  {
    id: '4',
    title: 'Formation Vue.js',
    instructor: 'Pierre Développeur',
    date: '2024-01-25',
    time: '09:00-17:00',
    location: 'Salle C - Marseille',
    participants: 18,
    status: 'scheduled' as const,
    attendance: 'pending' as const,
    completion: 0,
    description: 'Maîtriser le framework Vue.js pour créer des applications web modernes et réactives.',
  },
];

const StudentSessions = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<{ from?: Date; to?: Date }>({});

  const filteredSessions = studentSessionsData.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && session.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'in-progress':
        return 'En cours';
      case 'scheduled':
        return 'Programmée';
      default:
        return 'Inconnue';
    }
  };

  const getAttendanceBadge = (attendance: string) => {
    switch (attendance) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Présent
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            À confirmer
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleSignSession = (sessionId: string) => {
    toast({
      title: "Signature de présence",
      description: `Ouverture de la signature pour la session ${sessionId}`,
    });
    // Navigate to signature page or open signature modal
  };

  const getStats = () => {
    const completed = studentSessionsData.filter(s => s.status === 'completed').length;
    const inProgress = studentSessionsData.filter(s => s.status === 'in-progress').length;
    const scheduled = studentSessionsData.filter(s => s.status === 'scheduled').length;
    const totalAttendance = studentSessionsData.filter(s => s.attendance === 'present').length;
    const attendanceRate = Math.round((totalAttendance / studentSessionsData.length) * 100);

    return { completed, inProgress, scheduled, attendanceRate };
  };

  const stats = getStats();

  // Préparer les données pour l'export Excel
  const prepareExportData = () => {
    return studentSessionsData
      .filter(session => session.attendance === 'present') // Seulement les présences
      .map(session => ({
        nom: `${user?.firstName || 'Étudiant'} ${user?.lastName || 'Nom'}`,
        formation: session.title,
        date: session.date,
        heures: calculateSessionHours(session.time), // Calculer les heures depuis le time slot
        statut: 'Présent'
      }));
  };

  // Fonction pour calculer les heures d'une session
  const calculateSessionHours = (timeSlot: string) => {
    // Extraire les heures du format "09:00-17:00"
    const [start, end] = timeSlot.split('-');
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    return endHour - startHour;
  };

  return (
    <PageLayout 
      title="Mes Formations"
      subtitle="Consultez vos formations, votre progression et gérez votre présence"
    >
      <div className="space-y-6">
        {/* Export et filtres */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DateRangeFilter 
              dateFilter={dateFilter}
              onFilterChange={setDateFilter}
            />
          </div>
          <div className="flex items-end">
            <ExcelExport
              data={prepareExportData()}
              filename="mes_heures_presence"
              title="Heures de présence"
              dateFilter={dateFilter}
            />
          </div>
        </div>

        {/* Statistiques personnelles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{studentSessionsData.length}</div>
                  <p className="text-sm text-gray-600">Total formations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                  <p className="text-sm text-gray-600">Terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{stats.scheduled}</div>
                  <p className="text-sm text-gray-600">À venir</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</div>
                  <p className="text-sm text-gray-600">Assiduité</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <CardTitle>Mes Sessions de Formation</CardTitle>
                <CardDescription>
                  Gérez votre participation et suivez votre progression
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtres */}
            <div className="flex space-x-2 mb-6">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                Toutes
              </Button>
              <Button
                variant={selectedFilter === 'scheduled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('scheduled')}
              >
                Programmées
              </Button>
              <Button
                variant={selectedFilter === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('in-progress')}
              >
                En cours
              </Button>
              <Button
                variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('completed')}
              >
                Terminées
              </Button>
            </div>

            {/* Liste des sessions */}
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <Card key={session.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{session.title}</h3>
                          <Badge className={getStatusColor(session.status)}>
                            {getStatusLabel(session.status)}
                          </Badge>
                          {getAttendanceBadge(session.attendance)}
                        </div>
                        <p className="text-gray-600 mb-3">{session.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{session.instructor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{session.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {session.status === 'in-progress' && (
                          <Button
                            onClick={() => handleSignSession(session.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Signer ma présence
                          </Button>
                        )}
                        {session.status === 'scheduled' && (
                          <Badge variant="outline" className="text-gray-600">
                            Bientôt disponible
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Barre de progression */}
                    {session.completion > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progression</span>
                          <span className="text-sm text-gray-600">{session.completion}%</span>
                        </div>
                        <Progress value={session.completion} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSessions.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation trouvée</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Aucune formation ne correspond à votre recherche.' 
                    : 'Vous n\'avez aucune formation dans cette catégorie.'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default StudentSessions;
