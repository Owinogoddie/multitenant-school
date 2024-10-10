import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { lucia } from '@/lib/auth'
import prisma from '@/lib/prisma'

// List of paths that don't require authentication
const unauthenticatedPaths = ['/', '/login', '/register', '/about', '/contact', '/tests']

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host') || ''
    const path = url.pathname

    // Extract subdomain
    const subdomain = getSubdomain(hostname)

    // Check if it's the main domain
    if (isMainDomain(hostname)) {
        // Allow access to main site pages
        if (unauthenticatedPaths.includes(path)) {
            return NextResponse.next()
        }
        // Redirect other paths to home page
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // Handle subdomains
    return handleSubdomain(subdomain, url, path, request)
}

function getSubdomain(hostname: string): string {
    const parts = hostname.split('.')
    if (parts.length > 2) {
        return parts[0]
    }
    // For localhost, use the first part before ':'
    return hostname.split(':')[0]
}

function isMainDomain(hostname: string): boolean {
    return hostname === process.env.NEXT_PUBLIC_DOMAIN ||
        hostname.startsWith('www.') ||
        hostname === 'localhost' ||
        hostname.includes('github.dev') ||
        hostname.includes('vercel.app')
}

async function handleSubdomain(subdomain: string, url: URL, path: string, request: NextRequest) {
    const school = await prisma.school.findUnique({
        where: { subdomain: subdomain },
        include: { users: true, subscription: true },
    })

    if (!school) {
        // If subdomain doesn't exist, redirect to main site
        const mainDomain = process.env.NEXT_PUBLIC_DOMAIN
        if (mainDomain) {
            url.hostname = mainDomain
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
        // If NEXT_PUBLIC_DOMAIN is not set, just go to the homepage
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // Rewrite the URL to include the subdomain as a parameter
    url.pathname = `/${subdomain}${url.pathname}`

    // Check subscription status
    const isSubscriptionActive = school.subscription &&
        school.subscription.status === 'ACTIVE' &&
        new Date(school.subscription.endDate) > new Date()

    if (!isSubscriptionActive && path !== '/subscription') {
        url.pathname = `/${subdomain}/subscription`
        return NextResponse.rewrite(url)
    }

    // Allow access to unauthenticated paths
    if (unauthenticatedPaths.includes(path)) {
        return NextResponse.rewrite(url)
    }

    // Handle authentication
    const sessionId = request.cookies.get(lucia.sessionCookieName)?.value
    if (!sessionId) {
        // If not logged in, redirect to school's login page
        if (path !== '/login') {
            url.pathname = `/${subdomain}/login`
            return NextResponse.rewrite(url)
        }
        return NextResponse.next()
    }

    try {
        const { user } = await lucia.validateSession(sessionId)
        if (user && user.schoolId !== school.id) {
            // If user doesn't belong to this school, logout and redirect to login
            await lucia.invalidateSession(sessionId)
            request.cookies.delete(lucia.sessionCookieName)
            url.pathname = `/${subdomain}/login`
            return NextResponse.rewrite(url)
        }
    } catch {
        // Invalid session, redirect to login
        url.pathname = `/${subdomain}/login`
        return NextResponse.rewrite(url)
    }

    // Allow access to authenticated routes
    return NextResponse.rewrite(url)
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}