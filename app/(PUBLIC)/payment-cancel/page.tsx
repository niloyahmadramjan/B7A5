"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/bookings");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0b1620]">
      <XCircle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        You cancelled the payment process. No charges were made.
      </p>
      <p className="text-sm text-gray-500 mt-6 animate-pulse">
        Redirecting to your bookings in 3 seconds...
      </p>
    </div>
  );
}