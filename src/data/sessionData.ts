
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
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Salle A1',
    status: 'in-progress',
    participants: ['3', '5', '6', '7'],
    attendanceTracking: [
      {
        participantId: '3',
        period: 'morning',
        status: 'present',
        timestamp: '2024-01-15T09:05:00Z'
      },
      {
        participantId: '5',
        period: 'morning',
        status: 'late',
        lateMinutes: 15,
        timestamp: '2024-01-15T09:15:00Z'
      }
    ],
    signatureRequests: [
      {
        period: 'morning',
        sentAt: '2024-01-15T08:30:00Z',
        status: 'sent'
      }
    ]
  },
  {
    id: '3',
    title: 'Workshop UX/UI Design',
    description: 'Atelier pratique sur les principes de design UX/UI',
    startDate: '2024-01-16',
    endDate: '2024-01-16',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Lab Design',
    status: 'scheduled',
    participants: ['3', '5', '6'],
    attendanceTracking: [],
    signatureRequests: []
  }
];

export const availableParticipants: Participant[] = [
  { id: '3', name: 'Pierre Dupont', email: 'pierre.dupont@example.com' },
  { id: '5', name: 'Lucas Petit', email: 'lucas.petit@example.com' },
  { id: '6', name: 'Emma Rousseau', email: 'emma.rousseau@example.com' },
  { id: '7', name: 'Sophie Martin', email: 'sophie.martin@example.com' },
];
