"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, Check, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { Dialog } from "@/app/components/ui/Dialog";
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

const categories = [
  { id: "all", name: "全部产品" },
  ...siteData.industries.map((i) => ({ id: i.id, name: i.name })),
];

export function Products() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof siteData.products[0] | null>(null);

  const filtered = useMemo(() => {
    return siteData.products.filter((p) => {
      const matchesCat = filter === "all" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="products" className="relative py-24 lg:py-32 bg-muted/30">
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
              Products
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              智能灌装生产线产品中心
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              覆盖 IVD、制药等核心场景，提供高精度、高效率的自动化灌装解决方案。
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索产品名称 / 型号..."
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted to-card p-6">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <Badge variant="default">{p.subCategory}</Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs font-medium text-muted-foreground">{p.model}</div>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {p.shortDesc}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5 w-full"
                  onClick={() => setSelected(p)}
                >
                  查看详情
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">未找到相关产品</h3>
            <p className="mt-2 text-muted-foreground">请尝试切换分类或使用其他关键词搜索。</p>
            <Button variant="outline" className="mt-5" onClick={() => { setFilter("all"); setQuery(""); }}>
              清除筛选
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-card p-6">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">型号：{selected.model}</Badge>
                <Badge variant="outline">{selected.subCategory}</Badge>
              </div>
              <p className="mt-4 leading-relaxed text-foreground">{selected.fullDesc}</p>
              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  产品特点
                </h4>
                <ul className="mt-3 grid gap-2">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {selected.specs.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    技术参数
                  </h4>
                  <div className="mt-3 grid gap-2 rounded-xl border border-border bg-muted/50 p-4">
                    {selected.specs.map((s) => (
                      <div key={s.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{s.label}</span>
                        <span className="font-medium text-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => {
                  setSelected(null);
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  咨询此产品
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setSelected(null)}>
                  返回列表
                </Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
