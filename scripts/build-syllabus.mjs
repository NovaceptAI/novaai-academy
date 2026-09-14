import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const font = async (name, file, weight) =>
  `@font-face { font-family: '${name}'; font-weight: ${weight}; src: url(data:font/woff2;base64,${(await readFile(path.join(root, "node_modules/@fontsource", file))).toString("base64")}) format('woff2'); }`;
const fonts = await Promise.all([
  font("Inter", "inter/files/inter-latin-400-normal.woff2", 400),
  font("Inter", "inter/files/inter-latin-600-normal.woff2", 600),
  font(
    "SpaceGrotesk",
    "space-grotesk/files/space-grotesk-latin-600-normal.woff2",
    600,
  ),
]);
const html = (
  await readFile(path.join(root, "docs/syllabus/syllabus.html"), "utf8")
).replace("</head>", `<style>${fonts.join("\n")}</style></head>`);
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.locator(".page").evaluateAll((pages) =>
    pages.flatMap((page, index) => {
      const main = page.querySelector("main").getBoundingClientRect();
      const footer = page.querySelector("footer").getBoundingClientRect();
      return main.bottom + 8 > footer.top
        ? [
            `Page ${index + 1} overlaps footer by ${Math.ceil(main.bottom + 8 - footer.top)}px`,
          ]
        : [];
    }),
  );
  if (overflow.length) throw new Error(overflow.join("\n"));
  const pdf = await page.pdf({
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    outline: true,
  });
  await mkdir(path.join(root, "public/downloads"), { recursive: true });
  for (const filename of [
    "NovaAI_Academy_Syllabus.pdf",
    "public/downloads/NovaAI_Academy_Syllabus.pdf",
  ]) {
    await writeFile(path.join(root, filename), pdf);
  }
  console.log(
    `Generated AI programme syllabus (${pdf.length} bytes) from docs/syllabus/syllabus.html`,
  );
} finally {
  await browser.close();
}
