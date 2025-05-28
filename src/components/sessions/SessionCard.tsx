
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, UserX, CheckCircle, Mail } from 'lucide-react';
import { Session } from '@/types/Session';
import { 
  getStatusColor, 
  getStatusLabel, 
  formatDate, 
  formatTime, 
  isSignatureRequestSent, 
  getAttendanceStats 
} from '@/utils/sessionUtils';

interface SessionCardProps {
  session: Session;
  onAttendanceManagement: (session: Session) => void;
  onSignatureRequest: (sessionId: string, period: 'morning' | 'afternoon') => void;
}

export const SessionCard = ({ session, onAttendanceManagement, onSignatureRequest }: SessionCardProps) => {
  const attendanceStats = getAttendanceStats(session);
  const morningRequestSent = isSignatureRequestSent(session, 'morning');
  const afternoonRequestSent = isSignatureRequestSent(session, 'afternoon');

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold">{session.title}</h3>
              <Badge className={getStatusColor(session.status)}>
                {getStatusLabel(session.status)}
              </Badge>
            </div>
            
            {session.description && (
              <p className="text-gray-600 mb-3">{session.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(session.startDate)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{session.participants.length} participants</span>
              </div>
            </div>

            {session.location && (
              <div className="mb-3 text-sm text-gray-600">
                📍 {session.location}
              </div>
            )}

            {/* Statistiques de présence */}
            {(attendanceStats.morning.present > 0 || attendanceStats.morning.late > 0 || attendanceStats.morning.absent > 0 ||
              attendanceStats.afternoon.present > 0 || attendanceStats.afternoon.late > 0 || attendanceStats.afternoon.absent > 0) && (
              <div className="grid grid-cols-2 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm mb-2">Matin</h4>
                  <div className="flex space-x-4 text-xs">
                    {attendanceStats.morning.present > 0 && (
                      <span className="text-green-600">✓ {attendanceStats.morning.present}</span>
                    )}
                    {attendanceStats.morning.late > 0 && (
                      <span className="text-orange-600">⏰ {attendanceStats.morning.late}</span>
                    )}
                    {attendanceStats.morning.absent > 0 && (
                      <span className="text-red-600">✗ {attendanceStats.morning.absent}</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Après-midi</h4>
                  <div className="flex space-x-4 text-xs">
                    {attendanceStats.afternoon.present > 0 && (
                      <span className="text-green-600">✓ {attendanceStats.afternoon.present}</span>
                    )}
                    {attendanceStats.afternoon.late > 0 && (
                      <span className="text-orange-600">⏰ {attendanceStats.afternoon.late}</span>
                    )}
                    {attendanceStats.afternoon.absent > 0 && (
                      <span className="text-red-600">✗ {attendanceStats.afternoon.absent}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            {(session.status === 'in-progress' || session.status === 'scheduled') && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onAttendanceManagement(session)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <UserX className="mr-1 h-3 w-3" />
                  Présences
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSignatureRequest(session.id, 'morning')}
                  disabled={morningRequestSent}
                  className={morningRequestSent 
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed" 
                    : "text-green-600 hover:text-green-700"
                  }
                >
                  {morningRequestSent ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <Mail className="mr-1 h-3 w-3" />
                  )}
                  {morningRequestSent ? 'Envoyé matin' : 'Signature matin'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSignatureRequest(session.id, 'afternoon')}
                  disabled={afternoonRequestSent}
                  className={afternoonRequestSent 
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed" 
                    : "text-purple-600 hover:text-purple-700"
                  }
                >
                  {afternoonRequestSent ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <Mail className="mr-1 h-3 w-3" />
                  )}
                  {afternoonRequestSent ? 'Envoyé après-midi' : 'Signature après-midi'}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
