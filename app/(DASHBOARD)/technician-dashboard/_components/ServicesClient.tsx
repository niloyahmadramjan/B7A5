'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { 
  Plus, Search, Loader2, X, Wrench, ChevronLeft, ChevronRight, DollarSign, Clock 
} from 'lucide-react';
import { createService, getCategories } from '../_action/service';

export default function ServicesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Categories State & Pagination
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Service Form State
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    price: 0,
    duration: 30,
  });

  // Fetch categories whenever search or page changes
  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCategories(true);
      const res = await getCategories(searchQuery, page, 5);
      if (res.success) {
        setCategories(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      }
      setLoadingCategories(false);
    };

    const timer = setTimeout(() => {
      fetchCats();
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [searchQuery, page]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['price', 'duration'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast.error('Please select a category');
      return;
    }

    const toastId = toast.loading('Creating service...');

    startTransition(async () => {
      const res = await createService(formData);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        setIsModalOpen(false);
        setFormData({ categoryId: '', title: '', description: '', price: 0, duration: 30 });
      } else {
        toast.error(res.message, { id: toastId });
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header & Create Button Action */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm transition-colors">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Service Management</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Browse categories and offer services to your customers.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Service
        </button>
      </div>

      {/* Categories Browser Section */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm transition-colors space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" /> Available Categories
          </h3>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories Grid Table / Cards */}
        {loadingCategories ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : categories.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400">No categories found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-1">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">{cat.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description || 'No description provided.'}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
            <span className="text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 rounded text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 rounded text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE SERVICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl w-full max-w-lg overflow-hidden transition-colors">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Create New Service
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto text-sm">
              
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Select Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2.5 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose a category --</option>
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
                  onChange={handleInputChange}
                  placeholder="e.g. Advanced AC Repair"
                  required
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min={0}
                      required
                      className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (Minutes)</label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min={5}
                      required
                      className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detail what is included in this service..."
                  className="w-full p-3 text-xs bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Create Service
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}