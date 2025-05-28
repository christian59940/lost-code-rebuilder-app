
export interface Session {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  participants: string[];
  maxParticipants: number;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  signatures: Array<{
    participantId: string;
    participantName: string;
    signedAt: string;
    period: 'morning' | 'afternoon';
  }>;
  attendanceTracking: Array<{
    participantId: string;
    participantName: string;
    status: 'present' | 'absent' | 'late';
    lateMinutes?: number;
    period: 'morning' | 'afternoon';
    recordedAt: string;
  }>;
  signatureRequests: Array<{
    period: 'morning' | 'afternoon';
    requestedAt: string;
  }>;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
}

export interface AttendanceStats {
  morning: {
    present: number;
    late: number;
    absent: number;
  };
  afternoon: {
    present: number;
    late: number;
    absent: number;
  };
}
