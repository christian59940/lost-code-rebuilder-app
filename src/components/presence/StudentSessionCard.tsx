
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Upload,
  FileText,
  Calendar
} from 'lucide-react';
import { StudentTrainingSession } from '@/types/StudentTrainingSession';

interface StudentSessionCardProps {
  session: StudentTrainingSession;
  onAbsenceUpdate: (sessionId: string, willBeAbsent: boolean) => void;
  onJustificationUpload: (sessionId: string, document: File) => void;
}

export const StudentSessionCard = ({ 
  session, 
  onAbsenceUpdate, 
  onJustificationUpload 
}: StudentSessionCardProps) => {
  const isUpcoming = session.status === 'upcoming';
  const isPast = session.status === 'completed';
  
  const getTimeSlotLabel = (timeSlot: string) => {
    switch (timeSlot) {
      case 'morning': return 'Matin';
      case 'afternoon': return 'Après-midi';
      case 'full-day': return 'Journée complète';
      default: return timeSlot;
    }
  };

  const getPresenceStatus = () => {
    if (isPast) {
      if (session.hasSignedPresence === true) {
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Présence signée
          </Badge>
        );
      } else if (session.hasSignedPresence === false) {
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Présence non signée
          </Badge>
        );
      }
    } else if (isUpcoming) {
      if (session.willBeAbsent === true) {
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Absence prévue
          </Badge>
        );
      } else if (session.willBeAbsent === false) {
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Calendar className="h-3 w-3 mr-1" />
            Présence confirmée
          </Badge>
        );
      }
    }
    return null;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onJustificationUpload(session.id, file);
    }
  };

  const needsJustification = 
    (isPast && session.hasSignedPresence === false) || 
    (isUpcoming && session.willBeAbsent === true);

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">{session.title}</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{session.trainer}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{getTimeSlotLabel(session.timeSlot || 'full-day')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{session.location}</span>
              </div>
            </div>
          </div>
          {getPresenceStatus()}
        </div>

        {/* Actions pour formations à venir */}
        {isUpcoming && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium mb-2">Confirmez votre présence :</h5>
            <div className="flex space-x-2 mb-3">
              <Button
                size="sm"
                variant={session.willBeAbsent === false ? "default" : "outline"}
                onClick={() => onAbsenceUpdate(session.id, false)}
                className="flex items-center space-x-1"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Serai présent</span>
              </Button>
              <Button
                size="sm"
                variant={session.willBeAbsent === true ? "destructive" : "outline"}
                onClick={() => onAbsenceUpdate(session.id, true)}
                className="flex items-center space-x-1"
              >
                <XCircle className="h-4 w-4" />
                <span>Serai absent</span>
              </Button>
            </div>
          </div>
        )}

        {/* Section justificatif */}
        {needsJustification && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h5 className="font-medium mb-2 text-yellow-800">
              {isPast ? 'Justifier votre absence' : 'Justificatif d\'absence prévisionnelle'}
            </h5>
            
            {session.justificationDocument ? (
              <div className="flex items-center space-x-2 text-sm">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-green-700">
                  Document déposé : {session.justificationDocument}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4 mr-1" />
                  Déposer
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
