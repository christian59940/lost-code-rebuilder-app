
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentCalendar } from '@/components/profile/StudentCalendar';

const StudentSessions = () => {
  return (
    <PageLayout 
      title="Mes Formations"
      subtitle="Gérez vos sessions de formation et signatures"
    >
      <div className="space-y-6">
        <StudentCalendar />
        
        <Card>
          <CardHeader>
            <CardTitle>Mes Sessions Récentes</CardTitle>
            <CardDescription>Historique et détails de vos formations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Liste détaillée des sessions à venir...</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default StudentSessions;
