"use client";

import { useState } from "react";
import Link from "next/link";
import { UserApiResponse } from "@/types/usertype";
import { userLogout } from "@/service/logout";
import { Menu, Bell } from "lucide-react";

interface DashboardHeaderProps {
  userData?: UserApiResponse | null;
  onMobileMenuToggle?: () => void;
}

export default function DashboardHeader({ userData, onMobileMenuToggle }: DashboardHeaderProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="h-20  border-b border-gray-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      
      {/* Left side: Mobile menu toggle */}
      <div className="flex items-center md:hidden">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {userData?.success && (
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white uppercase text-sm"
                style={{ backgroundColor: "var(--color-signal, #f97316)" }}
              >
                {userData.data.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block pr-2">
                <p className="text-sm font-semibold text-gray-700 capitalize leading-none">
                  {userData.data.name}
                </p>
                <p className="text-xs text-gray-500 mt-1 capitalize">
                  {userData.data.role.toLowerCase()}
                </p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border border-gray-100 bg-white py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="text-xs font-medium text-gray-500">Signed in as</p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {userData.data.email}
                  </p>
                </div>
                
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Return to Home
                </Link>
                
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    userLogout();
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}