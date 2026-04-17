import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // The middleware sets these headers for authenticated routes
  const userId = request.headers.get("x-user-id");
  const email = request.headers.get("x-user-email");
  const role = request.headers.get("x-user-role");

  if (!userId || !email || !role) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: userId,
    email,
    role,
  });
}
