import { NextRequest, NextResponse } from "next/server";
import { WORKER_ORIGIN, serverError } from "@/lib/worker-proxy";

const PAYPAL_HEADER_NAMES = [
  "paypal-auth-algo",
  "paypal-cert-url",
  "paypal-transmission-id",
  "paypal-transmission-sig",
  "paypal-transmission-time",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const target = new URL("/api/billing/paypal/webhook", WORKER_ORIGIN);
    const headers = new Headers();

    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    for (const name of PAYPAL_HEADER_NAMES) {
      const value = request.headers.get(name);
      if (value) {
        headers.set(name, value);
      }
    }

    const workerResponse = await fetch(target.toString(), {
      method: "POST",
      headers,
      body,
      redirect: "manual",
      cache: "no-store",
    });

    const responseBody = await workerResponse.text();
    return new NextResponse(responseBody, {
      status: workerResponse.status,
      headers: {
        "Content-Type": workerResponse.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PayPal webhook proxy error:", error);
    return serverError("Unable to process PayPal webhook.");
  }
}
