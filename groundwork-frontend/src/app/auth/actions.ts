"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface User {
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  role: "owner" | "manager" | "worker" | "customer";
  location?: string | null;
  created_at?: string;
}

export interface FormState {
  error: string | null;
  isReg: boolean;
  isLoading: boolean;
  fieldErrors?: {
    email?: string;
    password?: string;
    name?: string;
    phone?: string;
    confirmPassword?: string;
  };
}

export async function authUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const isReg = formData.get("isReg") === "true";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  const errors: FormState["fieldErrors"] = {};

  if (!email || !email.includes("@")) {
    errors.email = "Valid email is required";
  }
  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (isReg) {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as User["role"];

    if (!name || name.length < 2) errors.name = "Name is required";
    if (!phone || phone.length < 8) errors.phone = "Valid phone is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!role) errors.name = "Role is required";

    if (Object.keys(errors).length > 0) {
      return {
        error: "Please fix the errors below",
        isReg: true,
        isLoading: false,
        fieldErrors: errors,
      };
    }

    return handleRegister({ name, email, password, phone, role });
  } else {
    if (Object.keys(errors).length > 0) {
      return {
        error: "Please fix the errors below",
        isReg: false,
        isLoading: false,
        fieldErrors: errors,
      };
    }
    return handleLogin(email, password);
  }
}

async function handleRegister(
  userData: Omit<User, "created_at">,
): Promise<FormState> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          created_at: new Date().toISOString(),
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || "Registration failed",
        isReg: true,
        isLoading: false,
      };
    }

    if (data.token) {
      await setAuthCookie(data.token);
    }

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return {
      error: "Connection failed. Please try again.",
      isReg: true,
      isLoading: false,
    };
  }
}

async function handleLogin(
  email: string,
  password: string,
): Promise<FormState> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || "Invalid credentials",
        isReg: false,
        isLoading: false,
      };
    }

    if (data.token) {
      await setAuthCookie(data.token);
    }

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT")
      throw error;
    return {
      error: "Connection failed. Please try again.",
      isReg: false,
      isLoading: false,
    };
  }
}

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}
