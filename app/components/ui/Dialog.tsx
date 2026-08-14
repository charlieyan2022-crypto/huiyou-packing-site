"use client";

import { useEffect } from "react";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, description, children, className }: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
      <div
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card text-card-foreground shadow-2xl animate-in",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>
        {(title || description) && (
          <div className="px-6 pt-6 pb-2">
            {title && <h2 className="text-2xl font-semibold tracking-tight pr-8">{title}</h2>}
            {description && <p className="mt-2 text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
