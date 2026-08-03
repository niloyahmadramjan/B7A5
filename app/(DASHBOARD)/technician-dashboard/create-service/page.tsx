import ServicesClient from "../_components/ServicesClient";


export default function ServicesPage() {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Services & Categories</h1>
      <ServicesClient />
    </div>
  );
}