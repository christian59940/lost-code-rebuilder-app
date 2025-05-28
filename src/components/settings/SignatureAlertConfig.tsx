
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Save, Clock, Bell } from 'lucide-react';

interface SignatureAlertSettings {
  enabled: boolean;
  alertTitle: string;
  alertMessage: string;
  delayMinutes: number;
  priority: 'low' | 'medium' | 'high';
  notifyUsers: string[];
}

export function SignatureAlertConfig() {
  const [settings, setSettings] = useState<SignatureAlertSettings>({
    enabled: true,
    alertTitle: 'Signature manquante - {NOM} {PRENOM}',
    alertMessage: 'Le participant {PRENOM} {NOM} n\'a pas signé la feuille de présence pour la session "{FORMATION}" du {DATE_SESSION} qui s\'est terminée à {HEURE_FIN}.',
    delayMinutes: 30,
    priority: 'medium',
    notifyUsers: ['admin', 'gestionnaire_administratif'],
  });

  const handleSave = () => {
    console.log('Sauvegarde des paramètres alertes signature:', settings);
    toast({
      title: "Paramètres sauvegardés",
      description: "La configuration des alertes de signature a été mise à jour.",
    });
  };

  const handleTest = () => {
    console.log('Test alerte signature avec les paramètres:', settings);
    toast({
      title: "Alerte de test créée",
      description: "Une alerte de test a été générée avec la configuration actuelle.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={settings.enabled}
            onCheckedChange={(enabled) => setSettings({ ...settings, enabled })}
          />
          <Label className="text-sm font-medium">
            Activer les alertes de signature manquante
          </Label>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="delayMinutes">Délai avant alerte (minutes)</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <Input
                  id="delayMinutes"
                  type="number"
                  value={settings.delayMinutes}
                  onChange={(e) => setSettings({ ...settings, delayMinutes: parseInt(e.target.value) || 0 })}
                  min="5"
                  max="1440"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Temps d'attente après la fin de session avant de créer l'alerte
              </p>
            </div>

            <div>
              <Label htmlFor="priority">Priorité de l'alerte</Label>
              <Select value={settings.priority} onValueChange={(value: any) => setSettings({ ...settings, priority: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="alertTitle">Titre de l'alerte</Label>
            <Input
              id="alertTitle"
              value={settings.alertTitle}
              onChange={(e) => setSettings({ ...settings, alertTitle: e.target.value })}
              placeholder="Titre de l'alerte..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="alertMessage">Message de l'alerte</Label>
            <Textarea
              id="alertMessage"
              value={settings.alertMessage}
              onChange={(e) => setSettings({ ...settings, alertMessage: e.target.value })}
              placeholder="Contenu de l'alerte..."
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Utilisateurs à notifier</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifyUsers.includes('admin')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSettings({ ...settings, notifyUsers: [...settings.notifyUsers, 'admin'] });
                    } else {
                      setSettings({ ...settings, notifyUsers: settings.notifyUsers.filter(u => u !== 'admin') });
                    }
                  }}
                />
                <Label className="text-sm">Administrateurs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifyUsers.includes('gestionnaire_administratif')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSettings({ ...settings, notifyUsers: [...settings.notifyUsers, 'gestionnaire_administratif'] });
                    } else {
                      setSettings({ ...settings, notifyUsers: settings.notifyUsers.filter(u => u !== 'gestionnaire_administratif') });
                    }
                  }}
                />
                <Label className="text-sm">Gestionnaires administratifs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.notifyUsers.includes('formateur')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSettings({ ...settings, notifyUsers: [...settings.notifyUsers, 'formateur'] });
                    } else {
                      setSettings({ ...settings, notifyUsers: settings.notifyUsers.filter(u => u !== 'formateur') });
                    }
                  }}
                />
                <Label className="text-sm">Formateurs</Label>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Variables disponibles</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <div><code>{'{PRENOM}'}</code> - Prénom du participant</div>
              <div><code>{'{NOM}'}</code> - Nom du participant</div>
              <div><code>{'{DATE_SESSION}'}</code> - Date de la session</div>
              <div><code>{'{HEURE_DEBUT}'}</code> - Heure de début</div>
              <div><code>{'{HEURE_FIN}'}</code> - Heure de fin</div>
              <div><code>{'{FORMATION}'}</code> - Nom de la formation</div>
              <div><code>{'{FORMATEUR}'}</code> - Nom du formateur</div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleTest} className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Tester l'alerte</span>
            </Button>
            
            <Button onClick={handleSave} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
