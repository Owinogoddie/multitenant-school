// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { lucia } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'

// export async function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone()
//   const hostname = request.headers.get('host') || ''
//   const path = url.pathname
//   const subdomain = hostname.split('.')[0]

//   // Check if it's the main domain
//   if (hostname === process.env.NEXT_PUBLIC_DOMAIN || hostname.startsWith('www.')) {
//     // Allow access to main site pages
//     if (path === '/' || path === '/login' || path === '/register') {
//       return NextResponse.next()
//     }
//     // Redirect other paths to home page
//     url.pathname = '/'
//     return NextResponse.redirect(url)
//   }

//   // Handle subdomains
//   const school = await prisma.school.findUnique({
//     where: { domain: subdomain },
//     include: { users: true, subscription: true },
//   })

//   if (!school) {
//     // If subdomain doesn't exist, redirect to main site
//     url.hostname = process.env.NEXT_PUBLIC_DOMAIN
//     url.pathname = '/'
//     return NextResponse.redirect(url)
//   }

//   // Rewrite the URL to include the subdomain as a parameter
//   url.pathname = `/${subdomain}${url.pathname}`
  
//   // Check subscription status
//   const isSubscriptionActive = school.subscription &&
//     school.subscription.status === 'ACTIVE' &&
//     new Date(school.subscription.endDate) > new Date()

//   if (!isSubscriptionActive && path !== '/subscription') {
//     url.pathname = `/${subdomain}/subscription`
//     return NextResponse.rewrite(url)
//   }

//   // Handle authentication
//   const sessionId = request.cookies.get(lucia.sessionCookieName)?.value
//   if (!sessionId) {
//     // If not logged in, redirect to school's login page
//     if (path !== '/login') {
//       url.pathname = `/${subdomain}/login`
//       return NextResponse.rewrite(url)
//     }
//     return NextResponse.next()
//   }

//   try {
//     const { user } = await lucia.validateSession(sessionId)
//     if (user.schoolId !== school.id) {
//       // If user doesn't belong to this school, logout and redirect to login
//       await lucia.invalidateSession(sessionId)
//       request.cookies.delete(lucia.sessionCookieName)
//       url.pathname = `/${subdomain}/login`
//       return NextResponse.rewrite(url)
//     }
//   } catch {
//     // Invalid session, redirect to login
//     url.pathname = `/${subdomain}/login`
//     return NextResponse.rewrite(url)
//   }

//   // Allow access to authenticated routes
//   return NextResponse.rewrite(url)
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }