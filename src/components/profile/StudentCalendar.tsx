
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';

// Données de démonstration pour le calendrier étudiant
const studentUpcomingSessions = [
  {
    id: '1',
    title: 'Formation React Avancé',
    instructor: 'Marie Formatrice',
    date: '2024-01-16',
    time: '09:00-17:00',
    location: 'Salle A',
    status: 'confirmed' as const,
    participants: 25,
  },
  {
    id: '2',
    title: 'Workshop UX/UI Design',
    instructor: 'Sophie Designeuse',
    date: '2024-01-18',
    time: '14:00-17:00',
    location: 'Lab Créatif',
    status: 'pending' as const,
    participants: 15,
  },
  {
    id: '3',
    title: 'Certification JavaScript',
    instructor: 'Jean Formateur',
    date: '2024-01-22',
    time: '10:00-12:00',
    location: 'Salle B',
    status: 'confirmed' as const,
    participants: 20,
  },
];

export const StudentCalendar = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      default:
        return 'Inconnue';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Mes Prochaines Formations
        </CardTitle>
        <CardDescription>
          Aperçu de vos formations à venir cette semaine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studentUpcomingSessions.map((session) => (
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
                <p className="text-sm text-gray-600 mb-2">
                  Formateur: {session.instructor}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {session.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {session.time}
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {session.participants} participants
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Lieu: {session.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
