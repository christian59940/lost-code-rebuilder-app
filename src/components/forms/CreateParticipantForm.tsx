
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  studentId?: string;
  company?: string;
  companyResponsible?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  apprenticeshipSupervisor?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  trainingTitle?: string;
  sessionsAttended: number;
  totalHours: number;
  createdAt: string;
  isActive: boolean;
}

interface CreateParticipantFormProps {
  onParticipantCreated: (participant: Participant) => void;
  onCancel: () => void;
  existingParticipants: Participant[];
}

const CreateParticipantForm = ({ onParticipantCreated, onCancel, existingParticipants }: CreateParticipantFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    company: '',
    trainingTitle: '',
    isActive: true,
    hasCompanyInfo: false,
    companyResponsible: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    apprenticeshipSupervisor: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le prénom, nom et email sont obligatoires.",
        variant: "destructive",
      });
      return false;
    }

    // Vérifier si l'email existe déjà
    if (existingParticipants.some(p => p.email === formData.email)) {
      toast({
        title: "Email déjà existant",
        description: "Un participant avec cet email existe déjà.",
        variant: "destructive",
      });
      return false;
    }

    // Vérifier si le numéro étudiant existe déjà (s'il est fourni)
    if (formData.studentId && existingParticipants.some(p => p.studentId === formData.studentId)) {
      toast({
        title: "Numéro étudiant déjà existant",
        description: "Un participant avec ce numéro étudiant existe déjà.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newParticipant: Participant = {
      id: Date.now().toString(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      studentId: formData.studentId.trim() || undefined,
      company: formData.company.trim() || undefined,
      trainingTitle: formData.trainingTitle.trim() || undefined,
      companyResponsible: formData.hasCompanyInfo && formData.companyResponsible.firstName ? formData.companyResponsible : undefined,
      apprenticeshipSupervisor: formData.hasCompanyInfo && formData.apprenticeshipSupervisor.firstName ? formData.apprenticeshipSupervisor : undefined,
      sessionsAttended: 0,
      totalHours: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: formData.isActive,
    };

    onParticipantCreated(newParticipant);
    
    toast({
      title: "Participant créé",
      description: `${newParticipant.firstName} ${newParticipant.lastName} a été ajouté avec succès.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations académiques */}
      <Card>
        <CardHeader>
          <CardTitle>Informations académiques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId">Numéro étudiant</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="trainingTitle">Titre de formation</Label>
              <Input
                id="trainingTitle"
                value={formData.trainingTitle}
                onChange={(e) => handleInputChange('trainingTitle', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations entreprise */}
      <Card>
        <CardHeader>
          <CardTitle>Informations entreprise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="hasCompanyInfo"
              checked={formData.hasCompanyInfo}
              onCheckedChange={(checked) => handleInputChange('hasCompanyInfo', checked)}
            />
            <Label htmlFor="hasCompanyInfo">Ajouter les contacts en entreprise</Label>
          </div>

          {formData.hasCompanyInfo && (
            <div className="space-y-6">
              {/* Responsable en entreprise */}
              <div>
                <h4 className="font-medium mb-3">Responsable en entreprise</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyResponsibleFirstName">Prénom</Label>
                    <Input
                      id="companyResponsibleFirstName"
                      value={formData.companyResponsible.firstName}
                      onChange={(e) => handleNestedInputChange('companyResponsible', 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyResponsibleLastName">Nom</Label>
                    <Input
                      id="companyResponsibleLastName"
                      value={formData.companyResponsible.lastName}
                      onChange={(e) => handleNestedInputChange('companyResponsible', 'lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyResponsiblePhone">Téléphone</Label>
                    <Input
                      id="companyResponsiblePhone"
                      value={formData.companyResponsible.phone}
                      onChange={(e) => handleNestedInputChange('companyResponsible', 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyResponsibleEmail">Email</Label>
                    <Input
                      id="companyResponsibleEmail"
                      type="email"
                      value={formData.companyResponsible.email}
                      onChange={(e) => handleNestedInputChange('companyResponsible', 'email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Maître d'apprentissage */}
              <div>
                <h4 className="font-medium mb-3">Maître d'apprentissage</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supervisorFirstName">Prénom</Label>
                    <Input
                      id="supervisorFirstName"
                      value={formData.apprenticeshipSupervisor.firstName}
                      onChange={(e) => handleNestedInputChange('apprenticeshipSupervisor', 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supervisorLastName">Nom</Label>
                    <Input
                      id="supervisorLastName"
                      value={formData.apprenticeshipSupervisor.lastName}
                      onChange={(e) => handleNestedInputChange('apprenticeshipSupervisor', 'lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supervisorPhone">Téléphone</Label>
                    <Input
                      id="supervisorPhone"
                      value={formData.apprenticeshipSupervisor.phone}
                      onChange={(e) => handleNestedInputChange('apprenticeshipSupervisor', 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supervisorEmail">Email</Label>
                    <Input
                      id="supervisorEmail"
                      type="email"
                      value={formData.apprenticeshipSupervisor.email}
                      onChange={(e) => handleNestedInputChange('apprenticeshipSupervisor', 'email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statut */}
      <Card>
        <CardHeader>
          <CardTitle>Statut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
            <Label htmlFor="isActive">Participant actif</Label>
          </div>
        </CardContent>
      </Card>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Créer le participant
        </Button>
      </div>
    </form>
  );
};

export default CreateParticipantForm;
