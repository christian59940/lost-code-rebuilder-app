
export interface TrainingSession {
  id: string;
  title: string;
  date: string;
  timeSlot: string;
  startTime: string;
  endTime: string;
  trainer: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'confirmed';
  description?: string;
  participants?: string[];
  participantCount: number;
  trainerPresence?: 'present' | 'absent' | 'pending';
}
