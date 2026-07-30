import { getTechnician } from "../../_action/getTechnicianData";
import TechnicianProfile from "../../_components/bookings/TechnicianProfile";

export default async function TechnicianPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { id } = await params;

  const { serviceId } = await searchParams;
  console.log(id,"form dynamic page tecnician id")
  console.log(serviceId,"form dynamic page service id")


  const result = await getTechnician(id);
  console.log(result, "result from techincial")

  if (!result.success) {
    return <div>Technician Not Found</div>;
  }

  return <TechnicianProfile data={result.data} selectedServiceId={serviceId} />;
}
