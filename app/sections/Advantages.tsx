"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Wrench, Headphones, ShieldCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";
import siteData from "@/app/data/site-data.json";

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

const icons = [Cpu, Wrench, Headphones, ShieldCheck];

export function Advantages() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative border-y border-border bg-primary/5 py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-50" />
      <div className="absolute left-1/2 top-0 h-[1px] w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={ref}
          className={cn(
            "mx-auto max-w-2xl text-center transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why HuiYou
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            选择辉侑的四大理由
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.advantages.map((a, i) => {
            const Icon = icons[i] || Cpu;
            return (
              <div
                key={a.title}
                className={cn(
                  "group relative rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
