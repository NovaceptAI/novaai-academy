import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, MapPin, Send } from "lucide-react";
import { cohorts, siteConfig } from "../data/site-config";
import { learningRoutes, tuition, type LearningRoute } from "../data/tuition";
import { TuitionFields } from "./TuitionFields";
import { Brand, WhatsAppLink } from "./Shared";
export function FoundingCohort({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="founding">
      <div className="container founding-inner">
        <div>
          <p className="eyebrow">
            FOUNDING COHORT / {siteConfig.startDate.slice(0, 4)}
          </p>
          <h2>
            THE FIRST COHORT
            <br />
            STARTS HERE<span>↗</span>
          </h2>
          <p>Bring your curiosity. Let’s see what you can make.</p>
          <div className="founding-actions">
            <a
              href="#contact"
              className="button button-dark"
              onClick={onEnquire}
            >
              Register Your Interest <ArrowUpRight size={18} />
            </a>
            <WhatsAppLink className="button founding-whatsapp">
              Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
        <div className="founding-details">
          <p>
            <CalendarDays size={19} />
            Starting {siteConfig.startDateLabel}
          </p>
          <p>
            <MapPin size={19} />
            {siteConfig.shortLocation}
          </p>
          {siteConfig.foundingDetails.map((x) => (
            <p key={x}>
              <Check size={17} />
              {x}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Contact({
  route,
  onRouteChange,
  tuitionOption,
  onTuitionOptionChange,
  programme,
  onProgrammeChange,
}: {
  route: LearningRoute;
  onRouteChange: (route: LearningRoute) => void;
  tuitionOption: string;
  onTuitionOptionChange: (option: string) => void;
  programme: string;
  onProgrammeChange: (value: string) => void;
}) {
  const [category, setCategory] = useState("");
  const [messageUrl, setMessageUrl] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setMessageUrl("");
    setError("");
  }, [programme, route, tuitionOption]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(
      data.get(route === "ai" ? "phone" : "guardianPhone") || "",
    ).replace(/[\s()+-]/g, "");
    if (!/^\d{10,15}$/.test(phone)) {
      setError(
        route === "ai"
          ? "Please enter a valid phone number with 10–15 digits."
          : "Please enter a valid parent/guardian contact number with 10–15 digits.",
      );
      return;
    }
    setError("");
    const fields =
      route === "ai"
        ? [
            ["Name", "name"],
            ["Phone", "phone"],
            ["Student category", "category"],
            ["Current class, course or university year", "grade"],
            ["Programme of interest", "programme"],
            ["Existing coding experience", "experience"],
            ["What I would like to learn or build", "goal"],
            ["Preferred evening timing", "timing"],
          ]
        : [
            ["Student’s name", "studentName"],
            ["Class or international programme/year", "qualificationYear"],
            ["Board", "board"],
            ["Subject name", "subject"],
            ["Subject code", "subjectCode"],
            ["Examination year", "examYear"],
            ["School name", "school"],
            ["Topics where help is needed", "topics"],
            ["Parent/guardian name", "guardianName"],
            ["Parent/guardian contact number", "guardianPhone"],
            ["Preferred timings", "tuitionTiming"],
          ];
    const message =
      `Hello ${siteConfig.name}!\nEnquiry route: ${learningRoutes[route].enquiryLabel}\n` +
      (route === "ai"
        ? `I’m interested in the founding cohort starting ${siteConfig.startDateLabel}.\n\n`
        : `Tuition enquiry option: ${tuition.options.find((x) => x.id === tuitionOption)?.label || "Help me choose / another school syllabus"}\n\n`) +
      fields
        .map(
          ([label, key]) =>
            `${label}: ${String(data.get(key) || "Not specified").trim()}`,
        )
        .join("\n");
    setMessageUrl(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
    );
  }
  return (
    <section className="contact section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">
            <span className="status-dot" /> YOUR NEXT CHAPTER
          </p>
          <h2>
            Start with
            <br />a conversation<span>.</span>
          </h2>
          <p>
            Tell us a little about the learner and their interests. We’ll help
            find the right starting point.
          </p>
          <WhatsAppLink className="text-link">
            Prefer to chat directly?
          </WhatsAppLink>
          <div className="contact-location">
            <MapPin size={20} />
            <div>
              {siteConfig.location}
              <br />
              <a href={`https://wa.me/${siteConfig.whatsapp}`}>
                WhatsApp: {siteConfig.displayPhone}
              </a>
            </div>
          </div>
          <p className="contact-note">
            Curiosity welcome.
            <br />
            No experience required to ask a question.
          </p>
        </div>
        <form
          className="enquiry-form"
          onSubmit={submit}
          onChange={() => setMessageUrl("")}
        >
          <div className="form-heading">
            <h3>A small first step.</h3>
            <span className="eyebrow">ENQUIRY / 01</span>
          </div>
          <label className="route-selector">
            Learning route
            <select
              value={route}
              onChange={(e) => onRouteChange(e.target.value as LearningRoute)}
            >
              <option value="ai">{learningRoutes.ai.enquiryLabel}</option>
              <option value="tuition">
                {learningRoutes.tuition.enquiryLabel}
              </option>
            </select>
          </label>
          <fieldset
            className="route-fields"
            hidden={route !== "ai"}
            disabled={route !== "ai"}
          >
            <legend className="sr-only">
              AI &amp; Coding Programme details
            </legend>
            <div className="form-grid">
              <label>
                Parent or student name <span>*</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Phone number <span>*</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={22}
                  placeholder="Your contact number"
                  aria-describedby={
                    error && route === "ai" ? "phone-error" : undefined
                  }
                />
              </label>
              <label>
                Student category <span>*</span>
                <select
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select student level</option>
                  {siteConfig.enquiry.categories.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Current class, course or year <span>*</span>
                <input
                  name="grade"
                  required
                  maxLength={150}
                  placeholder="e.g. Class 9 / BSc, year 2"
                />
              </label>
              {category.startsWith("Class") && (
                <p className="guardian-note">
                  A parent or guardian should complete or approve the enrolment
                  enquiry.
                </p>
              )}
              <label>
                Programme of interest <span>*</span>
                <select
                  name="programme"
                  required
                  value={programme}
                  onChange={(e) => onProgrammeChange(e.target.value)}
                >
                  <option value="">Choose your path</option>
                  {cohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.name}>
                      {cohort.name} — {cohort.audience}
                    </option>
                  ))}
                  <option value="Help me choose">Help me choose</option>
                </select>
              </label>
              <label>
                Existing coding experience <span>*</span>
                <select name="experience" required>
                  <option value="">Your starting point</option>
                  {siteConfig.enquiry.experience.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label className="full-width">
                What would you like to learn or build?
                <textarea
                  name="goal"
                  rows={3}
                  maxLength={1500}
                  placeholder="A big idea, a small experiment, or something you’re curious about…"
                />
              </label>
              <label className="full-width">
                Preferred evening timing <span>*</span>
                <select name="timing" required>
                  <option value="">Select a preference</option>
                  {siteConfig.enquiry.timings.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <small>
                  Timing preferences help us plan. The final schedule is to be
                  confirmed.
                </small>
              </label>
            </div>
          </fieldset>
          <TuitionFields
            active={route === "tuition"}
            option={tuitionOption}
            onOptionChange={onTuitionOptionChange}
          />
          {error && (
            <p role="alert" id="phone-error" className="form-error">
              {error}
            </p>
          )}
          <button className="button button-lime submit-button" type="submit">
            Prepare WhatsApp Enquiry <ArrowUpRight size={19} />
          </button>
          <p className="form-disclosure">
            Your details are used to prepare a WhatsApp message in your browser.
            Nothing is sent until you review and send it in WhatsApp.
          </p>
          {messageUrl && (
            <div className="form-success" role="status">
              <Check size={20} />
              <div>
                <strong>Your enquiry is ready.</strong>
                <p>
                  Open WhatsApp, review your details, then tap send. Your
                  enquiry has not been sent yet.
                </p>
                <a
                  href={messageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Continue to WhatsApp <Send size={15} />
                </a>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              Practical AI education for the
              <br />
              next generation of builders.
            </p>
          </div>
          <div className="footer-nav">
            <a href="#cohorts">AI &amp; Coding Programmes</a>
            <a href="#tuition">School Computer Tuition</a>
            <a href="#how-it-works">How It Works</a>
            <a
              href={siteConfig.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              About {siteConfig.parent} ↗
            </a>
          </div>
          <div className="footer-nav">
            <a href="#contact">Contact</a>
            {/* TODO: Enable Privacy and Terms links after legal review and publication. */}
            <span aria-disabled="true" title="Pending legal review">
              Privacy <small>Coming soon</small>
            </span>
            <span aria-disabled="true" title="Pending legal review">
              Terms <small>Coming soon</small>
            </span>
          </div>
          <div className="footer-contact">
            <p>{siteConfig.location}</p>
            <a href={`https://wa.me/${siteConfig.whatsapp}`}>
              WhatsApp: {siteConfig.displayPhone} ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} by{" "}
            {siteConfig.parent}
          </span>
          <span className="eyebrow">STAY CURIOUS. BUILD SOMETHING.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
