'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DashboardHome from '@/components/dashboard/DashboardHome';
import ProjectsPage from '@/components/pages/ProjectsPage';
import WorkersPage from '@/components/pages/WorkersPage';
import UsersPage from '@/components/pages/UsersPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'projects' | 'workers' | 'users'>('dashboard');
  const [userRole, setUserRole] = useState<'customer' | 'worker' | 'manager' | 'owner'>('manager');

  return (
    <div className="min-h-screen bg-color-background">
      <Header role={userRole} onRoleChange={setUserRole} />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} userRole={userRole} />
      
      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {currentPage === 'dashboard' && <DashboardHome role={userRole} />}
        {currentPage === 'projects' && <ProjectsPage role={userRole} />}
        {currentPage === 'workers' && <WorkersPage role={userRole} />}
        {currentPage === 'users' && <UsersPage role={userRole} />}
      </main>
    </div>
  );
}
