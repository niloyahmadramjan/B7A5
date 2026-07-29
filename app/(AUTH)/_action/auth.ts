"use server";
import { LoginState, RegisterState } from "@/types/authtype";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();


    if (result.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

// console.log(decodedToken)
    if (decodedToken.role === "CUSTOMER") {
      redirect("/dashboard");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/admin-dashboard");
    } else if (decodedToken.role === "TECHNICIAN") {
      redirect("/technician-dashboard");
    }
  return result;
};


export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, password }),
  });

  const result = await res.json();
  console.log(result)
  return result;
};
