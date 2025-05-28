
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  TrendingUp,
  Check
} from 'lucide-react';
import { AdminStats, StudentStats } from '@/data/dashboardData';
import { dashboardData } from '@/data/dashboardData';
import { isStudentStats } from '@/utils/dashboardUtils';
import { handleManageUsers, handlePendingSignatures } from '@/utils/dashboardActions';
import { UserRole } from '@/contexts/AuthContext';

interface DashboardStatsProps {
  userStats: AdminStats | StudentStats;
  userRole: UserRole | undefined;
}

export const DashboardStats = ({ userStats, userRole }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {userRole === 'apprenant' && isStudentStats(userStats) ? (
        // Student-specific stats
        <>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mes Formations</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalSessions}</div>
              <p className="text-xs text-gray-600 mt-1">Formations inscrites</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.completedSessions}</div>
              <p className="text-xs text-green-600 mt-1">Formations complétées</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">À Venir</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.upcomingSessions}</div>
              <p className="text-xs text-orange-600 mt-1">Formations planifiées</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mon Assiduité</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.attendanceRate}%</div>
              <p className="text-xs text-purple-600 mt-1">Taux de présence</p>
            </CardContent>
          </Card>
        </>
      ) : (
        // Admin and trainer stats
        <>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleManageUsers(userRole)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(userStats as AdminStats).totalUsers}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions Actives</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(userStats as AdminStats).activeSessions}</div>
              <p className="text-xs text-gray-600 mt-1">En cours aujourd'hui</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Signatures Aujourd'hui</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(userStats as AdminStats).todaySignatures}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Check className="h-3 w-3 mr-1" />
                Taux: {dashboardData.signatureRate}%
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePendingSignatures(userRole)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(userStats as AdminStats).pendingSignatures}</div>
              <p className="text-xs text-orange-600 mt-1">Signatures manquantes</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
