"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  label: string;
  summary: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  tone: string;
  visual: "ops" | "building" | "finance" | "care" | "market" | "entertainment";
  challenge: string;
  solution: string;
  outcomes: string[];
  stack: string[];
  gallery?: { src: string; alt: string }[];
  link?: string;
};

type SiteTheme = "light" | "dark";

const projects: Project[] = [
  {
    id: "logistics",
    index: "01",
    title: "Logistics operations platform",
    label: "Confidential / Flagship ERP",
    summary:
      "A fully custom logistics ERP that turns daily route files into validated service fees, weekly payroll, vehicle costs and accounting-ready records.",
    tags: ["Odoo", "Python", "TypeScript", "Xero API"],
    metric: "2 days → 2 min",
    metricLabel: "weekly payroll processing",
    tone: "lime",
    visual: "ops",
    challenge:
      "Managers were manually reconciling hundreds of routes, driver payments, allowances, vehicle rentals and amendments every week. The process took two working days and was still prone to human error.",
    solution:
      "I designed a custom ERP flow that identifies drivers and route types from uploaded operational files, calculates fees and deductions, renders a high-performance two-week rota, generates thousands of payroll lines, and synchronises approved records with Xero.",
    outcomes: [
      "Up to 500 drivers processed in a weekly batch",
      "Approximately 10,000 payroll records generated together",
      "Three-layer reconciliation across operations, payroll and invoices",
      "Vehicle inspection mobile workflow powered by Odoo APIs",
    ],
    stack: ["Odoo ORM", "Python", "PostgreSQL", "TypeScript", "REST APIs", "Xero"],
  },
  {
    id: "building",
    index: "02",
    title: "Smart building commerce transformation",
    label: "Confidential / Enterprise commerce",
    summary:
      "A year-long replacement of fragmented legacy platforms with one coherent commerce, warehouse, accounting and customer portal ecosystem.",
    tags: ["Odoo", "E-commerce", "S3", "Data migration"],
    metric: "200k+",
    metricLabel: "contact records migrated",
    tone: "sand",
    visual: "building",
    challenge:
      "The organisation relied on a collection of disconnected systems across CRM, commerce, finance, HR and fulfilment. Three years of live financial data and a substantial product catalogue had to move without interrupting operations.",
    solution:
      "Following discovery and process mapping, I helped design the end-to-end Odoo architecture, migration strategy, customer portal and a custom pricing engine that applies supplier cost, markup, customer discount and profit margin consistently across sales and e-commerce.",
    outcomes: [
      "50,000+ products and 200,000+ contacts migrated",
      "Three years of active financial history retained",
      "Custom customer-level pricing across portal and back office",
      "S3-backed product media for a leaner, faster database",
    ],
    stack: ["Odoo", "Python", "PostgreSQL", "AWS S3", "Xero", "Portal"],
    gallery: [
      {
        src: "/projects/smart-building-hero.jpg",
        alt: "Smart building commerce homepage",
      },
      {
        src: "/projects/smart-building-catalogue.jpg",
        alt: "Smart building product catalogue",
      },
      {
        src: "/projects/smart-building-guides.jpg",
        alt: "Smart building guides section",
      },
      {
        src: "/projects/smart-building-editorial.jpg",
        alt: "Smart building editorial feature",
      },
    ],
  },
  {
    id: "dashboards",
    index: "03",
    title: "Commercial intelligence suite",
    label: "Confidential / Business intelligence",
    summary:
      "Decision-focused dashboards for finance, sales and CRM that surface targets, invoice movement, pipeline health and operational exceptions.",
    tags: ["Dashboards", "SQL", "Odoo", "Analytics"],
    metric: "3 views",
    metricLabel: "finance, sales and CRM",
    tone: "blue",
    visual: "finance",
    challenge:
      "Commercial data existed, but the team had to move between records and spreadsheets to understand invoicing, sales performance, pipeline risk and stock blockers.",
    solution:
      "I created role-specific dashboard experiences with date and salesperson filters, weighted pipeline metrics, target tracking, daily invoice exports, alerts and drill-downs into the underlying Odoo records.",
    outcomes: [
      "Single-screen commercial position for each user",
      "Daily invoicing trend and export split",
      "Sales target, order and customer mix visibility",
      "CRM risk, activity and stock exception alerts",
    ],
    stack: ["Odoo", "Python", "SQL", "JavaScript", "CSV exports"],
  },
  {
    id: "care",
    index: "04",
    title: "ILA Life operations & billing",
    label: "Care operations / Workflow automation",
    summary:
      "An appointment-to-accounting workflow connecting care delivery, timesheets, worker bills, client invoices and payment status.",
    tags: ["Airtable", "Automation", "Xero", "Operations"],
    metric: "1 flow",
    metricLabel: "appointment to payment",
    tone: "coral",
    visual: "care",
    challenge:
      "Appointments, timesheets, worker pay and client billing needed to stay aligned, while giving the team a reliable view of every delivered service.",
    solution:
      "I modelled the full workflow from appointment scheduling through timesheet approval to generated invoices and worker bills, with Xero synchronisation completing the payment feedback loop.",
    outcomes: [
      "Traceable appointment and timesheet records",
      "Automated client invoices and worker bills",
      "Additional expenses captured against services",
      "Paid status synchronised back from Xero",
    ],
    stack: ["Airtable", "JavaScript", "Xero API", "Automation", "Data modelling"],
  },
  {
    id: "marketplace",
    index: "05",
    title: "GMT24 luxury marketplace",
    label: "Marketplace / Dubai",
    summary:
      "A multi-vendor marketplace for luxury watches with seller onboarding, rich listings, customer checkout and supplier fulfilment.",
    tags: ["Marketplace", "Odoo", "Payments", "Portal"],
    metric: "2-sided",
    metricLabel: "seller and buyer experience",
    tone: "gold",
    visual: "market",
    challenge:
      "The business needed a premium commerce experience that could manage high-value watch listings while keeping sellers, customers, orders and payments in one operational system.",
    solution:
      "I developed the marketplace workflow from seller registration and portal-based catalogue management through checkout, supplier notification and payment handling.",
    outcomes: [
      "Self-service supplier registration and listing management",
      "Rich watch specifications and media",
      "Connected ordering, payment and fulfilment flow",
      "Responsive storefront and companion app experience",
    ],
    stack: ["Odoo", "Python", "Portal", "E-commerce", "Payments"],
    gallery: [
      {
        src: "/projects/luxury-marketplace.jpg",
        alt: "GMT24 luxury watch marketplace",
      },
    ],
    link: "https://gmt24.com/",
  },
  {
    id: "entertainment",
    index: "06",
    title: "Scarlett Entertainment portal",
    label: "International entertainment / Portal",
    summary:
      "A role-aware portal that brings complex enquiries, artist onboarding and media-heavy talent operations into a focused experience.",
    tags: ["Custom portal", "AWS S3", "Role access", "Odoo"],
    metric: "Global",
    metricLabel: "multi-role operations",
    tone: "red",
    visual: "entertainment",
    challenge:
      "Artists, clients, finance users, managers and operators required different journeys, permissions and forms—without exposing the complexity of the underlying ERP.",
    solution:
      "I built custom portal list and form views, lengthy multi-step artist registration, enquiry capture and a role model that reveals the right tools to each user. Large media assets were offloaded to S3.",
    outcomes: [
      "Tailored portal navigation by operational role",
      "Multi-step artist and act onboarding",
      "Structured international event enquiries",
      "Faster media delivery with S3-backed storage",
    ],
    stack: ["Odoo", "Python", "Portal", "AWS S3", "Access control"],
    gallery: [
      {
        src: "/projects/entertainment-enquiry.jpg",
        alt: "Entertainment enquiry workflow",
      },
      {
        src: "/projects/entertainment-signup.jpg",
        alt: "Artist onboarding workflow",
      },
    ],
    link: "https://scarlettentertainment.com/",
  },
];

const experience = [
  {
    period: "2022 — Now",
    role: "Odoo Solution Consultant / ERP Lead",
    company: "Zed Consulting · London",
    copy: "Own end-to-end implementations from discovery and architecture through custom development, migration, deployment and optimisation.",
  },
  {
    period: "2020 — 2021",
    role: "Senior Software Developer",
    company: "Codetrade India Pvt Ltd",
    copy: "Led multiple ERP deliveries, mentored developers and modernised legacy systems for performance, reliability and scale.",
  },
  {
    period: "2019 — 2020",
    role: "Software Developer",
    company: "Biznovare Solutions Pvt Ltd",
    copy: "Built Python and Odoo solutions across the full delivery lifecycle, progressing from team projects to independent ownership.",
  },
];

const products = [
  {
    title: "File Import History",
    type: "Odoo 19 · Technical module",
    price: "€89",
    copy: "A read-only audit trail for every Odoo import: created versus updated records, field-level changes and the original operation context.",
    link: "https://apps.odoo.com/apps/modules/19.0/axial_import_history",
    visual: "history",
  },
  {
    title: "Multi User Signatures",
    type: "Odoo 19 · Productivity",
    price: "€179",
    copy: "A private, multi-company signature library for every user, with clean one-click switching directly inside the email composer.",
    link: "https://apps.odoo.com/apps/modules/19.0/axial_multi_signatures",
    visual: "signature",
  },
  {
    title: "Week Selector Widget",
    type: "Odoo 19 · OWL widget",
    price: "€49",
    copy: "A precise ISO-8601 year-and-week selector for any date field, with first- or last-day storage and leap-year-safe logic.",
    link: "https://apps.odoo.com/apps/modules/19.0/axial_week_selector",
    visual: "week",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function OpsVisual({ expanded = false }: { expanded?: boolean }) {
  const cells = [
    "on", "off", "on", "route", "on", "on", "off",
    "on", "on", "off", "on", "route", "on", "on",
    "off", "on", "on", "on", "off", "on", "route",
    "on", "route", "on", "off", "on", "on", "on",
  ];
  return (
    <div className={`ui-frame ops-frame ${expanded ? "is-expanded" : ""}`} aria-label="Synthetic logistics rota interface">
      <div className="ui-topbar">
        <span className="ui-dots"><i /><i /><i /></span>
        <span>OPERATIONS / WEEK 32</span>
        <b>Synced 2m ago</b>
      </div>
      <div className="ops-kpis">
        <span><small>ACTIVE ROUTES</small><b>184</b></span>
        <span><small>VALIDATED</small><b>96.8%</b></span>
        <span><small>EXCEPTIONS</small><b>07</b></span>
      </div>
      <div className="ops-grid">
        <div className="ops-names">
          {["Driver 018", "Driver 024", "Driver 031", "Driver 042"].map((name) => <span key={name}>{name}</span>)}
        </div>
        <div className="ops-cells">
          {cells.map((cell, index) => <i className={cell} key={`${cell}-${index}`} />)}
        </div>
      </div>
      <div className="ops-footer">
        <span><i /> Import complete</span>
        <b>10,248 records processed</b>
      </div>
    </div>
  );
}

function FinanceVisual() {
  return (
    <div className="ui-frame finance-frame" aria-label="Synthetic commercial dashboard">
      <div className="ui-topbar">
        <span className="ui-dots"><i /><i /><i /></span>
        <span>COMMERCIAL PULSE</span>
        <b>LIVE</b>
      </div>
      <div className="finance-grid">
        <div className="finance-total">
          <small>BOOKED SALES</small>
          <strong>£284k</strong>
          <span><i style={{ width: "84%" }} /></span>
          <em>112% of target</em>
        </div>
        <div className="finance-metrics">
          <span><small>PIPELINE</small><b>£610k</b></span>
          <span><small>FORECAST</small><b>£392k</b></span>
          <span><small>AT RISK</small><b>08</b></span>
          <span><small>WIN RATE</small><b>41%</b></span>
        </div>
        <div className="finance-chart">
          <small>14 DAY INVOICING TREND</small>
          <div className="chart-bars">
            {[28, 42, 36, 58, 49, 72, 55, 84, 66, 92, 74, 100].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
      <span className="demo-data">SYNTHETIC DEMO DATA</span>
    </div>
  );
}

function CareVisual() {
  const rows = [
    ["08:30", "Worker 12", "Client 07", "Approved"],
    ["10:00", "Worker 03", "Client 14", "In review"],
    ["13:15", "Worker 18", "Client 02", "Approved"],
    ["16:00", "Worker 05", "Client 11", "Scheduled"],
  ];
  return (
    <div className="ui-frame care-frame" aria-label="Synthetic appointment and billing interface">
      <div className="ui-topbar">
        <span className="ui-dots"><i /><i /><i /></span>
        <span>CARE OPERATIONS</span>
        <b>Week 25</b>
      </div>
      <div className="care-flow">
        {["Appointment", "Timesheet", "Invoice", "Paid"].map((step, index) => (
          <span key={step} className={index < 3 ? "complete" : ""}><i>{index + 1}</i>{step}</span>
        ))}
      </div>
      <div className="care-table">
        <div><b>TIME</b><b>SUPPORT</b><b>CLIENT</b><b>STATUS</b></div>
        {rows.map((row) => (
          <div key={row.join("-")}>{row.map((item, index) => <span className={index === 3 ? "status" : ""} key={item}>{item}</span>)}</div>
        ))}
      </div>
    </div>
  );
}

function BuildingVisual() {
  return (
    <div className="image-frame building-frame">
      <img src="/projects/smart-building-hero.jpg" alt="Smart building commerce experience" />
      <div className="image-caption">
        <span>Enterprise commerce</span>
        <b>One system from catalogue to fulfilment</b>
      </div>
    </div>
  );
}

function MarketVisual() {
  return (
    <div className="image-frame market-frame">
      <img src="/projects/luxury-marketplace.jpg" alt="GMT24 luxury watch marketplace" />
      <span className="float-label">MULTI-VENDOR MARKETPLACE ↗</span>
    </div>
  );
}

function EntertainmentVisual() {
  return (
    <div className="entertainment-frame">
      <div className="ent-card ent-one">
        <img src="/projects/entertainment-enquiry.jpg" alt="Entertainment enquiry form" />
      </div>
      <div className="ent-card ent-two">
        <img src="/projects/entertainment-signup.jpg" alt="Artist signup flow" />
      </div>
      <span>Role-aware international portal</span>
    </div>
  );
}

function ProjectVisual({ project, expanded = false }: { project: Project; expanded?: boolean }) {
  if (project.visual === "ops") return <OpsVisual expanded={expanded} />;
  if (project.visual === "building") return <BuildingVisual />;
  if (project.visual === "finance") return <FinanceVisual />;
  if (project.visual === "care") return <CareVisual />;
  if (project.visual === "market") return <MarketVisual />;
  return <EntertainmentVisual />;
}

function ProductVisual({ type }: { type: string }) {
  if (type === "history") {
    return (
      <div className="product-ui import-ui">
        <div className="product-ui-head"><span>Import audit</span><b>Completed</b></div>
        <div className="import-counts">
          <span><small>CREATED</small><b>184</b></span>
          <span><small>UPDATED</small><b>67</b></span>
        </div>
        {["Customers.csv", "product.price", "supplier_code"].map((item, i) => (
          <div className="import-row" key={item}><i className={i === 0 ? "new" : ""} /><span>{item}</span><b>{i === 0 ? "New" : "Changed"}</b></div>
        ))}
      </div>
    );
  }
  if (type === "signature") {
    return (
      <div className="product-ui signature-ui">
        <div className="product-ui-head"><span>Signatures</span><b>4 saved</b></div>
        {["General", "Manager", "Consulting"].map((item, i) => (
          <div className={`signature-row ${i === 1 ? "active" : ""}`} key={item}><span><i />{item}</span><b>{i === 0 ? "All companies" : "Axial Tech"}</b></div>
        ))}
        <div className="signature-select">Manager <span>⌄</span></div>
      </div>
    );
  }
  return (
    <div className="product-ui week-ui">
      <div className="product-ui-head"><span>Planning period</span><b>ISO 8601</b></div>
      <div className="year-select">2026 <span>⌄</span></div>
      <div className="week-select">Week 25 <b>15 Jun — 21 Jun</b><span>⌄</span></div>
      <div className="week-dots">{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => <i key={`${day}-${i}`}>{day}</i>)}</div>
    </div>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title">
      <button className="case-backdrop" onClick={onClose} aria-label="Close case study" />
      <div className="case-panel">
        <div className="case-panel-top">
          <span>{project.index} / CASE STUDY</span>
          <button onClick={onClose} aria-label="Close case study">Close <i>×</i></button>
        </div>
        <div className="case-hero">
          <div>
            <p className="eyebrow">{project.label}</p>
            <h2 id="case-title">{project.title}</h2>
            <p>{project.summary}</p>
          </div>
          <div className="case-metric">
            <strong>{project.metric}</strong>
            <span>{project.metricLabel}</span>
          </div>
        </div>
        <div className={`case-visual theme-${project.tone}`}>
          <ProjectVisual project={project} expanded />
        </div>
        <div className="case-copy-grid">
          <div>
            <span className="mini-label">THE CHALLENGE</span>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span className="mini-label">THE RESPONSE</span>
            <p>{project.solution}</p>
          </div>
        </div>
        <div className="case-outcomes">
          <span className="mini-label">OUTCOMES & CAPABILITIES</span>
          <div>
            {project.outcomes.map((outcome, index) => (
              <p key={outcome}><i>0{index + 1}</i>{outcome}</p>
            ))}
          </div>
        </div>
        {project.gallery && (
          <div className="case-gallery">
            {project.gallery.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="case-footer">
          <div>
            <span className="mini-label">BUILT WITH</span>
            <p>{project.stack.join(" · ")}</p>
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer">
              Visit live website <Arrow diagonal />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<SiteTheme>("light");
  const [introVisible, setIntroVisible] = useState(true);
  const [heroMode, setHeroMode] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(currentTheme);

    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem("mn-theme")) return;
      const nextTheme: SiteTheme = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
    };

    media.addEventListener("change", followSystemTheme);
    return () => media.removeEventListener("change", followSystemTheme);
  }, []);

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem("mn-intro-seen");
    if (hasSeenIntro) {
      setIntroVisible(false);
    } else {
      window.sessionStorage.setItem("mn-intro-seen", "true");
      const introTimer = window.setTimeout(() => setIntroVisible(false), 1850);
      return () => window.clearTimeout(introTimer);
    }
  }, []);

  useEffect(() => {
    const modeTimer = window.setInterval(() => {
      setHeroMode((mode) => (mode + 1) % 3);
    }, 2800);
    return () => window.clearInterval(modeTimer);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".nav-link").forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -58%", threshold: 0 },
    );
    document.querySelectorAll("main section[id]").forEach((section) => navObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--mx", `${x * 18}px`);
      hero.style.setProperty("--my", `${y * 18}px`);
    };
    hero.addEventListener("pointermove", move);
    return () => hero.removeEventListener("pointermove", move);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const chooseTheme = (nextTheme: SiteTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("mn-theme", nextTheme);
    setTheme(nextTheme);
  };

  const copyEmail = async () => {
    const email = "mohitnakrani123@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2200);
  };

  return (
    <>
      <div className={`site-intro ${introVisible ? "" : "intro-finished"}`} aria-hidden="true">
        <div className="intro-mark"><span>M</span><i /></div>
        <div className="intro-message">
          <span>Translating complexity</span>
          <strong>into clarity.</strong>
        </div>
        <div className="intro-progress"><i /></div>
        <span className="intro-count">001 — 100</span>
      </div>
      <div className="site-shell">
        <header className="site-nav">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Back to top">
            <span className="m-symbol"><i>M</i></span>
            <b><span>Mohit</span><span>Nakrani</span></b>
          </button>
          <div className="nav-dock">
            <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
              <a className="nav-link active" href="#work" onClick={() => setMenuOpen(false)}>Work</a>
              <a className="nav-link" href="#products" onClick={() => setMenuOpen(false)}>Products</a>
              <a className="nav-link" href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a className="nav-link" href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            </nav>
            <div className="nav-actions">
              <div className="theme-switch" role="group" aria-label="Colour theme">
                <button
                  className={theme === "light" ? "active" : ""}
                  onClick={() => chooseTheme("light")}
                  aria-label="Use light theme"
                  aria-pressed={theme === "light"}
                  title="Light theme"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3.5" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
                  </svg>
                </button>
                <button
                  className={theme === "dark" ? "active" : ""}
                  onClick={() => chooseTheme("dark")}
                  aria-label="Use dark theme"
                  aria-pressed={theme === "dark"}
                  title="Dark theme"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M20.2 15.2A8.7 8.7 0 0 1 8.8 3.8 8.7 8.7 0 1 0 20.2 15.2Z" />
                  </svg>
                </button>
              </div>
              <button className="nav-cta" onClick={() => scrollTo("contact")}>
                Let&apos;s talk <Arrow diagonal />
              </button>
            </div>
            <button
              className={`menu-button ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <i /><i />
            </button>
          </div>
        </header>

        <main>
          <section className="hero hero-v2" id="home" ref={heroRef}>
            <h1 className="sr-only">Mohit Nakrani — techno-functional ERP lead and digital product builder</h1>
            <div className="hero-name" aria-hidden="true">
              <span>MOHIT</span>
              <span>NAKRANI</span>
            </div>

            <div className="hero-coordinate coordinate-one">51.5072° N</div>
            <div className="hero-coordinate coordinate-two">0.1276° W</div>

            <div className="hero-status reveal-now">
              <i />
              <span>AVAILABLE FOR<br />AMBITIOUS SYSTEMS</span>
            </div>

            <div className="hero-stage">
              <div className="hero-engine reveal-now delay-one" aria-label="A visual model of Mohit's approach">
                <div className="engine-beam" />
                <div className="engine-head">
                  <span>M / TRANSFORMATION ENGINE</span>
                  <b>LIVE <i /></b>
                </div>
                <div className="engine-core">
                  <div className="engine-rings" aria-hidden="true">
                    <i /><i /><i />
                    <span>M</span>
                  </div>
                  <div className="engine-modes">
                    {[
                      ["OPERATIONS", "ORCHESTRATED"],
                      ["DATA", "DECISIONS"],
                      ["COMPLEXITY", "CLEAR"],
                    ].map(([from, to], index) => (
                      <button
                        className={heroMode === index ? "active" : ""}
                        key={from}
                        onClick={() => setHeroMode(index)}
                        aria-label={`Transform ${from.toLowerCase()} into ${to.toLowerCase()}`}
                      >
                        <small>0{index + 1}</small>
                        <span>{from}</span>
                        <i>→</i>
                        <b>{to}</b>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="engine-foot">
                  <span>Odoo / Python / PostgreSQL / APIs</span>
                  <span>7+ YEARS</span>
                </div>
              </div>

              <div className="hero-aside">
                <div className="hero-role reveal-now delay-two">
                  <span>Techno-functional ERP lead</span>
                  <span>Product systems designer</span>
                  <span>London, United Kingdom</span>
                </div>

                <div className="hero-manifesto reveal-now delay-three">
                  <p>I turn operational complexity into software people <em>trust.</em></p>
                  <div>
                    <button className="button button-primary" onClick={() => scrollTo("work")}>
                      Explore selected work <Arrow />
                    </button>
                    <a href="/assets/docs/Mohit-Nakrani-CV.pdf" target="_blank">Download CV ↘</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-index reveal-now delay-four" aria-label="Career highlights">
              <span><b>07+</b><small>Years building ERP</small></span>
              <span><b>06</b><small>Countries served</small></span>
              <span><b>360°</b><small>Discovery to delivery</small></span>
            </div>

            <div className="scroll-cue">
              <span>Selected work below</span>
              <i />
            </div>
          </section>

          <div className="ticker ticker-v2" aria-hidden="true">
            <div>
              {["ERP ARCHITECTURE", "ODOO", "WORKFLOW AUTOMATION", "DATA MIGRATION", "PRODUCT SYSTEMS", "INTEGRATIONS", "ERP ARCHITECTURE", "ODOO", "WORKFLOW AUTOMATION", "DATA MIGRATION", "PRODUCT SYSTEMS", "INTEGRATIONS"].map((item, index) => (
                <span key={`${item}-${index}`}>{item}<i>✦</i></span>
              ))}
            </div>
          </div>

          <section className="statement section-wrap" id="about">
            <div className="section-kicker" data-reveal>
              <span>01</span><p>WHAT I DO</p>
            </div>
            <div className="statement-copy" data-reveal>
              <p>I work between the <em>boardroom and the codebase</em>—translating operational friction into systems that are scalable, measurable and genuinely easier to use.</p>
            </div>
            <div className="capability-grid">
              {[
                ["icon-design.svg", "ERP Solutions", "Discovery, process mapping, architecture, implementation and long-term optimisation."],
                ["icon-dev.svg", "Web Development", "Full-stack digital products with Python, JavaScript, Django, Flask and Odoo."],
                ["icon-app.svg", "Mobile Apps", "Practical cross-platform experiences connected cleanly to operational backends."],
                ["icon-dev.svg", "APIs & Integrations", "Reliable connections across accounting, commerce, storage and business platforms."],
              ].map(([icon, title, copy], index) => (
                <article className="capability-card" key={title} data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                  <div className="capability-icon"><img src={`/assets/images/${icon}`} alt="" /></div>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="work section-wrap" id="work">
            <div className="section-heading">
              <div data-reveal>
                <div className="section-kicker"><span>02</span><p>SELECTED WORK</p></div>
                <h2>Systems with real <em>weight</em> behind them.</h2>
              </div>
              <p data-reveal>Selected engagements across logistics, commerce, care, dashboards and marketplaces. Confidential interfaces are reconstructed with synthetic data.</p>
            </div>

            <div className="project-list project-list-v2">
              {projects.map((project, index) => (
                <article className={`project-card project-${project.tone} ${index < 3 ? "project-featured" : ""}`} key={project.id} data-reveal>
                  <button className="project-visual" onClick={() => setActiveProject(project)} aria-label={`Open ${project.title} case study`}>
                    <ProjectVisual project={project} />
                    <span className="project-watermark">{project.index}</span>
                    <span className="project-metric-float"><b>{project.metric}</b><small>{project.metricLabel}</small></span>
                    <span className="open-pill">View case study <Arrow diagonal /></span>
                  </button>
                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.index}</span>
                      <p>{project.label}</p>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="project-impact">
                      <span>IMPACT</span>
                      <b>{project.metric}</b>
                      <p>{project.metricLabel}</p>
                    </div>
                    <div className="project-bottom">
                      <div className="tag-list">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <button onClick={() => setActiveProject(project)} aria-label={`Read ${project.title} case study`}>
                        Read case study <Arrow />
                      </button>
                    </div>
                  </div>
                  {index < projects.length - 1 && <div className="project-rule" />}
                </article>
              ))}
            </div>
          </section>

          <section className="products section-wrap" id="products">
            <div className="section-heading product-heading">
              <div data-reveal>
                <div className="section-kicker"><span>03</span><p>PRODUCT LAB</p></div>
                <h2>Small modules. <em>Sharp</em> solutions.</h2>
              </div>
              <p data-reveal>Independent Odoo products built around recurring workflow gaps—designed to install cleanly and disappear into the way teams already work.</p>
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.title} data-reveal style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
                  <div className="product-card-top">
                    <span>{product.type}</span>
                    <b>{product.price}</b>
                  </div>
                  <ProductVisual type={product.visual} />
                  <h3>{product.title}</h3>
                  <p>{product.copy}</p>
                  <a href={product.link} target="_blank" rel="noreferrer">
                    View on Odoo Apps <Arrow diagonal />
                  </a>
                </article>
              ))}
            </div>
            <div className="product-note" data-reveal>
              <span>AXIAL TECH</span>
              <p>Built for Odoo Community & Enterprise · practical support included</p>
              <a href="https://apps.odoo.com/apps/modules/browse?author=Axial%20Tech%20Ltd" target="_blank" rel="noreferrer">Explore all modules <Arrow /></a>
            </div>
          </section>

          <section className="experience section-wrap" id="experience">
            <div className="section-heading">
              <div data-reveal>
                <div className="section-kicker"><span>04</span><p>EXPERIENCE</p></div>
                <h2>Built from both sides of the <em>brief.</em></h2>
              </div>
              <p data-reveal>Technical depth without losing the business context. I can discover the problem, shape the solution, build it and explain why it works.</p>
            </div>
            <div className="experience-list">
              {experience.map((item, index) => (
                <article key={item.role} data-reveal>
                  <span className="experience-index">0{index + 1}</span>
                  <p className="experience-period">{item.period}</p>
                  <div>
                    <h3>{item.role}</h3>
                    <span>{item.company}</span>
                  </div>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="credentials section-wrap">
            <div className="credential-panel credential-large" data-reveal>
              <span className="mini-label">CORE PRACTICE</span>
              <h2>Strategy in the room.<br />Precision in the build.</h2>
              <p>Requirements become process maps. Process maps become maintainable architecture. Architecture becomes measurable operational change.</p>
              <div className="practice-loop" aria-label="Discover, design, deliver, optimise">
                {["Discover", "Design", "Deliver", "Optimise"].map((step, index) => (
                  <span key={step}><i>0{index + 1}</i>{step}</span>
                ))}
              </div>
            </div>
            <div className="credential-stack">
              <div className="credential-panel" data-reveal>
                <span className="mini-label">CERTIFIED</span>
                <h3>Odoo 15 & 16<br />Functional</h3>
                <p>Business fluency backed by hands-on platform depth.</p>
              </div>
              <div className="credential-panel credential-education" data-reveal>
                <span className="mini-label">EDUCATION</span>
                <h3>MSc Data Science</h3>
                <p>Kingston University London · 2022—23</p>
                <hr />
                <h3>Master of Computer Applications</h3>
                <p>L.J. Institute · 2016—19</p>
              </div>
            </div>
          </section>

          <section className="contact section-wrap" id="contact">
            <div className="contact-orb orb-left" />
            <div className="contact-orb orb-right" />
            <p className="eyebrow" data-reveal><i /> Open to the right challenge</p>
            <h2 data-reveal>Have a complex system in mind?<br /><em>Let&apos;s make it clear.</em></h2>
            <div className="contact-actions" data-reveal>
              <a className="contact-email" href="mailto:mohitnakrani123@gmail.com">
                <span>mohitnakrani123@gmail.com</span><Arrow diagonal />
              </a>
              <button className="copy-email" onClick={copyEmail}>
                {emailCopied ? "Email copied ✓" : "Copy email"}
              </button>
            </div>
            <div className="contact-meta" data-reveal>
              <span>London, United Kingdom</span>
              <a href="tel:+447776848631">+44 7776 848631</a>
              <a href="/assets/docs/Mohit-Nakrani-CV.pdf" target="_blank">Download CV ↘</a>
            </div>
          </section>
        </main>

        <footer>
          <button className="brand" onClick={() => scrollTo("home")}><span className="m-symbol"><i>M</i></span><b><span>Mohit</span><span>Nakrani</span></b></button>
          <p>Techno-Functional ERP Lead · Solution Consultant</p>
          <button onClick={() => scrollTo("home")}>Back to top <span>↑</span></button>
        </footer>
      </div>
      {activeProject && <Modal project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}
