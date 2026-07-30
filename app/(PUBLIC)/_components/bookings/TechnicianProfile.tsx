"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";

export default function TechnicianProfile({ data, selectedServiceId }: any) {
  const [selectedService, setSelectedService] = useState(
    data.services.find((service: any) => service.id === selectedServiceId) ||
      data.services[0],
  );

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundColor: "var(--color-mist)",
      }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">
          {/* Technician Info */}

          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-steel-200)",
            }}
          >
            <div className="flex gap-5">
              {/* Avatar */}
              <div
                className="
      w-20 h-20 rounded-full 
      bg-gray-200 
      flex items-center justify-center
      text-3xl
      "
              >
                👨‍🔧
              </div>

              <div className="flex-1">
                {/* Name */}
                <h1 className="text-2xl font-bold">
                  {data.user?.name || "Professional Technician"}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-2">
                  <span>⭐ {data.rating || 0}</span>

                  <span className="text-gray-500">
                    ({data.totalReviews || 0} Reviews)
                  </span>
                </div>

                {/* Bio */}
                <p className="text-sm mt-3 text-gray-500">
                  {data.bio ||
                    "Experienced technician providing quality home services."}
                </p>

                {/* Extra Information */}

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-mist)",
                    }}
                  >
                    <p className="text-xs text-gray-500">Experience</p>

                    <p className="font-bold">{data.experience || 0} Years</p>
                  </div>

                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-mist)",
                    }}
                  >
                    <p className="text-xs text-gray-500">Location</p>

                    <p className="font-bold">
                      {data.location || "Not Provided"}
                    </p>
                  </div>
                </div>

                {/* Contact */}

                <div className="mt-4 space-y-1 text-sm">
                  <p>📞 {data.user?.phone || "No phone"}</p>

                  <p>✉️ {data.user?.email || "No email"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}

          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-steel-200)",
            }}
          >
            <h2 className="text-xl font-bold mb-5">Select a Service</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {data.services.map((service: any) => {
                const active = selectedService?.id === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                    }}
                    className={`
                    text-left
                    p-4
                    rounded-xl
                    border
                    transition-all
                    hover:-translate-y-1
                    ${active ? "ring-2 shadow-md" : ""}
                  `}
                    style={{
                      borderColor: active
                        ? "var(--color-signal)"
                        : "var(--color-steel-200)",

                      backgroundColor: active
                        ? "var(--color-mist)"
                        : "var(--color-surface)",
                    }}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-bold">{service.title}</h3>

                      {active && <span>✓</span>}
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {service.description}
                    </p>

                    <div className="flex justify-between mt-4">
                      <span className="font-bold">৳{service.price}</span>

                      <span className="text-sm text-gray-500">
                        {service.duration} min
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reviews */}

          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-steel-200)",
            }}
          >
            <h2 className="font-bold text-xl">Customer Reviews</h2>

            {data.reviews.map((review: any) => (
              <div key={review.id} className="mt-4 border-b pb-4">
                <div>⭐ {review.rating}</div>

                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOOKING */}

        <div>
          <BookingCard technician={data} service={selectedService} />
        </div>
      </div>
    </div>
  );
}
