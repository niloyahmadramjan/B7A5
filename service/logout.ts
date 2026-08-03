"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/dist/client/components/navigation";
import { cookies } from "next/headers";

export const userLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  revalidateTag("getMe","max");
  redirect("/login");
};
