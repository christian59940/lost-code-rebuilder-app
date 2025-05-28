
import { Session } from '@/types/Session';

// Données de démonstration pour les noms des participants
const participantNames: Record<string, string> = {
  'p1': 'Alice Martin',
  'p2': 'Bob Dupont',
  'p3': 'Claire Bernard',
  'p4': 'David Rousseau',
  'p5': 'Emma Leroy',
};

export const getParticipantName = (participantId: string): string => {
  return participantNames[participantId] || `Participant ${participantId}`;
};

export const prepareTrainerExportData = (sessions: Session[]) => {
  const data: Array<{
    nom: string;
    formation: string;
    date: string;
    heures: number;
    statut: string;
  }> = [];

  sessions.forEach(session => {
    // Calculer les heures de la session
    const startTime = new Date(`2000-01-01T${session.startTime}`);
    const endTime = new Date(`2000-01-01T${session.endTime}`);
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    data.push({
      nom: session.instructor,
      formation: session.title,
      date: session.startDate,
      heures: hours,
      statut: getStatusLabel(session.status),
    });
  });

  return data;
};

const getStatusLabel = (status: string): string => {
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
