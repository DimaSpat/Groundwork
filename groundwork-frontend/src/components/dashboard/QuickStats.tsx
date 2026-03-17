interface QuickStatsProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

export default function QuickStats({ role }: QuickStatsProps) {
  const statConfigs = {
    customer: [
      { label: 'Active Projects', value: '3', icon: '🏗️', color: 'from-blue-500 to-blue-600' },
      { label: 'Completed', value: '12', icon: '✅', color: 'from-green-500 to-green-600' },
      { label: 'Total Spent', value: '$45,200', icon: '💰', color: 'from-amber-500 to-amber-600' },
    ],
    worker: [
      { label: 'Today\'s Jobs', value: '4', icon: '📋', color: 'from-blue-500 to-blue-600' },
      { label: 'Completed', value: '2', icon: '✅', color: 'from-green-500 to-green-600' },
      { label: 'Earnings Today', value: '$320', icon: '💵', color: 'from-amber-500 to-amber-600' },
    ],
    manager: [
      { label: 'Active Projects', value: '8', icon: '🏗️', color: 'from-blue-500 to-blue-600' },
      { label: 'Team Members', value: '24', icon: '👥', color: 'from-indigo-500 to-indigo-600' },
      { label: 'On-Time Delivery', value: '94%', icon: '📊', color: 'from-green-500 to-green-600' },
    ],
    owner: [
      { label: 'Active Projects', value: '15', icon: '🏗️', color: 'from-blue-500 to-blue-600' },
      { label: 'Total Revenue', value: '$892,450', icon: '💰', color: 'from-amber-500 to-amber-600' },
      { label: 'Team Capacity', value: '87%', icon: '📈', color: 'from-purple-500 to-purple-600' },
    ],
  };

  const stats = statConfigs[role];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-color-surface rounded-lg border border-color-border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-color-text-secondary mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-color-foreground">{stat.value}</p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
