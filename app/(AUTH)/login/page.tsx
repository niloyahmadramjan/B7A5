"use client";

import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  // You can replace this with your actual form action handler
  const handleLoginAction = (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Login action triggered:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-mist)' }}>
      <div 
        className="w-full max-w-md p-8 rounded-2xl relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-raised)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-bold mb-2" 
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-display)' }}
          >
            Welcome Back
          </h2>
          <p style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
            Log in to access your dashboard
          </p>
        </div>

        {/* Form using the action attribute */}
        <LoginForm />

        <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          Don't have an account?{" "}
          <Link 
            href="/register" 
            className="font-bold hover:underline focus:outline-none"
            style={{ color: 'var(--color-signal)' }}
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}