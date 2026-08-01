"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Briefcase, 
  Calendar, 
  Wrench, 
  CreditCard,
  LogOut
} from "lucide-react";
import { userLogout } from "@/service/logout";

interface SidebarProps {
  role?: string;
}

export default function DashboardSidebar({ role = "CUSTOMER" }: SidebarProps) {
  const pathname = usePathname();

  // Define menus for different roles
  const menus = {
    ADMIN: [
      { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
      { name: "All Users", href: "/admin-dashboard/users", icon: Users },
      { name: "Manage Services", href: "/admin-dashboard/services", icon: Wrench },
      { name: "Settings", href: "/admin-dashboard/settings", icon: Settings },
    ],
    TECHNICIAN: [
      { name: "Dashboard", href: "/technician-dashboard", icon: LayoutDashboard },
      { name: "My Jobs", href: "/technician-dashboard/jobs", icon: Briefcase },
      { name: "Schedule", href: "/technician-dashboard/schedule", icon: Calendar },
      { name: "Earnings", href: "/technician-dashboard/earnings", icon: CreditCard },
    ],
    CUSTOMER: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
      { name: "Account Details", href: "/dashboard/profile", icon: Users },
    ],
  };

  // Fallback to customer if role is undefined or not mapped
  const currentMenu = menus[role as keyof typeof menus] || menus.CUSTOMER;

  return (
    <aside className="w-64 flex-shrink-0 h-screen  border-r border-gray-200 flex flex-col hidden md:flex transition-all">
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <Link href="/" className="relative w-32 h-8 block">
          <Image
            src="/logo-navbar.svg"
            alt="Logo"
            fill
            sizes="128px"
            className="object-contain object-left"
            priority
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {currentMenu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-gray-900" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout / Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => userLogout()}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Logout
        </button>
      </div>
    </aside>
  );
}