"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // ৩ সেকেন্ড (৩০০০ মিলি-সেকেন্ড) পর রিডাইরেক্ট করবে
    const timer = setTimeout(() => {
      router.push("/dashboard/bookings");
    }, 3000);

    // কম্পোনেন্ট আনমাউন্ট হলে টাইমার ক্লিয়ার করা
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0b1620]">
      <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Thank you for your payment. Your booking is confirmed.
      </p>
      <p className="text-sm text-gray-500 mt-6 animate-pulse">
        Redirecting to your bookings in 3 seconds...
      </p>
    </div>
  );
}