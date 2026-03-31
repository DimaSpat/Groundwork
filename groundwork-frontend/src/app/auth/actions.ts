"use server";

export interface User {
  name?: string;
  email: string | null;
  password: string | null;
  phone?: string;
  role: "owner" | "manager" | "worker" | "customer";
  location?: string | null | undefined;
  created_at?: Date;
}
export type FormState = {
  error: string | null;
  role?: User["role"];
  isLoading: boolean;
};

export async function authUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string | null;
  const phone = formData.get("phone") as string | null;
  const role = formData.get("role") as User["role"] | null;
  const location = formData.get("location") as string | null;

  const isRegister =
    !!name && !!confirmPassword && !!phone && !!location && !!role;

  if (isRegister) {
    return handleRegister(
      name,
      email,
      password,
      confirmPassword,
      phone,
      role,
      location,
    );
  } else {
    return handleLogin(email, password);
  }
}

async function handleLogin(
  email: string,
  password: string,
): Promise<FormState> {
  if (!email || email.trim().length === 0) {
    return { error: "Email is required.", isLoading: false };
  } else if (!password || password.trim().length === 0) {
    return { error: "Password is required. ", isLoading: false };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    if (response.ok) {
      return { error: null, isLoading: false };
    } else {
      const result = await response.json();
      return { error: result.message || "Login failed", isLoading: false };
    }
  } catch (error) {
    return {
      error: `Could not connect to server. ${error}`,
      isLoading: false,
    };
  }
}

async function handleRegister(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  phone: string,
  role: User["role"],
  location: string | null,
): Promise<FormState> {
  if (!name || name.trim().length === 0) {
    return { error: "Full name is required.", role, isLoading: false };
  } else if (!email || email.trim().length === 0) {
    return { error: "Email is required.", role, isLoading: false };
  } else if (!password || password.trim().length === 0) {
    return { error: "Password is required.", role, isLoading: false };
  } else if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters long.",
      role,
      isLoading: false,
    };
  } else if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
      role,
      isLoading: false,
    };
  } else if (!phone || phone.trim().length === 0) {
    return {
      error: "Phone number is required.",
      role,
      isLoading: false,
    };
  } else if (
    role === "customer" &&
    (!location || location.trim().length === 0)
  ) {
    return {
      error: "Location is required for customers.",
      role,
      isLoading: false,
    };
  }

  const newUser: User = {
    name,
    email,
    password,
    phone,
    role,
    location: role === "customer" ? location : undefined,
    created_at: new Date(),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      },
    );

    if (response.ok) {
      return { error: null, isLoading: false };
    } else {
      const result = await response.json();
      return {
        error: result.message || "Registration failed",
        role,
        isLoading: false,
      };
    }
  } catch (error) {
    return {
      error: `Could not connect to the server, ${error}`,
      role,
      isLoading: false,
    };
  }
}
