
import { toast } from '@/hooks/use-toast';
import { UserRole } from '@/contexts/AuthContext';

export const handleViewSessionDetails = (sessionId: string) => {
  toast({
    title: "Détails de la session",
    description: `Affichage des détails de la session ${sessionId}`,
  });
};

export const handleCreateSession = (userRole: UserRole | undefined) => {
  if (userRole === 'formateur' || userRole === 'apprenant') {
    toast({
      title: "Accès restreint",
      description: "Seuls les administrateurs peuvent créer de nouvelles sessions",
      variant: "destructive",
    });
  } else {
    toast({
      title: "Nouvelle session",
      description: "Redirection vers la création de session",
    });
  }
};

export const handleManageUsers = (userRole: UserRole | undefined) => {
  if (userRole === 'admin') {
    toast({
      title: "Gestion des utilisateurs",
      description: "Redirection vers la gestion des utilisateurs",
    });
  } else {
    toast({
      title: "Accès restreint",
      description: "Vous n'avez pas les permissions pour gérer les utilisateurs",
      variant: "destructive",
    });
  }
};

export const handlePendingSignatures = (userRole: UserRole | undefined) => {
  if (userRole === 'apprenant') {
    toast({
      title: "Mes signatures",
      description: "Affichage de vos signatures de présence",
    });
  } else {
    toast({
      title: "Signatures en attente",
      description: "Affichage des signatures en attente de validation",
    });
  }
};
