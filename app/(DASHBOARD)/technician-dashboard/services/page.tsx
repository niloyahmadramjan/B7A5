import { getMyServices } from "../_action/my-services";
import MyServicesClient from "../_components/my-services";


export default async function MyServicesPage() {
  const res = await getMyServices();

  if (!res.success) {
    return (
      <div className="w-full p-6 text-center text-red-500 text-xs">
        Failed to load services: {res.message}
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Services Dashboard</h1>
      <MyServicesClient initialServices={res.data} />
    </div>
  );
}