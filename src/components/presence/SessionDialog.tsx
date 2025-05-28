
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrainingSession } from '@/types/TrainingSession';
import { SessionCard } from './SessionCard';

interface SessionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  sessions: TrainingSession[];
  onPresenceUpdate: (sessionId: string, presence: 'present' | 'absent') => void;
}

export const SessionDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedDate, 
  sessions, 
  onPresenceUpdate 
}: SessionDialogProps) => {
  const organizeSessionsByTimeSlot = (sessions: TrainingSession[]) => {
    const morningSession = sessions.find(s => s.timeSlot === 'morning');
    const afternoonSession = sessions.find(s => s.timeSlot === 'afternoon');
    const fullDaySession = sessions.find(s => s.timeSlot === 'full-day');

    return {
      morning: morningSession,
      afternoon: afternoonSession,
      fullDay: fullDaySession
    };
  };

  const { morning, afternoon, fullDay } = organizeSessionsByTimeSlot(sessions);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sessions du {selectedDate?.toLocaleDateString('fr-FR')}</DialogTitle>
          <DialogDescription>
            Gérez votre présence pour les sessions de cette journée
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {sessions.length > 0 && (
            <div className="space-y-6">
              {/* Session du matin */}
              {morning && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">🌅 Session du Matin</h3>
                  <SessionCard 
                    session={morning} 
                    onPresenceUpdate={onPresenceUpdate}
                    variant="morning"
                  />
                </div>
              )}

              {/* Session de l'après-midi */}
              {afternoon && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-orange-600">🌇 Session de l'Après-midi</h3>
                  <SessionCard 
                    session={afternoon} 
                    onPresenceUpdate={onPresenceUpdate}
                    variant="afternoon"
                  />
                </div>
              )}

              {/* Session journée complète */}
              {fullDay && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">🌅🌇 Session Journée Complète</h3>
                  <SessionCard 
                    session={fullDay} 
                    onPresenceUpdate={onPresenceUpdate}
                    variant="full-day"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
