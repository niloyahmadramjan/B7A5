import { getMe } from "@/service/getMe";
import DashboardLayoutContent from "./_components/DashboardLaout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getMe();

  return (
    <DashboardLayoutContent userData={userData}>
      {children}
    </DashboardLayoutContent>
  );
}