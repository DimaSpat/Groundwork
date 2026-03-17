# Groundwork Platform - Visual Structure Guide

## 🎯 Complete Application Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                              │
├─────────────────────┬───────────────────┬─────────────────────┤
│ Logo "G"            │  Title: Groundwork │ Role Selector | User │
│ Groundwork          │  Construction PM   │ [Manager ▼]  | JD   │
└─────────────────────┴───────────────────┴─────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              NAVIGATION BAR (Context Aware)                 │
├─────────────────────┬──────────────────┬─────────────────────┤
│ 📊 Dashboard        │ 🏗️ Projects      │ 👷 Workers          │
│ (underline: active) │                  │                     │
└─────────────────────┴──────────────────┴─────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      MAIN CONTENT AREA                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Role-Based View Component                            │   │
│  │ 🎯 "Project Management"                              │   │
│  │ Manage teams, track projects, monitor productivity   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────┬──────────────────┬────────────────┐   │
│  │ 📊 Quick Stat   │ 📊 Quick Stat   │ 📊 Quick Stat  │   │
│  │ Active Proj:  8 │ Team Members: 24│ On-Time: 94%   │   │
│  └─────────────────┴──────────────────┴────────────────┘   │
│                                                               │
│  ┌────────────────────────────┬──────────────────────┐     │
│  │   Project Summary (2/3)     │ Upcoming Tasks (1/3) │     │
│  │  ┌─────────────────────┐   │  ┌────────────────┐  │     │
│  │  │ Downtown Office     │   │  │ ⚠️ HIGH         │  │     │
│  │  │ Active | 65% | $$$$ │   │  │ Equipment Deliv│  │     │
│  │  └─────────────────────┘   │  │ Today | Mike J. │  │     │
│  │  ┌─────────────────────┐   │  │                │  │     │
│  │  │ Highway Maintenance │   │  │ ⚠️ HIGH         │  │     │
│  │  │ Active | 40% | $$$$ │   │  │ Safety Meeting │  │     │
│  │  └─────────────────────┘   │  │ Tomorrow| Sarah │  │     │
│  │  ┌─────────────────────┐   │  │                │  │     │
│  │  │ Snow Removal        │   │  │ ⚠️ MEDIUM       │  │     │
│  │  │ Active | 85% | $$$$ │   │  │ Payroll Verif. │  │     │
│  │  └─────────────────────┘   │  │ Mar 18 | Admin │  │     │
│  │                             │  │                │  │     │
│  │                             │  │ ➔ View All    │  │     │
│  │                             │  └────────────────┘  │     │
│  └────────────────────────────┴──────────────────────┘     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     Real-Time Worker Tracking (4 column grid)        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
│  │  │ 👤 Mike  │ │ 👤Sarah  │ │ 👤 James │ │ 👤Emma │ │   │
│  │  │ 🟢Active │ │ 🟢Active │ │ 🟡Break  │ │ 🟢Activ│ │   │
│  │  │ Location │ │ Location │ │ Location │ │ Locatn │ │   │
│  │  │ Downtown │ │ Highway  │ │ Snow Rm  │ │ Downtown│ │   │
│  │  │ Task:    │ │ Task:    │ │ Task:    │ │ Task:  │ │   │
│  │  │ Found.   │ │ Road Rpr │ │ Maint.   │ │ Finish │ │   │
│  │  │ ⚡ 92%   │ │ ⚡ 88%    │ │ ⚡ 85%   │ │ ⚡ 94% │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Dashboard Component Hierarchy

### Manager/Owner Dashboard

```
Dashboard Home
├── Role-Based View (Hero Banner)
│   └── Title, Description, Icon, Gradient Background
│
├── Quick Stats (3 Card Grid)
│   ├── Stat Card: Active Projects - 8 (Icon + Value)
│   ├── Stat Card: Team Members - 24 (Icon + Value)
│   └── Stat Card: On-Time Delivery - 94% (Icon + Value)
│
├── Two-Column Layout
│   ├── Left Column (2/3 width)
│   │   └── Project Summary Cards
│   │       ├── Project Header: Name + Status Badge
│   │       ├── Project Location
│   │       ├── Progress Section: Bar + %
│   │       └── Details Grid: Workers, Due Date
│   │
│   └── Right Column (1/3 width)
│       └── Upcoming Tasks Widget
│           ├── Task Card (Priority Border Left)
│           ├── Task Card (Priority Border Left)
│           ├── Task Card (Priority Border Left)
│           └── View All Button
│
└── Full-Width: Real-Time Worker Tracking
    └── 4-Column Grid of Worker Cards
        ├── Worker Card: Avatar + Name + Status
        ├── Worker Card: Location + Current Task
        ├── Worker Card: Efficiency Score
        └── Worker Card: Performance Metrics
```

---

## 🏗️ Projects Page Structure

```
Projects Page
├── Header Section
│   ├── Title: "Project Management"
│   └── Subtitle: Manage, track, and oversee all projects
│
├── Filter Buttons (Horizontal)
│   ├── [All] [Active] [Planning] [Completed] [On-Hold]
│   └── Active state: Blue background with white text
│
└── Project Card Grid (1 column, responsive to grid)
    └── For each filtered project:
        ├── Header Row:
        │   ├── Project Name (Large, Bold)
        │   ├── Status Badge (Color-coded)
        │   └── View Details Button (Primary)
        │
        ├── Info Row:
        │   ├── Client Name
        │   └── Location with Icon
        │
        ├── Metrics Grid (4 columns):
        │   ├── Progress: ▮▮▮░░░░░░ 65%
        │   ├── Budget: $2.5M (Spent: $1.6M)
        │   ├── Timeline: 2024-01-15 → 2024-06-30
        │   └── Team: Manager David Smith, 12 workers
        │
        └── Action Buttons:
            ├── 📋 View Tasks
            ├── 👷 Manage Team
            └── 📊 Budget Details
```

---

## 👷 Workers Page Structure

```
Workers Page
├── Header Section
│   ├── Title: "Worker Management"
│   └── Subtitle: Track team members, assignments, performance
│
├── Filter Buttons
│   ├── [All] [Active] [On-Break] [Offline]
│
└── Worker Card Grid
    └── For each worker:
        ├── Avatar + Name + Email
        │   ├── Initials in circle (color-coded by role)
        │   └── Display name and email address
        │
        ├── Badge Row:
        │   ├── Role Badge (Supervisor/Laborer/Equipment/Inspector)
        │   └── Status Badge (Active/Break/Offline)
        │
        ├── Details Grid (5 columns):
        │   ├── Phone: (555) 123-4567
        │   ├── Current Project: Downtown Office Complex
        │   ├── Hours Worked: 320h
        │   ├── Hourly Rate: $45/hr
        │   └── Performance: ⭐⭐⭐⭐⭐ 4.8/5
        │
        ├── Certifications (Pill Badges):
        │   ├── ✓ OSHA 30
        │   ├── ✓ First Aid
        │   └── ✓ Heavy Equipment
        │
        └── Action Buttons:
            ├── 📋 View History
            ├── ✏️ Edit Worker
            └── 🎯 Reassign
```

---

## 👥 Users Page Structure (Owner Only)

```
Users Page (Owner Only)
├── Header Section
│   ├── Title: "User Management"
│   ├── Subtitle: Administer users, roles, permissions
│   └── ➕ Add New User Button
│
├── Filter Buttons
│   ├── [All] [Owner] [Manager] [Customer] [Active] [Inactive]
│
└── Users Table (Scrollable on mobile)
    ├── Headers:
    │   ├── Name
    │   ├── Email
    │   ├── Role (Color-coded)
    │   ├── Status (Color-coded)
    │   ├── Joined
    │   ├── Projects Count
    │   ├── Last Active
    │   └── Actions
    │
    └── Table Rows (One per user):
        ├── Avatar + Name
        ├── Email Address
        ├── Role Badge (Owner/Manager/Customer)
        ├── Status Badge (Active/Inactive/Suspended)
        ├── Join Date (YYYY-MM-DD)
        ├── Number of Projects
        ├── Last Active Timestamp
        └── Action Buttons (Edit | Remove)
```

---

## 🎨 Color-Coded Elements

### Status Badges
```
┌─────────────┬──────────────┬─────────────────────────┐
│ Status      │ Color        │ Use Case                │
├─────────────┼──────────────┼─────────────────────────┤
│ Active      │ Green #10b98 │ Running, Online, OK     │
│ On Break    │ Amber #f59e0 │ Paused, Waiting         │
│ Offline     │ Gray #6b7280 │ Disconnected, Away      │
│ Planning    │ Blue #3b82f6 │ Not Started             │
│ Completed   │ Green #10b98 │ Finished, Done          │
│ On-Hold     │ Amber #f59e0 │ Paused, Stopped         │
│ Suspended   │ Red #ef4444  │ Blocked, Error          │
└─────────────┴──────────────┴─────────────────────────┘
```

### Role Badges
```
┌──────────────────┬──────────────┬────────────────────┐
│ Role             │ Color        │ Permissions        │
├──────────────────┼──────────────┼────────────────────┤
│ Owner (👑)       │ Purple       │ All Features       │
│ Manager          │ Blue         │ Project + Workers  │
│ Worker           │ Green        │ Tasks + Tracking   │
│ Customer         │ Amber        │ Projects + Reports │
│ Supervisor       │ Purple       │ Team Management    │
│ Equipment Oper.  │ Yellow       │ Equipment + Tasks  │
│ Inspector        │ Green        │ QA + Inspections   │
└──────────────────┴──────────────┴────────────────────┘
```

### Priority Indicators (Tasks)
```
┌──────────────┬──────────────┬─────────────────────┐
│ Priority     │ Color        │ Left Border         │
├──────────────┼──────────────┼─────────────────────┤
│ High         │ Red (#ef4444 │ 4px solid red       │
│ Medium       │ Amber #f59e0 │ 4px solid amber     │
│ Low          │ Green #10b98 │ 4px solid green     │
└──────────────┴──────────────┴─────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├── Single Column Layout
├── Full-width Cards
├── Stack Navigation Vertically
├── Simplified Stats (1 column)
└── Hamburger Menu

Tablet (768px - 1024px)
├── Two Column Layout
├── Half-width Cards
├── Grid (2 columns) for Projects/Workers
├── Stats (2-3 columns)
└── Top Navigation Bar

Desktop (> 1024px)
├── Three+ Column Layout
├── Optimized Card Sizes
├── Grid (3-4 columns) for Projects/Workers
├── Stats (3 columns)
└── Full Navigation Bar with Icons
```

---

## 🎯 User Journey Maps

### Customer Journey
```
Login
  ↓
Dashboard (Service Overview)
  ├─→ View Active Projects
  │   └─→ Click Project Card
  │       └─→ See Project Details
  │           ├─→ View Progress (%) 
  │           ├─→ See Team Members
  │           └─→ Check Timeline
  │
  └─→ View Upcoming Tasks
      └─→ Get Notifications
```

### Field Worker Journey
```
Login
  ↓
Dashboard (Today's Assignments)
  ├─→ Check Location Tracking
  │   └─→ See Live Map with Job Sites
  │
  ├─→ View Assigned Tasks
  │   ├─→ Check In to Job
  │   ├─→ Log Time
  │   ├─→ Take Photos
  │   └─→ Log Out
  │
  └─→ View Earnings
      └─→ See Daily/Weekly Income
```

### Manager Journey
```
Login
  ↓
Dashboard (Project Management)
  ├─→ View All Projects
  │   ├─→ Filter by Status
  │   ├─→ Check Progress
  │   └─→ Monitor Budget
  │
  ├─→ Manage Workers
  │   ├─→ View Team Status
  │   ├─→ Check Efficiency
  │   ├─→ Monitor Location
  │   └─→ Reassign Tasks
  │
  └─→ View Reports
      └─→ Performance Metrics
```

### Owner Journey
```
Login
  ↓
Dashboard (Business Overview)
  ├─→ View All Projects
  │   └─→ See Financial Status
  │
  ├─→ Manage Workers
  │   └─→ View Team Performance
  │
  ├─→ Manage Users
  │   ├─→ Add New Users
  │   ├─→ Set Permissions
  │   └─→ Remove Users
  │
  ├─→ Financial Reports
  │   └─→ See Revenue & Expenses
  │
  └─→ System Settings
      └─→ Configure Platform
```

---

## 🔄 Component Reusability

### Cards Used Across Platform
```
┌────────────────┐
│ Project Card   │ → Projects Page, Dashboard
├────────────────┤
│ Worker Card    │ → Workers Page, Dashboard
├────────────────┤
│ Stat Card      │ → Dashboard, Reports
├────────────────┤
│ Task Card      │ → Upcoming Tasks, Task Management
├────────────────┤
│ User Row       │ → Users Table (Users Page)
└────────────────┘
```

### Badge Components
```
Status Badge  → Used in all data displays
Role Badge    → Users page, Worker cards
Priority Bad  → Tasks, Alerts
Progress Bar  → Projects, Worker efficiency
```

### Button Styles
```
Primary       → Main actions (View Details, Create)
Secondary     → Alternative actions (Cancel)
Danger        → Destructive actions (Remove, Delete)
Success       → Positive actions (Complete, Save)
Outline       → Navigation (View All, Learn More)
```

---

This visual structure provides a complete blueprint for understanding how all components fit together to create a cohesive, professional construction management platform.
