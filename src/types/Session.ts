
export interface Session {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  participants: string[];
  attendanceTracking: AttendanceRecord[];
  signatureRequests: SignatureRequest[];
}

export interface AttendanceRecord {
  participantId: string;
  period: 'morning' | 'afternoon';
  status: 'present' | 'late' | 'absent';
  lateMinutes?: number;
  timestamp: string;
}

export interface SignatureRequest {
  period: 'morning' | 'afternoon';
  sentAt: string;
  status: 'sent' | 'signed' | 'expired';
}

export interface Participant {
  id: string;
  name: string;
  email: string;
}
