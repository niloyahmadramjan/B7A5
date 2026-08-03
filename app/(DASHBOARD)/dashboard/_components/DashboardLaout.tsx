"use client";

import { useState } from "react";
import DashboardSidebar from "../../_components/DashboardSidebar";
import DashboardHeader from "../../_components/DashboardHeader";

interface DashboardLayoutContentProps {
  userData: any;
  children: React.ReactNode;
}

export default function DashboardLayoutContent({
  userData,
  children,
}: DashboardLayoutContentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = userData?.success ? userData.data.role : "CUSTOMER";

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-navy)] text-[var(--color-ink)]">
      {/* Sidebar */}
      <DashboardSidebar
        role={userRole} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader 
          userData={userData} 
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 bg-[var(--color-surface)]">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}