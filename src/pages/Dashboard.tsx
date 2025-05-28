import { PageLayout } from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  Check,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Settings,
  FileText,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { StudentCalendar } from '@/components/profile/StudentCalendar';

// Données de démonstration pour le dashboard
const dashboardData = {
  stats: {
    totalUsers: 1247,
    activeSessions: 23,
    todaySignatures: 156,
    pendingSignatures: 12,
  },
  recentSessions: [
    {
      id: '1',
      title: 'Formation React Avancé',
      instructor: 'Marie Formatrice',
      instructorId: '2',
      date: '2024-01-15',
      time: '09:00-17:00',
      participants: 25,
      signatures: 23,
      status: 'in-progress' as const,
      enrolledStudents: ['3'], // Pierre Étudiant is enrolled
    },
    {
      id: '2',
      title: 'Initiation TypeScript',
      instructor: 'Jean Formateur',
      instructorId: '1',
      date: '2024-01-15',
      time: '14:00-16:00',
      participants: 15,
      signatures: 15,
      status: 'completed' as const,
      enrolledStudents: ['3'], // Pierre Étudiant is enrolled
    },
    {
      id: '3',
      title: 'Workshop UX/UI',
      instructor: 'Marie Formatrice',
      instructorId: '2',
      date: '2024-01-16',
      time: '10:00-12:00',
      participants: 20,
      signatures: 0,
      status: 'scheduled' as const,
      enrolledStudents: ['4'], // Other student enrolled, not Pierre
    },
  ],
  attendanceRate: 92,
  signatureRate: 88,
};

// Type definitions for stats
type AdminStats = {
  totalUsers: number;
  activeSessions: number;
  todaySignatures: number;
  pendingSignatures: number;
};

type StudentStats = {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  attendanceRate: number;
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter sessions based on user role
  const getFilteredSessions = () => {
    if (user?.role === 'formateur') {
      // Trainers only see their own sessions
      return dashboardData.recentSessions.filter(session => session.instructorId === user.id);
    } else if (user?.role === 'apprenant') {
      // Students only see sessions they are enrolled in
      return dashboardData.recentSessions.filter(session => 
        session.enrolledStudents?.includes(user.id)
      );
    }
    // Admins and other roles see all sessions
    return dashboardData.recentSessions;
  };

  const filteredSessions = getFilteredSessions();

  // Get stats specific to user role
  const getUserSpecificStats = (): AdminStats | StudentStats => {
    if (user?.role === 'apprenant') {
      // Students see their own enrollment stats
      return {
        totalSessions: filteredSessions.length,
        completedSessions: filteredSessions.filter(s => s.status === 'completed').length,
        upcomingSessions: filteredSessions.filter(s => s.status === 'scheduled').length,
        attendanceRate: 95, // Student's personal attendance rate
      };
    }
    return dashboardData.stats;
  };

  const userStats = getUserSpecificStats();
  const isStudentStats = (stats: AdminStats | StudentStats): stats is StudentStats => {
    return 'totalSessions' in stats;
  };

  // Statistiques principales
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

  const handleViewSessionDetails = (sessionId: string) => {
    toast({
      title: "Détails de la session",
      description: `Affichage des détails de la session ${sessionId}`,
    });
  };

  const handleCreateSession = () => {
    if (user?.role === 'formateur' || user?.role === 'apprenant') {
      toast({
        title: "Accès restreint",
        description: "Seuls les administrateurs peuvent créer de nouvelles sessions",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Nouvelle session",
        description: "Redirection vers la création de session",
      });
    }
  };

  const handleManageUsers = () => {
    if (user?.role === 'admin') {
      toast({
        title: "Gestion des utilisateurs",
        description: "Redirection vers la gestion des utilisateurs",
      });
    } else {
      toast({
        title: "Accès restreint",
        description: "Vous n'avez pas les permissions pour gérer les utilisateurs",
        variant: "destructive",
      });
    }
  };

  const handlePendingSignatures = () => {
    if (user?.role === 'apprenant') {
      toast({
        title: "Mes signatures",
        description: "Affichage de vos signatures de présence",
      });
    } else {
      toast({
        title: "Signatures en attente",
        description: "Affichage des signatures en attente de validation",
      });
    }
  };

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'formateur':
        return 'Mes Sessions Récentes';
      case 'apprenant':
        return 'Mes Formations';
      default:
        return 'Sessions Récentes';
    }
  };

  const getDashboardDescription = () => {
    switch (user?.role) {
      case 'formateur':
        return `Aperçu de vos ${filteredSessions.length} session${filteredSessions.length > 1 ? 's' : ''} de formation`;
      case 'apprenant':
        return `Aperçu de vos ${filteredSessions.length} formation${filteredSessions.length > 1 ? 's' : ''} inscrites`;
      default:
        return 'Aperçu des dernières sessions de formation';
    }
  };

  const getEmptyStateMessage = () => {
    switch (user?.role) {
      case 'formateur':
        return 'Vous n\'avez actuellement aucune session assignée.';
      case 'apprenant':
        return 'Vous n\'êtes inscrit à aucune formation pour le moment.';
      default:
        return 'Aucune session récente à afficher.';
    }
  };

  const getTabsForRole = () => {
    const commonTabs = [
      { value: 'overview', label: 'Aperçu', icon: TrendingUp },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...commonTabs,
          { value: 'users', label: 'Utilisateurs', icon: Users },
          { value: 'sessions', label: 'Sessions', icon: Calendar },
          { value: 'reports', label: 'Rapports', icon: FileText },
          { value: 'settings', label: 'Paramètres', icon: Settings },
        ];
      
      case 'gestionnaire_administratif':
        return [
          ...commonTabs,
          { value: 'sessions', label: 'Sessions', icon: Calendar },
          { value: 'signatures', label: 'Signatures', icon: UserCheck },
          { value: 'reports', label: 'Rapports', icon: FileText },
        ];
      
      case 'formateur':
        return [
          ...commonTabs,
          { value: 'my-sessions', label: 'Mes Sessions', icon: Calendar },
          { value: 'signatures', label: 'Signatures', icon: UserCheck },
        ];
      
      case 'apprenant':
        return [
          ...commonTabs,
          { value: 'formations', label: 'Mes Formations', icon: BookOpen },
          { value: 'calendar', label: 'Calendrier', icon: Calendar },
          { value: 'signatures', label: 'Mes Signatures', icon: Check },
        ];
      
      default:
        return commonTabs;
    }
  };

  const tabs = getTabsForRole();

  return (
    <PageLayout 
      title={`Bonjour ${user?.firstName} !`}
      subtitle="Voici un aperçu de votre activité"
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Onglet Aperçu */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {user?.role === 'apprenant' && isStudentStats(userStats) ? (
              // Student-specific stats
              <>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mes Formations</CardTitle>
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.totalSessions}</div>
                    <p className="text-xs text-gray-600 mt-1">Formations inscrites</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Terminées</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.completedSessions}</div>
                    <p className="text-xs text-green-600 mt-1">Formations complétées</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">À Venir</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.upcomingSessions}</div>
                    <p className="text-xs text-orange-600 mt-1">Formations planifiées</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mon Assiduité</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.attendanceRate}%</div>
                    <p className="text-xs text-purple-600 mt-1">Taux de présence</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              // Admin and trainer stats (existing)
              <>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleManageUsers}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(userStats as AdminStats).totalUsers}</div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% ce mois
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sessions Actives</CardTitle>
                    <Calendar className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(userStats as AdminStats).activeSessions}</div>
                    <p className="text-xs text-gray-600 mt-1">En cours aujourd'hui</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Signatures Aujourd'hui</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(userStats as AdminStats).todaySignatures}</div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Check className="h-3 w-3 mr-1" />
                      Taux: {dashboardData.signatureRate}%
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePendingSignatures}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(userStats as AdminStats).pendingSignatures}</div>
                    <p className="text-xs text-orange-600 mt-1">Signatures manquantes</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Sessions récentes et statistiques */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sessions récentes */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{getDashboardTitle()}</CardTitle>
                <CardDescription>{getDashboardDescription()}</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {user?.role === 'apprenant' ? 'Aucune formation' : 'Aucune session'}
                    </h3>
                    <p className="text-gray-600">{getEmptyStateMessage()}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{session.title}</h4>
                            <Badge className={getStatusColor(session.status)}>
                              {getStatusLabel(session.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {session.instructor} • {session.date} • {session.time}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              {session.signatures}/{session.participants} signatures
                            </span>
                            <Progress 
                              value={(session.signatures / session.participants) * 100} 
                              className="w-20 h-2"
                            />
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewSessionDetails(session.id)}
                        >
                          Voir détails
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistiques de présence */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {user?.role === 'apprenant' ? 'Mon Assiduité' : 'Taux de Présence'}
                </CardTitle>
                <CardDescription>
                  {user?.role === 'apprenant' ? 'Votre performance ce mois' : 'Performance globale ce mois'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Taux de présence</span>
                    <span className="text-sm text-gray-600">
                      {isStudentStats(userStats) ? userStats.attendanceRate : dashboardData.attendanceRate}%
                    </span>
                  </div>
                  <Progress 
                    value={isStudentStats(userStats) ? userStats.attendanceRate : dashboardData.attendanceRate} 
                    className="h-2" 
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Taux de signature</span>
                    <span className="text-sm text-gray-600">{dashboardData.signatureRate}%</span>
                  </div>
                  <Progress value={dashboardData.signatureRate} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Actions rapides</h4>
                  <div className="space-y-2">
                    {user?.role === 'admin' && (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={handleCreateSession}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Nouvelle session
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={handleManageUsers}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Gérer utilisateurs
                        </Button>
                      </>
                    )}
                    {user?.role === 'apprenant' ? (
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Mes formations
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={handlePendingSignatures}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Signatures en attente
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglets spécifiques selon le rôle */}
        {user?.role === 'admin' && (
          <>
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                  <CardDescription>Gérez les comptes utilisateurs de la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de gestion des utilisateurs à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Sessions</CardTitle>
                  <CardDescription>Créez et gérez les sessions de formation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de gestion des sessions à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports et Statistiques</CardTitle>
                  <CardDescription>Consultez les rapports détaillés de la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de rapports à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Système</CardTitle>
                  <CardDescription>Configurez les paramètres de la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de paramètres à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {user?.role === 'apprenant' && (
          <>
            <TabsContent value="formations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Formations</CardTitle>
                  <CardDescription>Consultez vos formations inscrites et leur progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Liste détaillée des formations à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <StudentCalendar />
            </TabsContent>

            <TabsContent value="signatures" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Signatures</CardTitle>
                  <CardDescription>Historique de vos signatures de présence</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Historique des signatures à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {(user?.role === 'formateur' || user?.role === 'gestionnaire_administratif') && (
          <>
            <TabsContent value="my-sessions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user?.role === 'formateur' ? 'Mes Sessions' : 'Sessions à Gérer'}
                  </CardTitle>
                  <CardDescription>
                    {user?.role === 'formateur' 
                      ? 'Gérez vos sessions de formation' 
                      : 'Supervisez les sessions de formation'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de gestion des sessions à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signatures" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Signatures</CardTitle>
                  <CardDescription>Validez et gérez les signatures de présence</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de validation des signatures à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {user?.role === 'gestionnaire_administratif' && (
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapports de Gestion</CardTitle>
                <CardDescription>Consultez les rapports de gestion des formations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de rapports à venir...</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </PageLayout>
  );
};

export default Dashboard;
