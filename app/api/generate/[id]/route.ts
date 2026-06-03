import { NextRequest } from "next/server";
import { proxyWorkerRequest, serverError } from "@/lib/worker-proxy";

export const runtime = 'edge';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    return await proxyWorkerRequest(request, `/api/generate/${encodeURIComponent(id)}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Generate poll proxy error:", error);
    return serverError("Unable to fetch generation status.");
  }
}
