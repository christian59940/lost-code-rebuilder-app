
import { Calendar } from '@/components/ui/calendar';
import { StudentTrainingSession } from '@/types/StudentTrainingSession';

interface StudentCalendarViewProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  trainingSessions: StudentTrainingSession[];
}

export const StudentCalendarView = ({ 
  selectedDate, 
  onDateSelect, 
  trainingSessions 
}: StudentCalendarViewProps) => {
  const getSessionDates = () => {
    return trainingSessions.map(session => new Date(session.date));
  };

  const getSignedPresenceDates = () => {
    return trainingSessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        const isPast = sessionDate < new Date();
        return isPast && session.hasSignedPresence === true;
      })
      .map(session => new Date(session.date));
  };

  const getUnsignedPresenceDates = () => {
    return trainingSessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        const isPast = sessionDate < new Date();
        return isPast && session.hasSignedPresence === false;
      })
      .map(session => new Date(session.date));
  };

  const getUpcomingDates = () => {
    return trainingSessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= new Date();
      })
      .map(session => new Date(session.date));
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border w-full pointer-events-auto"
        modifiers={{
          session: getSessionDates(),
          signedPresence: getSignedPresenceDates(),
          unsignedPresence: getUnsignedPresenceDates(),
          upcoming: getUpcomingDates(),
        }}
        modifiersClassNames={{
          session: "font-bold hover:bg-blue-200 cursor-pointer",
          signedPresence: "bg-green-100 text-green-800 font-bold hover:bg-green-200 cursor-pointer border-2 border-green-500",
          unsignedPresence: "bg-red-100 text-red-800 font-bold hover:bg-red-200 cursor-pointer border-2 border-red-500",
          upcoming: "bg-blue-100 text-blue-800 font-bold hover:bg-blue-200 cursor-pointer border-2 border-blue-300",
        }}
      />
      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border-2 border-blue-300 rounded"></div>
            <span>Formations à venir</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border-2 border-green-500 rounded"></div>
            <span>Formations passées - Présence signée</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-100 border-2 border-red-500 rounded"></div>
            <span>Formations passées - Présence non signée</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          💡 Astuce: Cliquez directement sur les jours colorés pour voir les détails de vos formations
        </div>
      </div>
    </div>
  );
};
