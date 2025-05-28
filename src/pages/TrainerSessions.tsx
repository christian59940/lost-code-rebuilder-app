
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { DateRangeFilter } from '@/components/ui/date-range-filter';
import { ExcelExport } from '@/components/export/ExcelExport';
import { Session } from '@/types/Session';
import { SessionCard } from '@/components/sessions/SessionCard';
import { SessionStats } from '@/components/sessions/SessionStats';
import { AttendanceDialog } from '@/components/trainer/AttendanceDialog';
import { getParticipantName, prepareTrainerExportData } from '@/utils/trainerUtils';

// Données de démonstration pour les sessions de formateur
const demoSessions: Session[] = [
  {
    id: '1',
    title: 'Formation React Avancé',
    description: 'Formation approfondie sur React et ses concepts avancés',
    instructor: 'Marie Formatrice',
    instructorId: '2', // ID du formateur dans les données de démonstration
    startDate: '2024-01-15',
    endDate: '2024-01-15',
    startTime: '09:00',
    endTime: '17:00',
    participants: ['p1', 'p2', 'p3', 'p4'],
    maxParticipants: 12,
    location: 'Salle A - Batiment Formation',
    status: 'in-progress',
    signatures: [],
    attendanceTracking: [],
    signatureRequests: [],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Workshop UX/UI Design',
    description: 'Atelier pratique sur les principes de design UX/UI',
    instructor: 'Marie Formatrice',
    instructorId: '2',
    startDate: '2024-01-20',
    endDate: '2024-01-20',
    startTime: '14:00',
    endTime: '17:00',
    participants: ['p1', 'p3', 'p5'],
    maxParticipants: 8,
    location: 'Lab Design',
    status: 'scheduled',
    signatures: [],
    attendanceTracking: [],
    signatureRequests: [],
    createdAt: '2024-01-01',
  },
];

const TrainerSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>(demoSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'morning' | 'afternoon'>('morning');
  const [attendanceData, setAttendanceData] = useState<Record<string, { status: string; lateMinutes?: number }>>({});
  const [dateFilter, setDateFilter] = useState<{ from?: Date; to?: Date }>({});

  // Filtrer STRICTEMENT les sessions pour ne montrer que celles du formateur connecté
  const trainerSessions = sessions.filter(session => session.instructorId === user?.id);
  
  const filteredSessions = trainerSessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceManagement = (session: Session) => {
    setSelectedSession(session);
    setAttendanceData({});
    setIsAttendanceDialogOpen(true);
  };

  const handleAttendanceChange = (participantId: string, status: string, lateMinutes?: number) => {
    setAttendanceData(prev => ({
      ...prev,
      [participantId]: { status, lateMinutes }
    }));
  };

  const saveAttendance = () => {
    if (!selectedSession) return;

    const newAttendanceRecords = Object.entries(attendanceData).map(([participantId, data]) => ({
      participantId,
      participantName: getParticipantName(participantId),
      status: data.status as 'present' | 'absent' | 'late',
      lateMinutes: data.lateMinutes,
      period: selectedPeriod,
      recordedAt: new Date().toISOString(),
    }));

    setSessions(sessions.map(session => 
      session.id === selectedSession.id
        ? {
            ...session,
            attendanceTracking: [
              ...session.attendanceTracking.filter(
                record => !(record.period === selectedPeriod && 
                          Object.keys(attendanceData).includes(record.participantId))
              ),
              ...newAttendanceRecords
            ]
          }
        : session
    ));

    setIsAttendanceDialogOpen(false);
    toast({
      title: "Présences enregistrées",
      description: `Les présences pour ${selectedPeriod === 'morning' ? 'le matin' : "l'après-midi"} ont été mises à jour`,
    });
  };

  const sendSignatureRequest = (sessionId: string, period: 'morning' | 'afternoon') => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    // Ajouter la demande de signature à la session
    setSessions(sessions.map(s => 
      s.id === sessionId
        ? {
            ...s,
            signatureRequests: [
              ...s.signatureRequests,
              { period, requestedAt: new Date().toISOString() }
            ]
          }
        : s
    ));

    const periodLabel = period === 'morning' ? 'matin' : 'après-midi';
    
    toast({
      title: "Demande de signature envoyée",
      description: `La demande de signature pour ${periodLabel} a été envoyée à tous les participants de "${session.title}"`,
    });
  };

  return (
    <PageLayout 
      title="Mes Sessions de Formation"
      subtitle={`Gérez vos ${trainerSessions.length} session${trainerSessions.length > 1 ? 's' : ''} et suivez les présences`}
    >
      <div className="space-y-6">
        {/* Export et filtres */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DateRangeFilter 
              dateFilter={dateFilter}
              onFilterChange={setDateFilter}
            />
          </div>
          <div className="flex items-end">
            <ExcelExport
              data={prepareTrainerExportData(trainerSessions)}
              filename="mes_heures_formation"
              title="Heures de formation"
              dateFilter={dateFilter}
            />
          </div>
        </div>

        {/* Header avec recherche */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher dans mes sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Vérification d'accès - affichage d'un message si pas de sessions */}
        {trainerSessions.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session assignée</h3>
              <p className="text-gray-600">
                Vous n'avez actuellement aucune session de formation assignée. Contactez votre administrateur si vous pensez qu'il s'agit d'une erreur.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Statistiques rapides - seulement si le formateur a des sessions */}
        {trainerSessions.length > 0 && (
          <SessionStats sessions={trainerSessions} />
        )}

        {/* Liste des sessions - seulement les sessions du formateur connecté */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onAttendanceManagement={handleAttendanceManagement}
              onSignatureRequest={sendSignatureRequest}
            />
          ))}
        </div>

        {/* Dialog de gestion des présences */}
        <AttendanceDialog
          isOpen={isAttendanceDialogOpen}
          onOpenChange={setIsAttendanceDialogOpen}
          selectedSession={selectedSession}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          attendanceData={attendanceData}
          onAttendanceChange={handleAttendanceChange}
          onSave={saveAttendance}
        />

        {filteredSessions.length === 0 && trainerSessions.length > 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune session trouvée</h3>
              <p className="text-gray-600">
                Aucune de vos sessions ne correspond à votre recherche.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default TrainerSessions;
