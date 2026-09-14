import { ArrowUpRight, Check, Download, Plus } from "lucide-react";
import { programmes, syllabus } from "../data/programmes";
import { learningRoutes } from "../data/tuition";
import { SectionLabel } from "./Shared";

export function Programmes({
  onEnquire,
}: {
  onEnquire: (programme?: string) => void;
}) {
  return (
    <section className="section programme-section" id="programmes">
      <div className="container">
        <SectionLabel>03 / PROGRAMMES</SectionLabel>
        <div className="section-heading">
          <h2>{learningRoutes.ai.name}</h2>
          <p>
            Mentor-led programmes with room to ask questions, try things out and
            make progress.
          </p>
        </div>
        <div className="programme-list">
          {programmes.map((p, i) => (
            <details
              key={p.id}
              id={`programme-${p.id}`}
              className={`programme programme-${p.color}`}
            >
              <summary>
                <span className="eyebrow programme-index">0{i + 1}</span>
                <span className="programme-title">
                  {p.name}
                  <small>{p.level}</small>
                </span>
                <span className="programme-status eyebrow">
                  PROPOSED / {p.duration.toUpperCase()} · {p.classes} CLASSES
                </span>
                <Plus size={22} />
              </summary>
              <div className="programme-content">
                <p className="programme-description">{p.summary}</p>
                <div className="programme-detail-grid">
                  <div>
                    <h3 className="eyebrow">Proposed format</h3>
                    <ul className="programme-format">
                      {[
                        `${p.duration} · ${p.classes} classes`,
                        `${p.sessionsPerWeek === 2 ? "Two" : p.sessionsPerWeek} ${p.sessionMinutes}-minute sessions per week`,
                        `${p.teachingHours} live teaching hours`,
                        ...p.prerequisites,
                      ].map((item) => (
                        <li key={item}>
                          <Check size={15} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="programme-delivery">
                      Mentor-led · Project-based · {p.schedule}
                      <br />
                      Final project showcase
                    </p>
                  </div>
                  <div>
                    <h3 className="eyebrow">Learning highlights</h3>
                    <ul className="programme-highlights">
                      {p.learningHighlights.map((item) => (
                        <li key={item}>
                          <Check size={15} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="programme-outcome">
                  <h3 className="eyebrow">Final outcome</h3>
                  <p>{p.finalOutcome}</p>
                </div>
                {p.readinessNote && (
                  <p className="programme-readiness">{p.readinessNote}</p>
                )}
                <a
                  href="#contact"
                  className="text-link"
                  onClick={() => onEnquire(p.name)}
                >
                  Enquire about {p.name}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </details>
          ))}
        </div>
        <p className="programme-note">{syllabus.statusNote}</p>
        <div className="syllabus-download" aria-labelledby="syllabus-heading">
          <div>
            <p className="eyebrow">YOUR NEXT CHAPTER / THE AI SYLLABUS</p>
            <h3 id="syllabus-heading">{syllabus.heading}</h3>
            <p>{syllabus.description}</p>
            <p className="syllabus-scope">{syllabus.scopeNote}</p>
          </div>
          <div className="syllabus-actions">
            <a
              href={syllabus.path}
              download={syllabus.filename}
              className="button button-lime"
              aria-describedby="syllabus-format"
            >
              Download AI Programme Syllabus
              <Download size={18} />
            </a>
            <span className="eyebrow" id="syllabus-format">
              PDF · {syllabus.pages} pages · All three AI cohorts
            </span>
            <a
              href="#contact"
              className="text-link"
              onClick={() => onEnquire()}
            >
              Ask About Your Cohort
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
