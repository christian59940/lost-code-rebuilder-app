
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, X } from 'lucide-react';

interface DateRangeFilterProps {
  onFilterChange: (dateFilter: { from?: Date; to?: Date }) => void;
  dateFilter: { from?: Date; to?: Date };
}

export const DateRangeFilter = ({ onFilterChange, dateFilter }: DateRangeFilterProps) => {
  const [fromDate, setFromDate] = useState<string>(
    dateFilter.from ? dateFilter.from.toISOString().split('T')[0] : ''
  );
  const [toDate, setToDate] = useState<string>(
    dateFilter.to ? dateFilter.to.toISOString().split('T')[0] : ''
  );

  const handleApplyFilter = () => {
    const filter: { from?: Date; to?: Date } = {};
    
    if (fromDate) {
      filter.from = new Date(fromDate);
    }
    if (toDate) {
      filter.to = new Date(toDate);
    }
    
    onFilterChange(filter);
  };

  const handleClearFilter = () => {
    setFromDate('');
    setToDate('');
    onFilterChange({});
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Filtrer par période</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="from-date" className="text-xs">Date de début</Label>
            <Input
              id="from-date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-8"
            />
          </div>
          <div>
            <Label htmlFor="to-date" className="text-xs">Date de fin</Label>
            <Input
              id="to-date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-8"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleApplyFilter}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Appliquer
          </Button>
          <Button
            onClick={handleClearFilter}
            variant="outline"
            size="sm"
          >
            <X className="h-3 w-3 mr-1" />
            Effacer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
