import { Calendar, MapPin, DollarSign, User } from 'lucide-react';

export default function BookingCard({ booking }: { booking: any }) {
  // Map your backend status strings to the specific CSS badge classes provided in your global CSS
  const getBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'REQUESTED': return 'badge badge-requested';
      case 'ACCEPTED': return 'badge badge-accepted';
      case 'DECLINED': return 'badge badge-declined';
      case 'PAID': return 'badge badge-paid';
      case 'IN_PROGRESS': return 'badge badge-in-progress';
      case 'COMPLETED': return 'badge badge-completed';
      case 'CANCELLED': return 'badge badge-cancelled';
      default: return 'badge bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="card p-5 flex flex-col justify-between hover:shadow-raised transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
            ID: {booking.id.slice(0, 8)}...
          </span>
          <span className={getBadgeClass(booking.status)}>
            {booking.status}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1">
          {booking.service?.title || 'Service Repair'}
        </h3>
        
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <User className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="truncate">
            Customer: <span className="font-medium text-foreground">{booking.customer?.name}</span> ({booking.customer?.email})
          </span>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span>Scheduled: {new Date(booking.scheduledAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">Address: {booking.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span>Price: ${booking.service?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}