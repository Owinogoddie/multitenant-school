export function getSchoolUrl(subdomain: string): string {
    const env = process.env.NODE_ENV;
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const vercelUrl = process.env.VERCEL_URL;
    const codespaceName = process.env.CODESPACE_NAME;
    const codespaceDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
  
    console.log('Environment:', env);
    console.log('Codespace Name:', codespaceName);
    console.log('Codespace Domain:', codespaceDomain);
  
    if (codespaceName && codespaceDomain) {
      // GitHub Codespace
      const url = `https://${subdomain}-${codespaceName}-3000.${codespaceDomain}`;
      console.log('Codespace URL:', url);
      return url;
    }
  
    if (env === 'development') {
      const url = `http://${subdomain}.localhost:3000`;
      console.log('Development URL:', url);
      return url;
    }
  
    if (vercelUrl) {
      // Vercel preview deployment
      const url = `https://${subdomain}-${vercelUrl}`;
      console.log('Vercel URL:', url);
      return url;
    }
  
    if (domain) {
      // Production with custom domain
      const url = `https://${subdomain}.${domain}`;
      console.log('Production URL:', url);
      return url;
    }
  
    // Fallback to a placeholder URL
    const fallbackUrl = `https://${subdomain}.example.com`;
    console.log('Fallback URL:', fallbackUrl);
    return fallbackUrl;
  }