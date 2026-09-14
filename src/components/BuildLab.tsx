import { ArrowUpRight, Check, FileText, Search, Sparkles } from "lucide-react";
import { projects } from "../data/site-config";
import { SectionLabel } from "./Shared";
function Preview({ kind }: { kind: string }) {
  return (
    <div className={`project-preview preview-${kind}`} aria-hidden="true">
      {kind === "research" ? (
        <div className="mock-search">
          <span>
            <Search size={13} /> What if we asked a better question?
          </span>
          <div>
            <FileText size={16} />
            <i />
            <Check size={14} />
          </div>
          <div>
            <FileText size={16} />
            <i />
            <Check size={14} />
          </div>
          <small>3 sources. One clearer picture.</small>
        </div>
      ) : kind === "portfolio" ? (
        <div className="mock-browser">
          <span>
            ● ● ● <small>my-ideas.site</small>
          </span>
          <div>
            <b>
              Hello, world<span>↗</span>
            </b>
            <i />
            <i />
            <em>MADE BY ME.</em>
          </div>
        </div>
      ) : kind === "planner" ? (
        <div className="mock-planner">
          <span>
            YOUR WEEK, REIMAGINED <Check size={13} />
          </span>
          <div>
            {["M", "T", "W", "T", "F"].map((d, i) => (
              <div key={i}>
                <small>{d}</small>
                <i />
                <i />
                <i />
              </div>
            ))}
          </div>
        </div>
      ) : kind === "data" ? (
        <div className="mock-data">
          <span>
            FROM NUMBERS TO KNOWING <ArrowUpRight size={14} />
          </span>
          <div>
            {[32, 52, 43, 71, 58, 87, 100].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <small>OBSERVE / COMPARE / DISCOVER</small>
        </div>
      ) : kind === "automation" ? (
        <div className="mock-flow">
          <span>
            01
            <br />
            <b>INPUT</b>
          </span>
          <i>→</i>
          <span>
            02
            <br />
            <b>THINK</b>
          </span>
          <i>→</i>
          <span>
            03
            <br />
            <b>DO</b>
          </span>
        </div>
      ) : (
        <div className="mock-creative">
          <Sparkles size={25} />
          <b>
            WHAT
            <br />
            IF<span>?</span>
          </b>
          <small>IDEA → EXPERIMENT → EXPRESSION</small>
        </div>
      )}
    </div>
  );
}
export default function BuildLab() {
  return (
    <section className="section build-lab" id="projects">
      <div className="container">
        <SectionLabel>04 / THE BUILD LAB</SectionLabel>
        <div className="section-heading">
          <h2>
            The proof is in
            <br />
            what you can build<span>.</span>
          </h2>
          <div>
            <p>
              Less “I’ve heard of it”.
              <br />
              More “Here’s how I made it”.
            </p>
            <span className="example-label eyebrow">
              EXAMPLE PROJECT DIRECTIONS
            </span>
          </div>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.kind}>
              <Preview kind={p.kind} />
              <div className="project-copy">
                <p className="eyebrow">{p.type}</p>
                <h3>
                  {p.name}
                  <ArrowUpRight size={18} />
                </h3>
                <p>{p.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="lab-note">
          A glimpse of what’s possible. These are example directions, not
          completed student projects. Final projects will be matched to each
          cohort.
        </p>
      </div>
    </section>
  );
}
