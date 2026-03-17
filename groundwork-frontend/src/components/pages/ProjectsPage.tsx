import { useState } from 'react';

interface ProjectsPageProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  budget: number;
  spent: number;
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  teamSize: number;
}

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Downtown Office Complex',
    client: 'Sterling Corp',
    location: '123 Main St, Downtown',
    status: 'active',
    budget: 2500000,
    spent: 1625000,
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    manager: 'David Smith',
    teamSize: 12,
  },
  {
    id: 2,
    name: 'Highway Maintenance Segment 5',
    client: 'State Department',
    location: 'Interstate 95',
    status: 'active',
    budget: 850000,
    spent: 340000,
    progress: 40,
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    manager: 'Maria Garcia',
    teamSize: 8,
  },
  {
    id: 3,
    name: 'Winter Snow Removal 2024',
    client: 'Municipal Services',
    location: 'Multiple Locations',
    status: 'active',
    budget: 450000,
    spent: 382500,
    progress: 85,
    startDate: '2023-11-01',
    endDate: '2024-03-31',
    manager: 'James Wilson',
    teamSize: 16,
  },
  {
    id: 4,
    name: 'Landscaping Renovation',
    client: 'TechHub Park',
    location: '456 Innovation Drive',
    status: 'completed',
    budget: 180000,
    spent: 180000,
    progress: 100,
    startDate: '2023-09-01',
    endDate: '2024-01-31',
    manager: 'Lisa Anderson',
    teamSize: 5,
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    planning: 'bg-gray-100 text-color-foreground',
    active: 'bg-blue-100 text-color-info',
    completed: 'bg-green-100 text-color-success',
    'on-hold': 'bg-orange-100 text-color-warning',
  };
  return colors[status as keyof typeof colors] || colors.planning;
};

export default function ProjectsPage({ role }: ProjectsPageProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all'
    ? mockProjects
    : mockProjects.filter(p => p.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-color-foreground mb-2">Project Management</h1>
        <p className="text-color-text-secondary">Manage, track, and oversee all construction projects</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'planning', 'completed', 'on-hold'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-color-primary text-color-surface'
                : 'bg-color-border text-color-foreground hover:bg-color-text-secondary/10'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-color-surface rounded-lg border border-color-border p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-color-foreground">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-color-text-secondary mb-2">
                  <span className="mr-4">Client: <span className="font-medium text-color-foreground">{project.client}</span></span>
                  <span>📍 {project.location}</span>
                </p>
              </div>
              <button className="px-4 py-2 bg-color-primary text-color-surface rounded-lg hover:bg-color-primary-dark transition-colors font-medium whitespace-nowrap">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-color-text-secondary mb-1">Progress</p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-color-foreground">{project.progress}%</p>
                  <div className="w-full bg-color-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-color-primary h-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Budget</p>
                <p className="text-2xl font-bold text-color-foreground">${(project.budget / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-color-text-secondary">Spent: ${(project.spent / 1000000).toFixed(1)}M</p>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Timeline</p>
                <p className="text-sm font-medium text-color-foreground">Start: {project.startDate}</p>
                <p className="text-sm font-medium text-color-foreground">End: {project.endDate}</p>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Team</p>
                <p className="text-2xl font-bold text-color-foreground">{project.teamSize}</p>
                <p className="text-xs text-color-text-secondary">Manager: {project.manager}</p>
              </div>
            </div>

            <div className="border-t border-color-border pt-4 flex gap-2">
              <button className="px-3 py-1 text-xs bg-blue-50 text-color-primary rounded hover:bg-blue-100 transition-colors">
                📋 View Tasks
              </button>
              <button className="px-3 py-1 text-xs bg-green-50 text-color-success rounded hover:bg-green-100 transition-colors">
                👷 Manage Team
              </button>
              <button className="px-3 py-1 text-xs bg-amber-50 text-color-warning rounded hover:bg-amber-100 transition-colors">
                📊 Budget Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
