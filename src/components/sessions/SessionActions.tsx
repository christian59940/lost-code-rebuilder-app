
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/dialogs/ConfirmationDialog';
import { Trash2, XCircle, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SessionActionsProps {
  sessionId: string;
  sessionTitle: string;
  status: string;
}

export const SessionActions = ({ sessionId, sessionTitle, status }: SessionActionsProps) => {
  const { toast } = useToast();

  const handleDeleteSession = () => {
    console.log('Suppression de la session:', sessionId);
    toast({
      title: "Session supprimée",
      description: `La session "${sessionTitle}" a été supprimée avec succès.`,
      variant: "destructive",
    });
  };

  const handleCancelSession = () => {
    console.log('Annulation de la session:', sessionId);
    toast({
      title: "Session annulée",
      description: `La session "${sessionTitle}" a été annulée.`,
    });
  };

  const handleStartSession = () => {
    console.log('Démarrage de la session:', sessionId);
    toast({
      title: "Session démarrée",
      description: `La session "${sessionTitle}" a été démarrée.`,
    });
  };

  const handlePauseSession = () => {
    console.log('Pause de la session:', sessionId);
    toast({
      title: "Session mise en pause",
      description: `La session "${sessionTitle}" a été mise en pause.`,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {status === 'scheduled' && (
        <ConfirmationDialog
          title="Démarrer la session"
          description={`Êtes-vous sûr de vouloir démarrer la session "${sessionTitle}" ?`}
          onConfirm={handleStartSession}
        >
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-1" />
            Démarrer
          </Button>
        </ConfirmationDialog>
      )}

      {status === 'in-progress' && (
        <ConfirmationDialog
          title="Mettre en pause"
          description={`Êtes-vous sûr de vouloir mettre en pause la session "${sessionTitle}" ?`}
          onConfirm={handlePauseSession}
        >
          <Button size="sm" variant="outline">
            <Pause className="h-4 w-4 mr-1" />
            Pause
          </Button>
        </ConfirmationDialog>
      )}

      <ConfirmationDialog
        title="Annuler la session"
        description={`Êtes-vous sûr de vouloir annuler la session "${sessionTitle}" ? Cette action est irréversible.`}
        onConfirm={handleCancelSession}
        variant="destructive"
      >
        <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50">
          <XCircle className="h-4 w-4 mr-1" />
          Annuler
        </Button>
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Supprimer la session"
        description={`Êtes-vous sûr de vouloir supprimer définitivement la session "${sessionTitle}" ? Cette action ne peut pas être annulée.`}
        onConfirm={handleDeleteSession}
        variant="destructive"
      >
        <Button size="sm" variant="destructive">
          <Trash2 className="h-4 w-4 mr-1" />
          Supprimer
        </Button>
      </ConfirmationDialog>
    </div>
  );
};
