import { ArrowUpRight } from "lucide-react";
import { learningRoutes, tuition } from "../data/tuition";
import { SectionLabel } from "./Shared";
export function Tuition({
  onEnquire,
}: {
  onEnquire: (option?: string) => void;
}) {
  return (
    <section className="section tuition-section" id="tuition">
      <div className="container">
        <SectionLabel>SCHOOL SUPPORT / YOUR SYLLABUS</SectionLabel>
        <div className="section-heading">
          <h2>{learningRoutes.tuition.name}</h2>
          <p>{learningRoutes.tuition.description}</p>
        </div>
        <p className="eyebrow tuition-options-label">ENQUIRY OPTIONS</p>
        <div className="tuition-options">
          {tuition.options.map((option, i) => (
            <a
              key={option.id}
              href="#contact"
              onClick={() => onEnquire(option.id)}
              className="tuition-option"
            >
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              <span>{option.label}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
        <div className="tuition-footer">
          <p>{tuition.availability}</p>
          <a
            href="#contact"
            className="button button-dark"
            onClick={() => onEnquire()}
          >
            Enquire about tuition <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
