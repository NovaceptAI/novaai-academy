import { ArrowUpRight, BookOpen, Code2 } from "lucide-react";
import { learningRoutes } from "../data/tuition";
import { SectionLabel } from "./Shared";
export function LearningRoutes() {
  return (
    <section className="learning-routes section" id="learning-routes">
      <div className="container">
        <SectionLabel>TWO ROUTES / ONE CURIOUS MIND</SectionLabel>
        <div className="route-cards">
          <a className="route-card" href="#cohorts">
            <Code2 size={25} />
            <span className="eyebrow">01 / EXPLORE & BUILD</span>
            <h2>{learningRoutes.ai.name}</h2>
            <p>{learningRoutes.ai.description}</p>
            <span className="card-link">
              Explore AI programmes <ArrowUpRight size={18} />
            </span>
          </a>
          <a className="route-card route-card-cyan" href="#tuition">
            <BookOpen size={25} />
            <span className="eyebrow">02 / UNDERSTAND & PRACTISE</span>
            <h2>{learningRoutes.tuition.name}</h2>
            <p>{learningRoutes.tuition.description}</p>
            <span className="card-link">
              Explore school tuition <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
