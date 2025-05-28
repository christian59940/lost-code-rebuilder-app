
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';
import { getStatusColor, getStatusLabel } from '@/utils/dashboardUtils';
import { handleViewSessionDetails } from '@/utils/dashboardActions';

interface SessionsOverviewProps {
  title: string;
  description: string;
  sessions: any[];
  emptyMessage: string;
}

export const SessionsOverview = ({ title, description, sessions, emptyMessage }: SessionsOverviewProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune session
            </h3>
            <p className="text-gray-600">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{session.title}</h4>
                    <Badge className={getStatusColor(session.status)}>
                      {getStatusLabel(session.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {session.instructor} • {session.date} • {session.time}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {session.signatures}/{session.participants} signatures
                    </span>
                    <Progress 
                      value={(session.signatures / session.participants) * 100} 
                      className="w-20 h-2"
                    />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewSessionDetails(session.id)}
                >
                  Voir détails
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
