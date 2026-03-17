interface RoleBasedViewProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
}

export default function RoleBasedView({ role }: RoleBasedViewProps) {
  const viewConfigs = {
    customer: {
      title: 'Service Overview',
      description: 'Track your active projects and view service delivery progress',
      icon: '👁️',
      bgGradient: 'from-blue-50 to-blue-100',
    },
    worker: {
      title: 'Today\'s Assignments',
      description: 'View your scheduled projects and real-time location tracking',
      icon: '📍',
      bgGradient: 'from-green-50 to-green-100',
    },
    manager: {
      title: 'Project Management',
      description: 'Manage teams, track projects, and monitor worker productivity',
      icon: '🎯',
      bgGradient: 'from-amber-50 to-amber-100',
    },
    owner: {
      title: 'Business Dashboard',
      description: 'Complete control: manage projects, teams, finances, and users',
      icon: '👑',
      bgGradient: 'from-purple-50 to-purple-100',
    },
  };

  const config = viewConfigs[role];

  return (
    <div className={`bg-gradient-to-r ${config.bgGradient} rounded-lg p-8 border border-color-border`}>
      <div className="flex items-start gap-4">
        <span className="text-4xl">{config.icon}</span>
        <div>
          <h2 className="text-3xl font-bold text-color-foreground mb-2">{config.title}</h2>
          <p className="text-color-text-secondary text-lg">{config.description}</p>
        </div>
      </div>
    </div>
  );
}
