"use server";

export async function getTechnician(id: string) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician/info/${id}`,
    {
      cache: "no-store",
    },
  );
//   console.log(res)

  if (!res.ok) {
    return {
      success: false,
      message: "Technician not found",
    };
  }
  const result = await res.json();
//   console.log(result)
  return result 
}
