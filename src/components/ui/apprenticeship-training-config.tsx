
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ApprenticeshipTrainingConfigProps {
  apprenticeshipTraining: {
    weekDay: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
  onApprenticeshipTrainingChange: (field: string, value: string) => void;
}

export const ApprenticeshipTrainingConfig: React.FC<ApprenticeshipTrainingConfigProps> = ({
  apprenticeshipTraining,
  onApprenticeshipTrainingChange,
}) => {
  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardHeader>
        <CardTitle className="text-green-800">Configuration - Formation par apprentissage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="weekDay">Jour de la semaine récurrent *</Label>
          <Select 
            value={apprenticeshipTraining.weekDay} 
            onValueChange={(value) => onApprenticeshipTrainingChange('weekDay', value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Sélectionner un jour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Lundi</SelectItem>
              <SelectItem value="2">Mardi</SelectItem>
              <SelectItem value="3">Mercredi</SelectItem>
              <SelectItem value="4">Jeudi</SelectItem>
              <SelectItem value="5">Vendredi</SelectItem>
              <SelectItem value="6">Samedi</SelectItem>
              <SelectItem value="7">Dimanche</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-green-700 mt-1">
            🔄 La formation aura lieu automatiquement chaque semaine ce jour-là
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Date de début de la période *</Label>
            <Input
              id="startDate"
              type="date"
              value={apprenticeshipTraining.startDate}
              onChange={(e) => onApprenticeshipTrainingChange('startDate', e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="endDate">Date de fin de la période *</Label>
            <Input
              id="endDate"
              type="date"
              value={apprenticeshipTraining.endDate}
              onChange={(e) => onApprenticeshipTrainingChange('endDate', e.target.value)}
              className="bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="apprenticeshipStartTime">Heure de début</Label>
            <Input
              id="apprenticeshipStartTime"
              type="time"
              value={apprenticeshipTraining.startTime}
              onChange={(e) => onApprenticeshipTrainingChange('startTime', e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="apprenticeshipEndTime">Heure de fin</Label>
            <Input
              id="apprenticeshipEndTime"
              type="time"
              value={apprenticeshipTraining.endTime}
              onChange={(e) => onApprenticeshipTrainingChange('endTime', e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
