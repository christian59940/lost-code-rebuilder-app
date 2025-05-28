
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, X, Eye, FileText } from 'lucide-react';
import { TrainingCatalog } from '@/types/Training';

interface TrainingCatalogSelectorProps {
  trainingType: 'action' | 'apprenticeship';
  selectedTraining: TrainingCatalog | null;
  onTrainingSelect: (training: TrainingCatalog | null) => void;
}

// Données de démonstration (identiques à celles de TrainingCatalog.tsx)
const demoTrainings: TrainingCatalog[] = [
  {
    id: '1',
    title: 'Formation React Avancé',
    duration: 35,
    type: 'action',
    program: 'Module 1: Hooks avancés\nModule 2: Performance et optimisation\nModule 3: Tests unitaires\nModule 4: Projet pratique',
    reac: 'Développement d\'applications web avec React',
    rev: 'Évaluation sur projet pratique et QCM',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Apprentissage TypeScript',
    duration: 70,
    type: 'apprenticeship',
    program: 'Semaine 1-2: Bases de TypeScript\nSemaine 3-4: Types avancés\nSemaine 5-6: Intégration avec React\nSemaine 7-10: Projet professionnel',
    reac: 'Développement web avec typage statique',
    rev: 'Évaluation continue et soutenance finale',
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
];

export const TrainingCatalogSelector: React.FC<TrainingCatalogSelectorProps> = ({
  trainingType,
  selectedTraining,
  onTrainingSelect,
}) => {
  const [availableTrainings, setAvailableTrainings] = useState<TrainingCatalog[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Filtrer les formations selon le type
    const filtered = demoTrainings.filter(training => training.type === trainingType);
    setAvailableTrainings(filtered);
  }, [trainingType]);

  const getTypeLabel = (type: TrainingCatalog['type']) => {
    switch (type) {
      case 'action':
        return 'Formation par action';
      case 'apprenticeship':
        return 'Formation par apprentissage';
      default:
        return 'Inconnue';
    }
  };

  const handleTrainingChange = (trainingId: string) => {
    if (trainingId === 'none') {
      onTrainingSelect(null);
    } else {
      const training = availableTrainings.find(t => t.id === trainingId);
      onTrainingSelect(training || null);
    }
  };

  const renderFileOrText = (content: string | File) => {
    if (content instanceof File) {
      return (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">{content.name}</span>
          <span className="text-xs text-blue-600">({Math.round(content.size / 1024)} KB)</span>
        </div>
      );
    }
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm">{content}</pre>
      </div>
    );
  };

  const getPreviewText = (content: string | File) => {
    if (content instanceof File) {
      return `Fichier: ${content.name}`;
    }
    return content.split('\n')[0] + '...';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Sélection de formation du catalogue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="training-select">
            Choisir une formation ({getTypeLabel(trainingType)})
          </Label>
          <Select
            value={selectedTraining?.id || 'none'}
            onValueChange={handleTrainingChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une formation du catalogue..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Créer une session personnalisée</SelectItem>
              {availableTrainings.map((training) => (
                <SelectItem key={training.id} value={training.id}>
                  {training.title} ({training.duration}h)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTraining && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{selectedTraining.title}</h4>
                  <Badge variant="outline">{selectedTraining.duration}h</Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {getPreviewText(selectedTraining.program)}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {showDetails ? 'Masquer' : 'Détails'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onTrainingSelect(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {showDetails && (
              <div className="space-y-3 pt-3 border-t">
                <div>
                  <Label className="text-xs font-medium text-gray-500">Programme complet</Label>
                  <div className="mt-1">
                    {renderFileOrText(selectedTraining.program)}
                  </div>
                </div>
                
                {selectedTraining.reac && (
                  <div>
                    <Label className="text-xs font-medium text-gray-500">REAC</Label>
                    <div className="mt-1">
                      {renderFileOrText(selectedTraining.reac)}
                    </div>
                  </div>
                )}

                {selectedTraining.rev && (
                  <div>
                    <Label className="text-xs font-medium text-gray-500">REV</Label>
                    <div className="mt-1">
                      {renderFileOrText(selectedTraining.rev)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {availableTrainings.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">
              Aucune formation {getTypeLabel(trainingType).toLowerCase()} disponible dans le catalogue
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
