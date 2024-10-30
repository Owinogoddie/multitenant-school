import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";
export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    mailSupport: string;
    links: {
      twitter: string;
      github: string;
    };
  };
  
  export type NavItem = {
    title: string;
    href: string;
    badge?: number;
    disabled?: boolean;
    external?: boolean;
    authorizeOnly?: any;
    icon?: keyof typeof Icons;
  };
  
  export type MainNavItem = NavItem;
  
  export type MarketingConfig = {
    mainNav: MainNavItem[];
  };
  
  export type SidebarNavItem = {
    title: string;
    items: NavItem[];
    authorizeOnly?: any;
    icon?: keyof typeof Icons;
  };

const site_url = "site-url";

export const siteConfig: SiteConfig = {
  name: "SaaS Starter",
  description:
    "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@saas-starter.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
