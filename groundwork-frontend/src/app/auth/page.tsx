"use client";

import Form from "next/form";
import { useActionState, useState } from "react";
import { authUser, FormState } from "./actions";

const ROLE_OPTIONS = [
  { id: "customer", label: "Customer", value: "customer" },
  { id: "company", label: "Company", value: "company" },
] as const;

const INITIAL_STATE: FormState = {
  error: null,
  isReg: false,
  isLoading: false,
};

export default function AuthPage() {
  const [isReg, setIsReg] = useState(false);
  const [state, formAction, isPending] = useActionState(
    authUser,
    INITIAL_STATE,
  );

  if (state.isReg !== isReg && state.error) {
    setIsReg(state.isReg);
  }

  return (
    <div>
      <div>
        <div>
          <span>Back to home</span>
          <span>
            <button type="button" onClick={() => setIsReg(false)}>
              Log In
            </button>
            |
            <button type="button" onClick={() => setIsReg(true)}>
              Sign Up
            </button>
          </span>
        </div>

        {state?.error && <div>{state.error}</div>}

        <Form action={formAction}>
          <input type="hidden" name="isReg" value={isReg ? "true" : "false"} />

          {isReg && (
            <div>
              {ROLE_OPTIONS.map((opt) => (
                <label key={opt.id}>
                  <input
                    type="radio"
                    name="role"
                    id={opt.id}
                    value={opt.value}
                    defaultChecked={opt.id === "customer"}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          )}

          {isReg ? (
            <>
              <div>
                <input name="name" type="text" placeholder="Name" required />
                {state?.fieldErrors?.name && <p>{state.fieldErrors.name}</p>}
              </div>
              <div>
                <input name="email" type="email" placeholder="Email" required />
                {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                />
                {state?.fieldErrors?.phone && <p>{state.fieldErrors.phone}</p>}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password | Min: 8 characters"
                  required
                  minLength={8}
                />
                {state?.fieldErrors?.password && (
                  <p>{state.fieldErrors.password}</p>
                )}
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                {state?.fieldErrors?.confirmPassword && (
                  <p>{state.fieldErrors.confirmPassword}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <input name="email" type="email" placeholder="Email" required />
                {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                {state?.fieldErrors?.password && (
                  <p>{state.fieldErrors.password}</p>
                )}
              </div>
            </>
          )}

          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : isReg ? "Register" : "Login"}
          </button>
        </Form>
      </div>
    </div>
  );
}
