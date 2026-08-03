'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { 
  Wrench, DollarSign, Clock, Edit3, Trash2, X, Loader2, Plus 
} from 'lucide-react';
import Link from 'next/link';
import { deleteServiceAction, updateServiceAction } from '../_action/my-services';
import { getCategories } from '../_action/service';

export default function MyServicesClient({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [isPending, startTransition] = useTransition();

  // Categories for Edit Modal dropdown
  const [categories, setCategories] = useState<any[]>([]);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: 30,
    categoryId: '',
  });

  // Fetch categories when component mounts for the edit modal dropdown
  useEffect(() => {
    const fetchCats = async () => {
      const res = await getCategories('', 1, 50);
      if (res.success) {
        setCategories(res.data.data);
      }
    };
    fetchCats();
  }, []);

  const openEditModal = (service: any) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      price: service.price,
      duration: service.duration || 30,
      categoryId: service.categoryId || '',
    });
    setIsEditModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'duration'].includes(name) ? Number(value) : value,
    }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const toastId = toast.loading('Updating service...');

    startTransition(async () => {
      const res = await updateServiceAction(selectedService.id, formData);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        setServices(prev => prev.map(s => s.id === selectedService.id ? { ...s, ...formData } : s));
        setIsEditModalOpen(false);
      } else {
        toast.error(res.message, { id: toastId });
      }
    });
  };

const handleDelete = async (id: string) => {
    toast("Are you sure you want to delete this service?", {
      action: {
        label: "Delete",
        onClick: async () => {
          const toastId = toast.loading('Deleting service...');

          startTransition(async () => {
            const res = await deleteServiceAction(id);
            if (res.success) {
              toast.success(res.message, { id: toastId });
              setServices(prev => prev.filter(s => s.id !== id));
            } else {
              toast.error(res.message, { id: toastId });
            }
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: Infinity, 
    });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header bar */}
      <div className="w-full flex justify-between items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm transition-colors">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Offered Services</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage, update, or remove your professional service listings.</p>
        </div>
        <Link
          href="/technician-dashboard/create-service"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </Link>
      </div>

      {/* Services Cards Grid */}
      {services.length === 0 ? (
        <div className="w-full py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-center text-gray-400 text-xs">
          No services created yet. Click "Add New Service" to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">{service.title}</h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{service.description || 'No description provided.'}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center">
                  <DollarSign className="w-3.5 h-3.5" />{service.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {service.duration} mins
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden transition-colors">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Edit Service
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="px-6 py-5 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Service Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min={0}
                    required
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min={5}
                    required
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}