import Link from "next/link";
import { Wrench, Star, MapPin, ArrowRight, ShieldCheck, User } from "lucide-react";
import { getAllTechnicians } from "../_action/getAllTechnician";

export default async function AllTechniciansPage() {
  const response = await getAllTechnicians();
  
  const technicians = response?.data?.data || response?.data || [];
  const meta = response?.data?.meta || {};

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[var(--color-ink)] my-5">
      {/* Page Header */}
      <div className="card p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-signal)]/10 text-[var(--color-signal)] border border-[var(--color-signal)]/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Professional Experts
          </div>
          <h1 className="text-2xl font-bold">All Technicians</h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">Browse verified technicians, view their services, and book appointments.</p>
        </div>
        <div className="bg-[var(--color-mist)] border border-[var(--color-steel-200)] px-4 py-2 rounded-xl text-xs text-[var(--color-ink-muted)]">
          Total Available: <span className="font-bold text-[var(--color-ink)]">{meta.total || technicians.length}</span>
        </div>
      </div>

      {/* Technicians Grid */}
      {technicians.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicians.map((tech: any) => {
            const services = tech.services || [];
            return (
              <div 
                key={tech.id} 
                className="card p-6 flex flex-col justify-between space-y-6 hover:border-[var(--color-signal)]/50 transition"
              >
                {/* Top Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-[var(--color-mist)] border border-[var(--color-steel-200)] flex items-center justify-center text-[var(--color-navy)] font-bold text-xl shadow-inner">
                        <User className="w-6 h-6 text-[var(--color-signal)]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold">Technician #{tech.id.slice(0, 6)}</h3>
                        <p className="text-xs text-[var(--color-ink-muted)] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-steel)]" /> {tech.location || "Location not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full text-amber-500 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{tech.rating || 0}</span>
                      <span className="text-[var(--color-ink-muted)] text-[10px]">({tech.totalReviews || 0})</span>
                    </div>
                  </div>

                  {/* Bio / Experience */}
                  <div className="space-y-2 text-xs text-[var(--color-ink-muted)]">
                    <p className="italic bg-[var(--color-mist)] p-2.5 rounded-lg border border-[var(--color-steel-200)]">
                      "{tech.bio || "Professional home service technician ready to assist you."}"
                    </p>
                    <div className="flex items-center justify-between px-1">
                      <span>Experience: <strong className="text-[var(--color-ink)]">{tech.experience || 0} Years</strong></span>
                      <span>Services Offered: <strong className="text-[var(--color-ink)]">{services.length}</strong></span>
                    </div>
                  </div>

                  {/* Services Tags Preview */}
                  {services.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[var(--color-steel-200)]">
                      <p className="text-[10px] uppercase font-semibold text-[var(--color-ink-muted)] tracking-wider">Top Services:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {services.slice(0, 2).map((srv: any) => (
                          <span key={srv.id} className="px-2.5 py-1 bg-[var(--color-mist)] border border-[var(--color-steel-200)] text-[var(--color-ink)] text-xs rounded-md font-medium">
                            {srv.title} (${srv.price})
                          </span>
                        ))}
                        {services.length > 2 && (
                          <span className="px-2 py-1 bg-[var(--color-mist)] text-[var(--color-ink-muted)] text-xs rounded-md">
                            +{services.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Link
                  href={`/technicians/${tech.id}?serviceId=${services[0]?.id || ""}`}
                  className="btn-primary w-full py-2.5 text-xs rounded-xl flex items-center justify-center gap-2 group shadow-sm text-center"
                >
                  View Profile & Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card p-12 text-center text-[var(--color-ink-muted)] space-y-2">
          <Wrench className="w-10 h-10 mx-auto text-[var(--color-steel)] animate-pulse" />
          <p className="text-base font-medium text-[var(--color-ink)]">No technicians found</p>
          <p className="text-xs text-[var(--color-ink-muted)]">Please check back later when technicians become available.</p>
        </div>
      )}
    </div>
  );
}