
import { 
  Users, 
  UserCheck, 
  Wrench, 
  CalendarDays, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  ShieldAlert,
  CalendarCheck
} from 'lucide-react';
import { getAdminOverview } from './_action/overview';

export default async function AdminDashboardOverviewPage() {
  const response = await getAdminOverview();
  const overviewData = response?.data;

  if (!overviewData) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-muted-foreground py-24">
        Failed to load dashboard overview. Please try again later.
      </div>
    );
  }

  const { admin, overview } = overviewData;

  return (
    <div className="p-8 max-w-full mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-linear-to-r from-card to-muted/30">
        <div>
          <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
            Role: {admin.role}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
            Welcome back, {admin.name}!
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here is what is happening across your platform today.
          </p>
        </div>
        <div className="text-xs font-mono bg-background px-4 py-2 rounded-md border border-border text-muted-foreground">
          Email: <span className="text-foreground font-medium">{admin.email}</span>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{overview.users.total}</h3>
            <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
              <span>Cust: <strong className="text-foreground">{overview.users.customers}</strong></span>
              <span>•</span>
              <span>Tech: <strong className="text-foreground">{overview.users.technicians}</strong></span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{overview.bookings.total}</h3>
            <p className="text-xs text-muted-foreground mt-2">
              This Month: <strong className="text-foreground">{overview.bookings.thisMonth}</strong>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">${overview.revenue.total.toLocaleString()}</h3>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium flex items-center gap-1">
              <span>Verified Earnings</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Today Bookings */}
        <div className="card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bookings Today</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{overview.bookings.today}</h3>
            <p className="text-xs text-muted-foreground mt-2">
              Pending Action: <strong className="text-foreground">{overview.bookings.pending}</strong>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Booking Status Breakdown Section */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Booking Status Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Paid */}
          <div className=" border border-border p-4 rounded-lg flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mb-2">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Paid</span>
            <span className="text-xl font-bold text-foreground mt-1">{overview.bookings.paid}</span>
          </div>

          {/* Accepted */}
          <div className=" border border-border p-4 rounded-lg flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 flex items-center justify-center mb-2">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Accepted</span>
            <span className="text-xl font-bold text-foreground mt-1">{overview.bookings.accepted}</span>
          </div>

          {/* In Progress */}
          <div className=" border border-border p-4 rounded-lg flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center justify-center mb-2">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">In Progress</span>
            <span className="text-xl font-bold text-foreground mt-1">{overview.bookings.inProgress}</span>
          </div>

          {/* Completed */}
          <div className=" border border-border p-4 rounded-lg flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Completed</span>
            <span className="text-xl font-bold text-foreground mt-1">{overview.bookings.completed}</span>
          </div>

          {/* Cancelled */}
          <div className=" border border-border p-4 rounded-lg flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center mb-2">
              <XCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Cancelled</span>
            <span className="text-xl font-bold text-foreground mt-1">{overview.bookings.cancelled}</span>
          </div>

          {/* Pending */}
          <div className="border border-border p-4 rounded-lg flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Pending</span>
            <span className="text-xl font-bold text-foreground mt-1">{overview.bookings.pending}</span>
          </div>

        </div>
      </div>
    </div>
  );
}