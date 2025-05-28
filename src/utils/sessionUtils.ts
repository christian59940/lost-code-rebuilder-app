
import { Session, AttendanceStats } from '@/types/Session';

export const getStatusColor = (status: Session['status']) => {
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

export const getStatusLabel = (status: Session['status']) => {
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

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (timeString: string) => {
  return timeString;
};

export const isSignatureRequestSent = (session: Session, period: 'morning' | 'afternoon') => {
  return session.signatureRequests.some(request => request.period === period);
};

export const getAttendanceStats = (session: Session): AttendanceStats => {
  const stats: AttendanceStats = {
    morning: { present: 0, late: 0, absent: 0 },
    afternoon: { present: 0, late: 0, absent: 0 }
  };

  session.attendanceTracking.forEach(record => {
    if (record.period === 'morning') {
      stats.morning[record.status]++;
    } else {
      stats.afternoon[record.status]++;
    }
  });

  return stats;
};
