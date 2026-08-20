"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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

export function FAQ() {
  const siteData = useSiteData();
  const ui = siteData.ui;
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="faq" className="relative border-t border-border bg-primary/5 py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-50" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={ref}
          className={cn(
            "mx-auto max-w-2xl text-center transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {ui.faqEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {ui.faqTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{ui.faqSubtitle}</p>
        </div>

        <div className="mt-12 space-y-4">
          {siteData.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground">{f.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
