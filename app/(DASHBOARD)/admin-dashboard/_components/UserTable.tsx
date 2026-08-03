'use client';

import { useState } from 'react';
import { Shield, UserCheck, UserX, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserStatus } from '../_action/user';

export default function UserTable({ users }: { users: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
    setLoadingId(userId);

    try {
      const res = await updateUserStatus(userId, nextStatus);
      if (res.success) {
        toast.success(`User successfully ${nextStatus.toLowerCase()}!`);
      } else {
        toast.error(res.message || 'Failed to update user status.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border border-border text-muted-foreground">
        No users found.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto card">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <th className="p-4">User Details</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Joined Date</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm text-foreground">
          {users.map((user) => {
            const isLoading = loadingId === user.id;

            return (
              <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </td>
                <td className="p-4 text-muted-foreground text-xs font-mono">{user.phone || 'N/A'}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-secondary text-secondary-foreground">
                    <Shield className="w-3 h-3 text-primary" />
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    user.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <button
                    disabled={isLoading}
                    onClick={() => handleStatusToggle(user.id, user.status)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors inline-flex items-center gap-1.5 disabled:opacity-50 cursor-pointer ${
                      user.status === 'ACTIVE'
                        ? 'bg-destructive/10 text-destructive hover:bg-destructive/25'
                        : 'bg-green-500/10 text-green-600 hover:bg-green-500/25'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing...
                      </>
                    ) : user.status === 'ACTIVE' ? (
                      <>
                        <UserX className="w-3.5 h-3.5" /> Ban
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3.5 h-3.5" /> Activate
                      </>
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}