"use client";

import { useEffect, useRef, useState } from "react";
import { Beaker, Pill, Droplets, Apple, Settings2, ArrowUpRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import siteData from "@/app/data/site-data.json";

const iconMap: Record<string, React.ReactNode> = {
  ivd: <Beaker className="h-7 w-7" />,
  pharma: <Pill className="h-7 w-7" />,
  daily: <Droplets className="h-7 w-7" />,
  food: <Apple className="h-7 w-7" />,
  general: <Settings2 className="h-7 w-7" />,
};

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

export function Industries() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="industries" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "mx-auto max-w-2xl text-center transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Industry Solutions
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            多行业自动化解决方案
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            深耕 IVD、制药、日化、食品等领域，提供从单机到整线的一站式智能制造服务。
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.industries.map((ind, i) => (
            <div
              key={ind.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {iconMap[ind.id]}
              </div>
              <h3 className="relative mt-5 text-xl font-semibold text-foreground">
                {ind.name}
              </h3>
              <p className="relative mt-3 text-muted-foreground leading-relaxed">
                {ind.description}
              </p>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                查看相关产品
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
