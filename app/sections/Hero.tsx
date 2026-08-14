"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/app/lib/utils";
import siteData from "@/app/data/site-data.json";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= value) {
          clearInterval(id);
          return value;
        }
        return c + Math.max(1, Math.floor((value - c) / 10));
      });
    }, 40);
    return () => clearInterval(id);
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const AUTOPLAY_MS = 5000;

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = siteData.heroSlides as Array<{
    tag: string;
    title: string;
    desc: string;
    image: string;
    link: string;
  }>;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const go = (i: number) => setActive(((i % slides.length) + slides.length) % slides.length);

  return (
    <>
      {/* 顶部全宽轮播 banner */}
      <section
        id="hero"
        className="relative h-[88vh] min-h-[560px] w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              i === active ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* 左右切换箭头 */}
        <button
          aria-label="上一张"
          onClick={() => go(active - 1)}
          className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-black/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="下一张"
          onClick={() => go(active + 1)}
          className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-black/40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* 圆点指示器 */}
        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`切换到第 ${i + 1} 组`}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-8 bg-accent"
                  : "w-2 bg-white/50 hover:bg-white"
              )}
            />
          ))}
        </div>

        {/* 自动播放进度条 */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-white/10">
          <div
            key={active}
            className="h-full origin-left bg-accent animate-slide-progress"
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>
      </section>

      {/* 数据条带 */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {siteData.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-foreground sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
