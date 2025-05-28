
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { BasicInfoSection } from '@/components/ui/basic-info-section';
import { ApprenticeshipTrainingConfig } from '@/components/ui/apprenticeship-training-config';
import { PeriodConfiguration } from '@/components/ui/period-configuration';
import { TrainingCatalogSelector } from '@/components/ui/training-catalog-selector';
import { TrainingCatalog } from '@/types/Training';

interface CreateApprenticeshipSessionFormProps {
  onSubmit: (sessionData: any) => void;
  onCancel: () => void;
}

const CreateApprenticeshipSessionForm: React.FC<CreateApprenticeshipSessionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    location: '',
    maxParticipants: '',
    trainingType: 'apprenticeship',
    selectedTraining: null as TrainingCatalog | null,
    
    apprenticeshipTraining: {
      weekDay: '',
      startDate: '',
      endDate: '',
      startTime: '09:00',
      endTime: '17:00',
    },
    
    hasMorningSession: true,
    hasAfternoonSession: true,
    morningStartTime: '09:00',
    morningEndTime: '12:00',
    afternoonStartTime: '13:30',
    afternoonEndTime: '17:00',
  });

  // Mettre à jour les données du formulaire quand une formation est sélectionnée
  useEffect(() => {
    if (formData.selectedTraining) {
      const programText = typeof formData.selectedTraining.program === 'string' 
        ? formData.selectedTraining.program 
        : formData.selectedTraining.program.name;
        
      setFormData(prev => ({
        ...prev,
        title: formData.selectedTraining?.title || '',
        description: programText || '',
      }));
    }
  }, [formData.selectedTraining]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTrainingSelect = (training: TrainingCatalog | null) => {
    setFormData(prev => ({
      ...prev,
      selectedTraining: training
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Apprenticeship session form submitted with data:', formData);
    
    // Validation des champs obligatoires
    if (!formData.title || !formData.instructor) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Validation des données d'apprentissage
    if (!formData.apprenticeshipTraining.weekDay || !formData.apprenticeshipTraining.startDate || !formData.apprenticeshipTraining.endDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs pour la formation par apprentissage",
        variant: "destructive",
      });
      return;
    }

    // Validation des périodes
    if (!formData.hasMorningSession && !formData.hasAfternoonSession) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une période (matin ou après-midi)",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Sélection de formation du catalogue */}
        <TrainingCatalogSelector
          trainingType="apprenticeship"
          selectedTraining={formData.selectedTraining}
          onTrainingSelect={handleTrainingSelect}
        />

        {/* Section informations de base */}
        <BasicInfoSection
          formData={{
            title: formData.title,
            description: formData.description,
            instructor: formData.instructor,
            location: formData.location,
            maxParticipants: formData.maxParticipants,
          }}
          onInputChange={handleInputChange}
        />

        {/* Configuration de la formation par apprentissage */}
        <ApprenticeshipTrainingConfig
          apprenticeshipTraining={formData.apprenticeshipTraining}
          onApprenticeshipTrainingChange={(field, value) => {
            setFormData(prev => ({
              ...prev,
              apprenticeshipTraining: { ...prev.apprenticeshipTraining, [field]: value }
            }));
          }}
        />

        {/* Configuration des périodes (matin/après-midi) */}
        <PeriodConfiguration
          formData={{
            hasMorningSession: formData.hasMorningSession,
            hasAfternoonSession: formData.hasAfternoonSession,
            morningStartTime: formData.morningStartTime,
            morningEndTime: formData.morningEndTime,
            afternoonStartTime: formData.afternoonStartTime,
            afternoonEndTime: formData.afternoonEndTime,
          }}
          onInputChange={handleInputChange}
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Créer la session par apprentissage
        </Button>
      </div>
    </form>
  );
};

export default CreateApprenticeshipSessionForm;
