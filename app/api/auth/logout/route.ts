import { NextResponse } from "next/server";

export async function POST() {
  try {
    await fetch("https://aitattoogenerator.cc/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
  return NextResponse.json({ success: true });
}
