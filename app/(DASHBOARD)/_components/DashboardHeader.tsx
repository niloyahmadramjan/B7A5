"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { UserApiResponse } from "@/types/usertype";
import { userLogout } from "@/service/logout";
import { Menu } from "lucide-react";
import ThemeToggle from "@/app/_components/ThemeToggle";

interface DashboardHeaderProps {
  userData?: UserApiResponse | null;
  onMobileMenuToggle?: () => void;
}

export default function DashboardHeader({
  userData,
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-[var(--color-surface)] border-b border-[var(--color-steel-200)] sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      {/* Left side: Mobile menu toggle */}
      <div className="flex items-center md:hidden">
        <button
          type="button"
          onClick={() => {
            if (onMobileMenuToggle) {
              onMobileMenuToggle();
            }
          }}
          className="p-2 -ml-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-mist)] rounded-lg focus:outline-none transition-colors cursor-pointer"
          aria-label="Toggle Mobile Menu"
        >
          <Menu className="w-6 h-6 text-[var(--color-ink)]" />
        </button>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
        </div>

        {userData?.success && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-[var(--color-mist)] transition-colors focus:outline-none cursor-pointer"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white uppercase text-sm shadow-sm"
                style={{ backgroundColor: "var(--color-signal, #f97316)" }}
              >
                {userData.data.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block pr-2">
                <p className="text-sm font-semibold text-[var(--color-ink)] capitalize leading-none">
                  {userData.data.name}
                </p>
                <p className="text-xs text-[var(--color-ink-muted)] mt-1 capitalize">
                  {userData.data.role.toLowerCase()}
                </p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border border-[var(--color-steel-200)] bg-[var(--color-surface)] py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-4 py-2 border-b border-[var(--color-steel-200)] mb-1">
                  <p className="text-xs font-medium text-[var(--color-ink-muted)]">
                    Signed in as
                  </p>
                  <p className="text-sm font-bold text-[var(--color-ink)] truncate">
                    {userData.data.email}
                  </p>
                </div>

                <Link
                  href="/"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-mist)] transition-colors"
                >
                  Return to Home
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    userLogout();
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
