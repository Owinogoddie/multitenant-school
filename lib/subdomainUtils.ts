
export function getSubdomain(hostname: string): string | null {
    // Remove port if present
    hostname = hostname.split(':')[0];
  
    if (process.env.CODESPACE_NAME && hostname.includes(process.env.CODESPACE_NAME)) {
      // In Codespace, the subdomain is the first part of the hostname
      const parts = hostname.split('-');
      return parts[0] !== process.env.CODESPACE_NAME ? parts[0] : null;
    }
  
    if (hostname.includes('localhost')) {
      // Local development
      const parts = hostname.split('.');
      return parts.length > 1 && parts[0] !== 'www' ? parts[0] : null;
    }
  
    // Production or other environments
    const parts = hostname.split('.');
    if (parts.length > 2) {
      return parts[0] !== 'www' ? parts[0] : null;
    }
  
    return null;
  }
  
  export function getSchoolUrl(subdomain: string): string {
    const env = process.env.NODE_ENV;
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const vercelUrl = process.env.VERCEL_URL;
    const codespaceName = process.env.CODESPACE_NAME;
    const codespaceDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
  
    if (codespaceName && codespaceDomain) {
      // GitHub Codespace
      return `https://${subdomain}-${codespaceName}-3000.${codespaceDomain}`;
    }
  
    if (env === 'development') {
      return `http://${subdomain}.localhost:3000`;
    }
  
    if (vercelUrl) {
      // Vercel preview deployment
      return `https://${subdomain}-${vercelUrl}`;
    }
  
    if (domain) {
      // Production with custom domain
      return `https://${subdomain}.${domain}`;
    }
  
    // Fallback to a placeholder URL
    return `https://${subdomain}.example.com`;
  }