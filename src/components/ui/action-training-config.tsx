
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface TrainingDate {
  date: string;
  startTime: string;
  endTime: string;
}

interface ActionTrainingConfigProps {
  actionTraining: {
    numberOfDays: string;
    trainingDates: TrainingDate[];
  };
  onActionTrainingChange: (field: string, value: string) => void;
  onTrainingDateChange: (index: number, field: string, value: string) => void;
  onAddTrainingDate: () => void;
  onRemoveTrainingDate: (index: number) => void;
  onUpdateNumberOfDays: (numberOfDays: string) => void;
}

export const ActionTrainingConfig: React.FC<ActionTrainingConfigProps> = ({
  actionTraining,
  onActionTrainingChange,
  onTrainingDateChange,
  onAddTrainingDate,
  onRemoveTrainingDate,
  onUpdateNumberOfDays,
}) => {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-blue-800">Configuration - Formation par action</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="numberOfDays">Nombre de jours de formation *</Label>
          <Input
            id="numberOfDays"
            type="number"
            min="1"
            max="20"
            value={actionTraining.numberOfDays}
            onChange={(e) => onUpdateNumberOfDays(e.target.value)}
            placeholder="Ex: 5"
            className="bg-white"
          />
          <p className="text-xs text-gray-600 mt-1">
            Le nombre de champs de dates s'ajustera automatiquement
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Dates de formation</Label>
          {actionTraining.trainingDates.map((trainingDate, index) => (
            <div key={index} className="flex items-center space-x-2 p-4 border rounded-lg bg-white">
              <div className="flex-1 grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-medium">Jour {index + 1}</Label>
                  <Input
                    type="date"
                    value={trainingDate.date}
                    onChange={(e) => onTrainingDateChange(index, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">Début</Label>
                  <Input
                    type="time"
                    value={trainingDate.startTime}
                    onChange={(e) => onTrainingDateChange(index, 'startTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium">Fin</Label>
                  <Input
                    type="time"
                    value={trainingDate.endTime}
                    onChange={(e) => onTrainingDateChange(index, 'endTime', e.target.value)}
                  />
                </div>
              </div>
              {actionTraining.trainingDates.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveTrainingDate(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={onAddTrainingDate}
            className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un jour de formation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
