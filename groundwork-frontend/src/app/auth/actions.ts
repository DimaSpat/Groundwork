"use server";

export interface NewUser {
  email: string | null;
  password: string | null;
  role: "owner" | "manager" | "worker" | "customer";
  created_at: Date;
}

export type FormState = {
  error: string | null;
  role?: NewUser["role"];
};

export async function registerUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as NewUser["role"];

  if (password && password.length < 8) {
    return { error: "Password must be at least 8 characters long.", role };
  }

  const newUser: NewUser = {
    email: email,
    password: password,
    role: role,
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

    if (!response.ok) {
      const result = await response.json();
      return {
        error: result.message || "Registration failed",
        role,
      };
    }

    return { error: null };
  } catch (error) {
    return { error: `Could not connect to the server. ${error}`, role };
  }
}
