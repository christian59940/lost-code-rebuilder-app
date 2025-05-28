
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Session } from '@/types/Session';
import { getParticipantName } from '@/utils/trainerUtils';

interface AttendanceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSession: Session | null;
  selectedPeriod: 'morning' | 'afternoon';
  onPeriodChange: (period: 'morning' | 'afternoon') => void;
  attendanceData: Record<string, { status: string; lateMinutes?: number }>;
  onAttendanceChange: (participantId: string, status: string, lateMinutes?: number) => void;
  onSave: () => void;
}

export const AttendanceDialog = ({
  isOpen,
  onOpenChange,
  selectedSession,
  selectedPeriod,
  onPeriodChange,
  attendanceData,
  onAttendanceChange,
  onSave
}: AttendanceDialogProps) => {
  if (!selectedSession) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Gestion des présences - {selectedSession.title}</DialogTitle>
          <DialogDescription>
            Enregistrez les présences pour cette session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Sélecteur de période */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Période</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button
                  variant={selectedPeriod === 'morning' ? 'default' : 'outline'}
                  onClick={() => onPeriodChange('morning')}
                  size="sm"
                >
                  Matin (9h-12h)
                </Button>
                <Button
                  variant={selectedPeriod === 'afternoon' ? 'default' : 'outline'}
                  onClick={() => onPeriodChange('afternoon')}
                  size="sm"
                >
                  Après-midi (14h-17h)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des participants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Participants ({selectedSession.participants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedSession.participants.map((participantId) => (
                  <div key={participantId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium">{getParticipantName(participantId)}</div>
                      <Badge variant="outline">{participantId}</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Select
                        value={attendanceData[participantId]?.status || ''}
                        onValueChange={(value) => onAttendanceChange(participantId, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Présent</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">En retard</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {attendanceData[participantId]?.status === 'late' && (
                        <Input
                          type="number"
                          placeholder="Minutes"
                          className="w-20"
                          value={attendanceData[participantId]?.lateMinutes || ''}
                          onChange={(e) => 
                            onAttendanceChange(
                              participantId, 
                              'late', 
                              parseInt(e.target.value) || undefined
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
              Enregistrer les présences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
