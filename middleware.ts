// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  const role = userData?.role
  const url = req.nextUrl.pathname

  // Define allowed routes for each role
  const roleRoutes: { [key: string]: string[] } = {
    admin: ['/admin/dashboard', '/admin/franchisees', '/admin/reports', '/admin/settings', '/admin/help', '/admin/search'],
    franchisee: [
      '/franchisee/dashboard',
      '/franchisee/customers',
      '/franchisee/queries',
      '/franchisee/orders',
      '/franchisee/inventory',
      '/franchisee/finance',
      '/franchisee/settings',
      '/franchisee/help',
      '/franchisee/search',
    ],
    collaborator: ['/collaborator/dashboard', '/collaborator/queries', '/collaborator/orders', '/collaborator/help'],
    professional: ['/professional/dashboard', '/professional/queries', '/professional/customers', '/professional/settings', '/professional/help'],
    client: ['/client', '/client/queries', '/client/orders', '/client/settings', '/client/help'],
  }

  // Check if user has access to the requested route
  if (role && !roleRoutes[role].some((route) => url.startsWith(route))) {
    // Redirect to the appropriate dashboard
    return NextResponse.redirect(new URL(roleRoutes[role][0], req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/franchisee/:path*',
    '/collaborator/:path*',
    '/professional/:path*',
    '/client/:path*',
  ],
}