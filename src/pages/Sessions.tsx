
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Sessions = () => {
  return (
    <PageLayout 
      title="Gestion des Sessions"
      subtitle="Administration des sessions de formation"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sessions de Formation</CardTitle>
            <CardDescription>Créez et gérez toutes les sessions de formation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Interface de gestion globale des sessions à venir...</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Sessions;
