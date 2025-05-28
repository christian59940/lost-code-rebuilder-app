
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Users = () => {
  return (
    <PageLayout 
      title="Gestion des Utilisateurs"
      subtitle="Administration des comptes utilisateurs"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs de la Plateforme</CardTitle>
            <CardDescription>Gérez les comptes et permissions des utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Interface de gestion des utilisateurs à venir...</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Users;
