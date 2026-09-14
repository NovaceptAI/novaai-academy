import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Cohorts, Philosophy } from "./components/Cohorts";
import { Learning } from "./components/Learning";
import { Programmes } from "./components/Programmes";
import { About, Confidence } from "./components/About";
import { Contact, Footer, FoundingCohort } from "./components/Contact";
import { LearningRoutes } from "./components/LearningRoutes";
import { Tuition } from "./components/Tuition";
import type { LearningRoute } from "./data/tuition";
const BuildLab = lazy(() => import("./components/BuildLab"));
export default function App() {
  const [enquiryProgramme, setEnquiryProgramme] = useState("");
  const [learningRoute, setLearningRoute] = useState<LearningRoute>("ai");
  const [tuitionOption, setTuitionOption] = useState("");
  const enquireAI = (programme?: string) => {
    setLearningRoute("ai");
    if (programme !== undefined) setEnquiryProgramme(programme);
  };
  const enquireTuition = (option?: string) => {
    setLearningRoute("tuition");
    if (option) setTuitionOption(option);
  };
  useEffect(() => {
    const openProgramme = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id.startsWith("programme-")) {
        const el = document.getElementById(id);
        if (el instanceof HTMLDetailsElement) el.open = true;
      }
    };
    openProgramme();
    window.addEventListener("hashchange", openProgramme);
    return () => window.removeEventListener("hashchange", openProgramme);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header onJoin={() => setLearningRoute("ai")} />
      <main id="main">
        <Hero />
        <LearningRoutes />
        <Cohorts />
        <Philosophy />
        <Learning />
        <Programmes onEnquire={enquireAI} />
        <Tuition onEnquire={enquireTuition} />
        <Suspense
          fallback={
            <section id="projects" className="section container">
              Loading the build lab…
            </section>
          }
        >
          <BuildLab />
        </Suspense>
        <Confidence />
        <About />
        <FoundingCohort onEnquire={() => setLearningRoute("ai")} />
        <Contact
          route={learningRoute}
          onRouteChange={setLearningRoute}
          tuitionOption={tuitionOption}
          onTuitionOptionChange={setTuitionOption}
          programme={enquiryProgramme}
          onProgrammeChange={setEnquiryProgramme}
        />
      </main>
      <Footer />
    </>
  );
}
