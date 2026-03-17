interface HeaderProps {
  role: 'customer' | 'worker' | 'manager' | 'owner';
  onRoleChange: (role: 'customer' | 'worker' | 'manager' | 'owner') => void;
}

export default function Header({ role, onRoleChange }: HeaderProps) {
  const roleOptions: Array<'customer' | 'worker' | 'manager' | 'owner'> = ['customer', 'worker', 'manager', 'owner'];
  const roleLabels: Record<string, string> = {
    customer: 'Customer',
    worker: 'Field Worker',
    manager: 'Project Manager',
    owner: 'Business Owner',
  };

  return (
    <header className="bg-color-surface border-b border-color-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-color-primary rounded-lg flex items-center justify-center text-color-surface font-bold text-lg">
            G
          </div>
          <div>
            <h1 className="text-2xl font-bold text-color-foreground">Groundwork</h1>
            <p className="text-sm text-color-text-secondary">Construction Project Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="role-select" className="text-sm font-medium text-color-text-secondary">
              Role:
            </label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => onRoleChange(e.target.value as any)}
              className="px-3 py-2 border border-color-border rounded-lg text-sm font-medium bg-color-surface text-color-foreground hover:border-color-primary focus:outline-none focus:ring-2 focus:ring-color-primary focus:ring-offset-2 cursor-pointer"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {roleLabels[r]}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-color-border">
            <div className="w-10 h-10 bg-color-primary-light rounded-full flex items-center justify-center text-color-surface font-semibold text-sm">
              JD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-color-foreground">John Doe</p>
              <p className="text-xs text-color-text-secondary">{roleLabels[role]}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
