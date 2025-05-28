
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock } from 'lucide-react';

interface PeriodConfigurationProps {
  formData: {
    hasMorningSession: boolean;
    hasAfternoonSession: boolean;
    morningStartTime: string;
    morningEndTime: string;
    afternoonStartTime: string;
    afternoonEndTime: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

export const PeriodConfiguration: React.FC<PeriodConfigurationProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Périodes de formation (optionnel)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasMorningSession"
              checked={formData.hasMorningSession}
              onCheckedChange={(checked) => onInputChange('hasMorningSession', !!checked)}
            />
            <Label htmlFor="hasMorningSession" className="font-medium">
              Session du matin
            </Label>
          </div>
          
          {formData.hasMorningSession && (
            <div className="ml-6 grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="morningStartTime">Début matin</Label>
                <Input
                  id="morningStartTime"
                  type="time"
                  value={formData.morningStartTime}
                  onChange={(e) => onInputChange('morningStartTime', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="morningEndTime">Fin matin</Label>
                <Input
                  id="morningEndTime"
                  type="time"
                  value={formData.morningEndTime}
                  onChange={(e) => onInputChange('morningEndTime', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasAfternoonSession"
              checked={formData.hasAfternoonSession}
              onCheckedChange={(checked) => onInputChange('hasAfternoonSession', !!checked)}
            />
            <Label htmlFor="hasAfternoonSession" className="font-medium">
              Session de l'après-midi
            </Label>
          </div>
          
          {formData.hasAfternoonSession && (
            <div className="ml-6 grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="afternoonStartTime">Début après-midi</Label>
                <Input
                  id="afternoonStartTime"
                  type="time"
                  value={formData.afternoonStartTime}
                  onChange={(e) => onInputChange('afternoonStartTime', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="afternoonEndTime">Fin après-midi</Label>
                <Input
                  id="afternoonEndTime"
                  type="time"
                  value={formData.afternoonEndTime}
                  onChange={(e) => onInputChange('afternoonEndTime', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 Les périodes matin/après-midi permettent de diviser la journée pour la gestion des présences et signatures.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
