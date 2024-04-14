import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  if (req.nextUrl.pathname.endsWith('/admin/login') && !token) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  const secret = new TextEncoder().encode(process.env.API_KEY)
  try {
    await jose.jwtVerify(token.value, secret)

    if (req.nextUrl.pathname.endsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return NextResponse.next()
  } catch (e) {
    if (req.nextUrl.pathname.endsWith('/admin/login')) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}
