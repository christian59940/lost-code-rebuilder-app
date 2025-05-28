
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Mail, UserCheck, UserX } from 'lucide-react';
import { User, UserRole } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Données de démonstration
const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@edusign.fr',
    firstName: 'Jean',
    lastName: 'Administrateur',
    role: 'admin',
    createdAt: '2024-01-01',
    isActive: true,
    lastLogin: '2024-01-15T08:30:00Z',
  },
  {
    id: '2',
    email: 'marie.martin@formation.fr',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'formateur',
    createdAt: '2024-01-02',
    isActive: true,
    lastLogin: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    email: 'pierre.dupont@ecole.fr',
    firstName: 'Pierre',
    lastName: 'Dupont',
    role: 'apprenant',
    createdAt: '2024-01-03',
    isActive: true,
    lastLogin: '2024-01-14T16:45:00Z',
  },
  {
    id: '4',
    email: 'sophie.bernard@formation.fr',
    firstName: 'Sophie',
    lastName: 'Bernard',
    role: 'formateur',
    createdAt: '2024-01-04',
    isActive: true,
  },
  {
    id: '5',
    email: 'lucas.petit@ecole.fr',
    firstName: 'Lucas',
    lastName: 'Petit',
    role: 'apprenant',
    createdAt: '2024-01-05',
    isActive: false,
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(demoUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'apprenant' as UserRole,
  });
  const [editUser, setEditUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'apprenant' as UserRole,
  });

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    setUsers([...users, user]);
    setNewUser({ firstName: '', lastName: '', email: '', role: 'apprenant' });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Utilisateur créé",
      description: `${user.firstName} ${user.lastName} a été ajouté avec succès`,
    });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedUser || !editUser.firstName || !editUser.lastName || !editUser.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...editUser }
        : user
    ));
    
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "Utilisateur modifié",
      description: `${editUser.firstName} ${editUser.lastName} a été mis à jour`,
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    toast({
      title: "Statut modifié",
      description: `${user?.firstName} ${user?.lastName} ${user?.isActive ? 'désactivé' : 'activé'}`,
    });
  };

  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const deleteUser = () => {
    if (!userToDelete) return;
    
    setUsers(users.filter(u => u.id !== userToDelete.id));
    
    toast({
      title: "Utilisateur supprimé",
      description: `${userToDelete.firstName} ${userToDelete.lastName} a été supprimé`,
    });
    
    setUserToDelete(null);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'formateur':
        return 'bg-blue-100 text-blue-800';
      case 'apprenant':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'formateur':
        return 'Formateur';
      case 'apprenant':
        return 'Apprenant';
      case 'gestionnaire_administratif':
        return 'Gestionnaire Administratif';
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <PageLayout 
      title="Gestion des Utilisateurs"
      subtitle="Gérez les comptes utilisateurs et leurs permissions"
    >
      <div className="space-y-6">
        {/* Header avec recherche et bouton d'ajout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouvel utilisateur à la plateforme EduSign Pro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                      placeholder="Prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                      placeholder="Nom"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="email@exemple.com"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apprenant">Apprenant</SelectItem>
                      <SelectItem value="formateur">Formateur</SelectItem>
                      <SelectItem value="gestionnaire_administratif">Gestionnaire Administratif</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateUser} className="bg-blue-600 hover:bg-blue-700">
                  Créer l'utilisateur
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-sm text-gray-600">Total utilisateurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </div>
              <p className="text-sm text-gray-600">Actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'formateur').length}
              </div>
              <p className="text-sm text-gray-600">Formateurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'apprenant').length}
              </div>
              <p className="text-sm text-gray-600">Apprenants</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">
                          {user.firstName} {user.lastName}
                        </h4>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                        {!user.isActive && (
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            Inactif
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {user.email}
                        </span>
                        <span>Créé le {formatDate(user.createdAt)}</span>
                        {user.lastLogin && (
                          <span>Dernière connexion: {formatDate(user.lastLogin)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      className={user.isActive ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {user.isActive ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => confirmDeleteUser(user)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier l'utilisateur</DialogTitle>
              <DialogDescription>
                Modifiez les informations de l'utilisateur
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editFirstName">Prénom *</Label>
                  <Input
                    id="editFirstName"
                    value={editUser.firstName}
                    onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <Label htmlFor="editLastName">Nom *</Label>
                  <Input
                    id="editLastName"
                    value={editUser.lastName}
                    onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                    placeholder="Nom"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="editEmail">Email *</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <Label htmlFor="editRole">Rôle</Label>
                <Select 
                  value={editUser.role} 
                  onValueChange={(value: UserRole) => setEditUser({ ...editUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apprenant">Apprenant</SelectItem>
                    <SelectItem value="formateur">Formateur</SelectItem>
                    <SelectItem value="gestionnaire_administratif">Gestionnaire Administratif</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
                Sauvegarder
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer l'utilisateur {userToDelete?.firstName} {userToDelete?.lastName} ? 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={deleteUser}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
};

export default Users;
