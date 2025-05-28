
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentCalendar } from '@/components/profile/StudentCalendar';
import { TrainerCalendar } from '@/components/profile/TrainerCalendar';
import { UserRole } from '@/contexts/AuthContext';

interface TabContentProps {
  userRole: UserRole | undefined;
}

export const AdminTabContent = () => (
  <>
    <TabsContent value="users" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Utilisateurs</CardTitle>
          <CardDescription>Gérez les comptes utilisateurs de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Interface de gestion des utilisateurs à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="sessions" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Sessions</CardTitle>
          <CardDescription>Créez et gérez les sessions de formation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Interface de gestion des sessions à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="reports" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rapports et Statistiques</CardTitle>
          <CardDescription>Consultez les rapports détaillés de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Interface de rapports à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="settings" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Système</CardTitle>
          <CardDescription>Configurez les paramètres de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Interface de paramètres à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>
  </>
);

export const StudentTabContent = () => (
  <>
    <TabsContent value="formations" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes Formations</CardTitle>
          <CardDescription>Consultez vos formations inscrites et leur progression</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Liste détaillée des formations à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="calendar" className="space-y-6">
      <StudentCalendar />
    </TabsContent>

    <TabsContent value="signatures" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mes Signatures</CardTitle>
          <CardDescription>Historique de vos signatures de présence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Historique des signatures à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>
  </>
);

export const TrainerTabContent = ({ userRole }: TabContentProps) => (
  <>
    <TabsContent value="my-sessions" className="space-y-6">
      {userRole === 'formateur' ? (
        <TrainerCalendar />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Sessions à Gérer</CardTitle>
            <CardDescription>Supervisez les sessions de formation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Interface de gestion des sessions à venir...</p>
          </CardContent>
        </Card>
      )}
    </TabsContent>

    <TabsContent value="signatures" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Signatures</CardTitle>
          <CardDescription>Validez et gérez les signatures de présence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Interface de validation des signatures à venir...</p>
        </CardContent>
      </Card>
    </TabsContent>
  </>
);

export const ManagerTabContent = () => (
  <TabsContent value="reports" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Rapports de Gestion</CardTitle>
        <CardDescription>Consultez les rapports de gestion des formations</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Interface de rapports à venir...</p>
      </CardContent>
    </Card>
  </TabsContent>
);
