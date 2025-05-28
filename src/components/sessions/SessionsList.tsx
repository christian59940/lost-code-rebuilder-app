
import { useState } from 'react';
import { SessionCard } from './SessionCard';
import { SessionActions } from './SessionActions';
import { Session } from '@/types/Session';
import { demoSessions } from '@/data/sessionData';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SessionsList = () => {
  const [sessions, setSessions] = useState<Session[]>(demoSessions);
  const { toast } = useToast();

  const handleAttendanceManagement = (session: Session) => {
    console.log('Gestion des présences pour:', session.title);
    toast({
      title: "Gestion des présences",
      description: `Ouverture de la gestion des présences pour "${session.title}"`,
    });
  };

  const handleSignatureRequest = (sessionId: string, period: 'morning' | 'afternoon') => {
    console.log('Demande de signature pour:', sessionId, period);
    
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? {
              ...session,
              signatureRequests: [
                ...session.signatureRequests,
                {
                  period,
                  requestedAt: new Date().toISOString()
                }
              ]
            }
          : session
      )
    );

    toast({
      title: "Demande de signature envoyée",
      description: `La demande de signature pour la période ${period === 'morning' ? 'du matin' : 'de l\'après-midi'} a été envoyée.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Programmée';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Sessions</h2>
        <p className="text-gray-600">Gérez les présences et les demandes de signature pour vos sessions de formation.</p>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-lg">{session.title}</h4>
                  <Badge className={getStatusColor(session.status)}>
                    {getStatusLabel(session.status)}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-2">{session.description}</p>
                <p className="text-sm text-gray-500">
                  {session.instructor} • {session.startDate} • {session.startTime} - {session.endTime} • {session.location}
                </p>
                <p className="text-sm text-gray-500">
                  {session.participants.length}/{session.maxParticipants} participants
                </p>
              </div>
              <SessionActions 
                sessionId={session.id}
                sessionTitle={session.title}
                status={session.status}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
