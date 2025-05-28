
import { Calendar } from '@/components/ui/calendar';
import { TrainingSession } from '@/types/TrainingSession';

interface CalendarViewProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  trainingSessions: TrainingSession[];
}

export const CalendarView = ({ selectedDate, onDateSelect, trainingSessions }: CalendarViewProps) => {
  const getSessionDates = () => {
    return trainingSessions.map(session => new Date(session.date));
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
        }}
        modifiersClassNames={{
          session: "bg-blue-100 text-blue-800 font-bold hover:bg-blue-200 cursor-pointer border-2 border-blue-300",
        }}
      />
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-3 h-3 bg-blue-100 border-2 border-blue-300 rounded"></div>
          <span>Jours avec formations (cliquez pour voir les détails)</span>
        </div>
        <div className="text-xs text-gray-500">
          💡 Astuce: Cliquez directement sur les jours en bleu pour gérer votre présence
        </div>
      </div>
    </div>
  );
};
