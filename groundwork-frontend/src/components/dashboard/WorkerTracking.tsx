interface WorkerTrackingProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

interface WorkerLocation {
  id: number;
  name: string;
  status: 'active' | 'break' | 'offline';
  location: string;
  currentTask: string;
  efficiency: number;
}

const mockWorkers: WorkerLocation[] = [
  {
    id: 1,
    name: 'Mike Johnson',
    status: 'active',
    location: 'Downtown Office Complex',
    currentTask: 'Foundation work',
    efficiency: 92,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    status: 'active',
    location: 'Highway Maintenance - Mile 5',
    currentTask: 'Road surface repair',
    efficiency: 88,
  },
  {
    id: 3,
    name: 'James Rodriguez',
    status: 'break',
    location: 'Snow Removal Zone B',
    currentTask: 'Equipment maintenance',
    efficiency: 85,
  },
  {
    id: 4,
    name: 'Emma Thompson',
    status: 'active',
    location: 'Downtown Office Complex',
    currentTask: 'Interior finishing',
    efficiency: 94,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return { label: 'Active', bg: 'bg-green-100', text: 'text-color-success', dot: 'bg-color-success' };
    case 'break':
      return { label: 'On Break', bg: 'bg-yellow-100', text: 'text-color-warning', dot: 'bg-color-warning' };
    case 'offline':
      return { label: 'Offline', bg: 'bg-gray-100', text: 'text-color-text-secondary', dot: 'bg-color-text-secondary' };
    default:
      return { label: 'Unknown', bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-500' };
  }
};

export default function WorkerTracking({ role }: WorkerTrackingProps) {
  if (role === 'customer') return null;

  return (
    <div className="bg-color-surface rounded-lg border border-color-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-color-foreground mb-2">Real-Time Worker Tracking</h2>
        <p className="text-color-text-secondary">Monitor team location and current activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockWorkers.map((worker) => {
          const statusInfo = getStatusBadge(worker.status);
          return (
            <div
              key={worker.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-color-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-color-primary-light rounded-full flex items-center justify-center text-color-surface font-semibold text-sm">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-color-foreground text-sm">{worker.name}</h4>
                    <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                      <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`}></span>
                      {statusInfo.label}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-color-text-secondary text-xs mb-1">📍 Location</p>
                  <p className="text-color-foreground font-medium truncate">{worker.location}</p>
                </div>

                <div>
                  <p className="text-color-text-secondary text-xs mb-1">🎯 Current Task</p>
                  <p className="text-color-foreground font-medium">{worker.currentTask}</p>
                </div>

                <div>
                  <p className="text-color-text-secondary text-xs mb-1">⚡ Efficiency</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-color-border rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-color-success h-full transition-all"
                        style={{ width: `${worker.efficiency}%` }}
                      />
                    </div>
                    <span className="text-color-foreground font-semibold text-xs w-8">{worker.efficiency}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-color-info">
        <p className="text-sm text-color-foreground">
          <span className="font-semibold">💡 Tip:</span> Real-time map integration would show worker locations with live GPS tracking, job site boundaries, and route optimization.
        </p>
      </div>
    </div>
  );
}
