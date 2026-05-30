import { NextRequest, NextResponse } from "next/server";

const WORKER_URL = "https://aitattoogenerator.wwanxin19.workers.dev";

async function proxyToWorker(request: NextRequest, path: string): Promise<Response> {
  const url = new URL(request.url);
  const targetUrl = `${WORKER_URL}/api/${path}${url.search}`;
  
  // 复制请求头
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("host", "aitattoogenerator.wwanxin19.workers.dev");
  
  // 复制 cookie
  const cookie = request.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie);
  }
  
  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method !== "GET" && request.method !== "HEAD" 
      ? await request.text() 
      : undefined,
  });
  
  // 复制响应头
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("set-cookie");
  
  // 复制 set-cookie（可能有多个）
  const setCookie = response.headers.getSetCookie?.() || [];
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, { params }: { params: { path?: string[] } }) {
  const path = params.path?.join("/") || "";
  return proxyToWorker(request, path);
}

export async function POST(request: NextRequest, { params }: { params: { path?: string[] } }) {
  const path = params.path?.join("/") || "";
  return proxyToWorker(request, path);
}

export async function PUT(request: NextRequest, { params }: { params: { path?: string[] } }) {
  const path = params.path?.join("/") || "";
  return proxyToWorker(request, path);
}

export async function DELETE(request: NextRequest, { params }: { params: { path?: string[] } }) {
  const path = params.path?.join("/") || "";
  return proxyToWorker(request, path);
}

export async function OPTIONS(request: NextRequest, { params }: { params: { path?: string[] } }) {
  const path = params.path?.join("/") || "";
  return proxyToWorker(request, path);
}
