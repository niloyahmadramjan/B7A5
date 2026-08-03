"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  Settings, 
  Calendar, 
  Wrench, 
  CreditCard,
  X,
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  CalendarCheck, 
  CalendarClock, 
  UserCircle,
  Layers
} from "lucide-react";

interface SidebarProps {
  role?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({ role = "CUSTOMER", isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Define menus for different roles
  const menus = {
    ADMIN: [
      { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
      { name: "All Users", href: "/admin-dashboard/users", icon: Users },
      { name: "Manage Services", href: "/admin-dashboard/services", icon: Wrench },
      { name: "Categories", href: "/admin-dashboard/categories", icon: Layers },
    ],
   TECHNICIAN: [
      { name: "Dashboard", href: "/technician-dashboard", icon: LayoutDashboard },
      { name: "My Services", href: "/technician-dashboard/services", icon: Briefcase },
      { name: "Create Services", href: "/technician-dashboard/create-service", icon: PlusCircle },
      { name: "Bookings", href: "/technician-dashboard/bookings", icon: CalendarCheck },
      { name: "Availability", href: "/technician-dashboard/availability", icon: CalendarClock },
      { name: "Profile", href: "/technician-dashboard/profile", icon: UserCircle },
    ],
    CUSTOMER: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
      { name: "Account Details", href: "/dashboard/profile", icon: Users },
      { name: "Payment History", href: "/dashboard/payments", icon: CreditCard },
    ],
  };

  const currentMenu = menus[role as keyof typeof menus] || menus.CUSTOMER;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 h-screen 
        bg-[var(--color-surface)] border-r border-[var(--color-steel-200)] 
        flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[var(--color-steel-200)]">
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

          {/* Close button for mobile */}
          {isOpen && (
            <button 
              type="button"
              onClick={onClose}
              className="p-1.5 md:hidden text-[var(--color-ink-muted)] hover:bg-[var(--color-mist)] rounded-lg transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5 text-[var(--color-ink)]" />
            </button>
          )}
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
                onClick={onClose} // মোবাইলে লিংকে ক্লিক করলেই সাইডবার বন্ধ হয়ে যাবে
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-mist)] text-[var(--color-ink)] font-semibold shadow-xs"
                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-mist)] hover:text-[var(--color-ink)]"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[var(--color-signal)]" : "text-[var(--color-steel)]"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}