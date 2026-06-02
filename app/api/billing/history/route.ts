import { NextRequest } from "next/server";
import { proxyWorkerRequest, serverError } from "@/lib/worker-proxy";

export async function GET(request: NextRequest) {
  try {
    return await proxyWorkerRequest(request, "/api/billing/history", {
      method: "GET"
    });
  } catch (error) {
    console.error("Billing history proxy error:", error);
    return serverError("Unable to load billing history.");
  }
}
