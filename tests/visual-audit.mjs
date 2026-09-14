import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
let failures = 0;
try {
  for (const [label, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("http://127.0.0.1:4173");
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/${label}.png`, fullPage: true });
    await page.locator(".programme").evaluateAll((els) =>
      els.forEach((el) => {
        el.open = true;
      }),
    );
    await page.locator(".orbit-node").first().click();
    if (label === "mobile")
      await page.getByRole("button", { name: "Open menu" }).click();
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    failures += audit.violations.length;
    console.log(
      JSON.stringify(
        {
          viewport: label,
          violations: audit.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        },
        null,
        2,
      ),
    );
  }
} finally {
  await browser.close();
}
if (failures) process.exitCode = 1;
