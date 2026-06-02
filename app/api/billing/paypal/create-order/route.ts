import { NextRequest } from "next/server";
import { proxyWorkerRequest, serverError } from "@/lib/worker-proxy";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    return await proxyWorkerRequest(request, "/api/billing/paypal/create-order", {
      method: "POST",
      body
    });
  } catch (error) {
    console.error("PayPal create-order proxy error:", error);
    return serverError("Unable to start PayPal checkout.");
  }
}
