import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cohorts } from "../data/site-config";
import { SectionLabel } from "./Shared";
export function CohortArt({ kind }: { kind: string }) {
  return (
    <div className={`cohort-art art-${kind}`} aria-hidden="true">
      <div className="art-grid" />
      {kind === "explorers" ? (
        <>
          <i />
          <i />
          <i />
          <span className="discovery-point" />
          <span className="art-plus">+</span>
        </>
      ) : kind === "builders" ? (
        <>
          <i />
          <i />
          <i />
          <i />
          <span className="art-plus">+</span>
        </>
      ) : (
        <>
          <i />
          <i />
          <i />
          <span className="network-core" />
          <b />
          <b />
          <b />
        </>
      )}
      <span className="art-coordinate">
        N / 0{kind === "explorers" ? 1 : kind === "builders" ? 2 : 3}
      </span>
    </div>
  );
}
export function Cohorts() {
  return (
    <section className="section light-section" id="cohorts">
      <div className="container">
        <SectionLabel>01 / CHOOSE YOUR PATH</SectionLabel>
        <div className="section-heading">
          <h2>
            From first experiments
            <br />
            to serious builds<span className="accent-dot">.</span>
          </h2>
          <p>
            Start at the level that fits your current experience and progress
            towards creating technology you can understand, explain and
            demonstrate.
          </p>
        </div>
        <div className="cohort-cards">
          {cohorts.map((c, i) => (
            <a
              className={`cohort-card ${c.color}`}
              href={`#programme-${c.id}`}
              key={c.id}
            >
              <div className="card-top">
                <span className="eyebrow">
                  0{i + 1} / {c.audience.toUpperCase()}
                </span>
                <ArrowUpRight size={20} />
              </div>
              <CohortArt kind={c.id} />
              <div className="cohort-card-copy">
                <p className="eyebrow">{c.tag}</p>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <div className="skill-tags">
                  {c.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="card-link">
                  Explore the programme <ArrowUpRight size={18} />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="path-footer">
          <span>Different starting points. The same builder mindset.</span>
          <span className="eyebrow">
            EXPLORE <ArrowUpRight size={14} /> BUILD <ArrowUpRight size={14} />{" "}
            INNOVATE
          </span>
        </div>
      </div>
    </section>
  );
}
export function Philosophy() {
  return (
    <section className="philosophy">
      <div className="philosophy-light">
        <p className="eyebrow">THE MINDSET / 01</p>
        <h2>
          DON’T JUST
          <br />
          CONSUME
          <br />
          TECHNOLOGY<span>.</span>
        </h2>
        <p>
          Learn how AI works, where it fails, how to question its output and how
          to use it responsibly.
        </p>
        <span className="philosophy-symbol" aria-hidden="true">
          ↘
        </span>
      </div>
      <div className="philosophy-dark">
        <p className="eyebrow">THE PRACTICE / 02</p>
        <h2>
          BUILD
          <br />
          SOMETHING
          <br />
          <span>REAL.</span>
        </h2>
        <p>
          Every learner progresses through guided experimentation towards a
          project they can understand, explain and demonstrate.
        </p>
        <div className="principles">
          {[
            "Understand before automating",
            "Verify before trusting",
            "Build before claiming mastery",
          ].map((p, i) => (
            <div key={p}>
              <span>0{i + 1}</span>
              {p}
              <ArrowDown size={14} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
