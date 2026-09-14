export type LearningRoute = "ai" | "tuition";
export const learningRoutes = {
  ai: {
    name: "AI & Coding Programmes",
    enquiryLabel: "AI & Coding Programme",
    description:
      "Explore AI, learn to code and build projects you can explain—from Class 8 through university.",
  },
  tuition: {
    name: "School Computer Tuition",
    enquiryLabel: "School Computer Tuition",
    description:
      "Understand your school syllabus, practise programming and prepare for computer-subject exams with guided lessons matched to your class, board and subject.",
  },
};
export const tuition = {
  availability:
    "Batches are formed by class, board and subject. Availability is confirmed after reviewing your syllabus.",
  boards: [
    "CBSE",
    "ICSE / CISCE",
    "ISC / CISCE",
    "Cambridge",
    "IB",
    "School-specific / other",
    "Not sure",
  ],
  options: [
    {
      id: "cbse-applications",
      label: "CBSE Computer Applications — Class 9–10",
      board: "CBSE",
      subject: "Computer Applications",
    },
    {
      id: "cbse-it-ai",
      label:
        "CBSE Information Technology / Artificial Intelligence — subject-specific enquiries",
      board: "CBSE",
      subject: "",
    },
    {
      id: "cbse-cs",
      label: "CBSE Computer Science — Class 11–12",
      board: "CBSE",
      subject: "Computer Science",
    },
    {
      id: "cbse-ip",
      label: "CBSE Informatics Practices — Class 11–12",
      board: "CBSE",
      subject: "Informatics Practices",
    },
    {
      id: "icse-applications",
      label: "ICSE Computer Applications — Class 9–10",
      board: "ICSE / CISCE",
      subject: "Computer Applications",
    },
    {
      id: "isc-cs",
      label: "ISC Computer Science — Class 11–12",
      board: "ISC / CISCE",
      subject: "Computer Science",
    },
    {
      id: "cambridge-igcse",
      label: "Cambridge IGCSE Computer Science / ICT",
      board: "Cambridge",
      subject: "",
    },
    {
      id: "cambridge-a-level",
      label: "Cambridge AS & A Level Computer Science",
      board: "Cambridge",
      subject: "Computer Science",
    },
    {
      id: "ib-cs",
      label: "IB Diploma Computer Science — SL / HL",
      board: "IB",
      subject: "Computer Science",
    },
    {
      id: "class-8",
      label: "Class 8 Computer Foundations — school-syllabus-based support",
      board: "School-specific / other",
      subject: "Computer Foundations",
    },
  ],
};
