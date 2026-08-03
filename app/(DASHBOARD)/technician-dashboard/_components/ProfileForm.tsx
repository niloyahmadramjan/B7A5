'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Loader2, User, MapPin, Briefcase, Star, Mail, Phone, 
  Wrench, Calendar, MessageSquare, Clock, CheckCircle2 
} from 'lucide-react';
import { updateTechnicianProfile } from '../_action/profile';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ProfileClient({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    bio: initialData.technicianProfile?.bio || '',
    experience: initialData.technicianProfile?.experience || 0,
    location: initialData.technicianProfile?.location || '',
  });

  const techProfile = initialData.technicianProfile || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Updating profile...');

    const res = await updateTechnicianProfile(formData);

    if (res.success) {
      toast.success(res.message, { id: toastId });
    } else {
      toast.error(res.message, { id: toastId });
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Overview Banner */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{initialData.name}</h2>
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                {initialData.role}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                {initialData.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {initialData.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {initialData.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <span className="block text-xs text-gray-500 dark:text-gray-400">Rating</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 justify-center mt-0.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {techProfile.rating} 
                <span className="text-xs text-gray-400 font-normal">({techProfile.totalReviews} reviews)</span>
              </span>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <span className="block text-xs text-gray-500 dark:text-gray-400">Experience</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-0.5 block">
                {techProfile.experience || 0} Years
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* Left Column: Edit Form */}
        <div className="lg:col-span-1 w-full">
          <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-3">
              Edit Profile
            </h3>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Experience (Years)</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min={0}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. City, Country"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell customers about your expertise..."
                className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </form>
        </div>

        {/* Right Column: Services, Availability & Reviews Data */}
        <div className="lg:col-span-2 space-y-6 w-full">
          
          {/* Services Offered */}
          <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-blue-500" /> Offered Services ({techProfile.services?.length || 0})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techProfile.services?.map((service: any) => (
                <div key={service.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{service.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{service.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700/50 text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">${service.price}</span>
                    <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration} mins</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" /> Weekly Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techProfile.availability?.map((slot: any) => (
                <div key={slot.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{DAYS_OF_WEEK[slot.dayOfWeek]}</span>
                  <div className="flex items-center gap-2">
                    {slot.isAvailable ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Closed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-500" /> Customer Reviews ({techProfile.reviews?.length || 0})
            </h3>
            <div className="space-y-4">
              {techProfile.reviews?.map((review: any) => (
                <div key={review.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}