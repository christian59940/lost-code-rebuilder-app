
import { UserRole, User } from '@/contexts/AuthContext';
import { AdminStats, StudentStats, dashboardData } from '@/data/dashboardData';
import { TrendingUp, Users, Calendar, FileText, Settings, BookOpen, UserCheck, Check } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'scheduled':
      return 'bg-gray-100 text-gray-800';
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
    default:
      return 'Inconnue';
  }
};

export const getFilteredSessions = (user: User | null) => {
  if (user?.role === 'formateur') {
    return dashboardData.recentSessions.filter(session => session.instructorId === user.id);
  } else if (user?.role === 'apprenant') {
    return dashboardData.recentSessions.filter(session => 
      session.enrolledStudents?.includes(user.id)
    );
  }
  return dashboardData.recentSessions;
};

export const getUserSpecificStats = (user: User | null, filteredSessions: any[]): AdminStats | StudentStats => {
  if (user?.role === 'apprenant') {
    return {
      totalSessions: filteredSessions.length,
      completedSessions: filteredSessions.filter(s => s.status === 'completed').length,
      upcomingSessions: filteredSessions.filter(s => s.status === 'scheduled').length,
      attendanceRate: 95,
    };
  }
  return dashboardData.stats;
};

export const isStudentStats = (stats: AdminStats | StudentStats): stats is StudentStats => {
  return 'totalSessions' in stats;
};

export const getDashboardTitle = (role: UserRole | undefined, sessionsCount: number) => {
  switch (role) {
    case 'formateur':
      return 'Mes Sessions Récentes';
    case 'apprenant':
      return 'Mes Formations';
    default:
      return 'Sessions Récentes';
  }
};

export const getDashboardDescription = (role: UserRole | undefined, sessionsCount: number) => {
  switch (role) {
    case 'formateur':
      return `Aperçu de vos ${sessionsCount} session${sessionsCount > 1 ? 's' : ''} de formation`;
    case 'apprenant':
      return `Aperçu de vos ${sessionsCount} formation${sessionsCount > 1 ? 's' : ''} inscrites`;
    default:
      return 'Aperçu des dernières sessions de formation';
  }
};

export const getEmptyStateMessage = (role: UserRole | undefined) => {
  switch (role) {
    case 'formateur':
      return 'Vous n\'avez actuellement aucune session assignée.';
    case 'apprenant':
      return 'Vous n\'êtes inscrit à aucune formation pour le moment.';
    default:
      return 'Aucune session récente à afficher.';
  }
};

export const getTabsForRole = (role: UserRole | undefined) => {
  const commonTabs = [
    { value: 'overview', label: 'Aperçu', icon: TrendingUp },
  ];

  switch (role) {
    case 'admin':
      return [
        ...commonTabs,
        { value: 'users', label: 'Utilisateurs', icon: Users },
        { value: 'sessions', label: 'Sessions', icon: Calendar },
        { value: 'reports', label: 'Rapports', icon: FileText },
        { value: 'settings', label: 'Paramètres', icon: Settings },
      ];
    
    case 'gestionnaire_administratif':
      return [
        ...commonTabs,
        { value: 'sessions', label: 'Sessions', icon: Calendar },
        { value: 'signatures', label: 'Signatures', icon: UserCheck },
        { value: 'reports', label: 'Rapports', icon: FileText },
      ];
    
    case 'formateur':
      return [
        ...commonTabs,
        { value: 'my-sessions', label: 'Mes Sessions', icon: Calendar },
        { value: 'signatures', label: 'Signatures', icon: UserCheck },
      ];
    
    case 'apprenant':
      return [
        ...commonTabs,
        { value: 'formations', label: 'Mes Formations', icon: BookOpen },
        { value: 'calendar', label: 'Calendrier', icon: Calendar },
        { value: 'signatures', label: 'Mes Signatures', icon: Check },
      ];
    
    default:
      return commonTabs;
  }
};
