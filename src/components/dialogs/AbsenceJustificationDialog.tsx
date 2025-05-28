
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';
import { useState } from 'react';
import { StudentTrainingSession } from '@/types/StudentTrainingSession';

interface AbsenceJustificationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  session: StudentTrainingSession;
  onJustificationUpload: (document: File) => void;
}

export const AbsenceJustificationDialog = ({
  isOpen,
  onOpenChange,
  session,
  onJustificationUpload
}: AbsenceJustificationDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reason, setReason] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onJustificationUpload(selectedFile);
      setSelectedFile(null);
      setReason('');
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setReason('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Justificatif d'absence</DialogTitle>
          <DialogDescription>
            Déposez un justificatif pour votre absence à la formation "{session.title}" du {new Date(session.date).toLocaleDateString('fr-FR')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Motif d'absence (optionnel)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Expliquez brièvement le motif de votre absence..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="document">Document justificatif</Label>
            <div className="mt-1">
              <Input
                id="document"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-1">
                Formats acceptés: PDF, JPG, PNG, DOC, DOCX (max 5MB)
              </p>
            </div>
          </div>

          {selectedFile && (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-xs text-gray-500">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-1" />
              Déposer le justificatif
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
