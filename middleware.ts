import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // `/` や `/article/...` などのとき `ja` をデフォルトにする
  if (!pathname.startsWith("/en") && !pathname.startsWith("/ja")) {
    return NextResponse.rewrite(new URL(`/ja${pathname}`, request.url));
  }

  return NextResponse.next();
}

// `/` や `/article/...` に適用する
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // `api` や `/_next/` などは除外
};
