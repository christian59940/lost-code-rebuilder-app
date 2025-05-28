
import { useState } from 'react';
import { SessionCard } from './SessionCard';
import { Session } from '@/types/Session';
import { demoSessions } from '@/data/sessionData';
import { useToast } from '@/hooks/use-toast';

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
    
    // Simuler l'envoi de la demande de signature
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion des Sessions</h2>
        <p className="text-gray-600">Gérez les présences et les demandes de signature pour vos sessions de formation.</p>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onAttendanceManagement={handleAttendanceManagement}
            onSignatureRequest={handleSignatureRequest}
          />
        ))}
      </div>
    </div>
  );
};
