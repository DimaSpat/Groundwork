"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  id: string;
  email: string;
  role: string;
}

export default function OwnerPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Owner Dashboard</h1>
        <nav>
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>
          <button onClick={() => router.push("/auth")}>Logout</button>
        </nav>
      </header>

      <main>
        <section>
          <h2>Stats</h2>
          <div>
            <div>
              <h3>Total Revenue</h3>
              <p>$24,500</p>
              <p>+12% from last month</p>
            </div>

            <div>
              <h3>Active Jobs</h3>
              <p>18</p>
              <p>5 pending approval</p>
            </div>

            <div>
              <h3>Team Members</h3>
              <p>12</p>
              <p>3 managers, 9 workers</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Quick Actions</h2>
          <div>
            <button>+ Create New Job</button>
            <button>+ Add Team Member</button>
            <button>View Reports</button>
            <button>Manage Settings</button>
          </div>
        </section>

        <section>
          <h2>Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kitchen Renovation</td>
                <td>In Progress</td>
                <td>John Smith</td>
                <td>Dec 15, 2024</td>
              </tr>
              <tr>
                <td>Bathroom Remodel</td>
                <td>Pending</td>
                <td>Unassigned</td>
                <td>Dec 18, 2024</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
