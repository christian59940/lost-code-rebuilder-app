
export interface TrainingCatalog {
  id: string;
  title: string;
  duration: number;
  type: 'action' | 'apprenticeship';
  program: string | File;
  reac?: string | File;
  rev?: string | File;
  createdAt: string;
  updatedAt: string;
}
