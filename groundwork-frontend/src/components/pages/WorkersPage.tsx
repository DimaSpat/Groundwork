import { useState } from 'react';

interface WorkersPageProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

interface Worker {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'supervisor' | 'laborer' | 'equipment-operator' | 'inspector';
  status: 'active' | 'on-break' | 'offline';
  certifications: string[];
  assignedProject: string;
  hoursWorked: number;
  hourlyRate: number;
  joinDate: string;
  performanceRating: number;
}

const mockWorkers: Worker[] = [
  {
    id: 1,
    name: 'Mike Johnson',
    email: 'mike.johnson@groundwork.com',
    phone: '(555) 123-4567',
    role: 'supervisor',
    status: 'active',
    certifications: ['OSHA 30', 'First Aid', 'Heavy Equipment'],
    assignedProject: 'Downtown Office Complex',
    hoursWorked: 320,
    hourlyRate: 45,
    joinDate: '2023-06-15',
    performanceRating: 4.8,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@groundwork.com',
    phone: '(555) 234-5678',
    role: 'equipment-operator',
    status: 'active',
    certifications: ['Equipment License', 'OSHA 10'],
    assignedProject: 'Highway Maintenance Segment 5',
    hoursWorked: 280,
    hourlyRate: 42,
    joinDate: '2023-08-22',
    performanceRating: 4.6,
  },
  {
    id: 3,
    name: 'James Rodriguez',
    email: 'james.rodriguez@groundwork.com',
    phone: '(555) 345-6789',
    role: 'laborer',
    status: 'on-break',
    certifications: ['OSHA 10', 'First Aid'],
    assignedProject: 'Winter Snow Removal 2024',
    hoursWorked: 240,
    hourlyRate: 28,
    joinDate: '2024-01-10',
    performanceRating: 4.3,
  },
  {
    id: 4,
    name: 'Emma Thompson',
    email: 'emma.thompson@groundwork.com',
    phone: '(555) 456-7890',
    role: 'inspector',
    status: 'active',
    certifications: ['Quality Inspector', 'OSHA 30', 'Engineering'],
    assignedProject: 'Downtown Office Complex',
    hoursWorked: 300,
    hourlyRate: 50,
    joinDate: '2023-04-05',
    performanceRating: 4.9,
  },
  {
    id: 5,
    name: 'David Martinez',
    email: 'david.martinez@groundwork.com',
    phone: '(555) 567-8901',
    role: 'laborer',
    status: 'offline',
    certifications: ['OSHA 10'],
    assignedProject: 'Landscaping Renovation',
    hoursWorked: 120,
    hourlyRate: 26,
    joinDate: '2024-02-01',
    performanceRating: 4.1,
  },
];

const getRoleColor = (role: string) => {
  const colors = {
    supervisor: 'bg-purple-100 text-purple-700',
    laborer: 'bg-blue-100 text-blue-700',
    'equipment-operator': 'bg-yellow-100 text-yellow-700',
    inspector: 'bg-green-100 text-green-700',
  };
  return colors[role as keyof typeof colors] || colors.laborer;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-color-success';
    case 'on-break':
      return 'bg-yellow-100 text-color-warning';
    case 'offline':
      return 'bg-gray-100 text-color-text-secondary';
    default:
      return 'bg-gray-100 text-color-foreground';
  }
};

export default function WorkersPage({ role }: WorkersPageProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredWorkers = filter === 'all'
    ? mockWorkers
    : mockWorkers.filter(w => w.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-color-foreground mb-2">Worker Management</h1>
        <p className="text-color-text-secondary">Track team members, assignments, and performance</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'on-break', 'offline'].map((status) => (
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
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-color-surface rounded-lg border border-color-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-color-primary-light rounded-full flex items-center justify-center text-color-surface font-bold text-lg">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-color-foreground">{worker.name}</h3>
                    <p className="text-sm text-color-text-secondary">{worker.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(worker.role)}`}>
                  {worker.role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(worker.status)}`}>
                  {worker.status === 'on-break' ? 'On Break' : worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 pb-4 border-b border-color-border">
              <div>
                <p className="text-sm text-color-text-secondary mb-1">Phone</p>
                <p className="text-sm font-medium text-color-foreground">{worker.phone}</p>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Current Project</p>
                <p className="text-sm font-medium text-color-foreground">{worker.assignedProject}</p>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Hours Worked</p>
                <p className="text-sm font-medium text-color-foreground">{worker.hoursWorked}h</p>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Hourly Rate</p>
                <p className="text-sm font-medium text-color-foreground">${worker.hourlyRate}/hr</p>
              </div>

              <div>
                <p className="text-sm text-color-text-secondary mb-1">Performance</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg">⭐</span>
                  <p className="text-sm font-medium text-color-foreground">{worker.performanceRating}/5</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-color-text-secondary mb-2">Certifications</p>
              <div className="flex gap-2 flex-wrap">
                {worker.certifications.map((cert, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-blue-50 text-color-info rounded border border-color-info/30">
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 text-xs bg-blue-50 text-color-primary rounded hover:bg-blue-100 transition-colors">
                📋 View History
              </button>
              <button className="px-3 py-1 text-xs bg-green-50 text-color-success rounded hover:bg-green-100 transition-colors">
                ✏️ Edit Worker
              </button>
              <button className="px-3 py-1 text-xs bg-amber-50 text-color-warning rounded hover:bg-amber-100 transition-colors">
                🎯 Reassign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
