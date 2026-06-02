import { NextRequest } from "next/server";
import { proxyWorkerRequest, serverError } from "@/lib/worker-proxy";

export async function GET(request: NextRequest) {
  try {
    return await proxyWorkerRequest(request, "/api/usage", {
      method: "GET",
    });
  } catch (error) {
    console.error("Usage proxy error:", error);
    return serverError("Unable to fetch usage.");
  }
}
