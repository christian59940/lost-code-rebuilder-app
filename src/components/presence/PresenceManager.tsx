
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { TrainingSession } from '@/types/TrainingSession';

interface PresenceManagerProps {
  session: TrainingSession;
  onPresenceUpdate: (sessionId: string, presence: 'present' | 'absent') => void;
}

export const PresenceManager = ({ session, onPresenceUpdate }: PresenceManagerProps) => {
  const getPresenceBadge = (presence?: string) => {
    switch (presence) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmé
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            À confirmer
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            À confirmer
          </Badge>
        );
    }
  };

  const handlePresenceUpdate = (sessionId: string, presence: 'present' | 'absent') => {
    console.log('PresenceManager: Updating presence for session', sessionId, 'to', presence);
    onPresenceUpdate(sessionId, presence);
    toast({
      title: "Présence mise à jour",
      description: `Votre présence a été ${presence === 'present' ? 'confirmée' : 'signalée comme absent'} pour cette session.`,
    });
  };

  const isUpcoming = new Date(session.date) >= new Date();
  console.log('PresenceManager: Session', session.id, 'is upcoming:', isUpcoming, 'date:', session.date);

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-sm font-medium text-gray-700 mr-2">
          Ma présence:
        </span>
        {getPresenceBadge(session.trainerPresence)}
      </div>
      
      {isUpcoming && (
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => handlePresenceUpdate(session.id, 'present')}
            className="bg-green-600 hover:bg-green-700"
            variant={session.trainerPresence === 'present' ? 'default' : 'outline'}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Confirmer
          </Button>
          <Button
            variant={session.trainerPresence === 'absent' ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => handlePresenceUpdate(session.id, 'absent')}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Absent
          </Button>
        </div>
      )}
    </div>
  );
};
