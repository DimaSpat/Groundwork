"use client";

import { useEffect, useState } from "react";

interface UserInfo {
  userId: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
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
      <nav>
        <h1>Dashboard</h1>
        <div>
          <a href="/customer">Customer Area</a>
          <a href="/owner">Owner Area</a>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/auth";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main>
        <div>
          <h2>Welcome to Your Dashboard</h2>
          <p>This is a shared area accessible by both customers and owners.</p>

          <div>
            <div>
              <h3>Recent Activity</h3>
              <p>View your recent actions and updates</p>
            </div>

            <div>
              <h3>Notifications</h3>
              <p>You have 3 new notifications</p>
            </div>

            <div>
              <h3>Quick Actions</h3>
              <p>Access frequently used features</p>
            </div>
          </div>

          <div>
            <p>
              <strong>Access Level:</strong> This page is accessible by both
              Customers and Owners. The middleware validates that the user has
              one of these roles before allowing access.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
