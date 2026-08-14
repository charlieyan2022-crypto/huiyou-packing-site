"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Printer, Clock, Send } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
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

const contactItems = [
  { icon: Phone, label: "电话", value: siteData.contact.phone, href: `tel:${siteData.contact.phone}` },
  { icon: Mail, label: "邮箱", value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
  { icon: MapPin, label: "地址", value: siteData.contact.address, href: "#" },
  { icon: Printer, label: "传真", value: siteData.contact.fax, href: "#" },
  { icon: Clock, label: "售后", value: "7×24 客服电话", href: "#" },
];

export function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "mx-auto max-w-2xl text-center transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Contact Us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            联系我们
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            无论您需要设备咨询、方案定制还是售后服务，辉侑团队随时为您服务。
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <div
            className={cn(
              "rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-700 lg:col-span-1",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h3 className="text-xl font-semibold text-foreground">联系方式</h3>
            <p className="mt-2 text-sm text-muted-foreground">您可以通过以下方式直接联系到我们</p>
            <div className="mt-8 grid gap-5">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-base font-medium text-foreground">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-700 delay-150 lg:col-span-2",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h3 className="text-xl font-semibold text-foreground">在线留言</h3>
            <p className="mt-2 text-sm text-muted-foreground">填写以下表单，我们将尽快与您取得联系。</p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">您的姓名</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="请输入姓名"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">您的电话</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="请输入联系电话"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">您的邮箱</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="请输入邮箱地址"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">留言内容</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="请描述您的需求或问题"
                  rows={4}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="sm:col-span-2">
                {submitted ? (
                  <div className="rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    留言已提交，我们会尽快与您联系！
                  </div>
                ) : (
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    提交留言
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
