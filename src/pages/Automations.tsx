
import { PageLayout } from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AbsenceNotificationConfig } from '@/components/automation/AbsenceNotificationConfig';
import { ResponsibleNotificationConfig } from '@/components/automation/ResponsibleNotificationConfig';
import { SignatureAlertConfig } from '@/components/automation/SignatureAlertConfig';
import { Settings, Mail, Users, AlertTriangle } from 'lucide-react';

const Automations = () => {
  return (
    <PageLayout 
      title="Automatisations"
      subtitle="Configurez les messages automatiques et notifications"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <Settings className="h-5 w-5" />
          <span className="text-sm">Gérez vos automatisations de messagerie et alertes</span>
        </div>

        <Tabs defaultValue="absence" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="absence" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Mail participants</span>
            </TabsTrigger>
            <TabsTrigger value="responsible" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Mail responsables</span>
            </TabsTrigger>
            <TabsTrigger value="signature" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Alertes signature</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="absence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>Notification d'absence aux participants</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AbsenceNotificationConfig />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="responsible" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Notification aux responsables</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsibleNotificationConfig />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signature" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Alertes signature manquante</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SignatureAlertConfig />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Automations;
