import { ServiceItem } from "@/types/service";
import { getPublicServices } from "./_action/getServices";
import AboutSection from "./_components/home/AboutSection";
import FeaturedServices from "./_components/home/FeaturedServices";
import HeroSection from "./_components/home/HeroSection";
import WhyChooseUs from "./_components/home/WhyChooseUs";

export default async function HomePage() {
  const result = await getPublicServices({});
  const data  = result.data.data
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Services Grid */}
      <FeaturedServices data={data} />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Why Choose Us Section */}
      <WhyChooseUs />
    </main>
  );
}
