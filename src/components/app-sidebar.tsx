
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar,
  Check,
  User,
  Users,
  LogOut,
  BookOpen,
  Users as UsersIcon,
  GraduationCap,
  UserCog,
  Clock,
  MessageSquare,
  Bell,
  Library
} from 'lucide-react';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: BookOpen,
      }
    ];

    if (user?.role === 'admin') {
      // Admin sees all management options
      baseItems.push(
        {
          title: 'Sessions',
          url: '/sessions',
          icon: Calendar,
        },
        {
          title: 'Catalogue de formations',
          url: '/training-catalog',
          icon: Library,
        },
        {
          title: 'Formateurs',
          url: '/trainers',
          icon: UsersIcon,
        },
        {
          title: 'Participants',
          url: '/participants',
          icon: GraduationCap,
        },
        {
          title: 'Utilisateurs',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Comptabilisation',
          url: '/time-tracking',
          icon: Clock,
        },
        {
          title: 'Automatisations',
          url: '/automations',
          icon: UserCog,
        },
        {
          title: 'Messages',
          url: '/messages',
          icon: MessageSquare,
          badge: 3,
        },
        {
          title: 'Alertes',
          url: '/alerts',
          icon: Bell,
          badge: 5,
        }
      );
    } else if (user?.role === 'gestionnaire_administratif') {
      baseItems.push(
        {
          title: 'Sessions',
          url: '/sessions',
          icon: Calendar,
        },
        {
          title: 'Catalogue de formations',
          url: '/training-catalog',
          icon: Library,
        },
        {
          title: 'Formateurs',
          url: '/trainers',
          icon: UsersIcon,
        },
        {
          title: 'Participants',
          url: '/participants',
          icon: GraduationCap,
        },
        {
          title: 'Utilisateurs',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Automatisations',
          url: '/automations',
          icon: UserCog,
        },
        {
          title: 'Messages',
          url: '/messages',
          icon: MessageSquare,
          badge: 3,
        },
        {
          title: 'Alertes',
          url: '/alerts',
          icon: Bell,
          badge: 5,
        }
      );
    } else if (user?.role === 'formateur') {
      baseItems.push(
        {
          title: 'Mes Sessions',
          url: '/trainer-sessions',
          icon: Calendar,
        },
        {
          title: 'Mes Heures',
          url: '/time-tracking',
          icon: Clock,
        }
      );
    } else if (user?.role === 'apprenant') {
      baseItems.push(
        {
          title: 'Mes Formations',
          url: '/student-sessions',
          icon: GraduationCap,
        }
      );
    }

    baseItems.push({
      title: 'Profil',
      url: '/profile',
      icon: User,
    });

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Innovasign Pro</h2>
            <p className="text-xs text-gray-500">Gestion de présence</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={location.pathname === item.url ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge className="bg-red-500 text-white">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-500 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
