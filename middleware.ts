import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that don't require authentication
const unauthenticatedPaths = ['/', '/login', '/register', '/about', '/contact', '/tests', '/dashboard']
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const hostname = request.headers.get('host') || ''
    const path = url.pathname
  
    console.log(`Middleware triggered for hostname: ${hostname}, path: ${path}`);
  
    let subdomain: string | null = null;
  
    // Check if it's a GitHub Codespace
    if (process.env.CODESPACE_NAME) {
      console.log('GitHub Codespace detected');
      const hostParts = hostname.split('-');
      if (hostParts.length > 3) {
        subdomain = hostParts[0];
      }
    }
    // Check if it's localhost
    else if (hostname.includes('localhost')) {
      console.log('Localhost detected');
      const parts = hostname.split('.');
      if (parts.length > 1) {
        subdomain = parts[0];
      }
    }
    // For other environments (production, staging, etc.)
    else {
      subdomain = getSubdomain(hostname);
    }
  
    console.log(`Extracted subdomain: ${subdomain}`);
  
    // Check if it's the main domain
    if (isMainDomain(hostname)) {
      console.log('Main domain detected');
      // Allow access to main site pages
      if (unauthenticatedPaths.includes(path)) {
        return NextResponse.next()
      }
      // Redirect other paths to home page
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  
    if (subdomain) {
      // Rewrite the URL to include the subdomain as a parameter
      const newPathname = `/${subdomain}${url.pathname}`
      console.log(`Rewriting path to: ${newPathname}`);
      url.pathname = newPathname
    }
  
    // Allow access to unauthenticated paths
    if (unauthenticatedPaths.includes(path)) {
      return NextResponse.rewrite(url)
    }
  
    // For authenticated paths, we'll just rewrite the URL and let the page handle authentication
    return NextResponse.rewrite(url)
  }
  
  // Helper function to extract subdomain
  function getSubdomain(hostname: string): string {
    const parts = hostname.split('.')
    if (parts.length > 2) {
      return parts[0]
    }
    return 'www' // Default to 'www' if no subdomain is found
  }
  
  // Helper function to check if it's the main domain
  function isMainDomain(hostname: string): boolean {
    return hostname === process.env.NEXT_PUBLIC_DOMAIN || 
           hostname.startsWith('www.') || 
           hostname.includes('vercel.app')
  }
  
  // Configuration for the middleware
  export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }