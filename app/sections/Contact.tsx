"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Printer, Clock, Send, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
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

export function Contact() {
  const siteData = useSiteData();
  const ui = siteData.ui;
  const { ref, inView } = useInView<HTMLDivElement>();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactItems = [
    { icon: Phone, label: ui.contactPhone, value: siteData.contact.phone, href: `tel:${siteData.contact.phone}` },
    { icon: Mail, label: ui.contactEmail, value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
    { icon: MapPin, label: ui.contactAddress, value: siteData.contact.address, href: "#" },
    { icon: Printer, label: ui.contactFax, value: siteData.contact.fax, href: "#" },
    { icon: Clock, label: ui.contactAfterSales, value: "24/7", href: "#" },
  ];

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Quote Request from ${form.name || "Website"} (${form.company || ""})`;
    const body =
      `Name: ${form.name}\n` +
      `Company: ${form.company}\n` +
      `Email: ${form.email}\n` +
      `Phone / WhatsApp: ${form.phone}\n` +
      `Country / Region: ${form.country}\n` +
      `Product of Interest: ${form.product}\n\n` +
      `Message:\n${form.message}\n`;
    const mailto = `mailto:${siteData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
            {ui.contactEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {ui.contactTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {ui.contactSubtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <div
            className={cn(
              "rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-700 lg:col-span-1",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h3 className="text-xl font-semibold text-foreground">{ui.contactInfo}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{ui.contactInfoHint}</p>
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
            <h3 className="text-xl font-semibold text-foreground">{ui.contactFormTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{ui.contactFormHint}</p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{ui.yourName}</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={ui.namePlaceholder}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{ui.yourCompany}</label>
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder={ui.companyPlaceholder}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{ui.yourEmail}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={ui.emailPlaceholder}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{ui.yourPhone}</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder={ui.phonePlaceholder}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{ui.yourCountry}</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder={ui.countryPlaceholder}
                    className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{ui.productInterest}</label>
                <select
                  value={form.product}
                  onChange={(e) => update("product", e.target.value)}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">—</option>
                  {siteData.products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">{ui.yourMessage}</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder={ui.messagePlaceholder}
                  rows={4}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="sm:col-span-2">
                {submitted ? (
                  <div className="rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    {ui.formSuccess}
                  </div>
                ) : (
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    {ui.submitMessage}
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
