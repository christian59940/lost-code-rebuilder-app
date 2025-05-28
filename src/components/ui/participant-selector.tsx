
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Users, Plus, X } from 'lucide-react';

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  studentId?: string;
  company?: string;
  trainingTitle?: string;
  isActive: boolean;
}

interface ParticipantSelectorProps {
  selectedParticipants: Participant[];
  availableParticipants: Participant[];
  onParticipantsChange: (participants: Participant[]) => void;
  maxParticipants?: number;
}

const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  selectedParticipants,
  availableParticipants,
  onParticipantsChange,
  maxParticipants
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParticipants = availableParticipants.filter(participant =>
    participant.isActive &&
    (participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     participant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (participant.company && participant.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (participant.trainingTitle && participant.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleParticipantToggle = (participant: Participant, checked: boolean) => {
    if (checked) {
      if (!maxParticipants || selectedParticipants.length < maxParticipants) {
        onParticipantsChange([...selectedParticipants, participant]);
      }
    } else {
      onParticipantsChange(selectedParticipants.filter(p => p.id !== participant.id));
    }
  };

  const removeParticipant = (participantId: string) => {
    onParticipantsChange(selectedParticipants.filter(p => p.id !== participantId));
  };

  const isSelected = (participantId: string) => {
    return selectedParticipants.some(p => p.id === participantId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Participants inscrits</Label>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter des participants
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Sélectionner des participants</DialogTitle>
              <DialogDescription>
                Choisissez les participants à inscrire à cette session
                {maxParticipants && ` (Maximum: ${maxParticipants})`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un participant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Liste des participants */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredParticipants.map((participant) => (
                  <Card key={participant.id} className="hover:bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={isSelected(participant.id)}
                          onCheckedChange={(checked) => handleParticipantToggle(participant, !!checked)}
                          disabled={!isSelected(participant.id) && maxParticipants ? selectedParticipants.length >= maxParticipants : false}
                        />
                        
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {participant.firstName.charAt(0)}{participant.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="font-medium">
                            {participant.firstName} {participant.lastName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {participant.email}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {participant.studentId && (
                              <Badge variant="secondary" className="text-xs">
                                {participant.studentId}
                              </Badge>
                            )}
                            {participant.company && (
                              <Badge variant="outline" className="text-xs">
                                {participant.company}
                              </Badge>
                            )}
                            {participant.trainingTitle && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {participant.trainingTitle}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredParticipants.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun participant trouvé
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-600">
                {selectedParticipants.length} participant(s) sélectionné(s)
                {maxParticipants && ` sur ${maxParticipants} maximum`}
              </div>
              <Button onClick={() => setIsDialogOpen(false)}>
                Fermer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Participants sélectionnés */}
      {selectedParticipants.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Users className="mr-1 h-4 w-4" />
            {selectedParticipants.length} participant(s) inscrit(s)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedParticipants.map((participant) => (
              <Card key={participant.id} className="bg-green-50 border-green-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                          {participant.firstName.charAt(0)}{participant.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {participant.firstName} {participant.lastName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {participant.email}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeParticipant(participant.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">Aucun participant inscrit</p>
            <p className="text-sm text-gray-500">Cliquez sur "Ajouter des participants" pour commencer</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParticipantSelector;
