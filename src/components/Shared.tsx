import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "../data/site-config";
export function WhatsAppLink({
  children = "Ask on WhatsApp",
  className = "button button-outline",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={17} />
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow section-label">
      <span className="tiny-square" />
      {children}
    </p>
  );
}
export function Brand() {
  return (
    <a className="brand" href="#home" aria-label={`${siteConfig.name} home`}>
      <span className="brand-mark">
        N<span>↗</span>
      </span>
      <span>
        {siteConfig.wordmark}
        <span className="brand-sub">
          {siteConfig.submark.toUpperCase()}{" "}
          <i>BY {siteConfig.parent.toUpperCase()}</i>
        </span>
      </span>
    </a>
  );
}
