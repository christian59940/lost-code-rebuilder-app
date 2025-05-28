
import { Session } from '@/types/Session';

export const availableParticipants = [
  { id: '1', name: 'Pierre Martin' },
  { id: '2', name: 'Marie Dupont' },
  { id: '3', name: 'Jean Durand' },
  { id: '4', name: 'Sophie Bernard' },
  { id: '5', name: 'Luc Moreau' },
];

export const demoSessions: Session[] = [
  {
    id: 'session-demo-1',
    title: 'Formation React Avancé',
    description: 'Approfondissement des concepts React avec hooks et context',
    startDate: '2025-06-15',
    endDate: '2025-06-15',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Salle A - Paris',
    status: 'in-progress',
    participants: ['1', '2', '3', '4'],
    attendanceTracking: [
      {
        participantId: '1',
        period: 'morning',
        status: 'present',
        timestamp: '2025-06-15T09:00:00Z'
      },
      {
        participantId: '2',
        period: 'morning',
        status: 'late',
        lateMinutes: 15,
        timestamp: '2025-06-15T09:15:00Z'
      }
    ],
    signatureRequests: [
      {
        period: 'morning',
        sentAt: '2025-06-15T12:00:00Z',
        status: 'sent'
      }
    ]
  },
  {
    id: 'session-demo-2',
    title: 'Workshop UX/UI Design',
    description: 'Atelier pratique de design d\'interface utilisateur',
    startDate: '2025-06-22',
    endDate: '2025-06-22',
    startTime: '14:00',
    endTime: '17:00',
    location: 'Salle B - Lyon',
    status: 'scheduled',
    participants: ['2', '3', '5'],
    attendanceTracking: [],
    signatureRequests: []
  }
];
