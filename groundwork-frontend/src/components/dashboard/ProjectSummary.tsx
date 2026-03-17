interface ProjectSummaryProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

interface Project {
  id: number;
  name: string;
  location: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  workers: number;
  dueDate: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Downtown Office Complex',
    location: '123 Main St, Downtown',
    progress: 65,
    status: 'active',
    workers: 12,
    dueDate: '2024-04-15',
  },
  {
    id: 2,
    name: 'Highway Maintenance',
    location: 'Interstate 95',
    progress: 40,
    status: 'active',
    workers: 8,
    dueDate: '2024-05-20',
  },
  {
    id: 3,
    name: 'Snow Removal - Winter Season',
    location: 'Multiple Locations',
    progress: 85,
    status: 'active',
    workers: 16,
    dueDate: '2024-03-31',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-color-info text-color-surface';
    case 'completed':
      return 'bg-color-success text-color-surface';
    case 'pending':
      return 'bg-color-warning text-color-surface';
    default:
      return 'bg-color-border text-color-foreground';
  }
};

export default function ProjectSummary({ role }: ProjectSummaryProps) {
  return (
    <div className="bg-color-surface rounded-lg border border-color-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-color-foreground mb-2">Project Updates</h2>
        <p className="text-color-text-secondary">Track ongoing projects and their completion status</p>
      </div>

      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="border border-color-border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-color-foreground text-lg">{project.name}</h3>
                <p className="text-sm text-color-text-secondary flex items-center gap-1 mt-1">
                  📍 {project.location}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-color-text-secondary">Progress</span>
                <span className="font-medium text-color-foreground">{project.progress}%</span>
              </div>
              <div className="w-full bg-color-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-color-primary h-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4 pt-4 border-t border-color-border text-sm">
              <div>
                <span className="text-color-text-secondary">Workers</span>
                <p className="font-semibold text-color-foreground">👷 {project.workers}</p>
              </div>
              <div>
                <span className="text-color-text-secondary">Due Date</span>
                <p className="font-semibold text-color-foreground">📅 {project.dueDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
