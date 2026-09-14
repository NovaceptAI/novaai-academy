import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { siteConfig } from "./src/data/site-config";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "academy-metadata",
      transformIndexHtml() {
        return [
          {
            tag: "title",
            children: siteConfig.social.title,
            injectTo: "head" as const,
          },
          ...Object.entries({
            description: siteConfig.social.description,
            "og:title": siteConfig.social.title,
            "og:description": siteConfig.social.description,
            "og:type": "website",
            "twitter:card": "summary",
            "twitter:title": siteConfig.social.title,
            "twitter:description": siteConfig.social.description,
          }).map(([key, content]) => ({
            tag: "meta",
            attrs: {
              [key.startsWith("og:") ? "property" : "name"]: key,
              content,
            },
            injectTo: "head" as const,
          })),
          {
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: siteConfig.name,
              parentOrganization: {
                "@type": "Organization",
                name: siteConfig.parent,
                url: siteConfig.parentUrl,
              },
              telephone: `+${siteConfig.whatsapp}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.shortLocation,
                addressLocality: siteConfig.addressLocality,
                addressCountry: siteConfig.addressCountry,
              },
            }),
            injectTo: "head" as const,
          },
        ];
      },
    },
  ],
});
