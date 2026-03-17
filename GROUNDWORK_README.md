# Groundwork - Real-Time Construction Project Management Platform

A comprehensive web-based platform designed for managing construction projects, snow removal, landscaping, and related service providers. Features real-time worker tracking, interactive maps, role-based dashboards, and complete project lifecycle management.

## 🎯 Platform Features

### Multi-Role Support
- **👨‍💼 Customer**: View active projects, track service delivery, access project summaries
- **👷 Field Worker**: See daily assignments, track location, log hours, view earnings
- **🎯 Project Manager**: Manage teams, track projects, monitor productivity, handle budgets
- **👑 Business Owner**: Full platform control, financial analytics, user management, system administration

### Core Functionality
- **📊 Interactive Dashboard**: Role-specific views with real-time metrics and project summaries
- **🏗️ Project Management**: Create, track, and manage construction projects with progress monitoring
- **👷 Worker Tracking**: Real-time GPS location tracking, task assignment, efficiency monitoring
- **📍 Interactive Maps**: Visual representation of project sites and worker locations (ready for implementation)
- **👥 User Management**: Complete user administration with role-based permissions (owner only)
- **📈 Analytics**: Project budgets, team performance, completion rates, and productivity metrics

### Design Highlights
- **Modern UI**: Clean, professional interface optimized for desktop and mobile
- **Responsive Layout**: Mobile-first design that works seamlessly on all devices
- **Color-Coded Status**: Quick visual identification of project status, worker activity, and priorities
- **Real-Time Updates**: Live data synchronization across all users
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the frontend directory:
```bash
cd groundwork-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📱 User Roles & Permissions

### Owner
- ✅ Full access to all features
- ✅ User management and permissions
- ✅ Financial analytics and reporting
- ✅ System settings and configuration

### Manager
- ✅ Project management
- ✅ Worker team management
- ✅ Project reports and budgets
- ✅ Worker scheduling and assignments
- ❌ User management
- ❌ Financial reporting

### Field Worker
- ✅ View daily assignments
- ✅ Real-time location tracking
- ✅ Task updates and notifications
- ✅ Time tracking and earnings
- ❌ Project management
- ❌ Team management

### Customer
- ✅ View assigned projects
- ✅ Project progress tracking
- ✅ Project reports
- ❌ Team management
- ❌ Financial details
- ❌ User management

## 🎨 Design System

### Color Palette
- **Primary Brand**: Deep Blue (#1e3a8a)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Background**: Light Gray (#f9fafb)

### Typography
- **Font**: Geist (modern, professional)
- **Headings**: Bold, hierarchical sizing
- **Body**: Readable 14-16px, optimal line height

### Components
- Responsive card-based layouts
- Color-coded status badges
- Progress bars with visual feedback
- Interactive buttons with hover states
- Mobile-optimized navigation
- Accessible form controls

## 📊 Page Structure

### Dashboard (Homepage)
- Role-based welcome message
- Quick statistics and KPIs
- Project summary cards
- Upcoming tasks widget
- Real-time worker tracking grid

### Projects Page
- Complete project listings
- Status filtering (Planning, Active, Completed, On-Hold)
- Project details and metrics
- Progress tracking
- Budget information
- Quick action buttons

### Workers Page (Manager/Owner Only)
- Team member listings
- Worker status and efficiency scores
- Current assignments
- Certifications and qualifications
- Hours worked and earnings
- Management actions

### Users Page (Owner Only)
- Complete user management table
- Role and status filtering
- Permission level overview
- User activity tracking
- Add/edit/remove user functionality

## 🔄 How to Use

### Switching Roles
1. Use the role dropdown in the header
2. View different dashboard layouts for each role
3. See role-specific navigation options

### Viewing Projects
1. Click "Projects" in navigation
2. Filter by status using the filter buttons
3. Click "View Details" on any project card
4. Manage project details and team assignments

### Tracking Workers
1. Navigate to "Workers" page (Manager/Owner only)
2. View worker status, location, and assignments
3. Monitor efficiency scores and performance ratings
4. Manage worker assignments and schedules

### Managing Users
1. Navigate to "Users" page (Owner only)
2. View all platform users and their roles
3. Filter by role or status
4. Add new users or modify permissions
5. Deactivate or remove users as needed

## 🗺️ Interactive Map Integration (Future)

The platform is designed to integrate with mapping services for:
- Real-time worker GPS tracking
- Project site visualization
- Route optimization for teams
- Geofencing for project boundaries
- Traffic and weather overlays
- Service area coverage mapping

## 🔌 API Integration

The frontend communicates with the backend API at `NEXT_PUBLIC_API_URL`. Key endpoints include:
- `/health` - API health check
- `/user` - User data retrieval
- `/projects` - Project management
- `/workers` - Worker tracking
- `/users` - User administration

## 📁 Project Structure

```
groundwork-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Header.tsx
│       ├── Navigation.tsx
│       ├── dashboard/
│       │   ├── DashboardHome.tsx
│       │   ├── RoleBasedView.tsx
│       │   ├── QuickStats.tsx
│       │   ├── ProjectSummary.tsx
│       │   ├── UpcomingTasks.tsx
│       │   └── WorkerTracking.tsx
│       └── pages/
│           ├── ProjectsPage.tsx
│           ├── WorkersPage.tsx
│           └── UsersPage.tsx
├── public/
├── package.json
├── next.config.ts
└── tsconfig.json
```

## 🚀 Deployment

### Deploy to Vercel
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy with one click

### Environment Variables Required
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🔐 Security Features

- Role-based access control (RBAC)
- Protected admin routes
- User permission validation
- Secure session management
- Protected API endpoints

## 🤝 Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Submit a pull request with description
4. Code review and merge

## 📄 Documentation

See `DESIGN_CONCEPTS.md` for comprehensive design documentation including:
- Complete design system overview
- Page-by-page feature descriptions
- User workflows
- Component library details
- Future enhancement roadmap

## 🆘 Support

For issues or feature requests, please contact the development team or submit an issue in the repository.

## 📅 Roadmap

### Phase 1 (Completed)
- ✅ Core dashboard and navigation
- ✅ Role-based views
- ✅ Project management interface
- ✅ Worker tracking display
- ✅ User management page

### Phase 2 (In Development)
- 🔄 Backend API integration
- 🔄 Real-time data synchronization
- 🔄 Authentication system
- 🔄 Database implementation

### Phase 3 (Planned)
- 📋 Interactive map integration
- 📋 Mobile app development
- 📋 Advanced analytics
- 📋 Automated scheduling
- 📋 Financial reporting

## 📝 License

Proprietary - Groundwork Project Management Platform

---

**Groundwork** - Streamlining construction project management for modern service providers.
