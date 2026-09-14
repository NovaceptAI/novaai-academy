import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  Code2,
  Lightbulb,
  Scan,
  Sparkles,
  Workflow,
} from "lucide-react";
import { siteConfig, stages } from "../data/site-config";
import { WhatsAppLink } from "./Shared";
const icons = [Scan, Lightbulb, Sparkles, Code2, Workflow, ArrowUpRight];
export function Hero() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="eyebrow hero-brand">
            {siteConfig.name.toUpperCase()} / BY{" "}
            {siteConfig.parent.toUpperCase()}
          </p>
          <div className="announcement">
            <span className="status-dot" /> FOUNDING COHORT{" "}
            <span className="pill-divider">/</span> STARTING{" "}
            {siteConfig.startDateLabel.toUpperCase()}
          </div>
          <h1>
            DON’T JUST
            <br />
            USE AI.
            <br />
            LEARN TO
            <br />
            <span>
              BUILD WITH IT<span className="headline-period">.</span>
            </span>
          </h1>
          <p className="hero-description">
            Practical, mentor-led AI and technology programmes for students from
            Class 8 through university—designed around exploration, responsible
            AI use and real projects.
          </p>
          <div className="hero-actions">
            <a className="button button-lime" href="#cohorts">
              Explore the Cohorts <ArrowUpRight size={18} />
            </a>
            <WhatsAppLink />
          </div>
          <a className="hero-tuition-link" href="#tuition">
            Looking for school computer tuition? <ArrowUpRight size={14} />
          </a>
          <div className="hero-footnote">
            <span className="mini-cross">✳</span> Big questions. Small batches.
            Real builds.
          </div>
        </div>
        <div
          className="orbit-area"
          onPointerMove={(e) => {
            if (
              e.pointerType === "mouse" &&
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--mx",
                `${(e.clientX - r.left - r.width / 2) / 45}px`,
              );
              e.currentTarget.style.setProperty(
                "--my",
                `${(e.clientY - r.top - r.height / 2) / 45}px`,
              );
            }
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.setProperty("--mx", "0px");
            e.currentTarget.style.setProperty("--my", "0px");
          }}
        >
          <div className="orbit-topline eyebrow">
            <span>SYS.01 / CURIOSITY ENGINE</span>
            <span className="live-indicator">
              LIVE <span className="status-dot" />
            </span>
          </div>
          <div className="orbit-scene">
            <div className="orbit-axis horizontal" />
            <div className="orbit-axis vertical" />
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-ring ring-three" />
            <div className="orbit-ellipse" />
            <div className="orbit-traveller">
              <span />
            </div>
            <div className="nova-core">
              <Asterisk strokeWidth={1} className="core-symbol" />
              <span>
                NOVA<span className="core-ai">AI</span>
              </span>
              <small>HUMAN + AI</small>
            </div>
            {stages.map((s, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={s.name}
                  className={`orbit-node node-${i} ${active === i ? "selected" : ""}`}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <Icon size={15} />
                  <span>{s.name}</span>
                  <span className="node-number">0{i + 1}</span>
                </button>
              );
            })}
            <span className="orbit-coordinate coordinate-one">
              28.53° N<br />
              77.25° E
            </span>
            <span className="orbit-coordinate coordinate-two">
              IDEAS BELONG
              <br />
              IN MOTION ↗
            </span>
            <span className="orbit-point point-one" />
            <span className="orbit-point point-two" />
          </div>
          <div className="orbit-caption" aria-live="polite">
            <span className="status-dot" />
            <span>
              {active === null
                ? "BUILD MODE: ACTIVE"
                : `${stages[active].name.toUpperCase()} / ${stages[active].text}`}
            </span>
          </div>
          <div className="hand-note">
            a little curiosity goes a long way <span>↗</span>
          </div>
          <div className="orbit-bottomline eyebrow">
            <span>PROJECT-BASED LEARNING</span>
            <span>EXPLORE. ITERATE. REPEAT.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom container">
        <span className="eyebrow">FOR THE NEXT GENERATION OF BUILDERS</span>
        <a href="#cohorts" className="eyebrow">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
