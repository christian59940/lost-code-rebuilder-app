
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { BookOpen, Clock, Users, Eye, Plus, FileText } from 'lucide-react';
import { type TrainingCatalog } from '@/types/Training';
import CreateTrainingCatalogForm from '@/components/ui/create-training-catalog-form';
import { toast } from '@/hooks/use-toast';

// Données de démonstration
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
  {
    id: '3',
    title: 'Formation JavaScript ES6+',
    duration: 28,
    type: 'action',
    program: 'Module 1: Syntaxe moderne\nModule 2: Programmation asynchrone\nModule 3: Modules et bundling\nModule 4: Testing',
    reac: 'Développement JavaScript moderne',
    rev: 'Projets pratiques et évaluations techniques',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '4',
    title: 'Apprentissage Node.js',
    duration: 84,
    type: 'apprenticeship',
    program: 'Semaine 1-3: Bases de Node.js\nSemaine 4-6: Express et APIs\nSemaine 7-9: Bases de données\nSemaine 10-12: Projet complet',
    reac: 'Développement backend avec Node.js',
    rev: 'Évaluation continue et projet final',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
];

const TrainingCatalogPage: React.FC = () => {
  const [trainings, setTrainings] = useState<TrainingCatalog[]>(demoTrainings);
  const [selectedTraining, setSelectedTraining] = useState<TrainingCatalog | null>(null);

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

  const getTypeBadgeColor = (type: TrainingCatalog['type']) => {
    switch (type) {
      case 'action':
        return 'bg-blue-100 text-blue-800';
      case 'apprenticeship':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTraining = (trainingData: Omit<TrainingCatalog, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Creating new training:', trainingData);
    
    const newTraining: TrainingCatalog = {
      ...trainingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTrainings(prev => [newTraining, ...prev]);
    
    toast({
      title: "Formation créée",
      description: `La formation "${trainingData.title}" a été ajoutée au catalogue avec succès.`,
    });
  };

  const renderFileInfo = (file: string | File, label: string) => {
    if (file instanceof File) {
      return (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">{file.name}</span>
          <span className="text-xs text-blue-600">({Math.round(file.size / 1024)} KB)</span>
        </div>
      );
    }
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm">{file}</pre>
      </div>
    );
  };

  const groupedTrainings = {
    action: trainings.filter(t => t.type === 'action'),
    apprenticeship: trainings.filter(t => t.type === 'apprenticeship')
  };

  const TrainingCard = ({ training }: { training: TrainingCatalog }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {training.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{training.duration} heures</span>
        </div>
        
        <div className="text-sm text-gray-600 line-clamp-3">
          {typeof training.program === 'string' 
            ? training.program.split('\n')[0] + '...'
            : `Fichier programme: ${training.program.name}`
          }
        </div>

        <div className="flex justify-end pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedTraining(training)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Voir détails
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {selectedTraining?.title}
                </DialogTitle>
              </DialogHeader>
              {selectedTraining && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Badge className={`${getTypeBadgeColor(selectedTraining.type)}`}>
                      {getTypeLabel(selectedTraining.type)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedTraining.duration} heures</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Programme de formation</Label>
                    <div className="mt-2">
                      {renderFileInfo(selectedTraining.program, 'Programme')}
                    </div>
                  </div>

                  {selectedTraining.reac && (
                    <div>
                      <Label className="text-base font-medium">REAC (Référentiel Emploi Activités Compétences)</Label>
                      <div className="mt-2">
                        {renderFileInfo(selectedTraining.reac, 'REAC')}
                      </div>
                    </div>
                  )}

                  {selectedTraining.rev && (
                    <div>
                      <Label className="text-base font-medium">REV (Référentiel de Validation)</Label>
                      <div className="mt-2">
                        {renderFileInfo(selectedTraining.rev, 'REV')}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 pt-4 border-t">
                    <p>Créé le {new Date(selectedTraining.createdAt).toLocaleDateString('fr-FR')}</p>
                    <p>Modifié le {new Date(selectedTraining.updatedAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  const TrainingSection = ({ title, trainings, type }: { 
    title: string; 
    trainings: TrainingCatalog[]; 
    type: 'action' | 'apprenticeship' 
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <Badge className={`${getTypeBadgeColor(type)}`}>
          {trainings.length} formation{trainings.length > 1 ? 's' : ''}
        </Badge>
      </div>
      
      {trainings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <BookOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">Aucune formation de ce type disponible</p>
        </div>
      )}
    </div>
  );

  const TrainingCatalogView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Catalogue des formations</h2>
          <p className="text-gray-600 mt-1">
            {trainings.length} formation{trainings.length > 1 ? 's' : ''} au total
          </p>
        </div>
      </div>

      <TrainingSection 
        title="Formations par action" 
        trainings={groupedTrainings.action} 
        type="action"
      />

      <TrainingSection 
        title="Formations par apprentissage" 
        trainings={groupedTrainings.apprenticeship} 
        type="apprenticeship"
      />

      {trainings.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation disponible</h3>
          <p className="text-gray-600">Commencez par créer votre première formation.</p>
        </div>
      )}
    </div>
  );

  return (
    <PageLayout title="Catalogue de formations" subtitle="Gérez et consultez toutes les formations disponibles">
      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Catalogue
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Création de formation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <TrainingCatalogView />
        </TabsContent>

        <TabsContent value="create">
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Créer une nouvelle formation</h2>
              <p className="text-gray-600 mt-1">
                Ajoutez une nouvelle formation au catalogue en remplissant les informations ci-dessous.
              </p>
            </div>
            <CreateTrainingCatalogForm
              onSubmit={handleCreateTraining}
              onCancel={() => {
                // Retourner à l'onglet catalogue
                const catalogTab = document.querySelector('[value="catalog"]') as HTMLElement;
                catalogTab?.click();
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default TrainingCatalogPage;
