import RoleBasedView from './RoleBasedView';
import QuickStats from './QuickStats';
import ProjectSummary from './ProjectSummary';
import WorkerTracking from './WorkerTracking';
import UpcomingTasks from './UpcomingTasks';

interface DashboardHomeProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

export default function DashboardHome({ role }: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      <RoleBasedView role={role} />
      <QuickStats role={role} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectSummary role={role} />
        </div>
        <div>
          <UpcomingTasks role={role} />
        </div>
      </div>

      <WorkerTracking role={role} />
    </div>
  );
}
