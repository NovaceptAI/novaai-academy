import { useEffect, useState } from "react";
import { tuition } from "../data/tuition";
export function TuitionFields({
  active,
  option,
  onOptionChange,
}: {
  active: boolean;
  option: string;
  onOptionChange: (value: string) => void;
}) {
  const [board, setBoard] = useState("");
  const [subject, setSubject] = useState("");
  useEffect(() => {
    const selected = tuition.options.find((x) => x.id === option);
    if (selected) {
      setBoard(selected.board);
      setSubject(selected.subject);
    }
  }, [option]);
  return (
    <fieldset className="route-fields" disabled={!active} hidden={!active}>
      <legend className="sr-only">School Computer Tuition details</legend>
      <div className="form-grid">
        <label className="full-width">
          Tuition enquiry option
          <select
            name="tuitionOption"
            value={option}
            onChange={(e) => onOptionChange(e.target.value)}
          >
            <option value="">Help me choose / another school syllabus</option>
            {tuition.options.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Student’s name <span>*</span>
          <input
            name="studentName"
            required
            autoComplete="name"
            maxLength={100}
            placeholder="Student’s full name"
          />
        </label>
        <label>
          Class or international programme/year <span>*</span>
          <input
            name="qualificationYear"
            required
            maxLength={150}
            placeholder="e.g. Class 9, IGCSE Year 10, IB DP1 HL"
            aria-describedby="qualification-help"
          />
        </label>
        <p className="field-help full-width" id="qualification-help">
          Use your actual class, qualification and year, including AS/A Level or
          IB SL/HL where relevant. No Indian class equivalent is needed.
        </p>
        <label>
          Board <span>*</span>
          <select
            name="board"
            required
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          >
            <option value="">Select your board</option>
            {tuition.boards.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Subject name <span>*</span>
          <input
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={150}
            placeholder="e.g. ICT or Computer Science"
          />
        </label>
        <label>
          Subject code
          <input
            name="subjectCode"
            maxLength={60}
            defaultValue="Not sure"
            placeholder="Code, if known, or Not sure"
          />
        </label>
        <label>
          Examination year <span>*</span>
          <input
            name="examYear"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            title="Enter the four-digit examination year"
            placeholder="e.g. 2027"
          />
        </label>
        <label className="full-width">
          School name (optional)
          <input
            name="school"
            maxLength={150}
            placeholder="Your school, if you’d like to share it"
          />
        </label>
        <label className="full-width">
          Topics where help is needed <span>*</span>
          <textarea
            name="topics"
            required
            rows={3}
            maxLength={1500}
            placeholder="Topics, programming questions or exam preparation needs…"
          />
        </label>
        <label>
          Parent/guardian name <span>*</span>
          <input
            name="guardianName"
            required
            maxLength={100}
            placeholder="Parent or guardian’s name"
          />
        </label>
        <label>
          Parent/guardian contact number <span>*</span>
          <input
            name="guardianPhone"
            required
            type="tel"
            maxLength={25}
            placeholder="Include country code if outside India"
            aria-describedby="tuition-phone-help"
          />
        </label>
        <p className="guardian-note" id="tuition-phone-help">
          A parent or guardian should complete or approve the school tuition
          enquiry. Include a parent/guardian contact number so we can discuss
          the syllabus and availability.
        </p>
        <label className="full-width">
          Preferred timings <span>*</span>
          <input
            name="tuitionTiming"
            required
            maxLength={200}
            placeholder="Days, times and time zone"
          />
          <small>
            Tell us your preferred days and times, including your time zone.
            Availability will be confirmed after reviewing your syllabus.
          </small>
        </label>
      </div>
    </fieldset>
  );
}
