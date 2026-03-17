import { useState } from 'react';

interface UsersPageProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'worker' | 'manager' | 'owner';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  permissions: string[];
  projects: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@business.com',
    phone: '(555) 111-1111',
    role: 'owner',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: 'Today',
    permissions: ['all'],
    projects: 15,
  },
  {
    id: 2,
    name: 'Alice Smith',
    email: 'alice.smith@business.com',
    phone: '(555) 222-2222',
    role: 'manager',
    status: 'active',
    joinDate: '2023-03-20',
    lastActive: 'Today',
    permissions: ['projects', 'workers', 'reports', 'budgets'],
    projects: 8,
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob.wilson@business.com',
    phone: '(555) 333-3333',
    role: 'manager',
    status: 'active',
    joinDate: '2023-05-10',
    lastActive: '2 hours ago',
    permissions: ['projects', 'workers', 'reports'],
    projects: 6,
  },
  {
    id: 4,
    name: 'Carol Davis',
    email: 'carol.davis@customer.com',
    phone: '(555) 444-4444',
    role: 'customer',
    status: 'active',
    joinDate: '2023-07-05',
    lastActive: '3 days ago',
    permissions: ['projects', 'reports'],
    projects: 3,
  },
  {
    id: 5,
    name: 'Henry Brown',
    email: 'henry.brown@business.com',
    phone: '(555) 555-5555',
    role: 'manager',
    status: 'inactive',
    joinDate: '2023-08-12',
    lastActive: '2 weeks ago',
    permissions: ['projects'],
    projects: 2,
  },
];

const getRoleColor = (role: string) => {
  const colors = {
    owner: 'bg-purple-100 text-purple-700',
    manager: 'bg-blue-100 text-blue-700',
    worker: 'bg-green-100 text-green-700',
    customer: 'bg-amber-100 text-amber-700',
  };
  return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-color-success';
    case 'inactive':
      return 'bg-gray-100 text-color-text-secondary';
    case 'suspended':
      return 'bg-red-100 text-color-danger';
    default:
      return 'bg-gray-100 text-color-foreground';
  }
};

export default function UsersPage({ role }: UsersPageProps) {
  if (role !== 'owner') {
    return (
      <div className="bg-color-surface rounded-lg border border-color-border p-8 text-center">
        <p className="text-color-danger font-semibold text-lg">🔒 Access Denied</p>
        <p className="text-color-text-secondary mt-2">Only business owners can access user management. Please contact your administrator.</p>
      </div>
    );
  }

  const [filter, setFilter] = useState<string>('all');

  const filteredUsers = filter === 'all'
    ? mockUsers
    : mockUsers.filter(u => u.role === filter || u.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-color-foreground mb-2">User Management</h1>
          <p className="text-color-text-secondary">Administer users, roles, and permissions</p>
        </div>
        <button className="px-4 py-2 bg-color-primary text-color-surface rounded-lg hover:bg-color-primary-dark transition-colors font-medium">
          ➕ Add New User
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'owner', 'manager', 'customer', 'active', 'inactive'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-color-primary text-color-surface'
                : 'bg-color-border text-color-foreground hover:bg-color-text-secondary/10'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-color-border">
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Role</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Joined</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Projects</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Last Active</th>
              <th className="text-left px-4 py-3 font-semibold text-color-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-color-border hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-color-primary-light rounded-full flex items-center justify-center text-color-surface font-semibold text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="font-medium text-color-foreground">{user.name}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-color-text-secondary">{user.email}</td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-color-foreground">{user.joinDate}</td>
                <td className="px-4 py-4 text-sm text-color-foreground">{user.projects}</td>
                <td className="px-4 py-4 text-sm text-color-text-secondary">{user.lastActive}</td>
                <td className="px-4 py-4">
                  <button className="px-2 py-1 text-xs bg-blue-50 text-color-primary rounded hover:bg-blue-100 transition-colors mr-2">
                    ✏️ Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-50 text-color-danger rounded hover:bg-red-100 transition-colors">
                    🗑️ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 rounded-lg border border-color-info p-4">
        <p className="text-sm text-color-foreground mb-2">
          <span className="font-semibold">📋 Permission Levels:</span>
        </p>
        <ul className="text-sm text-color-text-secondary space-y-1">
          <li><span className="font-medium">Owner</span> - Full access to all features and settings</li>
          <li><span className="font-medium">Manager</span> - Can manage projects, teams, and reports</li>
          <li><span className="font-medium">Customer</span> - Can view assigned projects and reports</li>
          <li><span className="font-medium">Worker</span> - Can view assignments and check in/out</li>
        </ul>
      </div>
    </div>
  );
}
