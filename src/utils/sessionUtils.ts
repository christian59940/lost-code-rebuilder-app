
import { Session, AttendanceRecord } from '@/types/Session';

export const getStatusColor = (status: string) => {
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

export const getStatusLabel = (status: string) => {
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

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export const formatTime = (timeString: string) => {
  return timeString;
};

export const isSignatureRequestSent = (session: Session, period: 'morning' | 'afternoon') => {
  return session.signatureRequests.some(
    request => request.period === period && request.status === 'sent'
  );
};

export const getAttendanceStats = (session: Session) => {
  const morning = { present: 0, late: 0, absent: 0 };
  const afternoon = { present: 0, late: 0, absent: 0 };

  session.attendanceTracking.forEach(record => {
    const period = record.period === 'morning' ? morning : afternoon;
    switch (record.status) {
      case 'present':
        period.present++;
        break;
      case 'late':
        period.late++;
        break;
      case 'absent':
        period.absent++;
        break;
    }
  });

  return { morning, afternoon };
};

export const getParticipantName = (participantId: string) => {
  // Cette fonction sera utilisée pour récupérer le nom d'un participant
  // Pour l'instant, on retourne l'ID, mais cela pourrait être étendu avec une vraie base de données
  return `Participant ${participantId}`;
};
