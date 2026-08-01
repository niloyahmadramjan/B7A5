import { getMe } from "@/service/getMe";
import DashboardSidebar from "../_components/DashboardSidebar";
import DashboardHeader from "../_components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user data server-side
  const userData = await getMe();
  const userRole = userData?.success ? userData.data.role : "CUSTOMER";

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Left Sidebar */}
      <DashboardSidebar role={userRole} />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <DashboardHeader userData={userData} />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}