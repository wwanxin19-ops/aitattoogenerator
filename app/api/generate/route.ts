import { NextRequest } from "next/server";
import { proxyWorkerRequest, serverError } from "@/lib/worker-proxy";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    return await proxyWorkerRequest(request, "/api/generate", {
      method: "POST",
      body,
    });
  } catch (error) {
    console.error("Generate proxy error:", error);
    return serverError("Unable to start generation.");
  }
}
