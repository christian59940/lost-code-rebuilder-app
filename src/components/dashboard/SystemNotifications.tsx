
import { SystemAlert } from '@/components/alerts/SystemAlert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Bell } from 'lucide-react';

export const SystemNotifications = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications Système
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SystemAlert
          variant="warning"
          title="Signatures en attente"
          description="3 sessions nécessitent des signatures d'émargement avant la fin de la journée."
        />
        
        <SystemAlert
          variant="success"
          title="Sauvegarde automatique"
          description="Toutes les données ont été sauvegardées avec succès à 14:30."
        />
        
        <SystemAlert
          variant="default"
          title="Mise à jour disponible"
          description="Une nouvelle version de l'application est disponible. Redémarrez pour appliquer les mises à jour."
        />
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Aperçu du système</h4>
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Bell className="h-8 w-8" />
              <span className="ml-2">Zone de contenu média</span>
            </div>
          </AspectRatio>
        </div>
      </CardContent>
    </Card>
  );
};
