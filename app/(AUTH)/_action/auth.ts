"use server";
import { LoginState, RegisterState } from "@/types/authtype";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

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
    cache: "no-cache",
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();
  // console.log(result);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
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

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
  if(decodedToken.role){
    return{
      success: true,
      message: "Login successful",
      role: decodedToken.role,
    }
  }

  return result
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  // console.log(process.env.BACKEND_API_URL,"from register action")


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ name, email, phone, password, role }),
  });
  if(!res.ok){
    const errorResult = await res.json();
    return {
      success: false,
      statusCode: res.status,
      message: errorResult.message || "Registration failed",
      data: null,
    };
  }

  const result = await res.json();
  
  return result;
};
