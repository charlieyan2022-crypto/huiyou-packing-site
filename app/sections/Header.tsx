"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Moon, Sun, Phone } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { cn } from "@/app/lib/utils";
import siteData from "@/app/data/site-data.json";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScrollActive = () => {
      const sections = siteData.nav.map((n) => n.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive("#" + sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScrollActive);
    return () => window.removeEventListener("scroll", onScrollActive);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-border shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#hero");
          }}
          className="flex items-center gap-3"
        >
          <div className="relative h-9 w-24">
            <Image
              src="/assets/misc/logo_cand1.png"
              alt={siteData.company.shortName}
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {siteData.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(item.href);
              }}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                active === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {active === item.href && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${siteData.contact.phone}`}
            className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/15 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteData.contact.phone}
          </a>
          <button
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted transition-colors"
            aria-label="切换主题"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted transition-colors"
            aria-label="切换主题"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
            aria-label="菜单"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 border-b border-border bg-background/95 backdrop-blur-lg px-4 pb-4 shadow-lg">
          <nav className="flex flex-col gap-1 pt-2">
            {siteData.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  active === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            <a
              href={`tel:${siteData.contact.phone}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              {siteData.contact.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
