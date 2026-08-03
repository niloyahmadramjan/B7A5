'use client';

import React from 'react';
import { 
  Wrench, Calendar, Clock, CheckCircle2, Star, DollarSign, 
  TrendingUp, UserCheck, MapPin, Briefcase, AlertCircle 
} from 'lucide-react';

export default function DashboardClient({ overviewData }: { overviewData: any }) {
  const { profile, overview } = overviewData || {};
  const revenue = overview?.revenue || { total: 0, currentMonth: 0 };

  return (
    <div className="w-full space-y-6">
      
      {/* Profile Welcome Banner */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Welcome back, {profile?.name || 'Technician'}! 👋
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-3 pt-1">
            <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> {profile?.email}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile?.location || 'Not specified'}</span>
            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {profile?.experience || 0} Years Exp</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-4 py-3 rounded-xl">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="block text-xs text-blue-600 dark:text-blue-400 font-medium">Overall Rating</span>
            <span className="text-base font-bold text-gray-900 dark:text-gray-100">
              {profile?.rating} <span className="text-xs text-gray-400 font-normal">({profile?.totalReviews} reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex items-center justify-between transition-colors">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Revenue</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <DollarSign className="w-6 h-6 text-emerald-500" />{revenue.total.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex items-center justify-between transition-colors">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Current Month Revenue</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <DollarSign className="w-6 h-6 text-blue-500" />{revenue.currentMonth.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Overview Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        
        {/* Total Bookings */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Bookings</span>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{overview?.totalBookings || 0}</h4>
        </div>

        {/* Completed Bookings */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Completed</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{overview?.completedBookings || 0}</h4>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Pending</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{overview?.pendingBookings || 0}</h4>
        </div>

        {/* Total Services */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Active Services</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{overview?.totalServices || 0}</h4>
        </div>

      </div>

      {/* Bio / Extra details card */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Professional Bio</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          "{profile?.bio || 'No bio added yet. Update your profile to show customers your expertise.'}"
        </p>
      </div>

    </div>
  );
}