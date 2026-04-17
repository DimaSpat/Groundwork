"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

export default function CustomerPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div>
          <div>
            <h1>Customer Portal</h1>
            <nav>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/customer">My Account</Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit">Logout</button>
              </form>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <div>
          <div>
            <h2>Welcome, {user?.email || "Customer"}!</h2>
            <p>
              This page is only accessible to customers. Here you can manage
              your profile, view orders, and access customer-specific features.
            </p>
            {user && (
              <div>
                <h3>Your Information</h3>
                <dl>
                  <div>
                    <dt>User ID:</dt>
                    <dd>{user.id}</dd>
                  </div>
                  <div>
                    <dt>Email:</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div>
                    <dt>Role:</dt>
                    <dd>{user.role}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <h3>My Orders</h3>
            <p>View your order history and track deliveries.</p>
            <Link href="/orders">View Orders</Link>
          </div>

          <div>
            <h3>Profile Settings</h3>
            <p>Update your personal information and preferences.</p>
            <Link href="/profile">Edit Profile</Link>
          </div>

          <div>
            <h3>Payment Methods</h3>
            <p>Manage your payment options and billing.</p>
            <button>Manage Payments</button>
          </div>
        </div>
      </main>
    </div>
  );
}
