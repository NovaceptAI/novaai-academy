import { test, expect } from "@playwright/test";
test("navigation, programme cards, orbit and journey work", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("BUILD WITH IT");
  const targets = await page
    .locator('a[href^="#"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")!.slice(1)));
  for (const target of targets)
    await expect(page.locator(`[id="${target}"]`)).toHaveCount(1);
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation")).toBeVisible();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Cohorts", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  }
  for (const id of ["explorers", "builders", "innovators"]) {
    await page.locator(`.cohort-card[href="#programme-${id}"]`).click();
    await expect(page.locator(`#programme-${id}`)).toHaveAttribute("open", "");
    await expect(
      page.locator(`#programme-${id} .programme-content`),
    ).toContainText("Final project showcase");
  }
  await page.locator(".orbit-node").filter({ hasText: "Question" }).click();
  await expect(page.locator(".orbit-caption")).toContainText("QUESTION");
  await page.locator(".journey-stage").filter({ hasText: "Present" }).click();
  await expect(page.locator(".journey-detail")).toContainText(
    "Explain the thinking",
  );
  expect(errors).toEqual([]);
});
test("enquiry validates and prepares all fields without sending", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.locator(".form-success")).toHaveCount(0);
  await page.getByLabel("Parent or student name").fill("Test Parent");
  await page.getByLabel("Phone number").fill("bad-number");
  await page.getByLabel("Student category").selectOption("Class 9");
  await expect(page.locator(".guardian-note:visible")).toBeVisible();
  await page.getByLabel("Current class, course or year").fill("Class 9");
  await page.getByLabel("Programme of interest").selectOption("AI Explorers");
  await page
    .getByLabel("Existing coding experience")
    .selectOption("No coding experience yet");
  await page
    .getByLabel("What would you like to learn or build?")
    .fill("Research & build a study tool?");
  await page
    .getByLabel("Preferred evening timing")
    .selectOption("Flexible — let’s discuss");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.getByRole("alert")).toContainText("valid phone");
  await page.getByLabel("Phone number").fill("9650760614");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  const link = page.getByRole("link", { name: "Continue to WhatsApp" });
  await expect(link).toBeVisible();
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe("https://wa.me/919650760614");
  const msg = url.searchParams.get("text")!;
  for (const value of [
    "Test Parent",
    "9650760614",
    "Class 9",
    "AI Explorers",
    "No coding experience yet",
    "Research & build a study tool?",
    "Flexible — let’s discuss",
  ])
    expect(msg).toContain(value);
  expect(msg).toContain("Enquiry route: AI & Coding Programme");
  await page
    .getByLabel("Student category")
    .selectOption("Undergraduate student");
  await expect(page.locator(".guardian-note:visible")).toHaveCount(0);
  await expect(link).toHaveCount(0);
});
test("responsive layout, WhatsApp destinations and reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  for (const href of await page
    .locator('a[href*="wa.me"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("href"))))
    expect(href).toBe("https://wa.me/919650760614");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".core-symbol")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /NovaAI Academy/,
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  );
});

test("programme enquiries preserve form values and invalidate an outdated message", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByLabel("Parent or student name").fill("Returning Parent");
  await page.getByLabel("Phone number").fill("9650760614");
  await page.getByLabel("Student category").selectOption("Class 10");
  await page.getByLabel("Current class, course or year").fill("Class 10");
  await page
    .getByLabel("Existing coding experience")
    .selectOption("A little experience");
  await page
    .getByLabel("What would you like to learn or build?")
    .fill("Build a source-backed study resource");
  await page
    .getByLabel("Preferred evening timing")
    .selectOption("Flexible — let’s discuss");
  for (const [id, name] of [
    ["explorers", "AI Explorers"],
    ["builders", "AI Builders"],
    ["innovators", "AI Innovators"],
  ]) {
    await page.locator(`.cohort-card[href="#programme-${id}"]`).click();
    await page.getByRole("link", { name: `Enquire about ${name}` }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByLabel("Programme of interest")).toHaveValue(name);
    await expect(page.getByLabel("Parent or student name")).toHaveValue(
      "Returning Parent",
    );
    await expect(page.getByLabel("Phone number")).toHaveValue("9650760614");
    await expect(page.getByLabel("Student category")).toHaveValue("Class 10");
    await expect(page.getByLabel("Current class, course or year")).toHaveValue(
      "Class 10",
    );
    await expect(page.getByLabel("Existing coding experience")).toHaveValue(
      "A little experience",
    );
    await expect(
      page.getByLabel("What would you like to learn or build?"),
    ).toHaveValue("Build a source-backed study resource");
    await expect(page.getByLabel("Preferred evening timing")).toHaveValue(
      "Flexible — let’s discuss",
    );
    await expect(page.locator(".form-success")).toHaveCount(0);
    await page
      .getByRole("button", { name: "Prepare WhatsApp Enquiry" })
      .click();
    const href = await page
      .getByRole("link", { name: "Continue to WhatsApp" })
      .getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain(
      `Programme of interest: ${name}`,
    );
  }
});

test("syllabus download matches the canonical PDF and programme details fit all widths", async ({
  page,
  request,
}) => {
  await page.goto("/#programmes");
  const link = page.getByRole("link", {
    name: "Download AI Programme Syllabus",
  });
  await expect(link).toHaveAttribute("download", "NovaAI_Academy_Syllabus.pdf");
  const response = await request.get((await link.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const body = await response.body();
  expect(body.subarray(0, 5).toString()).toBe("%PDF-");
  const { readFile } = await import("node:fs/promises");
  expect(body.equals(await readFile("NovaAI_Academy_Syllabus.pdf"))).toBe(true);
  await page.locator(".programme").evaluateAll((els) =>
    els.forEach((el) => {
      (el as HTMLDetailsElement).open = true;
    }),
  );
  for (const [id, format, hours] of [
    ["explorers", "6 weeks · 12 classes", "15 live teaching hours"],
    ["builders", "8 weeks · 16 classes", "24 live teaching hours"],
    ["innovators", "10 weeks · 20 classes", "30 live teaching hours"],
  ]) {
    await expect(page.locator(`#programme-${id}`)).toContainText(format);
    await expect(page.locator(`#programme-${id}`)).toContainText(hours);
  }
  await expect(page.getByText("Basic coding readiness required")).toBeVisible();
  await expect(
    page.getByText(/Programme durations are proposed/),
  ).toBeVisible();
  await expect(page.getByText(/syllabus coming next/i)).toHaveCount(0);
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("tuition enquiries keep international qualifications and use the correct WhatsApp route", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/#tuition");
  await expect(page.locator(".tuition-option")).toHaveCount(10);
  await page
    .locator(".tuition-option")
    .filter({ hasText: "IB Diploma Computer Science" })
    .click();
  await expect(page.getByLabel("Learning route", { exact: false })).toHaveValue(
    "tuition",
  );
  await expect(page.getByLabel("Board", { exact: false })).toHaveValue("IB");
  await expect(page.getByLabel("Subject name", { exact: false })).toHaveValue(
    "Computer Science",
  );
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.locator(".form-success")).toHaveCount(0);
  await page.getByLabel("Student’s name", { exact: false }).fill("Aarav & Mei");
  await page
    .getByLabel("Class or international programme/year")
    .fill("IB Diploma Year 1 — HL");
  await page.getByLabel("Examination year").fill("2028");
  await page
    .getByLabel("Topics where help is needed")
    .fill("Algorithms & recursion?\nTesting and trace tables.");
  await page.getByLabel("Parent/guardian name").fill("Parent Test");
  await page.getByLabel("Parent/guardian contact number").fill("invalid");
  await page
    .getByLabel("Preferred timings", { exact: false })
    .fill("Saturday 10 am, Singapore time (UTC+8)");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.getByRole("alert")).toContainText("valid parent/guardian");
  await page.getByLabel("Parent/guardian contact number").fill("+65 8123 4567");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  const link = page.getByRole("link", { name: "Continue to WhatsApp" });
  await expect(link).toBeVisible();
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.origin + url.pathname).toBe("https://wa.me/919650760614");
  const message = url.searchParams.get("text")!;
  for (const text of [
    "Enquiry route: School Computer Tuition",
    "IB Diploma Computer Science — SL / HL",
    "Aarav & Mei",
    "IB Diploma Year 1 — HL",
    "Board: IB",
    "Subject name: Computer Science",
    "Subject code: Not sure",
    "Examination year: 2028",
    "School name: Not specified",
    "Algorithms & recursion?\nTesting and trace tables.",
    "Parent Test",
    "+65 8123 4567",
    "Saturday 10 am, Singapore time (UTC+8)",
  ])
    expect(message).toContain(text);
  expect(message).not.toContain("founding cohort");
  expect(message).not.toContain("Existing coding experience");
  await page.getByLabel("Learning route", { exact: false }).selectOption("ai");
  await expect(link).toHaveCount(0);
  await page.getByLabel("Parent or student name").fill("AI draft");
  await page
    .getByLabel("Learning route", { exact: false })
    .selectOption("tuition");
  await expect(
    page.getByLabel("Class or international programme/year"),
  ).toHaveValue("IB Diploma Year 1 — HL");
  await expect(page.getByLabel("Student’s name", { exact: false })).toHaveValue(
    "Aarav & Mei",
  );
  await page.locator('.cohort-card[href="#programme-builders"]').click();
  await page.getByRole("link", { name: "Enquire about AI Builders" }).click();
  await expect(page.getByLabel("Learning route", { exact: false })).toHaveValue(
    "ai",
  );
  await expect(page.getByLabel("Programme of interest")).toHaveValue(
    "AI Builders",
  );
  await expect(page.getByLabel("Parent or student name")).toHaveValue(
    "AI draft",
  );
  await page
    .getByRole("link", { name: "Enquire about tuition", exact: true })
    .click();
  await expect(page.getByLabel("Learning route", { exact: false })).toHaveValue(
    "tuition",
  );
  await expect(
    page.getByLabel("Class or international programme/year"),
  ).toHaveValue("IB Diploma Year 1 — HL");
});

test("school tuition validates its own fields and preserves class and board choices", async ({
  page,
}) => {
  await page.goto("/#tuition");
  await page
    .locator(".tuition-option")
    .filter({ hasText: "CBSE Computer Applications" })
    .click();
  await expect(page.getByLabel("Board", { exact: false })).toHaveValue("CBSE");
  await page
    .getByLabel("Student’s name", { exact: false })
    .fill("Student Test");
  await page
    .getByLabel("Class or international programme/year")
    .fill("Class 9");
  await page.getByLabel("Examination year").fill("20");
  await page.getByLabel("Topics where help is needed").fill("HTML");
  await page.getByLabel("Parent/guardian name").fill("Parent");
  await page
    .getByLabel("Preferred timings", { exact: false })
    .fill("Weekday evenings IST");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.locator(".form-success")).toHaveCount(0);
  await page.getByLabel("Examination year").fill("2027");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.locator(".form-success")).toHaveCount(0);
  await page.getByLabel("Parent/guardian contact number").fill("9650760614");
  await page.getByLabel("Subject code").fill("Not sure");
  await page.getByRole("button", { name: "Prepare WhatsApp Enquiry" }).click();
  await expect(page.locator(".form-success")).toBeVisible();
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
