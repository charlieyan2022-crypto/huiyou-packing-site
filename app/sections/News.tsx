"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
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

export function News() {
  const siteData = useSiteData();
  const ui = siteData.ui;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="news" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {ui.newsEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {ui.newsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {ui.newsSubtitle}
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            {ui.viewAllNews}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {siteData.news.map((item, i) => (
            <article
              key={item.id}
              className={cn(
                "group relative flex gap-5 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Newspaper className="h-8 w-8" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {item.summary}
                </p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-primary hover:underline"
                >
                  {ui.readMore}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline" size="sm">
            {ui.viewAllNews}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
