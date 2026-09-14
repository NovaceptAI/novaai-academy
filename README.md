# NovaAI Academy

Official website for NovaAI Academy by NovaceptAI—practical, project-based AI education for students from Class 8 through university.

A responsive, single-page launch site for AI Explorers, AI Builders and AI Innovators. It includes an interactive learning orbit, cohort paths, a learning journey, expandable programmes, example project previews and a browser-only WhatsApp enquiry builder.

## Stack and setup

React 19, TypeScript, Vite, plain responsive CSS, Lucide icons and locally hosted Inter/Space Grotesk fonts. No backend, environment variables, analytics, authentication or payment integration is required. Node.js 22 LTS and npm are recommended. The lockfile is committed for reproducible installations.

```sh
npm ci
npm run dev
```

Vite prints the local address (normally http://localhost:5173). To use the verification port: `npm run dev -- --port 4173`.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Content and structure

- `src/data/site-config.ts`: business identity, parent-company link, start date, contact details, cohorts, audience ranges, programme summaries, navigation, enquiry options and social metadata. The proposed domain is documentation only; it is not advertised as an active canonical URL.
- `src/data/programmes.ts`: proposed formats, session counts and lengths, teaching hours, prerequisites, learning highlights, final outcomes, readiness note and syllabus download metadata. Fees and reservation amounts remain `null`. Detailed weekly content stays in the PDF, rather than being duplicated on the homepage.
- `docs/syllabus/syllabus.html`: editable source for the seven-page AI programme syllabus. It preserves the founding curriculum, uses “Class” terminology and distinguishes school tuition from AI programmes.
- `public/downloads/NovaAI_Academy_Syllabus.pdf`: generated download, byte-identical to `NovaAI_Academy_Syllabus.pdf` at the repository root. The original supplied PDF is retained in `docs/syllabus/archive/`.
- `src/components/`: reusable Header, Hero, Cohorts, Philosophy, Learning, Programmes, BuildLab, Confidence, About, FoundingCohort, Contact, Footer and shared brand/WhatsApp elements. The build lab is split into a separate lazy-loaded chunk. Cohort IDs provide stable deep links and can support future programme routes.
- `src/styles.css`: visual system, responsive layouts, focus treatment and reduced-motion overrides.
- `vite.config.ts`: build-time SEO/social metadata and factual EducationalOrganization JSON-LD sourced from the central configuration.
- `public/favicon.svg`: academy monogram.
- `tests/`: browser interaction tests and visual/accessibility audit.

The form checks required fields and phone syntax, then prepares all eight fields in an encoded WhatsApp URL. It shows a “Continue to WhatsApp” link; the user reviews and sends the enquiry in WhatsApp. Preparing the message does not transmit or store form values. No enquiry is represented as sent or registered before that handoff. School-category selections display the parent/guardian notice. Timing choices are preferences, not confirmed batch slots.

## Browser verification

```sh
npx playwright install chromium
npm test
npm run audit:visual
```

The tests cover desktop and mobile navigation, all internal anchor targets, three cohort panels, learning interactions, form validation, message structure, all WhatsApp destinations, reduced motion and overflow at 320, 375, 390, 768, 1024 and 1440px. They also verify cohort enquiry links preserve all other form fields, invalidate stale prepared messages, and that the downloadable PDF has the correct MIME type and is byte-identical to the current canonical PDF. The audit checks WCAG A/AA rules with axe and saves full-page desktop/mobile screenshots to ignored `artifacts/`. Run the dev server on port 4173 before the visual audit; the test suite starts its own server if needed. Automated checks supplement visual review and do not guarantee accessibility in every assistive technology.

```sh
npm run format
npm run format:check
```

## Deployment assumptions

Run `npm ci && npm run build` and serve the contents of `dist/` with an HTTPS static host. The suggested deployment directory is `/var/www/novaai-academy`; no server configuration, DNS, publishing or infrastructure changes are performed by this repository. Serve `/assets/` with long-lived immutable caching and `index.html` with revalidation. If programme routes are added later, configure an SPA fallback or add static prerendered pages. Current navigation uses same-page anchors and needs no rewrite rules. Metadata is present in built HTML; page content is client rendered.

The intended future domain is `academy.novaceptai.com`. Confirm ownership and hosting before configuring it or adding canonical/absolute social-image URLs. The current git branch is `main`.

## Before enrolment opens

Confirm the proposed programme durations, final batch timings, fees, reservation policy and arrangements before enrolment. Privacy and Terms are visibly disabled with a source TODO pending legal review; enable them only after real policies are approved and published. Confirm the deployment host/domain and an approved social-sharing image if desired. All project cards are explicitly labelled example directions; no testimonials, enrolment statistics, certificates or guaranteed outcomes are claimed.

Server-specific deployment instructions and HTTP/HTTPS Nginx configurations are in [deploy/README.md](deploy/README.md).

## AI programmes and school tuition

The homepage offers two routes: **AI & Coding Programmes** and **School Computer Tuition**. `src/data/tuition.ts` holds the route copy, school subject enquiry options and board choices. `LearningRoutes.tsx` provides the route chooser, `Tuition.tsx` displays subject options, and `TuitionFields.tsx` holds the tuition form fields. `Contact.tsx` prepares route-specific WhatsApp messages. Inactive fieldsets are hidden and disabled so their values are retained but do not block validation or enter the other route’s message.

Tuition collects the student’s actual class or international qualification/year, board, subject, optional/unknown code, examination year, optional school, topics, parent/guardian contact and preferred timings/time zone. A subject option can preselect board and subject; class/year is always supplied by the visitor. Tuition availability is confirmed after syllabus review. Founding-cohort dates are included only in AI enquiry messages.

The download button is labelled **Download AI Programme Syllabus**. The recreated seven-page PDF covers the three AI programmes and explains that school tuition is matched separately to the student’s own syllabus. It uses “Class” throughout and preserves all 24 weekly units, proposed durations, preparation and assessment details. No manual terminology update remains.

To revise the PDF, edit `docs/syllabus/syllabus.html`, then run:

```sh
npx playwright install chromium # once, if Chromium is not installed
npm run syllabus:build
npm run build
```

The generator embeds the existing local fonts, checks for content overlapping page footers, and updates both canonical and public PDF copies. Review all seven rendered pages after edits; reconcile website summaries and the page count if the curriculum changes. `npm run build` copies the public PDF into `dist/downloads/` for deployment. The source HTML is an internal print template; the generated PDF is the public download.
