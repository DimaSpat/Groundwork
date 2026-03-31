"use client";

import Form from "next/form";
import { useActionState, useEffect, useMemo, useState } from "react";
import { authUser } from "./actions";

const options = [
  { id: "customer", label: "Customer", value: "customer" },
  { id: "worker", label: "Worker", value: "worker" },
  { id: "manager", label: "Manager", value: "manager" },
  { id: "owner", label: "Owner", value: "owner" },
] as const;

export default function AuthPage() {
  const [state, formAction] = useActionState(authUser, {
    error: null,
    isLoading: false,
  });
  const [isReg, setIsReg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="md:w-1/3 md:p-0 p-4 w-full">
        <div className="flex justify-between items-baseline">
          <span className="w-1/2">↖ Back to home</span>
          <span className="w-1/2 text-end">
            <button
              onClick={() => setIsReg(false)}
              className={isReg ? "text-foreground cursor-pointer" : ""}
            >
              Log In
            </button>
            |
            <button
              onClick={() => setIsReg(true)}
              className={!isReg ? "text-foreground cursor-pointer" : ""}
            >
              Sign Up
            </button>
          </span>
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm mt-2">{state.error}</div>
        )}

        <Form
          action={() => {
            setIsLoading(true);
            formAction;
          }}
          className="flex flex-col gap-4"
        >
          {isReg ? (
            <>
              {roleSelector}
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
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                className="border p-2 rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Password | Min: 8 characters"
                required
                className="border p-2 rounded"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                className="border p-2 rounded"
              />
              <input
                name="location"
                type="text"
                placeholder="Location"
                className="border p-2 rounded"
              />
            </>
          ) : (
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
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setIsLoading(true)}
          >
            {isLoading ? "Loading ..." : isReg ? "Register" : "Login"}
          </button>
        </Form>
      </div>
    </div>
  );
}
