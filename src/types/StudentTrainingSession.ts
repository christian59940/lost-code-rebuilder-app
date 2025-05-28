
export interface StudentTrainingSession {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: string;
  location: string;
  status: 'upcoming' | 'completed' | 'absent' | 'present';
  description?: string;
}
