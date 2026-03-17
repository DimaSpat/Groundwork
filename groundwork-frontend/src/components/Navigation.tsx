interface NavigationProps {
  currentPage: 'dashboard' | 'projects' | 'workers' | 'users';
  onPageChange: (page: 'dashboard' | 'projects' | 'workers' | 'users') => void;
  userRole: 'customer' | 'worker' | 'manager' | 'owner';
}

export default function Navigation({ currentPage, onPageChange, userRole }: NavigationProps) {
  const isNavVisible = (page: string) => {
    if (userRole === 'customer') return page === 'dashboard' || page === 'projects';
    if (userRole === 'worker') return page === 'dashboard' || page === 'projects';
    if (userRole === 'manager') return page === 'dashboard' || page === 'projects' || page === 'workers';
    return true; // owner can see all
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🏗️' },
    { id: 'workers', label: 'Workers', icon: '👷' },
    { id: 'users', label: 'Users', icon: '👥' },
  ];

  return (
    <nav className="bg-color-surface border-b border-color-border sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex gap-8 overflow-x-auto">
        {navItems.map((item) => {
          if (!isNavVisible(item.id)) return null;
          
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as any)}
              className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-color-primary text-color-primary'
                  : 'border-transparent text-color-text-secondary hover:text-color-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
