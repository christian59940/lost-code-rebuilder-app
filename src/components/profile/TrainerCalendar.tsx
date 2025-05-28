
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { TrainingSession } from '@/types/TrainingSession';

export const TrainerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDateSessions, setSelectedDateSessions] = useState<TrainingSession[]>([]);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    {
      id: 'session-001',
      title: 'Formation React Avancé',
      date: '2025-06-15',
      timeSlot: 'morning',
      startTime: '09:00',
      endTime: '12:00',
      trainer: 'Jean Formateur',
      location: 'Salle A - Paris',
      participantCount: 12,
      status: 'confirmed',
      trainerPresence: 'present'
    },
    {
      id: 'session-002',
      title: 'Workshop UX/UI Design',
      date: '2025-06-15',
      timeSlot: 'afternoon',
      startTime: '14:00',
      endTime: '17:00',
      trainer: 'Jean Formateur',
      location: 'Salle B - Paris',
      participantCount: 8,
      status: 'confirmed',
      trainerPresence: 'present'
    },
    {
      id: 'session-003',
      title: 'Formation Vue.js',
      date: '2025-06-22',
      timeSlot: 'full-day',
      startTime: '09:00',
      endTime: '17:00',
      trainer: 'Jean Formateur',
      location: 'Salle C - Lyon',
      participantCount: 15,
      status: 'upcoming',
      trainerPresence: 'pending'
    },
    {
      id: 'session-004',
      title: 'Formation Angular',
      date: '2025-07-05',
      timeSlot: 'morning',
      startTime: '09:00',
      endTime: '12:00',
      trainer: 'Jean Formateur',
      location: 'Salle A - Paris',
      participantCount: 10,
      status: 'upcoming',
      trainerPresence: 'pending'
    },
    {
      id: 'session-005',
      title: 'Atelier TypeScript',
      date: '2025-07-05',
      timeSlot: 'afternoon',
      startTime: '14:00',
      endTime: '17:00',
      trainer: 'Jean Formateur',
      location: 'Salle A - Paris',
      participantCount: 10,
      status: 'upcoming',
      trainerPresence: 'pending'
    }
  ]);

  const getSessionsForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    const matchingSessions = trainingSessions.filter(session => session.date === dateString);
    return matchingSessions;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    const sessionsForDate = getSessionsForDate(date);
    setSelectedDateSessions(sessionsForDate);
    
    if (sessionsForDate.length > 0) {
      setIsSessionDialogOpen(true);
    }
  };

  const handlePresenceUpdate = (sessionId: string, presence: 'present' | 'absent') => {
    setTrainingSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, trainerPresence: presence }
          : session
      )
    );

    setSelectedDateSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, trainerPresence: presence }
          : session
      )
    );
  };

  const getTimeSlotLabel = (timeSlot: string) => {
    switch (timeSlot) {
      case 'morning':
        return 'Matin (9h-12h)';
      case 'afternoon':
        return 'Après-midi (14h-17h)';
      case 'full-day':
        return 'Journée complète (9h-17h)';
      default:
        return timeSlot;
    }
  };

  const sessionsForSelectedDate = selectedDate ? getSessionsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Mon calendrier de formations</span>
          </CardTitle>
          <CardDescription>
            Consultez vos sessions de formation et gérez votre présence. Cliquez sur les jours avec des formations pour confirmer votre présence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <p className="text-center text-gray-500">Calendrier à implémenter</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">
                {selectedDate
                  ? `Sessions du ${selectedDate.toLocaleDateString('fr-FR')}`
                  : 'Sélectionnez une date'
                }
              </h3>
              
              {sessionsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {sessionsForSelectedDate.map((session) => (
                    <div key={session.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-gray-600">
                        {getTimeSlotLabel(session.timeSlot)} • {session.location}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => handlePresenceUpdate(session.id, 'present')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Présent
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePresenceUpdate(session.id, 'absent')}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucune session de formation prévue pour cette date</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prochaines sessions à confirmer</CardTitle>
          <CardDescription>
            Sessions pour lesquelles vous devez encore confirmer votre présence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingSessions
              .filter(session => session.trainerPresence === 'pending' && new Date(session.date) >= new Date())
              .slice(0, 3)
              .map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString('fr-FR')} • {getTimeSlotLabel(session.timeSlot)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handlePresenceUpdate(session.id, 'present')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Présent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresenceUpdate(session.id, 'absent')}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            
            {trainingSessions.filter(session => session.trainerPresence === 'pending' && new Date(session.date) >= new Date()).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Toutes vos présences sont confirmées !</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
