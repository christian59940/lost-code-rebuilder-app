
import { Card, CardContent } from '@/components/ui/card';
import { Session } from '@/types/Session';

interface SessionStatsProps {
  sessions: Session[];
}

export const SessionStats = ({ sessions }: SessionStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{sessions.length}</div>
          <p className="text-sm text-gray-600">Mes sessions</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {sessions.filter(s => s.status === 'in-progress').length}
          </div>
          <p className="text-sm text-gray-600">En cours</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-gray-600">
            {sessions.filter(s => s.status === 'scheduled').length}
          </div>
          <p className="text-sm text-gray-600">Programmées</p>
        </CardContent>
      </Card>
    </div>
  );
};
