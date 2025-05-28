
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { StudentTrainingSession } from '@/types/StudentTrainingSession';
import { useState } from 'react';
import { AbsenceJustificationDialog } from '../dialogs/AbsenceJustificationDialog';

interface StudentPresenceManagerProps {
  session: StudentTrainingSession;
  onPresenceUpdate: (sessionId: string, presence: 'present' | 'absent') => void;
  onJustificationUpload: (sessionId: string, document: File) => void;
}

export const StudentPresenceManager = ({ 
  session, 
  onPresenceUpdate, 
  onJustificationUpload 
}: StudentPresenceManagerProps) => {
  const [isJustificationDialogOpen, setIsJustificationDialogOpen] = useState(false);

  const getPresenceStatus = () => {
    const isUpcoming = new Date(session.date) >= new Date();
    const isPast = new Date(session.date) < new Date();
    
    if (isPast) {
      if (session.hasSignedPresence === true) {
        return 'present';
      } else if (session.hasSignedPresence === false) {
        return 'absent';
      }
    } else if (isUpcoming) {
      if (session.willBeAbsent === true) {
        return 'absent';
      } else if (session.willBeAbsent === false) {
        return 'present';
      }
    }
    return 'pending';
  };

  const getPresenceBadge = (presence: string) => {
    switch (presence) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Présent
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
    console.log('StudentPresenceManager: Updating presence for session', sessionId, 'to', presence);
    onPresenceUpdate(sessionId, presence);
    
    if (presence === 'absent') {
      setIsJustificationDialogOpen(true);
    }
    
    toast({
      title: "Présence mise à jour",
      description: `Votre présence a été ${presence === 'present' ? 'confirmée' : 'signalée comme absent'} pour cette session.`,
    });
  };

  const handleJustificationUpload = (document: File) => {
    onJustificationUpload(session.id, document);
    setIsJustificationDialogOpen(false);
    toast({
      title: "Justificatif déposé",
      description: "Votre justificatif d'absence a été déposé avec succès.",
    });
  };

  const isUpcoming = new Date(session.date) >= new Date();
  const isPast = new Date(session.date) < new Date();
  const currentPresenceStatus = getPresenceStatus();
  const canJustifyAbsence = currentPresenceStatus === 'absent' && (isUpcoming || session.canJustifyAbsence);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-700 mr-2">
            Ma présence:
          </span>
          {getPresenceBadge(currentPresenceStatus)}
        </div>
        
        {isUpcoming && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handlePresenceUpdate(session.id, 'present')}
              className="bg-green-600 hover:bg-green-700"
              variant={session.willBeAbsent === false ? 'default' : 'outline'}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Présent
            </Button>
            <Button
              variant={session.willBeAbsent === true ? 'destructive' : 'outline'}
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

      {/* Bouton pour justifier une absence */}
      {canJustifyAbsence && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsJustificationDialogOpen(true)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Upload className="h-4 w-4 mr-1" />
            {session.justificationDocument ? 'Modifier le justificatif' : 'Déposer un justificatif'}
          </Button>
        </div>
      )}

      {/* Affichage du justificatif existant */}
      {session.justificationDocument && (
        <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
          <span className="font-medium">Justificatif déposé:</span> {session.justificationDocument}
        </div>
      )}

      <AbsenceJustificationDialog
        isOpen={isJustificationDialogOpen}
        onOpenChange={setIsJustificationDialogOpen}
        session={session}
        onJustificationUpload={handleJustificationUpload}
      />
    </div>
  );
};
