
import { PageLayout } from '@/components/layout/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getFilteredSessions,
  getUserSpecificStats,
  getDashboardTitle,
  getDashboardDescription,
  getEmptyStateMessage,
  getTabsForRole
} from '@/utils/dashboardUtils';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { SessionsOverview } from '@/components/dashboard/SessionsOverview';
import { AttendanceStats } from '@/components/dashboard/AttendanceStats';
import { 
  AdminTabContent, 
  StudentTabContent, 
  TrainerTabContent, 
  ManagerTabContent 
} from '@/components/dashboard/TabContent';

const Dashboard = () => {
  const { user } = useAuth();

  const filteredSessions = getFilteredSessions(user);
  const userStats = getUserSpecificStats(user, filteredSessions);
  const tabs = getTabsForRole(user?.role);

  return (
    <PageLayout 
      title={`Bonjour ${user?.firstName} !`}
      subtitle="Voici un aperçu de votre activité"
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardStats userStats={userStats} userRole={user?.role} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SessionsOverview
              title={getDashboardTitle(user?.role, filteredSessions.length)}
              description={getDashboardDescription(user?.role, filteredSessions.length)}
              sessions={filteredSessions}
              emptyMessage={getEmptyStateMessage(user?.role)}
            />

            <AttendanceStats userStats={userStats} userRole={user?.role} />
          </div>
        </TabsContent>

        {user?.role === 'admin' && <AdminTabContent />}
        {user?.role === 'apprenant' && <StudentTabContent />}
        {(user?.role === 'formateur' || user?.role === 'gestionnaire_administratif') && (
          <TrainerTabContent userRole={user?.role} />
        )}
        {user?.role === 'gestionnaire_administratif' && <ManagerTabContent />}
      </Tabs>
    </PageLayout>
  );
};

export default Dashboard;
