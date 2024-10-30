"use client";

import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const navigation = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/features" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

interface NavBarProps {
    scroll?: boolean;
    large?: boolean;
  }

  export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scrolled ? "border-b" : "bg-transparent"
      }`}
    >
      <MaxWidthWrapper className="flex h-14 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1.5">
            <Icons.logo />
            <span className="font-urban text-xl font-bold">Your Brand</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/contact">
            <Button
              className="gap-2 px-5 rounded-full"
              variant="default"
              size="sm"
            >
              Get Started
              <Icons.arrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}