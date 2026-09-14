import { cohorts, siteConfig } from "./site-config";

export interface Programme {
  id: string;
  name: string;
  cohort: string;
  level: string;
  color: string;
  summary: string;
  duration: string;
  classes: number;
  sessionsPerWeek: number;
  sessionMinutes: number;
  teachingHours: number;
  schedule: string;
  prerequisites: string[];
  learningHighlights: string[];
  finalOutcome: string;
  readinessNote: string | null;
  modules: { title: string; description: string }[] | null;
  learningOutcomes: string[] | null;
  projectExamples: string[] | null;
  fee: number | null;
  reservationAmount: number | null;
}

export const syllabus = {
  path: "/downloads/NovaAI_Academy_Syllabus.pdf",
  filename: "NovaAI_Academy_Syllabus.pdf",
  pages: 7,
  heading: "See the complete learning journey.",
  description:
    "Explore the weekly sessions, practical exercises, project outcomes, prerequisites and assessment approach for all three cohorts.",
  scopeNote:
    "This PDF covers AI & Coding Programmes only. School computer tuition is matched separately to the student’s own syllabus.",
  statusNote:
    "Programme durations are proposed. Final batch timings, fees and arrangements will be confirmed before enrolment.",
};

// The editable docs/syllabus/syllabus.html source defines the detailed weekly curriculum.
// Homepage summaries describe the proposed plan; fees and final arrangements remain unconfirmed.
const details = {
  explorers: {
    duration: "6 weeks",
    classes: 12,
    sessionsPerWeek: 2,
    sessionMinutes: 75,
    teachingHours: 15,
    prerequisites: ["No prior coding required"],
    learningHighlights: [
      "AI foundations, limitations and safe use",
      "Prompting and verification",
      "Research and creative projects",
      "Introductory HTML/CSS using guided templates",
      "Capstone development and presentation",
    ],
    finalOutcome:
      "A guided educational website, study resource or creative project that the student can explain and demonstrate.",
    readinessNote: null,
  },
  builders: {
    duration: "8 weeks",
    classes: 16,
    sessionsPerWeek: 2,
    sessionMinutes: 90,
    teachingHours: 24,
    prerequisites: ["No prior coding required"],
    learningHighlights: [
      "Responsible AI and structured prompting",
      "Research, spreadsheets and data interpretation",
      "HTML, CSS and introductory JavaScript",
      "AI-assisted coding, debugging and APIs",
      "Capstone testing, deployment and presentation",
    ],
    finalOutcome:
      "A working interactive application with a demonstration and test report.",
    readinessNote: null,
  },
  innovators: {
    duration: "10 weeks",
    classes: 20,
    sessionsPerWeek: 2,
    sessionMinutes: 90,
    teachingHours: 30,
    prerequisites: ["Basic coding readiness required"],
    learningHighlights: [
      "Problem selection and Python engineering essentials",
      "Model APIs and structured outputs",
      "Evaluation and failure analysis",
      "Document retrieval and grounded answers",
      "Controlled workflows, deployment and project handover",
    ],
    finalOutcome:
      "A deployed AI application with a repository, evaluation results and documented limitations.",
    readinessNote:
      "A short diagnostic checks basic coding readiness. Students needing additional foundations will receive guidance on preparation before joining.",
  },
};

export const programmes: Programme[] = cohorts.map((c) => ({
  id: c.id,
  name: c.name,
  cohort: c.id,
  level: c.audience,
  color: c.color,
  summary: c.summary,
  schedule: siteConfig.schedule,
  ...details[c.id],
  modules: null,
  learningOutcomes: null,
  projectExamples: null,
  fee: null,
  reservationAmount: null,
}));
