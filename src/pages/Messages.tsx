
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Download, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter,
  Search,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Messages = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Données de démonstration pour les documents déposés
  const documents = [
    {
      id: 'DOC-2024-001',
      type: 'invoice',
      title: 'Facture Formation React - Janvier 2024',
      fileName: 'Facture_React_Janvier_2024.pdf',
      submitter: {
        name: 'Marie Formatrice',
        email: 'marie.formatrice@innovasign.fr',
        role: 'formateur'
      },
      submissionDate: '2024-01-15T14:30:00Z',
      status: 'pending',
      amount: 2500.00,
      description: 'Facture pour la formation React Avancé du mois de janvier',
      hasResponse: false,
    },
    {
      id: 'DOC-2024-002',
      type: 'absence_justification',
      title: 'Justificatif absence - Formation Vue.js',
      fileName: 'Certificat_Medical_Pierre.pdf',
      submitter: {
        name: 'Pierre Étudiant',
        email: 'pierre.etudiant@innovasign.fr',
        role: 'apprenant'
      },
      submissionDate: '2024-02-10T09:15:00Z',
      status: 'approved',
      sessionDate: '2024-02-12',
      sessionTitle: 'Formation Vue.js - Module 2',
      description: 'Certificat médical pour absence lors de la formation Vue.js',
      hasResponse: true,
      responseDate: '2024-02-11T10:30:00Z',
      responseMessage: 'Justificatif approuvé. Absence justifiée acceptée.',
    },
    {
      id: 'DOC-2024-003',
      type: 'invoice',
      title: 'Facture Formation Angular - Février 2024',
      fileName: 'Facture_Angular_Fevrier_2024.pdf',
      submitter: {
        name: 'Marie Formatrice',
        email: 'marie.formatrice@innovasign.fr',
        role: 'formateur'
      },
      submissionDate: '2024-02-28T16:45:00Z',
      status: 'approved',
      amount: 3200.00,
      description: 'Facture pour les formations Angular du mois de février',
      hasResponse: true,
      responseDate: '2024-03-01T09:00:00Z',
      responseMessage: 'Facture approuvée et transmise au service comptabilité.',
    },
    {
      id: 'DOC-2024-004',
      type: 'absence_justification',
      title: 'Justificatif absence - Workshop TypeScript',
      fileName: 'Justificatif_Transport_Julie.pdf',
      submitter: {
        name: 'Julie Apprenante',
        email: 'julie.apprenante@innovasign.fr',
        role: 'apprenant'
      },
      submissionDate: '2024-03-05T11:20:00Z',
      status: 'rejected',
      sessionDate: '2024-03-07',
      sessionTitle: 'Workshop TypeScript Avancé',
      description: 'Justificatif de transport en retard',
      hasResponse: true,
      responseDate: '2024-03-06T14:15:00Z',
      responseMessage: 'Justificatif refusé : document soumis après la date limite (24h après la session).',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approuvé</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'invoice':
        return <Badge className="bg-blue-100 text-blue-800">Facture</Badge>;
      case 'absence_justification':
        return <Badge className="bg-purple-100 text-purple-800">Justificatif</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'formateur':
        return 'Formateur';
      case 'apprenant':
        return 'Apprenant';
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const filteredDocuments = documents.filter(doc => {
    // Filter out invoices for gestionnaire_administratif
    if (user?.role === 'gestionnaire_administratif' && doc.type === 'invoice') {
      return false;
    }
    
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.submitter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = filteredDocuments.filter(doc => doc.status === 'pending').length;
  const approvedCount = filteredDocuments.filter(doc => doc.status === 'approved').length;
  const rejectedCount = filteredDocuments.filter(doc => doc.status === 'rejected').length;

  const handleViewDocument = (doc: any) => {
    toast({
      title: "Ouverture du document",
      description: `Ouverture de ${doc.fileName} dans un nouvel onglet`,
    });
  };

  const handleDownloadDocument = (doc: any) => {
    toast({
      title: "Téléchargement en cours",
      description: `Le document ${doc.fileName} est en cours de téléchargement`,
    });
  };

  const handleOpenResponseDialog = (doc: any) => {
    setSelectedDocument(doc);
    setResponseMessage('');
    setResponseDialogOpen(true);
  };

  const handleSendResponse = (action: 'approve' | 'reject') => {
    if (!responseMessage.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un message de réponse",
        variant: "destructive",
      });
      return;
    }

    const actionText = action === 'approve' ? 'approuvé' : 'rejeté';
    
    toast({
      title: `Document ${actionText}`,
      description: `Le document a été ${actionText} et une notification a été envoyée à ${selectedDocument?.submitter.name}`,
    });
    
    setResponseDialogOpen(false);
    setSelectedDocument(null);
    setResponseMessage('');
  };

  return (
    <PageLayout 
      title="Messages et Documents"
      subtitle="Gérez les documents déposés par les formateurs et les apprenants"
    >
      <div className="space-y-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  <p className="text-sm text-gray-600">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                  <p className="text-sm text-gray-600">Approuvés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                  <p className="text-sm text-gray-600">Rejetés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par titre, nom du soumetteur ou nom de fichier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="approved">Approuvés</SelectItem>
                    <SelectItem value="rejected">Rejetés</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="invoice">Factures</SelectItem>
                    <SelectItem value="absence_justification">Justificatifs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents déposés</CardTitle>
            <CardDescription>
              Liste de tous les documents soumis par les formateurs et apprenants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Soumetteur</TableHead>
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-gray-600">{doc.fileName}</p>
                          {doc.type === 'invoice' && doc.amount && (
                            <p className="text-sm font-medium text-green-600">
                              {doc.amount.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                              })}
                            </p>
                          )}
                          {doc.type === 'absence_justification' && (
                            <p className="text-sm text-blue-600">
                              Session: {doc.sessionTitle}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(doc.type)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{doc.submitter.name}</p>
                          <p className="text-sm text-gray-600">{getRoleLabel(doc.submitter.role)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatDate(doc.submissionDate)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(doc.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(doc)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {doc.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenResponseDialog(doc)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun document trouvé
                </h3>
                <p className="text-gray-600">
                  Aucun document ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog de réponse */}
        <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Traiter le document</DialogTitle>
              <DialogDescription>
                Examinez le document et fournissez une réponse à {selectedDocument?.submitter.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedDocument && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{selectedDocument.title}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Soumetteur:</span>
                      <p className="font-medium">{selectedDocument.submitter.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium">
                        {selectedDocument.type === 'invoice' ? 'Facture' : 'Justificatif d\'absence'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fichier:</span>
                      <p className="font-medium">{selectedDocument.fileName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">{formatDate(selectedDocument.submissionDate)}</p>
                    </div>
                  </div>
                  {selectedDocument.description && (
                    <div className="mt-2">
                      <span className="text-gray-600">Description:</span>
                      <p className="text-sm">{selectedDocument.description}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="response">Message de réponse</Label>
                  <Textarea
                    id="response"
                    placeholder="Saisissez votre message de réponse..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleSendResponse('reject')}
                    className="text-red-600 hover:text-red-700"
                  >
                    Rejeter
                  </Button>
                  <Button 
                    onClick={() => handleSendResponse('approve')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approuver
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Messages;
