export const siteConfig = {
  name: "NovaAI Academy",
  wordmark: "NovaAI",
  submark: "Academy",
  parent: "NovaceptAI",
  parentUrl: "https://novaceptai.com/",
  startDate: "2026-09-20",
  startDateLabel: "20 September 2026",
  location: "Mandakini Enclave, Kalkaji, New Delhi",
  addressLocality: "New Delhi",
  addressCountry: "IN",
  foundingDetails: [
    "Three student cohorts",
    "Small evening batches",
    "Parent orientation for school students",
    "Limited founding-cohort capacity",
  ],
  shortLocation: "Mandakini Enclave, Kalkaji",
  whatsapp: "919650760614",
  displayPhone: "9650760614",
  schedule: "Small evening batch",
  navigation: [
    { label: "Home", id: "home" },
    { label: "Cohorts", id: "cohorts" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Projects", id: "projects" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ],
  social: {
    title: "NovaAI Academy by NovaceptAI | Explore. Build. Innovate.",
    description:
      "Practical, mentor-led AI education for students from Class 8 through university. Explore responsibly, build real projects and present your ideas.",
    proposedDomain: "academy.novaceptai.com",
  },
  enquiry: {
    categories: [
      "Class 8",
      "Class 9",
      "Class 10",
      "Class 11",
      "Class 12",
      "Undergraduate student",
      "Postgraduate student",
    ],
    experience: [
      "No coding experience yet",
      "A little experience",
      "Comfortable with the basics",
      "Already building projects",
    ],
    timings: [
      "Early evening (4–6 pm)",
      "Evening (6–8 pm)",
      "Flexible — let’s discuss",
    ],
  },
};
export const cohorts = [
  {
    id: "explorers",
    name: "AI Explorers",
    audience: "Class 8–10",
    tag: "Start with a question.",
    color: "lime",
    description:
      "Build strong AI foundations, learn safe and responsible usage, improve research skills and turn creative ideas into guided projects.",
    summary:
      "Understand AI, write better prompts, verify information, create responsibly and learn introductory website building.",
    skills: ["AI foundations", "Creative thinking", "Guided projects"],
  },
  {
    id: "builders",
    name: "AI Builders",
    audience: "Class 11–12",
    tag: "Turn “what if” into “it works”.",
    color: "cyan",
    description:
      "Move beyond basic AI tools into structured problem-solving, introductory coding, automation and portfolio-ready projects.",
    summary:
      "Develop structured prompting, research and data skills, then learn web foundations, AI-assisted coding, APIs and application testing.",
    skills: ["Introductory coding", "Automation", "Portfolio projects"],
  },
  {
    id: "innovators",
    name: "AI Innovators",
    audience: "University",
    tag: "Make your next big idea real.",
    color: "lilac",
    description:
      "Use AI, coding, APIs and automation to create functional applications, strengthen your portfolio and explore startup or research ideas.",
    summary:
      "Build with Python and model APIs, evaluate outputs, retrieve document evidence, create controlled workflows and deploy an application.",
    skills: ["Python & APIs", "Product thinking", "Capstone builds"],
  },
] as const;
export const stages = [
  {
    name: "Explore",
    text: "Understand the problem, possibilities and limitations.",
  },
  {
    name: "Question",
    text: "Develop critical thinking and verify AI-generated information.",
  },
  {
    name: "Create",
    text: "Turn ideas into structured experiments and outputs.",
  },
  {
    name: "Code",
    text: "Learn the technical building blocks appropriate to the cohort.",
  },
  { name: "Build", text: "Create a functional, demonstrable project." },
  { name: "Present", text: "Explain the thinking, process and final outcome." },
];
export const projects = [
  {
    name: "AI Research Assistant",
    type: "QUESTION → VERIFY",
    description:
      "Explore a topic, compare sources and keep the human in the loop.",
    kind: "research",
  },
  {
    name: "Personal Portfolio Website",
    type: "DESIGN → DEVELOP",
    description: "Give your ideas, experiments and projects a place to live.",
    kind: "portfolio",
  },
  {
    name: "Study Planning System",
    type: "PLAN → ORGANISE",
    description: "Turn a busy student week into a thoughtful, usable system.",
    kind: "planner",
  },
  {
    name: "Interactive Data Dashboard",
    type: "DATA → DISCOVERY",
    description: "Find the story in a dataset and make it understandable.",
    kind: "data",
  },
  {
    name: "Useful Student Automation",
    type: "CONNECT → AUTOMATE",
    description: "Connect everyday tasks into a workflow that saves effort.",
    kind: "automation",
  },
  {
    name: "AI-Powered Creative Campaign",
    type: "IMAGINE → CREATE",
    description:
      "Bring a concept to life with a clear message and responsible AI.",
    kind: "creative",
  },
];
