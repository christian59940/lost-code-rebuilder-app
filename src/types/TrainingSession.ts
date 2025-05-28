
export interface TrainingSession {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  description?: string;
  participants?: string[];
}
