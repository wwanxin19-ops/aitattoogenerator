import { NextRequest } from "next/server";
import { proxyWorkerRequest, serverError } from "@/lib/worker-proxy";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    return await proxyWorkerRequest(request, "/api/contact", {
      method: "POST",
      body
    });
  } catch (error) {
    console.error("Contact worker proxy error:", error);
    return serverError("Unable to send contact message.");
  }
}
