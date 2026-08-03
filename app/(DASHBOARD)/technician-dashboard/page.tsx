import { getDashboardOverview } from "./_action/dashboardOverview";
import DashboardClient from "./_components/DashboardOverview";


export default async function DashboardPage() {
  const res = await getDashboardOverview();

  if (!res.success || !res.data) {
    return (
      <div className="w-full p-6 text-center text-red-500 text-xs">
        Failed to load dashboard overview data. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
      <DashboardClient overviewData={res.data} />
    </div>
  );
}