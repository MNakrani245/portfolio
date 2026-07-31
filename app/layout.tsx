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
        url: "/og-m-symbol.png",
        width: 1733,
        height: 908,
        alt: "Mohit Nakrani — complexity transformed into clarity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Nakrani — Techno-Functional ERP Lead",
    description:
      "I turn operational complexity into software people trust.",
    images: ["/og-m-symbol.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
