interface UpcomingTasksProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Equipment delivery on-site',
    dueDate: 'Today',
    priority: 'high',
    assignee: 'Mike Johnson',
  },
  {
    id: 2,
    title: 'Safety inspection meeting',
    dueDate: 'Tomorrow',
    priority: 'high',
    assignee: 'Sarah Chen',
  },
  {
    id: 3,
    title: 'Payroll verification',
    dueDate: 'Mar 18',
    priority: 'medium',
    assignee: 'Admin',
  },
  {
    id: 4,
    title: 'Site cleanup routine',
    dueDate: 'Mar 19',
    priority: 'low',
    assignee: 'Team A',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-color-danger text-color-danger bg-red-50';
    case 'medium':
      return 'border-color-warning text-color-warning bg-yellow-50';
    case 'low':
      return 'border-color-success text-color-success bg-green-50';
    default:
      return 'border-color-border';
  }
};

export default function UpcomingTasks({ role }: UpcomingTasksProps) {
  return (
    <div className="bg-color-surface rounded-lg border border-color-border p-6 h-full">
      <h3 className="text-lg font-bold text-color-foreground mb-4">Upcoming Tasks</h3>

      <div className="space-y-3">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className={`border-l-4 ${getPriorityColor(task.priority)} p-3 rounded transition-colors hover:shadow-sm cursor-pointer`}
          >
            <h4 className="font-medium text-color-foreground text-sm mb-1">{task.title}</h4>
            <p className="text-xs text-color-text-secondary mb-2">{task.assignee}</p>
            <p className="text-xs font-semibold text-color-text-secondary">{task.dueDate}</p>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-color-primary text-color-primary rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
        View All Tasks
      </button>
    </div>
  );
}
