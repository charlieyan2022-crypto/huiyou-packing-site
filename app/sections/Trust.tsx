"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Globe2, BadgeCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useSiteData } from "@/app/i18n";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const certIcons = [Award, Globe2, BadgeCheck, ShieldCheck];

export function Trust() {
  const siteData = useSiteData();
  const ui = siteData.ui;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="trust" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "mx-auto max-w-2xl text-center transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {ui.trustEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {ui.trustTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{ui.trustSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Globe2 className="h-7 w-7" />
            </div>
            <div className="mt-4 text-4xl font-bold text-primary">{siteData.globals.countries}</div>
            <div className="mt-1 text-sm text-muted-foreground">{ui.globalCountries}</div>
          </div>
          <div
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Award className="h-7 w-7" />
            </div>
            <div className="mt-4 text-4xl font-bold text-primary">{siteData.globals.since}</div>
            <div className="mt-1 text-sm text-muted-foreground">{ui.globalSince}</div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.certifications.map((c, i) => {
            const Icon = certIcons[i] || BadgeCheck;
            return (
              <div
                key={c.name}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
