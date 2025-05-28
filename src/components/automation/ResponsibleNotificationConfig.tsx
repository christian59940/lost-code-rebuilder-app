
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Save, TestTube, Clock, Users } from 'lucide-react';

interface ResponsibleNotificationSettings {
  enabled: boolean;
  subject: string;
  message: string;
  delayHours: number;
  notificationTrigger: 'immediate' | 'after_delay' | 'daily_summary';
  recipients: string[];
}

export function ResponsibleNotificationConfig() {
  const [settings, setSettings] = useState<ResponsibleNotificationSettings>({
    enabled: true,
    subject: 'Absence non justifiée détectée - {PRENOM} {NOM}',
    message: `Bonjour,

Une absence non justifiée a été détectée pour le participant suivant :

Participant : {PRENOM} {NOM}
Formation : {FORMATION}
Session du : {DATE_SESSION} de {HEURE_DEBUT} à {HEURE_FIN}
Formateur : {FORMATEUR}

Cette absence nécessite un suivi de votre part.

Vous pouvez accéder au détail de la session et contacter le participant depuis votre espace de gestion.

Cordialement,
Le système Innovasign Pro`,
    delayHours: 2,
    notificationTrigger: 'after_delay',
    recipients: ['gestionnaire_administratif'],
  });

  const handleSave = () => {
    console.log('Sauvegarde des paramètres responsables:', settings);
    toast({
      title: "Paramètres sauvegardés",
      description: "La configuration de notification aux responsables a été mise à jour.",
    });
  };

  const handleTest = () => {
    console.log('Test email responsables avec les paramètres:', settings);
    toast({
      title: "Email de test envoyé",
      description: "Un email de test a été envoyé aux responsables avec la configuration actuelle.",
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
            Activer les notifications aux responsables
          </Label>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="notificationTrigger">Moment d'envoi</Label>
              <Select 
                value={settings.notificationTrigger} 
                onValueChange={(value: any) => setSettings({ ...settings, notificationTrigger: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immédiatement</SelectItem>
                  <SelectItem value="after_delay">Après un délai</SelectItem>
                  <SelectItem value="daily_summary">Résumé quotidien</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {settings.notificationTrigger === 'after_delay' && (
              <div>
                <Label htmlFor="delayHours">Délai avant envoi (heures)</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <Input
                    id="delayHours"
                    type="number"
                    value={settings.delayHours}
                    onChange={(e) => setSettings({ ...settings, delayHours: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="72"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Temps d'attente après l'absence avant notification
                </p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Objet de l'email</Label>
            <Input
              id="subject"
              value={settings.subject}
              onChange={(e) => setSettings({ ...settings, subject: e.target.value })}
              placeholder="Objet de l'email..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message">Corps du message</Label>
            <Textarea
              id="message"
              value={settings.message}
              onChange={(e) => setSettings({ ...settings, message: e.target.value })}
              placeholder="Votre message..."
              rows={12}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Destinataires</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.recipients.includes('gestionnaire_administratif')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSettings({ ...settings, recipients: [...settings.recipients, 'gestionnaire_administratif'] });
                    } else {
                      setSettings({ ...settings, recipients: settings.recipients.filter(r => r !== 'gestionnaire_administratif') });
                    }
                  }}
                />
                <Label className="text-sm">Gestionnaires administratifs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.recipients.includes('admin')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSettings({ ...settings, recipients: [...settings.recipients, 'admin'] });
                    } else {
                      setSettings({ ...settings, recipients: settings.recipients.filter(r => r !== 'admin') });
                    }
                  }}
                />
                <Label className="text-sm">Administrateurs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.recipients.includes('formateur')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSettings({ ...settings, recipients: [...settings.recipients, 'formateur'] });
                    } else {
                      setSettings({ ...settings, recipients: settings.recipients.filter(r => r !== 'formateur') });
                    }
                  }}
                />
                <Label className="text-sm">Formateurs concernés</Label>
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
              <TestTube className="h-4 w-4" />
              <span>Tester l'email</span>
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
