"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserApiResponse } from "@/types/usertype";
import { userLogout } from "@/service/logout";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  /** Accepts either the raw API response object or the nested user data directly */
  userData?: UserApiResponse | null;
}

export default function Navbar({ userData }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // console.log(userData);
  // Normalize user data whether passed as raw API response or direct profile object
  // const user: UserProfile | null = userData
  //   ? "data" in userData
  //     ? userData.data
  //     : userData
  //   : null;

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

  const dashboardUrl = getDashboardLink(userData?.success ? userData.data.role: undefined);

  return (
    <nav
      className="sticky top-0 z-50 shadow-sm border-b"
      style={{
        backgroundColor: "var(--color-mist)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-40 h-10 transition-transform group-hover:scale-105">
                <Image
                  src="/logo-navbar.svg"
                  alt="FixItNow Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              {/* <span
                className="text-2xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                FixIt<span style={{ color: "var(--color-signal)" }}>Now</span>
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Browse Services
            </Link>
            <Link
              href="/technicians"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Technicians
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
          </div>

          {/* User Auth Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 ml-auto ">
                      <ThemeToggle />
                    </div>
            {userData?.success ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                >

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase text-sm border-2"
                    style={{
                      backgroundColor: "var(--color-signal)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    {userData.success ? userData.data.name.charAt(0) : "U"}
                  </div>
                  <div className="text-left pr-2">
                    <p className="text-sm font-semibold  capitalize leading-tight">
                      {userData.success ? userData.data.name : "User"}
                    </p>
                    <span
                      className="inline-block text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase mt-0.5"
                      style={{
                        backgroundColor: "var(--status-accepted-bg)",
                        color: "var(--status-accepted-fg)",
                      }}
                    >
                      {userData.success ? userData.data.role : "CUSTOMER"}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border py-2 animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-steel-200)",
                      boxShadow: "var(--shadow-raised)",
                    }}
                  >
                    <div
                      className="px-4 py-2 border-b"
                      style={{ borderColor: "var(--color-steel-200)" }}
                    >
                      <p className="text-xs font-medium text-gray-500">
                        Signed in as
                      </p>
                      <p className="text-sm  font-bold text-white truncate">
                        {userData.success && userData.data.email}
                      </p>
                    </div>

                    <Link
                      href={dashboardUrl}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        userLogout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-white hover:text-gray-400 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow transition-all hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "var(--color-signal)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200"
          style={{
            backgroundColor: "var(--color-navy-700)",
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Link
            href="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            Browse Services
          </Link>
          <Link
            href="/technicians"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            Top Technicians
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            How It Works
          </Link>

          <div className="pt-4 border-t border-white/10">
            {userData?.success ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white uppercase text-sm border-2"
                    style={{
                      backgroundColor: "var(--color-signal)",
                      borderColor: "var(--color-surface)",
                    }}
                  >
                    {userData.data.name ? userData.data.name.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white capitalize">
                      {userData.data.name}
                    </p>
                    <p className="text-xs text-gray-300">{userData.data.email}</p>
                    <span
                      className="inline-block text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase mt-1"
                      style={{
                        backgroundColor: "var(--status-accepted-bg)",
                        color: "var(--status-accepted-fg)",
                      }}
                    >
                      {userData.data.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={dashboardUrl}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Go to Dashboard
                </Link>

                {userLogout ? (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      userLogout();
                    }}
                    className="block w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-red-300 bg-red-900/40 hover:bg-red-900/60 transition-colors"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-red-300 bg-red-900/40"
                  >
                    Log Out
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white border border-white/20 hover:bg-white/10"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white"
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
