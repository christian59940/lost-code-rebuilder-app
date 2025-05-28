
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Users, GraduationCap, Calendar, Euro, Download, Search, Filter, FileText, Calculator, Upload, Send, CheckCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface MonthlyHours {
  month: string;
  year: number;
  hours: number;
  earnings?: number;
  sessionsCount: number;
  date: Date;
}

interface TrainerHours {
  id: string;
  firstName: string;
  lastName: string;
  totalHours: number;
  totalEarnings: number;
  monthlyHours: MonthlyHours[];
  hourlyRate: number;
}

interface ParticipantHours {
  id: string;
  firstName: string;
  lastName: string;
  totalHours: number;
  monthlyHours: MonthlyHours[];
  level: string;
  organization?: string;
}

interface InvoiceUpload {
  id: string;
  trainerId: string;
  fileName: string;
  uploadDate: Date;
  period: string;
  status: 'pending' | 'sent' | 'processed';
  amount: number;
}

// Données professionnelles simulées pour la facture (normalement récupérées du profil)
const mockProfessionalData = {
  companyName: 'Formation Excellence SARL',
  logo: '',
  siretNumber: '12345678901234',
  uaiCode: '0123456X',
  address: '123 Rue de la Formation\n75001 Paris',
  phone: '01 23 45 67 89',
  bankDetails: 'IBAN: FR76 1234 5678 9012 3456 7890 123\nBIC: ABCDEFGH\nBanque: Crédit Formation',
};

// Données de démonstration avec dates complètes
const demoTrainersHours: TrainerHours[] = [
  {
    id: '2', // ID correspondant au formateur connecté
    firstName: 'Marie',
    lastName: 'Formatrice',
    totalHours: 142,
    totalEarnings: 9230,
    hourlyRate: 65,
    monthlyHours: [
      { month: 'janvier', year: 2024, hours: 32, earnings: 2080, sessionsCount: 4, date: new Date(2024, 0, 15) },
      { month: 'février', year: 2024, hours: 28, earnings: 1820, sessionsCount: 3, date: new Date(2024, 1, 15) },
      { month: 'mars', year: 2024, hours: 35, earnings: 2275, sessionsCount: 4, date: new Date(2024, 2, 15) },
      { month: 'avril', year: 2024, hours: 24, earnings: 1560, sessionsCount: 3, date: new Date(2024, 3, 15) },
      { month: 'mai', year: 2024, hours: 23, earnings: 1495, sessionsCount: 2, date: new Date(2024, 4, 15) },
    ],
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Bernard',
    totalHours: 89,
    totalEarnings: 4895,
    hourlyRate: 55,
    monthlyHours: [
      { month: 'janvier', year: 2024, hours: 18, earnings: 990, sessionsCount: 2, date: new Date(2024, 0, 15) },
      { month: 'février', year: 2024, hours: 22, earnings: 1210, sessionsCount: 3, date: new Date(2024, 1, 15) },
      { month: 'mars', year: 2024, hours: 25, earnings: 1375, sessionsCount: 3, date: new Date(2024, 2, 15) },
      { month: 'avril', year: 2024, hours: 16, earnings: 880, sessionsCount: 2, date: new Date(2024, 3, 15) },
      { month: 'mai', year: 2024, hours: 8, earnings: 440, sessionsCount: 1, date: new Date(2024, 4, 15) },
    ],
  },
];

const demoParticipantsHours: ParticipantHours[] = [
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Dupont',
    totalHours: 75,
    level: 'intermediaire',
    organization: 'Université de Paris',
    monthlyHours: [
      { month: 'janvier', year: 2024, hours: 16, sessionsCount: 2, date: new Date(2024, 0, 15) },
      { month: 'février', year: 2024, hours: 18, sessionsCount: 2, date: new Date(2024, 1, 15) },
      { month: 'mars', year: 2024, hours: 20, sessionsCount: 3, date: new Date(2024, 2, 15) },
      { month: 'avril', year: 2024, hours: 12, sessionsCount: 2, date: new Date(2024, 3, 15) },
      { month: 'mai', year: 2024, hours: 9, sessionsCount: 1, date: new Date(2024, 4, 15) },
    ],
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Rousseau',
    totalHours: 95,
    level: 'avance',
    organization: 'EPITECH',
    monthlyHours: [
      { month: 'janvier', year: 2024, hours: 20, sessionsCount: 3, date: new Date(2024, 0, 15) },
      { month: 'février', year: 2024, hours: 22, sessionsCount: 3, date: new Date(2024, 1, 15) },
      { month: 'mars', year: 2024, hours: 25, sessionsCount: 4, date: new Date(2024, 2, 15) },
      { month: 'avril', year: 2024, hours: 18, sessionsCount: 2, date: new Date(2024, 3, 15) },
      { month: 'mai', year: 2024, hours: 10, sessionsCount: 1, date: new Date(2024, 4, 15) },
    ],
  },
];

const TimeTracking = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('tous');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedInvoices, setUploadedInvoices] = useState<InvoiceUpload[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const filterByDateRange = (monthlyHours: MonthlyHours[]) => {
    if (!startDate && !endDate) return monthlyHours;
    
    return monthlyHours.filter(mh => {
      const itemDate = mh.date;
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      
      return itemDate >= start && itemDate <= end;
    });
  };

  const getTotalHoursForPeriod = (monthlyHours: MonthlyHours[]) => {
    return filterByDateRange(monthlyHours).reduce((total, mh) => total + mh.hours, 0);
  };

  const getTotalEarningsForPeriod = (monthlyHours: MonthlyHours[]) => {
    return filterByDateRange(monthlyHours).reduce((total, mh) => total + (mh.earnings || 0), 0);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'text/html' || file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Format non supporté",
          description: "Veuillez sélectionner un fichier PDF, HTML ou image",
          variant: "destructive",
        });
      }
    }
  };

  const handleInvoiceUpload = () => {
    if (!selectedFile || !user) return;

    const periodText = startDate && endDate 
      ? `${new Date(startDate).toLocaleDateString('fr-FR')} - ${new Date(endDate).toLocaleDateString('fr-FR')}`
      : 'Période complète';

    const trainer = demoTrainersHours.find(t => t.id === user.id);
    const earnings = trainer ? getTotalEarningsForPeriod(trainer.monthlyHours) : 0;

    const newInvoice: InvoiceUpload = {
      id: Math.random().toString(36).substr(2, 9),
      trainerId: user.id,
      fileName: selectedFile.name,
      uploadDate: new Date(),
      period: periodText,
      status: 'pending',
      amount: earnings,
    };

    setUploadedInvoices(prev => [...prev, newInvoice]);
    setSelectedFile(null);

    toast({
      title: "Facture téléchargée",
      description: "Votre facture a été téléchargée avec succès",
    });
  };

  const handleSendToAdmin = (invoiceId: string) => {
    setUploadedInvoices(prev => 
      prev.map(inv => 
        inv.id === invoiceId 
          ? { ...inv, status: 'sent' }
          : inv
      )
    );

    toast({
      title: "Facture envoyée",
      description: "Votre facture a été envoyée à l'administration",
    });
  };

  // Filtrer les données selon le rôle de l'utilisateur
  const getFilteredTrainers = () => {
    let trainersToShow = demoTrainersHours;
    
    // Si l'utilisateur est un formateur, ne montrer que ses propres données
    if (user?.role === 'formateur') {
      trainersToShow = demoTrainersHours.filter(trainer => trainer.id === user.id);
    }
    
    // Appliquer le filtre de recherche
    return trainersToShow.filter(trainer =>
      trainer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredParticipants = () => {
    // Les formateurs ne voient pas les participants
    if (user?.role === 'formateur') {
      return [];
    }
    
    return demoParticipantsHours.filter(participant =>
      participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTrainers = getFilteredTrainers();
  const filteredParticipants = getFilteredParticipants();

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setFilterType('tous');
  };

  const generateInvoice = (trainer: TrainerHours) => {
    const filteredHours = getTotalHoursForPeriod(trainer.monthlyHours);
    const filteredEarnings = getTotalEarningsForPeriod(trainer.monthlyHours);
    
    if (filteredHours === 0) {
      toast({
        title: "Aucune heure à facturer",
        description: "Aucune heure trouvée pour la période sélectionnée",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date();
    const invoiceNumber = `FACT-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const periodText = startDate && endDate 
      ? `du ${new Date(startDate).toLocaleDateString('fr-FR')} au ${new Date(endDate).toLocaleDateString('fr-FR')}`
      : 'Toute la période';

    const sessionDetails = filterByDateRange(trainer.monthlyHours);
    const totalHT = filteredEarnings;
    const tva = totalHT * 0.20; // TVA à 20%
    const totalTTC = totalHT + tva;

    // Créer une facture professionnelle au format HTML
    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Facture ${invoiceNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .logo { max-width: 150px; }
        .company-info { text-align: left; }
        .company-info h1 { margin: 0; color: #2563eb; font-size: 24px; }
        .invoice-info { text-align: right; }
        .invoice-info h2 { margin: 0; font-size: 28px; color: #dc2626; }
        .billing-section { display: flex; justify-content: space-between; margin: 30px 0; }
        .billing-to, .billing-from { width: 45%; }
        .billing-to h3, .billing-from h3 { color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .details-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
        .details-table th, .details-table td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
        .details-table th { background-color: #f3f4f6; font-weight: bold; }
        .amount { text-align: right; font-weight: bold; }
        .total-section { margin-top: 30px; text-align: right; }
        .total-line { display: flex; justify-content: flex-end; margin: 5px 0; }
        .total-label { width: 200px; text-align: right; padding-right: 20px; }
        .total-amount { width: 100px; text-align: right; font-weight: bold; }
        .final-total { font-size: 18px; color: #dc2626; border-top: 2px solid #333; padding-top: 10px; }
        .payment-info { margin-top: 40px; padding: 20px; background-color: #f9fafb; border-left: 4px solid #2563eb; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-info">
            ${mockProfessionalData.logo ? `<img src="${mockProfessionalData.logo}" alt="Logo" class="logo">` : ''}
            <h1>${mockProfessionalData.companyName}</h1>
            <p>${mockProfessionalData.address.replace(/\n/g, '<br>')}</p>
            <p>Tél: ${mockProfessionalData.phone}</p>
            <p>SIRET: ${mockProfessionalData.siretNumber}</p>
            <p>Code UAI: ${mockProfessionalData.uaiCode}</p>
        </div>
        <div class="invoice-info">
            <h2>FACTURE</h2>
            <p><strong>N° ${invoiceNumber}</strong></p>
            <p>Date: ${currentDate.toLocaleDateString('fr-FR')}</p>
            <p>Échéance: ${new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}</p>
        </div>
    </div>

    <div class="billing-section">
        <div class="billing-from">
            <h3>Émetteur</h3>
            <p><strong>${mockProfessionalData.companyName}</strong></p>
            <p>${mockProfessionalData.address.replace(/\n/g, '<br>')}</p>
            <p>SIRET: ${mockProfessionalData.siretNumber}</p>
        </div>
        <div class="billing-to">
            <h3>Facturé à</h3>
            <p><strong>Centre de Formation</strong></p>
            <p>Adresse du client<br>
            Code postal Ville</p>
        </div>
    </div>

    <table class="details-table">
        <thead>
            <tr>
                <th>Période</th>
                <th>Description</th>
                <th>Heures</th>
                <th>Tarif HT</th>
                <th class="amount">Total HT</th>
            </tr>
        </thead>
        <tbody>
            ${sessionDetails.map(session => `
                <tr>
                    <td>${session.month.charAt(0).toUpperCase() + session.month.slice(1)} ${session.year}</td>
                    <td>Formation professionnelle (${session.sessionsCount} session${session.sessionsCount > 1 ? 's' : ''})</td>
                    <td>${session.hours}h</td>
                    <td>${formatCurrency(trainer.hourlyRate)}</td>
                    <td class="amount">${formatCurrency(session.earnings || 0)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="total-section">
        <div class="total-line">
            <div class="total-label">Sous-total HT:</div>
            <div class="total-amount">${formatCurrency(totalHT)}</div>
        </div>
        <div class="total-line">
            <div class="total-label">TVA (20%):</div>
            <div class="total-amount">${formatCurrency(tva)}</div>
        </div>
        <div class="total-line final-total">
            <div class="total-label">Total TTC:</div>
            <div class="total-amount">${formatCurrency(totalTTC)}</div>
        </div>
    </div>

    <div class="payment-info">
        <h3>Informations de paiement</h3>
        <p>${mockProfessionalData.bankDetails.replace(/\n/g, '<br>')}</p>
        <p><strong>Conditions de paiement:</strong> 30 jours net</p>
        <p><strong>Pénalités de retard:</strong> 3 fois le taux d'intérêt légal</p>
    </div>

    <div class="footer">
        <p>Organisme de formation déclaré sous le numéro ${mockProfessionalData.uaiCode} auprès du Préfet de région</p>
        <p>TVA non applicable - Article 293B du CGI (Formation)</p>
    </div>
</body>
</html>
    `;

    // Créer et télécharger le fichier HTML
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Facture-${invoiceNumber}-${trainer.firstName}-${trainer.lastName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Facture générée",
      description: `Facture professionnelle de ${formatCurrency(totalTTC)} TTC générée`,
    });
  };

  // Ajuster le titre selon le rôle
  const getPageTitle = () => {
    if (user?.role === 'formateur') {
      return 'Mes Heures de Formation';
    }
    return 'Comptabilisation des Heures';
  };

  const getPageSubtitle = () => {
    if (user?.role === 'formateur') {
      return 'Suivi de vos heures réalisées et génération de factures';
    }
    return 'Suivi des heures réalisées par les formateurs et participants';
  };

  return (
    <PageLayout 
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
    >
      <div className="space-y-6">
        {/* Filtres avancés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder={user?.role === 'formateur' ? "Rechercher..." : "Nom, prénom..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {user?.role === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="filter-type">Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="filter-type">
                      <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous</SelectItem>
                      <SelectItem value="formateurs">Formateurs</SelectItem>
                      <SelectItem value="apprenants">Apprenants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="start-date">Date de début</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">Date de fin</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={clearFilters} variant="outline">
                Effacer les filtres
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques globales filtrées */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {((user?.role === 'admin' && (filterType === 'tous' || filterType === 'formateurs')) || user?.role === 'formateur') 
                      ? filteredTrainers.reduce((total, t) => total + getTotalHoursForPeriod(t.monthlyHours), 0)
                      : 0}h
                  </div>
                  <p className="text-sm text-gray-600">
                    {user?.role === 'formateur' ? 'Mes heures' : 'Heures formateurs'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {user?.role === 'admin' && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {(filterType === 'tous' || filterType === 'apprenants') 
                        ? filteredParticipants.reduce((total, p) => total + getTotalHoursForPeriod(p.monthlyHours), 0)
                        : 0}h
                    </div>
                    <p className="text-sm text-gray-600">Heures apprenants</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Euro className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(((user?.role === 'admin' && (filterType === 'tous' || filterType === 'formateurs')) || user?.role === 'formateur') 
                      ? filteredTrainers.reduce((total, t) => total + getTotalEarningsForPeriod(t.monthlyHours), 0)
                      : 0)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {user?.role === 'formateur' ? 'Mes gains' : 'Coût total'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {startDate && endDate ? 'Période' : 'Total'}
                  </div>
                  <p className="text-sm text-gray-600">
                    {startDate && endDate 
                      ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
                      : 'Toutes périodes'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section d'upload de factures pour les formateurs */}
        {user?.role === 'formateur' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Envoyer ma facture à l'administration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-upload">Sélectionner la facture</Label>
                  <Input
                    id="invoice-upload"
                    type="file"
                    accept=".pdf,.html,.png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                  />
                  <p className="text-sm text-gray-500">
                    Formats acceptés : PDF, HTML, Images (PNG, JPG)
                  </p>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={handleInvoiceUpload}
                    disabled={!selectedFile}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger la facture
                  </Button>
                </div>
              </div>

              {/* Liste des factures téléchargées */}
              {uploadedInvoices.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Factures téléchargées</h4>
                  <div className="space-y-2">
                    {uploadedInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{invoice.fileName}</div>
                            <div className="text-sm text-gray-500">
                              {invoice.period} - {formatCurrency(invoice.amount)}
                            </div>
                            <div className="text-xs text-gray-400">
                              Téléchargé le {invoice.uploadDate.toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {invoice.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleSendToAdmin(invoice.id)}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Envoyer
                            </Button>
                          )}
                          {invoice.status === 'sent' && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Envoyée
                            </Badge>
                          )}
                          {invoice.status === 'processed' && (
                            <Badge className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Traitée
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Contenu conditionnel selon le rôle */}
        {user?.role === 'admin' ? (
          // Vue admin avec onglets
          <Tabs defaultValue="trainers" className="w-full">
            {filterType === 'tous' && (
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="trainers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Formateurs
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Apprenants
                </TabsTrigger>
              </TabsList>
            )}

            {(filterType === 'tous' || filterType === 'formateurs') && (
              <TabsContent value="trainers" className="space-y-4">
                <div className="grid gap-4">
                  {filteredTrainers.map((trainer) => {
                    const periodHours = getTotalHoursForPeriod(trainer.monthlyHours);
                    const periodEarnings = getTotalEarningsForPeriod(trainer.monthlyHours);
                    
                    return (
                      <Card key={trainer.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {trainer.firstName.charAt(0)}{trainer.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">
                                  {trainer.firstName} {trainer.lastName}
                                </CardTitle>
                                <p className="text-sm text-gray-600">
                                  Tarif : {formatCurrency(trainer.hourlyRate)}/heure
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                {periodHours}h
                              </div>
                              <div className="text-lg font-medium text-green-600">
                                {formatCurrency(periodEarnings)}
                              </div>
                              {(startDate || endDate) && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Période filtrée
                                </div>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Détail par mois filtré */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              {filterByDateRange(trainer.monthlyHours).map((monthData, index) => (
                                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                                  <div className="font-medium text-sm text-gray-700">
                                    {monthData.month.charAt(0).toUpperCase() + monthData.month.slice(1)} {monthData.year}
                                  </div>
                                  <div className="text-xl font-bold text-blue-600">{monthData.hours}h</div>
                                  <div className="text-sm text-green-600">{formatCurrency(monthData.earnings || 0)}</div>
                                  <div className="text-xs text-gray-500">{monthData.sessionsCount} sessions</div>
                                </div>
                              ))}
                            </div>

                            {/* Section de facturation */}
                            {periodHours > 0 && (
                              <div className="border-t pt-4">
                                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <Calculator className="h-5 w-5 text-blue-600" />
                                    <div>
                                      <div className="font-medium text-blue-900">
                                        Facturation période
                                      </div>
                                      <div className="text-sm text-blue-700">
                                        {periodHours}h × {formatCurrency(trainer.hourlyRate)} = {formatCurrency(periodEarnings)}
                                      </div>
                                    </div>
                                  </div>
                                  <Button 
                                    onClick={() => generateInvoice(trainer)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                    size="sm"
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Générer facture
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            )}

            {(filterType === 'tous' || filterType === 'apprenants') && (
              <TabsContent value="participants" className="space-y-4">
                <div className="grid gap-4">
                  {filteredParticipants.map((participant) => (
                    <Card key={participant.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback className="bg-green-100 text-green-600">
                                {participant.firstName.charAt(0)}{participant.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">
                                {participant.firstName} {participant.lastName}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary">{participant.level}</Badge>
                                {participant.organization && (
                                  <span className="text-sm text-gray-600">{participant.organization}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              {getTotalHoursForPeriod(participant.monthlyHours)}h
                            </div>
                            <div className="text-sm text-gray-600">Total formation</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {filterByDateRange(participant.monthlyHours).map((monthData, index) => (
                            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="font-medium text-sm text-gray-700">
                                {monthData.month.charAt(0).toUpperCase() + monthData.month.slice(1)} {monthData.year}
                              </div>
                              <div className="text-xl font-bold text-green-600">{monthData.hours}h</div>
                              <div className="text-xs text-gray-500">{monthData.sessionsCount} sessions</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        ) : (
          // Vue formateur - seulement ses propres données
          <div className="space-y-4">
            {filteredTrainers.map((trainer) => {
              const periodHours = getTotalHoursForPeriod(trainer.monthlyHours);
              const periodEarnings = getTotalEarningsForPeriod(trainer.monthlyHours);
              
              return (
                <Card key={trainer.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {trainer.firstName.charAt(0)}{trainer.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            Mes heures de formation
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            Tarif : {formatCurrency(trainer.hourlyRate)}/heure
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {periodHours}h
                        </div>
                        <div className="text-lg font-medium text-green-600">
                          {formatCurrency(periodEarnings)}
                        </div>
                        {(startDate || endDate) && (
                          <div className="text-xs text-gray-500 mt-1">
                            Période filtrée
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Détail par mois filtré */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {filterByDateRange(trainer.monthlyHours).map((monthData, index) => (
                          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium text-sm text-gray-700">
                              {monthData.month.charAt(0).toUpperCase() + monthData.month.slice(1)} {monthData.year}
                            </div>
                            <div className="text-xl font-bold text-blue-600">{monthData.hours}h</div>
                            <div className="text-sm text-green-600">{formatCurrency(monthData.earnings || 0)}</div>
                            <div className="text-xs text-gray-500">{monthData.sessionsCount} sessions</div>
                          </div>
                        ))}
                      </div>

                      {/* Section de facturation */}
                      {periodHours > 0 && (
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Calculator className="h-5 w-5 text-blue-600" />
                              <div>
                                <div className="font-medium text-blue-900">
                                  Facturation période
                                </div>
                                <div className="text-sm text-blue-700">
                                  {periodHours}h × {formatCurrency(trainer.hourlyRate)} = {formatCurrency(periodEarnings)}
                                </div>
                              </div>
                            </div>
                            <Button 
                              onClick={() => generateInvoice(trainer)}
                              className="bg-blue-600 hover:bg-blue-700"
                              size="sm"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Générer ma facture
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default TimeTracking;
