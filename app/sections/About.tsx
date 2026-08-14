"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Target, Lightbulb, Users, Award } from "lucide-react";
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

const iconMap: Record<string, React.ReactNode> = {
  "经营理念": <Target className="h-6 w-6" />,
  "企业精神": <Lightbulb className="h-6 w-6" />,
  "企业愿景": <Award className="h-6 w-6" />,
  "企业使命": <Users className="h-6 w-6" />,
};

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div
            ref={ref}
            className={cn(
              "relative transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <Image
                src="/assets/misc/banner2.jpg"
                alt="辉侑自动化展会现场"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-xl glass p-4 text-white">
                  <div className="text-xs opacity-80">HuiYou Automation</div>
                  <div className="text-lg font-semibold">致力于成为中国检验医学领域星级服务供应商</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 hidden h-40 w-40 rounded-2xl border border-border bg-card p-4 shadow-xl lg:block">
              <div className="text-4xl font-bold text-primary">{siteData.company.established}</div>
              <div className="mt-1 text-sm text-muted-foreground">年成立于上海</div>
              <div className="mt-3 text-xs text-muted-foreground">专注自动化生产线研发与制造</div>
            </div>
          </div>

          <div className={cn(
            "transition-all duration-700 delay-150",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              About Us
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {siteData.company.name}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {siteData.company.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {siteData.company.values.map((v, i) => (
                <div
                  key={v.title}
                  className={cn(
                    "rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:shadow-lg",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: `${250 + i * 100}ms` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {iconMap[v.title]}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
