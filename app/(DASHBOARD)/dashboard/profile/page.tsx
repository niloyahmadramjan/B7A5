import Link from "next/link";
import { User, Mail, Phone, Shield, Calendar, MapPin, Star, Wrench } from "lucide-react";
import { BookingStatus } from "@/types/booking";
import { getMe } from "@/service/getMe";


export default async function ProfilePage() {
  const response = await getMe();
  const profile = response?.data || response;

  if (!profile || !profile.id) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-ink)]">
        <h2 className="text-xl font-bold">Profile not found</h2>
        <p className="text-[var(--color-ink-muted)] mt-2">Could not load user profile information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-[var(--color-ink-muted)] mt-1">Manage your account details, bookings, and history.</p>
      </div>

      {/* User Info Card */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-steel-200)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-mist)] border border-[var(--color-steel-200)] flex items-center justify-center text-2xl font-bold text-[var(--color-ink)] shadow-inner">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold capitalize text-[var(--color-ink)]">{profile.name}</h2>
              <p className="text-sm text-[var(--color-ink-muted)] flex items-center gap-1 mt-1">
                <Shield className="w-3.5 h-3.5 text-[var(--color-signal)]" /> Role: <span className="text-[var(--color-ink)] font-medium">{profile.role}</span>
              </p>
            </div>
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {profile.status}
            </span>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] bg-[var(--color-mist)] p-3.5 rounded-lg border border-[var(--color-steel-200)]">
            <Mail className="w-5 h-5 text-[var(--color-steel)]" />
            <div>
              <p className="text-xs text-[var(--color-ink-muted)]">Email Address</p>
              <p className="font-medium text-[var(--color-ink)]">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] bg-[var(--color-mist)] p-3.5 rounded-lg border border-[var(--color-steel-200)]">
            <Phone className="w-5 h-5 text-[var(--color-steel)]" />
            <div>
              <p className="text-xs text-[var(--color-ink-muted)]">Phone Number</p>
              <p className="font-medium text-[var(--color-ink)]">{profile.phone || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}