
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface BasicInfoSectionProps {
  formData: {
    title: string;
    description: string;
    instructor: string;
    location: string;
    maxParticipants: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Informations générales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Titre de la session *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Ex: Formation React Avancé"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Description détaillée de la formation..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="instructor">Formateur *</Label>
          <Select value={formData.instructor} onValueChange={(value) => onInputChange('instructor', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un formateur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Jean Administrateur</SelectItem>
              <SelectItem value="2">Marie Formatrice</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Lieu</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => onInputChange('location', e.target.value)}
              placeholder="Ex: Salle A1"
            />
          </div>
          <div>
            <Label htmlFor="maxParticipants">Nombre max de participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              min="1"
              max="100"
              value={formData.maxParticipants}
              onChange={(e) => onInputChange('maxParticipants', e.target.value)}
              placeholder="20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
