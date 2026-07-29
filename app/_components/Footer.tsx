import Image from "next/image";
import Link from "next/link";

export default function FooterPage() {
  return (
    <footer
      className="text-white pt-16 pb-8 border-t bg-black"
      style={{
      
        borderColor: "var(--color-navy-700)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-40 h-10">
                <Image
                  src="/logo-navbar.svg"
                  alt="FixItNow Logo"
                  fill

                  sizes="200px"
                  className="object-contain"
                />
              </div>
              {/* <span
                className="text-2xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                FixIt<span style={{ color: "var(--color-signal)" }}>Now</span>
              </span> */}
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your trusted home service marketplace. Easily book verified local
              technicians for electrical work, plumbing, AC repair, home
              inspections, and more.
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Verified Technicians
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                Instant Scheduling
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3
              className="text-white text-base font-bold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/technicians"
                  className="hover:text-white transition-colors"
                >
                  Top Technicians
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register?role=TECHNICIAN"
                  className="hover:text-white transition-colors"
                >
                  Become a Technician
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="space-y-3">
            <h3
              className="text-white text-base font-bold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Popular Services
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Electrical Inspection</li>
              <li>Plumbing Repairs</li>
              <li>AC Servicing & Cleaning</li>
              <li>Appliance Installation</li>
              <li>Full House Wiring</li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h3
              className="text-white text-base font-bold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@fixitnow.com
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +880 1812-345678
              </li>
              <li>Mon - Sat: 8:00 AM - 10:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
