
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { BasicInfoSection } from '@/components/ui/basic-info-section';
import { ActionTrainingConfig } from '@/components/ui/action-training-config';
import { PeriodConfiguration } from '@/components/ui/period-configuration';
import { TrainingCatalogSelector } from '@/components/ui/training-catalog-selector';
import { TrainingCatalog } from '@/types/Training';

interface CreateActionSessionFormProps {
  onSubmit: (sessionData: any) => void;
  onCancel: () => void;
}

const CreateActionSessionForm: React.FC<CreateActionSessionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    location: '',
    maxParticipants: '',
    trainingType: 'action',
    selectedTraining: null as TrainingCatalog | null,
    
    actionTraining: {
      numberOfDays: '',
      trainingDates: [{ date: '', startTime: '09:00', endTime: '17:00' }],
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
    
    console.log('Action session form submitted with data:', formData);
    
    // Validation des champs obligatoires
    if (!formData.title || !formData.instructor) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Validation des données de formation par action
    if (!formData.actionTraining.numberOfDays || formData.actionTraining.trainingDates.some(d => !d.date)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le nombre de jours et toutes les dates de formation",
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
          trainingType="action"
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

        {/* Configuration de la formation par action */}
        <ActionTrainingConfig
          actionTraining={formData.actionTraining}
          onActionTrainingChange={(field, value) => {
            setFormData(prev => ({
              ...prev,
              actionTraining: { ...prev.actionTraining, [field]: value }
            }));
          }}
          onTrainingDateChange={(index, field, value) => {
            setFormData(prev => ({
              ...prev,
              actionTraining: {
                ...prev.actionTraining,
                trainingDates: prev.actionTraining.trainingDates.map((date, i) => 
                  i === index ? { ...date, [field]: value } : date
                )
              }
            }));
          }}
          onAddTrainingDate={() => {
            setFormData(prev => ({
              ...prev,
              actionTraining: {
                ...prev.actionTraining,
                trainingDates: [
                  ...prev.actionTraining.trainingDates,
                  { date: '', startTime: '09:00', endTime: '17:00' }
                ]
              }
            }));
          }}
          onRemoveTrainingDate={(index) => {
            if (formData.actionTraining.trainingDates.length > 1) {
              setFormData(prev => ({
                ...prev,
                actionTraining: {
                  ...prev.actionTraining,
                  trainingDates: prev.actionTraining.trainingDates.filter((_, i) => i !== index)
                }
              }));
            }
          }}
          onUpdateNumberOfDays={(numberOfDays) => {
            const days = parseInt(numberOfDays) || 1;
            const currentDates = formData.actionTraining.trainingDates;
            
            if (days > currentDates.length) {
              const newDates = [...currentDates];
              for (let i = currentDates.length; i < days; i++) {
                newDates.push({ date: '', startTime: '09:00', endTime: '17:00' });
              }
              setFormData(prev => ({
                ...prev,
                actionTraining: {
                  ...prev.actionTraining,
                  numberOfDays,
                  trainingDates: newDates
                }
              }));
            } else if (days < currentDates.length) {
              setFormData(prev => ({
                ...prev,
                actionTraining: {
                  ...prev.actionTraining,
                  numberOfDays,
                  trainingDates: currentDates.slice(0, days)
                }
              }));
            } else {
              setFormData(prev => ({
                ...prev,
                actionTraining: {
                  ...prev.actionTraining,
                  numberOfDays
                }
              }));
            }
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
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Créer la session par action
        </Button>
      </div>
    </form>
  );
};

export default CreateActionSessionForm;
