
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrainerCalendar } from '@/components/profile/TrainerCalendar';

const TrainerSessions = () => {
  return (
    <PageLayout 
      title="Mes Sessions"
      subtitle="Gérez vos sessions de formation et les signatures"
    >
      <div className="space-y-6">
        <TrainerCalendar />
        
        <Card>
          <CardHeader>
            <CardTitle>Gestion des Sessions</CardTitle>
            <CardDescription>Supervisez vos sessions et validez les signatures</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Interface de gestion des sessions à venir...</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TrainerSessions;
