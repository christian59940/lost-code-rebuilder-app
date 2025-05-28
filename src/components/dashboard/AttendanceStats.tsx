
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, BookOpen, Clock } from 'lucide-react';
import { AdminStats, StudentStats, dashboardData } from '@/data/dashboardData';
import { isStudentStats } from '@/utils/dashboardUtils';
import { handleCreateSession, handleManageUsers, handlePendingSignatures } from '@/utils/dashboardActions';
import { UserRole } from '@/contexts/AuthContext';

interface AttendanceStatsProps {
  userStats: AdminStats | StudentStats;
  userRole: UserRole | undefined;
}

export const AttendanceStats = ({ userStats, userRole }: AttendanceStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userRole === 'apprenant' ? 'Mon Assiduité' : 'Taux de Présence'}
        </CardTitle>
        <CardDescription>
          {userRole === 'apprenant' ? 'Votre performance ce mois' : 'Performance globale ce mois'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Taux de présence</span>
            <span className="text-sm text-gray-600">
              {isStudentStats(userStats) ? userStats.attendanceRate : dashboardData.attendanceRate}%
            </span>
          </div>
          <Progress 
            value={isStudentStats(userStats) ? userStats.attendanceRate : dashboardData.attendanceRate} 
            className="h-2" 
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Taux de signature</span>
            <span className="text-sm text-gray-600">{dashboardData.signatureRate}%</span>
          </div>
          <Progress value={dashboardData.signatureRate} className="h-2" />
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Actions rapides</h4>
          <div className="space-y-2">
            {userRole === 'admin' && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCreateSession(userRole)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Nouvelle session
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleManageUsers(userRole)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Gérer utilisateurs
                </Button>
              </>
            )}
            {userRole === 'apprenant' ? (
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Mes formations
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handlePendingSignatures(userRole)}
              >
                <Clock className="mr-2 h-4 w-4" />
                Signatures en attente
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
