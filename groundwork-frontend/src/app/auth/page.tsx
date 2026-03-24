"use client";

import Form from "next/form";
import { useActionState, useMemo } from "react";
import { registerUser } from "./actions";

const options = [
  { id: "customer", label: "Customer", value: "customer" },
  { id: "worker", label: "Worker", value: "worker" },
  { id: "manager", label: "Manager", value: "manager" },
  { id: "owner", label: "Owner", value: "owner" },
] as const;

export default function AuthPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: null,
  });

  const roleSelector = useMemo(() => {
    return (
      <div
        className="relative flex w-full bg-secondary items-center h-10
        has-[#worker:checked]:[--slide:100%]
        has-[#manager:checked]:[--slide:200%]
        has-[#owner:checked]:[--slide:300%]"
      >
        {options.map((opt) => (
          <label
            key={opt.id}
            className="relative z-20 flex-1 cursor-pointer text-center text-sm font-medium"
          >
            <input
              type="radio"
              name="role"
              id={opt.id}
              value={opt.value}
              className="peer sr-only"
              defaultChecked={state?.role == opt.id || opt.id === "customer"}
            />
            <span className="text-foreground transition-colors peer-checked:text-secondary">
              {opt.label}
            </span>
          </label>
        ))}
        <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-foreground shadow transition-transform duration-300 ease-in-out z-10 translate-x-(--slide,0%)" />
      </div>
    );
  }, [state?.role]);

  const textInputs = useMemo(() => {
    return (
      <>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          required
          className="border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password | Min: 8 charachters"
          required
          className="border p-2 rounded"
        />
      </>
    );
  }, []);

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="md:w-1/3 md:p-0 p-4 w-full">
        <div className="flex justify-between items-baseline">
          <span className="w-1/2">↖ Back to home</span>
          <span className="w-1/2 text-end">Log in | Register</span>
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm mt-2">{state.error}</div>
        )}

        <Form action={formAction} className="flex flex-col gap-4">
          {roleSelector}
          {textInputs}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
