"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserApiResponse } from "@/types/usertype";
import { userLogout } from "@/service/logout";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  userData?: UserApiResponse | null;
}

export default function Navbar({ userData }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Get current active route path
  const pathname = usePathname();

  // Determine dashboard URL based on role
  const getDashboardLink = (role?: string) => {
    switch (role) {
      case "TECHNICIAN":
        return "/technician-dashboard";
      case "ADMIN":
        return "/admin-dashboard";
      case "CUSTOMER":
      default:
        return "/dashboard";
    }
  };

  const dashboardUrl = getDashboardLink(userData?.success ? userData.data.role : undefined);

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b shadow-xs transition-colors duration-200"
      style={{
        backgroundColor: "var(--color-mist, #ffffff)",
        borderColor: "var(--color-steel-200, #e2e8f0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-36 sm:w-40 h-10 transition-transform group-hover:scale-105">
                <Image
                  src="/logo-navbar.svg"
                  alt="FixItNow Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors hover:opacity-80 relative py-1 ${
                isActive("/services") ? "font-bold" : ""
              }`}
              style={{ 
                color: isActive("/services") ? "var(--color-signal)" : "var(--color-ink-muted, #4b5563)" 
              }}
            >
              Browse Services
              {isActive("/services") && (
                <span 
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--color-signal)" }}
                />
              )}
            </Link>

            <Link
              href="/technicians"
              className={`text-sm font-medium transition-colors hover:opacity-80 relative py-1 ${
                isActive("/technicians") ? "font-bold" : ""
              }`}
              style={{ 
                color: isActive("/technicians") ? "var(--color-signal)" : "var(--color-ink-muted, #4b5563)" 
              }}
            >
              Technicians
              {isActive("/technicians") && (
                <span 
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--color-signal)" }}
                />
              )}
            </Link>

            <Link
              href="/#how-it-works"
              className={`text-sm font-medium transition-colors hover:opacity-80 relative py-1 ${
                isActive("/#how-it-works") ? "font-bold" : ""
              }`}
              style={{ 
                color: isActive("/#how-it-works") ? "var(--color-signal)" : "var(--color-ink-muted, #4b5563)" 
              }}
            >
              How It Works
            </Link>
          </div>

          {/* Desktop Right Action Area: Theme Toggle & User Auth */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {userData?.success ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase text-sm border-2 text-white shadow-xs"
                    style={{
                      backgroundColor: "var(--color-signal)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    {userData.data.name ? userData.data.name.charAt(0) : "U"}
                  </div>
                  <div className="text-left pr-1">
                    <p 
                      className="text-sm font-semibold capitalize leading-tight truncate max-w-[120px]"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {userData.data.name}
                    </p>
                    <span
                      className="inline-block text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase mt-0.5"
                      style={{
                        backgroundColor: "var(--status-accepted-bg, #e0f2fe)",
                        color: "var(--status-accepted-fg, #0369a1)",
                      }}
                    >
                      {userData.data.role}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--color-ink-muted)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border py-2 animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{
                      backgroundColor: "var(--color-surface, #ffffff)",
                      borderColor: "var(--color-steel-200, #e2e8f0)",
                    }}
                  >
                    <div
                      className="px-4 py-2.5 border-b"
                      style={{ borderColor: "var(--color-steel-200, #e2e8f0)" }}
                    >
                      <p className="text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
                        Signed in as
                      </p>
                      <p className="text-sm font-bold truncate mt-0.5" style={{ color: "var(--color-ink)" }}>
                        {userData.data.email}
                      </p>
                    </div>

                    <Link
                      href={dashboardUrl}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      style={{ color: "var(--color-ink)" }}
                    >
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                    
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        userLogout();
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: "var(--color-ink)" }}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-xs transition-all hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "var(--color-signal)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors focus:outline-none hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: "var(--color-ink)" }}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-lg"
          style={{
            backgroundColor: "var(--color-surface, #ffffff)",
            borderColor: "var(--color-steel-200, #e2e8f0)",
          }}
        >
          <div className="space-y-1">
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium transition-colors"
              style={{ 
                backgroundColor: isActive("/services") ? "var(--color-primary)" : "transparent",
                color: isActive("/services") ? "#ffffff" : "var(--color-ink)" 
              }}
            >
              Browse Services
            </Link>
            <Link
              href="/technicians"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium transition-colors"
              style={{ 
                backgroundColor: isActive("/technicians") ? "var(--color-primary)" : "transparent",
                color: isActive("/technicians") ? "#ffffff" : "var(--color-ink)" 
              }}
            >
              Top Technicians
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: "var(--color-ink)" }}
            >
              How It Works
            </Link>
          </div>

          <div 
            className="pt-4 border-t"
            style={{ borderColor: "var(--color-steel-200, #e2e8f0)" }}
          >
            {userData?.success ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white uppercase text-sm border-2 shadow-xs"
                    style={{
                      backgroundColor: "var(--color-signal)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    {userData.data.name ? userData.data.name.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold capitalize" style={{ color: "var(--color-ink)" }}>
                      {userData.data.name}
                    </p>
                    <p className="text-xs truncate max-w-[200px]" style={{ color: "var(--color-ink-muted)" }}>
                      {userData.data.email}
                    </p>
                    <span
                      className="inline-block text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase mt-1"
                      style={{
                        backgroundColor: "var(--status-accepted-bg, #e0f2fe)",
                        color: "var(--status-accepted-fg, #0369a1)",
                      }}
                    >
                      {userData.data.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={dashboardUrl}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Go to Dashboard
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    userLogout();
                  }}
                  className="block w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-sm font-semibold border transition-colors hover:bg-black/5"
                  style={{ 
                    borderColor: "var(--color-steel-200)",
                    color: "var(--color-ink)" 
                  }}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white shadow-xs"
                  style={{ backgroundColor: "var(--color-signal)" }}
                >
                  Register Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}