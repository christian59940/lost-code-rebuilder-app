
import { Session } from '@/types/Session';

export interface Participant {
  id: string;
  name: string;
  email: string;
}

export const demoSessions: Session[] = [
  {
    id: '1',
    title: 'Formation React Avancé',
    description: 'Formation approfondie sur React avec hooks, context et performance',
    instructor: 'Marie Formatrice',
    instructorId: '2',
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    startTime: '09:00',
    endTime: '17:00',
    participants: ['3', '5', '6', '7'],
    maxParticipants: 20,
    location: 'Salle A1',
    status: 'in-progress',
    signatures: [
      { participantId: '3', participantName: 'Pierre Dupont', signedAt: '2024-01-15T09:05:00Z', period: 'morning' },
    ],
    attendanceTracking: [
      { participantId: '3', participantName: 'Pierre Dupont', status: 'present', period: 'morning', recordedAt: '2024-01-15T09:05:00Z' },
      { participantId: '5', participantName: 'Lucas Petit', status: 'late', lateMinutes: 15, period: 'morning', recordedAt: '2024-01-15T09:15:00Z' },
    ],
    signatureRequests: [
      { period: 'morning', requestedAt: '2024-01-15T08:30:00Z' }
    ],
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '3',
    title: 'Workshop UX/UI Design',
    description: 'Atelier pratique sur les principes de design UX/UI',
    instructor: 'Marie Formatrice',
    instructorId: '2',
    startDate: '2024-01-16',
    endDate: '2024-01-16',
    startTime: '14:00',
    endTime: '18:00',
    participants: ['3', '5', '6'],
    maxParticipants: 12,
    location: 'Lab Design',
    status: 'scheduled',
    signatures: [],
    attendanceTracking: [],
    signatureRequests: [],
    createdAt: '2024-01-08T16:00:00Z',
  },
];

export const availableParticipants: Participant[] = [
  { id: '3', name: 'Pierre Dupont', email: 'pierre.dupont@example.com' },
  { id: '5', name: 'Lucas Petit', email: 'lucas.petit@example.com' },
  { id: '6', name: 'Emma Rousseau', email: 'emma.rousseau@example.com' },
  { id: '7', name: 'Sophie Martin', email: 'sophie.martin@example.com' },
];
