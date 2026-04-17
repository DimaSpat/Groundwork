"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div>
      <div>
        <div>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1>Access Denied</h1>

        <p>
          You don&apos;t have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>

        <div>
          <Link href="/dashboard">Go to Dashboard</Link>

          <Link href="/auth">Back to Login</Link>
        </div>

        <div>
          <h2>Available Pages:</h2>
          <ul>
            <li>
              <strong>Customers:</strong>{" "}
              <Link href="/customer">/customer</Link>
            </li>
            <li>
              <strong>Owners:</strong> <Link href="/owner">/owner</Link>
            </li>
            <li>
              <strong>Both:</strong> <Link href="/dashboard">/dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
