
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { TrainingCatalog } from '@/types/Training';
import { Upload, FileText, X } from 'lucide-react';

interface CreateTrainingCatalogFormProps {
  onSubmit: (trainingData: Omit<TrainingCatalog, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const CreateTrainingCatalogForm: React.FC<CreateTrainingCatalogFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    type: 'action' as 'action' | 'apprenticeship',
    program: null as File | string | null,
    reac: null as File | string | null,
    rev: null as File | string | null,
    programText: '',
    reacText: '',
    revText: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: 'program' | 'reac' | 'rev', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file,
      [`${field}Text`]: ''
    }));
  };

  const handleTextChange = (field: 'programText' | 'reacText' | 'revText', value: string) => {
    const baseField = field.replace('Text', '') as 'program' | 'reac' | 'rev';
    setFormData(prev => ({
      ...prev,
      [field]: value,
      [baseField]: value
    }));
  };

  const FileOrTextField = ({ 
    label, 
    field, 
    required = false, 
    accept = ".pdf,.doc,.docx,.txt" 
  }: { 
    label: string; 
    field: 'program' | 'reac' | 'rev'; 
    required?: boolean;
    accept?: string;
  }) => {
    const file = formData[field];
    const textField = `${field}Text` as 'programText' | 'reacText' | 'revText';
    const textValue = formData[textField];
    const [inputMode, setInputMode] = useState<'file' | 'text'>('text');
    
    return (
      <div className="space-y-3">
        <Label htmlFor={field}>{label} {required && '*'}</Label>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant={inputMode === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMode('text')}
          >
            Texte
          </Button>
          <Button
            type="button"
            variant={inputMode === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMode('file')}
          >
            Fichier
          </Button>
        </div>

        {inputMode === 'text' ? (
          <Textarea
            value={textValue}
            onChange={(e) => handleTextChange(textField, e.target.value)}
            placeholder={`Saisissez le contenu du ${label.toLowerCase()}...`}
            rows={6}
            className="min-h-[120px]"
          />
        ) : (
          <div className="mt-2">
            {!file || typeof file === 'string' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors relative">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Cliquez pour sélectionner un fichier ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, TXT (max 10MB)
                </p>
                <input
                  type="file"
                  accept={accept}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      if (selectedFile.size > 10 * 1024 * 1024) {
                        toast({
                          title: "Erreur",
                          description: "Le fichier ne doit pas dépasser 10MB",
                          variant: "destructive",
                        });
                        return;
                      }
                      handleFileChange(field, selectedFile);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round(file.size / 1024)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileChange(field, null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Training catalog form submitted with data:', formData);
    
    // Validation des champs obligatoires
    if (!formData.title || !formData.duration || (!formData.program && !formData.programText)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires (intitulé, durée, programme)",
        variant: "destructive",
      });
      return;
    }

    // Validation de la durée
    const duration = parseInt(formData.duration);
    if (isNaN(duration) || duration <= 0) {
      toast({
        title: "Erreur",
        description: "La durée doit être un nombre positif",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title: formData.title,
      duration,
      type: formData.type,
      program: formData.program || formData.programText || '',
      reac: formData.reac || formData.reacText || '',
      rev: formData.rev || formData.revText || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Informations de base */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Intitulé de la formation *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Formation React Avancé"
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Nombre d'heures prévues *</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="Ex: 35"
                required
              />
            </div>

            <div>
              <Label className="text-base font-medium">Type de formation *</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="action" id="action" />
                  <Label htmlFor="action">Formation par action</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="apprenticeship" id="apprenticeship" />
                  <Label htmlFor="apprenticeship">Formation par apprentissage</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Documents de formation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Documents de formation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileOrTextField
              label="Programme de formation"
              field="program"
              required
            />

            <FileOrTextField
              label="REAC (Référentiel Emploi Activités Compétences)"
              field="reac"
            />

            <FileOrTextField
              label="REV (Référentiel de Validation)"
              field="rev"
            />
          </CardContent>
        </Card>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Créer la formation
        </Button>
      </div>
    </form>
  );
};

export default CreateTrainingCatalogForm;
