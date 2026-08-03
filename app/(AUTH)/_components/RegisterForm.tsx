'use client';

import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { User, Wrench, Loader2 } from "lucide-react";

type RegisterState = {
  success?: boolean;
  message?: string;
} | null;

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'TECHNICIAN'>('CUSTOMER');
  const [state, action, pending] = useActionState(registerAction, null);

  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message);
    }

    if (state.success) {
      toast.success("Account registered successfully!");
    }
  }, [state]);

  return (
    <form
      action={action}
      className="space-y-4"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Hidden input to pass the selected role into FormData */}
      <input type="hidden" name="role" value={selectedRole} />

      {/* Role Selector Cards */}
      <div>
        <label 
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--color-ink)" }}
        >
          Select Account Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {/* Customer Choice */}
          <div
            onClick={() => setSelectedRole('CUSTOMER')}
            className={`cursor-pointer border p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
              selectedRole === 'CUSTOMER' 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-border bg-card hover:border-steel-200'
            }`}
            style={{
              borderColor: selectedRole === 'CUSTOMER' ? 'var(--color-signal)' : 'var(--color-steel-250, var(--color-steel-200))',
              borderRadius: "var(--radius-sm)",
            }}
          >
            <User className={`w-5 h-5 mb-1 ${selectedRole === 'CUSTOMER' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-xs font-bold" style={{ color: selectedRole === 'CUSTOMER' ? 'var(--color-navy)' : 'var(--color-ink-muted)' }}>
              Customer
            </span>
          </div>

          {/* Technician Choice */}
          <div
            onClick={() => setSelectedRole('TECHNICIAN')}
            className={`cursor-pointer border p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
              selectedRole === 'TECHNICIAN' 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-border bg-card hover:border-steel-200'
            }`}
            style={{
              borderColor: selectedRole === 'TECHNICIAN' ? 'var(--color-signal)' : 'var(--color-steel-250, var(--color-steel-200))',
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Wrench className={`w-5 h-5 mb-1 ${selectedRole === 'TECHNICIAN' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-xs font-bold" style={{ color: selectedRole === 'TECHNICIAN' ? 'var(--color-navy)' : 'var(--color-ink-muted)' }}>
              Technician
            </span>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-card text-foreground"
          style={
            {
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-sm)",
              "--tw-ring-color": "var(--color-signal)",
            } as React.CSSProperties
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@gmail.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-card text-foreground"
          style={
            {
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-sm)",
              "--tw-ring-color": "var(--color-signal)",
            } as React.CSSProperties
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="01812345678"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-card text-foreground"
          style={
            {
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-sm)",
              "--tw-ring-color": "var(--color-signal)",
            } as React.CSSProperties
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-ink)" }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-card text-foreground"
          style={
            {
              borderColor: "var(--color-steel-200)",
              borderRadius: "var(--radius-sm)",
              "--tw-ring-color": "var(--color-signal)",
            } as React.CSSProperties
          }
          required
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 mt-4 font-semibold text-white transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        style={{
          backgroundColor: "var(--color-primary)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-display)",
        }}
        onMouseOver={(e) =>
          !pending && (e.currentTarget.style.backgroundColor = "var(--color-signal-600)")
        }
        onMouseOut={(e) =>
          !pending && (e.currentTarget.style.backgroundColor = "var(--color-primary)")
        }
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
          </>
        ) : (
          "Register Account"
        )}
      </button>
    </form>
  );
}

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const baseUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';

  try {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ name, email, phone, password, role }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Network error occurred during registration." };
  }
};