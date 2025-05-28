
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  AlertTriangle,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  Bell
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données de démonstration pour les alertes d'absence
  const absenceAlerts = [
    {
      id: 'ALERT-001',
      trainer: {
        id: '2',
        name: 'Marie Formatrice',
        email: 'marie.formatrice@innovasign.fr'
      },
      session: {
        id: 'SESSION-001',
        title: 'Formation React Avancé - Module 3',
        date: '2024-02-20T09:00:00Z',
        duration: '7h',
        participants: 12
      },
      absenceDate: '2024-01-30T14:00:00Z',
      reason: 'Congés familiaux planifiés',
      daysUntilSession: 21,
      status: 'pending' as const,
      priority: 'high' as const
    },
    {
      id: 'ALERT-002',
      trainer: {
        id: '4',
        name: 'Sophie Bernard',
        email: 'sophie.bernard@innovasign.fr'
      },
      session: {
        id: 'SESSION-002',
        title: 'Workshop TypeScript',
        date: '2024-02-25T14:00:00Z',
        duration: '4h',
        participants: 8
      },
      absenceDate: '2024-02-04T11:30:00Z',
      reason: 'Formation continue obligatoire',
      daysUntilSession: 21,
      status: 'acknowledged' as const,
      priority: 'high' as const
    },
    {
      id: 'ALERT-003',
      trainer: {
        id: '2',
        name: 'Marie Formatrice',
        email: 'marie.formatrice@innovasign.fr'
      },
      session: {
        id: 'SESSION-003',
        title: 'Certification Angular',
        date: '2024-03-15T09:00:00Z',
        duration: '6h',
        participants: 15
      },
      absenceDate: '2024-02-22T16:45:00Z',
      reason: 'Rendez-vous médical spécialisé',
      daysUntilSession: 21,
      status: 'resolved' as const,
      priority: 'high' as const
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'acknowledged':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pris en compte</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Résolu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string, daysUntil: number) => {
    if (daysUntil <= 7) {
      return <Badge className="bg-red-500 text-white">Urgent</Badge>;
    } else if (daysUntil <= 14) {
      return <Badge className="bg-orange-500 text-white">Important</Badge>;
    } else {
      return <Badge className="bg-blue-500 text-white">À surveiller</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alerte prise en compte",
      description: "L'alerte a été marquée comme prise en compte",
    });
  };

  const handleResolve = (alertId: string) => {
    toast({
      title: "Alerte résolue",
      description: "L'alerte a été marquée comme résolue",
    });
  };

  const filteredAlerts = absenceAlerts.filter(alert =>
    alert.trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = absenceAlerts.filter(alert => alert.status === 'pending').length;
  const acknowledgedCount = absenceAlerts.filter(alert => alert.status === 'acknowledged').length;
  const resolvedCount = absenceAlerts.filter(alert => alert.status === 'resolved').length;

  return (
    <PageLayout 
      title="Alertes d'Absence"
      subtitle="Surveillance des absences de formateurs déclarées 3 semaines avant les sessions"
    >
      <div className="space-y-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{pendingCount}</p>
                  <p className="text-sm text-gray-600">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{acknowledgedCount}</p>
                  <p className="text-sm text-gray-600">Pris en compte</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
                  <p className="text-sm text-gray-600">Résolues</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{absenceAlerts.length}</p>
                  <p className="text-sm text-gray-600">Total alertes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par formateur, session ou motif..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Liste des alertes */}
        <Card>
          <CardHeader>
            <CardTitle>Alertes d'absence des formateurs</CardTitle>
            <CardDescription>
              Absences déclarées nécessitant une attention particulière
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {alert.trainer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{alert.trainer.name}</h4>
                          <p className="text-sm text-gray-600">{alert.trainer.email}</p>
                        </div>
                        {getPriorityBadge(alert.priority, alert.daysUntilSession)}
                        {getStatusBadge(alert.status)}
                      </div>
                      
                      <div className="ml-11 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{alert.session.title}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Date de session:</span> {formatDate(alert.session.date)}
                          </div>
                          <div>
                            <span className="font-medium">Durée:</span> {alert.session.duration}
                          </div>
                          <div>
                            <span className="font-medium">Participants:</span> {alert.session.participants}
                          </div>
                          <div>
                            <span className="font-medium">Absence déclarée le:</span> {new Date(alert.absenceDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md">
                          <span className="text-sm font-medium text-gray-700">Motif:</span>
                          <p className="text-sm text-gray-600 mt-1">{alert.reason}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {alert.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            Prendre en compte
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Marquer résolu
                          </Button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <Button 
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Marquer résolu
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune alerte trouvée
                </h3>
                <p className="text-gray-600">
                  Aucune alerte d'absence ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Alerts;
