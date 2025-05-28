
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { StudentCalendarView } from '@/components/calendar/StudentCalendarView';
import { StudentTrainingSession } from '@/types/StudentTrainingSession';

// Données de démonstration pour le calendrier étudiant avec présence signée
const studentUpcomingSessions: StudentTrainingSession[] = [
  {
    id: '1',
    title: 'Formation React Avancé',
    trainer: 'Marie Formatrice',
    date: '2024-01-16',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Salle A',
    status: 'upcoming',
    hasSignedPresence: false,
  },
  {
    id: '2',
    title: 'Workshop UX/UI Design',
    trainer: 'Sophie Designeuse',
    date: '2024-01-18',
    startTime: '14:00',
    endTime: '17:00',
    location: 'Lab Créatif',
    status: 'upcoming',
    hasSignedPresence: false,
  },
  {
    id: '3',
    title: 'Certification JavaScript',
    trainer: 'Jean Formateur',
    date: '2024-01-22',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Salle B',
    status: 'completed',
    hasSignedPresence: true,
  },
  {
    id: '4',
    title: 'Formation Base de Données',
    trainer: 'Paul Expert',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '16:00',
    location: 'Salle C',
    status: 'completed',
    hasSignedPresence: false,
  },
];

export const StudentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir';
      case 'completed':
        return 'Terminée';
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      default:
        return 'Inconnue';
    }
  };

  const getSelectedDateSessions = () => {
    if (!selectedDate) return [];
    
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return studentUpcomingSessions.filter(session => 
      session.date === selectedDateStr
    );
  };

  const selectedDateSessions = getSelectedDateSessions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendrier interactif */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Mon Calendrier de Formation
          </CardTitle>
          <CardDescription>
            Cliquez sur une date pour voir vos formations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentCalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            trainingSessions={studentUpcomingSessions}
          />
        </CardContent>
      </Card>

      {/* Détails de la date sélectionnée ou liste générale */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate 
              ? `Formations du ${selectedDate.toLocaleDateString('fr-FR')}`
              : 'Mes Prochaines Formations'
            }
          </CardTitle>
          <CardDescription>
            {selectedDate 
              ? `${selectedDateSessions.length} formation${selectedDateSessions.length > 1 ? 's' : ''} ce jour`
              : 'Aperçu de vos formations à venir cette semaine'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(selectedDate ? selectedDateSessions : studentUpcomingSessions).map((session) => (
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
                    {session.status === 'completed' && (
                      <Badge 
                        className={session.hasSignedPresence 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                        }
                      >
                        {session.hasSignedPresence ? '✓ Signée' : '⚠ Non signée'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Formateur: {session.trainer}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {session.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {session.startTime}-{session.endTime}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Lieu: {session.location}
                  </p>
                </div>
              </div>
            ))}
            
            {selectedDate && selectedDateSessions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>Aucune formation prévue ce jour</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
