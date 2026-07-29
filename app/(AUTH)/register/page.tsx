"use client";

import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {

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
            Create an Account
          </h2>
          <p style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
            Register to get started today
          </p>
        </div>

        {/* Form using the action attribute */}
      <RegisterForm/>

        <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="font-bold hover:underline focus:outline-none"
            style={{ color: 'var(--color-signal)' }}
          >
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
}