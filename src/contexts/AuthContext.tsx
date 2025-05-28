
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'formateur' | 'apprenant' | 'gestionnaire_administratif';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Données de démonstration
const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@innovasign.fr',
    firstName: 'Jean',
    lastName: 'Administrateur',
    role: 'admin',
    createdAt: '2024-01-01',
    isActive: true,
  },
  {
    id: '2',
    email: 'formateur@innovasign.fr',
    firstName: 'Marie',
    lastName: 'Formatrice',
    role: 'formateur',
    createdAt: '2024-01-01',
    isActive: true,
  },
  {
    id: '3',
    email: 'apprenant@innovasign.fr',
    firstName: 'Pierre',
    lastName: 'Étudiant',
    role: 'apprenant',
    createdAt: '2024-01-01',
    isActive: true,
  },
  {
    id: '4',
    email: 'gestionnaire@innovasign.fr',
    firstName: 'Sophie',
    lastName: 'Gestionnaire',
    role: 'gestionnaire_administratif',
    createdAt: '2024-01-01',
    isActive: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = localStorage.getItem('innovasign-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      const userWithLogin = { ...foundUser, lastLogin: new Date().toISOString() };
      setUser(userWithLogin);
      localStorage.setItem('innovasign-user', JSON.stringify(userWithLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('innovasign-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
