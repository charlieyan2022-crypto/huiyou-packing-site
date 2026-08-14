import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import siteData from "@/app/data/site-data.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="relative h-10 w-28">
              <Image
                src="/assets/misc/logo_cand1.png"
                alt={siteData.company.shortName}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteData.company.subSlogan}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">快速导航</h4>
            <ul className="mt-4 space-y-2">
              {siteData.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">核心产品</h4>
            <ul className="mt-4 space-y-2">
              {siteData.products.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <a
                    href="#products"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">联系方式</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {siteData.contact.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {siteData.contact.email}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {siteData.contact.address}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Copyright © 2014-2025 HuiYou Automation Co., Ltd. All rights reserved.</p>
          <p className="mt-1">{siteData.contact.icp}</p>
        </div>
      </div>
    </footer>
  );
}
