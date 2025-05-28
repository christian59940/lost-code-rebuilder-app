
export interface StudentTrainingSession {
  id: string;
  title: string;
  date: string;
  timeSlot: 'morning' | 'afternoon' | 'full-day';
  location: string;
  trainer: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  // Pour les formations passées : basé sur si l'apprenant a signé sa présence
  hasSignedPresence?: boolean; // true = a signé, false = n'a pas signé, undefined = formation à venir
  // Pour les formations à venir : possibilité d'indiquer une absence prévisionnelle
  willBeAbsent?: boolean;
  justificationDocument?: string;
  canJustifyAbsence?: boolean;
}
