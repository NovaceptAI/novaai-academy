import { ArrowUpRight, Eye, ShieldCheck, Sprout, Users } from "lucide-react";
import { siteConfig } from "../data/site-config";
import { SectionLabel } from "./Shared";
const confidence = [
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    text: "Students learn privacy, verification, bias awareness and safe technology usage.",
  },
  {
    icon: Users,
    title: "Small Cohorts",
    text: "The programme is designed around participation, feedback and guided building.",
  },
  {
    icon: Eye,
    title: "Visible Outcomes",
    text: "Every learner works towards something that can be presented and explained.",
  },
  {
    icon: Sprout,
    title: "Age-Appropriate Progression",
    text: "The technical depth and project independence increase from Explorers to Innovators.",
  },
];
export function Confidence() {
  return (
    <section className="confidence section">
      <div className="container">
        <div className="confidence-heading">
          <p className="eyebrow">FOR STUDENTS. WITH PARENTS IN MIND.</p>
          <h2>
            Room to experiment.
            <br />A foundation you can trust.
          </h2>
        </div>
        <div className="confidence-grid">
          {confidence.map((c) => (
            <article key={c.title}>
              <c.icon size={24} strokeWidth={1.5} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section className="about section" id="about">
      <div className="container about-grid">
        <div>
          <SectionLabel>05 / BUILT BY BUILDERS</SectionLabel>
          <h2>
            An academy built
            <br />
            inside an AI company.
          </h2>
        </div>
        <div>
          <p>
            {siteConfig.name} is an initiative by {siteConfig.parent}—an AI
            company building digital growth systems, automation, intelligent
            workflows and advanced AI infrastructure.
          </p>
          <p>
            The academy translates practical technology experience into
            structured, responsible and project-based learning for students.
          </p>
          <a
            href={siteConfig.parentUrl}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore {siteConfig.parent} <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
