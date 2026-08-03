"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../_action/category";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface CategoriesClientProps {
  initialData: {
    data: Category[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const POPULAR_SUGGESTIONS = [
  {
    name: "Electronics",
    description: "Gadgets, smartphones, computers, and electronic accessories.",
  },
  {
    name: "Home Appliances",
    description: "Kitchenware, cleaning tools, and home automation systems.",
  },
  {
    name: "Beauty & Personal Care",
    description: "Skincare, cosmetics, hair care, and wellness products.",
  },
  {
    name: "Repair & Maintenance",
    description: "Professional technical repair and home upkeep services.",
  },
];

export default function CategoriesClient({
  initialData,
}: CategoriesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPage = initialData?.page || 1;
  const totalPages = initialData?.totalPages || 1;

  // Pagination Handler
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // Create Category Handler
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating category...");

    const res = await createCategory({ name, description });

    if (res.success) {
      toast.success(res.message, { id: toastId });
      setName("");
      setDescription("");
      setIsCreateOpen(false);
      router.refresh();
    } else {
      toast.error(res.message, { id: toastId });
    }
    setIsSubmitting(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating category...");

    const res = await updateCategory(selectedCategory.id, {
      name,
      description,
    });

    if (res.success) {
      toast.success(res.message, { id: toastId });
      setSelectedCategory(null);
      setName("");
      setDescription("");
      setIsEditOpen(false);
      router.refresh();
    } else {
      toast.error(res.message, { id: toastId });
    }
    setIsSubmitting(false);
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    toast("Are you sure you want to delete this category?", {
      action: {
        label: "Delete",
        onClick: async () => {
          const toastId = toast.loading("Deleting category...");
          const res = await deleteCategory(id);
          if (res.success) {
            toast.success(res.message, { id: toastId });
            router.refresh();
          } else {
            toast.error(res.message, { id: toastId });
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
      duration: Infinity,
    });
  };

  //   handle Edit Handler
  const handleEdit = (id: string) => {
    const categoryToEdit = initialData.data.find((cat) => cat.id === id);
    if (categoryToEdit) {
      setSelectedCategory(categoryToEdit);
      setName(categoryToEdit.name);
      setDescription(categoryToEdit.description);
      setIsEditOpen(true);
    }
  };

  // Apply Suggestion Quick Fill
  const applySuggestion = (suggestion: {
    name: string;
    description: string;
  }) => {
    setName(suggestion.name);
    setDescription(suggestion.description);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Bar Header & Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm transition-colors">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary-600" /> Category Management
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Manage system-wide categories, descriptions, and structural
            taxonomies.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Category
        </button>
      </div>

      {/* Main Table Container */}
      <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 uppercase tracking-wider text-xs transition-colors border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Created Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-600 dark:text-gray-400">
            {initialData?.data?.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-400 text-xs"
                >
                  No categories found. Create your first category above.
                </td>
              </tr>
            ) : (
              initialData?.data?.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-4 font-semibold text-gray-900 dark:text-gray-100 capitalize">
                    {cat.name}
                  </td>
                  <td className="p-4 max-w-xs truncate text-gray-500 dark:text-gray-400">
                    {cat.description || "No description provided"}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsViewOpen(true);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded text-xs transition-colors inline-flex items-center"
                      title="View Details"
                    >
                      <Eye className="w-3 h-3 mr-1" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(cat.id)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 rounded text-xs transition-colors inline-flex items-center"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3 h-3 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 rounded text-xs transition-colors inline-flex items-center"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 text-xs">
            <span className="text-gray-500">
              Page{" "}
              <strong className="text-gray-900 dark:text-gray-100">
                {currentPage}
              </strong>{" "}
              of{" "}
              <strong className="text-gray-900 dark:text-gray-100">
                {totalPages}
              </strong>{" "}
              (Total {initialData.total})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE CATEGORY MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transition-colors">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary-600" /> Create New
                Category
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleCreateSubmit}
              className="p-6 space-y-4 text-xs"
            >
              {/* Suggestions Box */}
              <div className="space-y-2 bg-primary-50/50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30 p-3 rounded-xl">
                <span className="font-semibold text-primary-700 dark:text-primary-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Quick Suggestions: Click
                  to auto-fill
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {POPULAR_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applySuggestion(sug)}
                      className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-primary-500 transition-colors font-medium shadow-2xs"
                    >
                      + {sug.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Electronics"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of this category..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}{" "}
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-colors">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Category Details
              </h3>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-700 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl space-y-3">
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-[11px] uppercase tracking-wider font-semibold">
                    Name
                  </span>
                  <strong className="text-base text-gray-900 dark:text-gray-100 capitalize">
                    {selectedCategory.name}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-[11px] uppercase tracking-wider font-semibold">
                    Description
                  </span>
                  <p className="mt-0.5">{selectedCategory.description}</p>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-[11px] uppercase tracking-wider font-semibold">
                    Created Date
                  </span>
                  <span>
                    {new Date(selectedCategory.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-xl font-medium text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* view edit modal */}

      {isEditOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transition-colors">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary-600" /> Edit Category
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Electronics"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of this category..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting && (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  )}{" "}
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
