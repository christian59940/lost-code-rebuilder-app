
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, Users } from 'lucide-react';
import { TrainingSession } from '@/types/TrainingSession';
import { PresenceManager } from './PresenceManager';

interface SessionCardProps {
  session: TrainingSession;
  onPresenceUpdate: (sessionId: string, presence: 'present' | 'absent') => void;
  variant?: 'default' | 'morning' | 'afternoon' | 'full-day';
}

export const SessionCard = ({ session, onPresenceUpdate, variant = 'default' }: SessionCardProps) => {
  const getTimeSlotLabel = (timeSlot: string) => {
    switch (timeSlot) {
      case 'morning':
        return 'Matin (9h-12h)';
      case 'afternoon':
        return 'Après-midi (14h-17h)';
      case 'full-day':
        return 'Journée complète (9h-17h)';
      default:
        return timeSlot;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmée</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">À venir</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Annulée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'morning':
        return 'border-l-4 border-l-blue-500';
      case 'afternoon':
        return 'border-l-4 border-l-orange-500';
      case 'full-day':
        return 'border-l-4 border-l-purple-500';
      default:
        return '';
    }
  };

  return (
    <Card className={`p-4 ${getBorderStyle()}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{session.title}</h4>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{getTimeSlotLabel(session.timeSlot)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{session.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{session.participantCount} participants</span>
              </div>
            </div>
          </div>
          {getStatusBadge(session.status)}
        </div>

        <Separator />

        <PresenceManager session={session} onPresenceUpdate={onPresenceUpdate} />
      </div>
    </Card>
  );
};
