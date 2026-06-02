import { NextRequest, NextResponse } from "next/server";

export const WORKER_ORIGIN = "https://aitattoogenerator.wwanxin19.workers.dev";

function copyResponseHeaders(headers: Headers) {
  const forwarded = new Headers();
  const allowed = ["content-type", "cache-control"];

  for (const name of allowed) {
    const value = headers.get(name);
    if (value) {
      forwarded.set(name, value);
    }
  }

  return forwarded;
}

export async function proxyWorkerRequest(
  request: NextRequest,
  workerPath: string,
  init: RequestInit = {}
) {
  const target = new URL(workerPath, WORKER_ORIGIN);
  target.search = request.nextUrl.search;

  const headers = new Headers(init.headers);
  const cookie = request.headers.get("cookie");
  if (cookie) {
    headers.set("Cookie", cookie);
  }

  const contentType = request.headers.get("content-type");
  if (contentType && !headers.has("Content-Type")) {
    headers.set("Content-Type", contentType);
  }

  const workerResponse = await fetch(target.toString(), {
    ...init,
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  const body = await workerResponse.text();

  return new NextResponse(body, {
    status: workerResponse.status,
    headers: copyResponseHeaders(workerResponse.headers),
  });
}

export function serverError(message = "Unable to reach backend.") {
  return NextResponse.json(
    { success: false, error: { code: "SERVER_ERROR", message } },
    { status: 500 }
  );
}
