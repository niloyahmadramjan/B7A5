"use server";

export async function getTechnician(id:string){

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/technician/info${id}`,
        {
            cache:"no-store"
        }
    );


    if(!res.ok){
        return {
            success:false,
            message:"Technician not found"
        }
    }


    return await res.json();

}