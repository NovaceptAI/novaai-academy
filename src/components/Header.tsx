import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "../data/site-config";
import { Brand } from "./Shared";
export function Header({ onJoin }: { onJoin: () => void }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="nav-shell">
        <Brand />
        <nav
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
          id="navigation"
        >
          {siteConfig.navigation.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a
            className="mobile-cta"
            href="#contact"
            onClick={() => {
              setOpen(false);
              onJoin();
            }}
          >
            Join the Founding Cohort ↗
          </a>
        </nav>
        <a className="nav-cta" href="#contact" onClick={onJoin}>
          Join the Founding Cohort <ArrowUpRight size={15} />
        </a>
        <button
          ref={trigger}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
