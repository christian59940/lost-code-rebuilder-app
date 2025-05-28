
// Dashboard data and type definitions

export type AdminStats = {
  totalUsers: number;
  activeSessions: number;
  todaySignatures: number;
  pendingSignatures: number;
};

export type StudentStats = {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  attendanceRate: number;
};

export const dashboardData = {
  stats: {
    totalUsers: 1247,
    activeSessions: 23,
    todaySignatures: 156,
    pendingSignatures: 12,
  },
  recentSessions: [
    {
      id: '1',
      title: 'Formation React Avancé',
      instructor: 'Marie Formatrice',
      instructorId: '2',
      date: '2024-01-15',
      time: '09:00-17:00',
      participants: 25,
      signatures: 23,
      status: 'in-progress' as const,
      enrolledStudents: ['3'], // Pierre Étudiant is enrolled
    },
    {
      id: '2',
      title: 'Initiation TypeScript',
      instructor: 'Jean Formateur',
      instructorId: '1',
      date: '2024-01-15',
      time: '14:00-16:00',
      participants: 15,
      signatures: 15,
      status: 'completed' as const,
      enrolledStudents: ['3'], // Pierre Étudiant is enrolled
    },
    {
      id: '3',
      title: 'Workshop UX/UI',
      instructor: 'Marie Formatrice',
      instructorId: '2',
      date: '2024-01-16',
      time: '10:00-12:00',
      participants: 20,
      signatures: 0,
      status: 'scheduled' as const,
      enrolledStudents: ['4'], // Other student enrolled, not Pierre
    },
  ],
  attendanceRate: 92,
  signatureRate: 88,
};
