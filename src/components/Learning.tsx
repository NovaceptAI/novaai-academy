import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { stages } from "../data/site-config";
import { SectionLabel } from "./Shared";
export function Learning() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ref.current?.classList.add("journey-visible");
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="section learning-section" id="how-it-works">
      <div className="container">
        <SectionLabel>02 / THE LEARNING SYSTEM</SectionLabel>
        <div className="section-heading">
          <h2>
            Curiosity is the start.
            <br />
            Creating is the point.
          </h2>
          <p>
            A learning loop, not a lecture marathon.
            <br />
            Make it work. Then make it better.
          </p>
        </div>
        <div className="journey" ref={ref}>
          {stages.map((s, i) => (
            <button
              className={`journey-stage ${active === i ? "active" : ""}`}
              key={s.name}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span className="stage-dot">0{i + 1}</span>
              <span className="stage-name">
                {s.name}
                <ArrowUpRight size={17} />
              </span>
              <span className="stage-text">{s.text}</span>
            </button>
          ))}
        </div>
        <div className="journey-detail" aria-live="polite">
          <span className="eyebrow">IN FOCUS / 0{active + 1}</span>
          <p>{stages[active].text}</p>
          <span className="eyebrow">HUMAN THINKING. AI POSSIBILITIES.</span>
        </div>
      </div>
    </section>
  );
}
