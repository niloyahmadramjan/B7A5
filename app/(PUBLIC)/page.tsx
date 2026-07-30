"use client";

import AboutSection from "./_components/home/AboutSection";
import FeaturedServices from "./_components/home/FeaturedServices";
import HeroSection from "./_components/home/HeroSection";
import WhyChooseUs from "./_components/home/WhyChooseUs";


export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Services Grid */}
      <FeaturedServices />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Why Choose Us Section */}
      <WhyChooseUs />
    </main>
  );
}