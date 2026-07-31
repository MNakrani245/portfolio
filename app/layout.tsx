import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohitn.site"),
  title: "Mohit Nakrani — Techno-Functional ERP Lead",
  description:
    "Portfolio of Mohit Nakrani, a London-based techno-functional ERP lead designing scalable Odoo systems, integrations, dashboards and digital products.",
  keywords: [
    "Mohit Nakrani",
    "Odoo consultant",
    "ERP lead",
    "Odoo developer",
    "Python developer",
    "London",
  ],
  icons: {
    icon: "/assets/images/logo.ico",
    shortcut: "/assets/images/logo.ico",
  },
  openGraph: {
    type: "website",
    url: "https://mohitn.site",
    title: "Mohit Nakrani — Techno-Functional ERP Lead",
    description:
      "I turn operational complexity into software people trust.",
    siteName: "Mohit Nakrani",
    images: [
      {
        url: "/og-dual-theme.png",
        width: 1732,
        height: 908,
        alt: "Mohit Nakrani — architectural M across light and dark themes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Nakrani — Techno-Functional ERP Lead",
    description:
      "I turn operational complexity into software people trust.",
    images: ["/og-dual-theme.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem("mn-theme");
                var preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                document.documentElement.dataset.theme = savedTheme || preferredTheme;
              } catch (error) {
                document.documentElement.dataset.theme = "light";
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
