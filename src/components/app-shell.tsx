import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronDown, CircleGauge, CloudUpload, FileText, History, LogOut, Menu, UserRound, Wrench, X } from "lucide-react";
import { useState } from "react";
import { ReMarginLogo } from "./remargin-logo";
import { signOut } from "@/lib/remargin";

const primary = [
  { label: "Upload", to: "/upload", icon: CloudUpload },
  { label: "Tracker", to: "/tracker", icon: Wrench },
  { label: "Result", to: "/result", icon: CircleGauge },
  { label: "History", to: "/history", icon: History },
] as const;

const intelligence = [
  ["Carbon Tracker", "/dashboard/carbon"],
  ["Sustainability", "/dashboard/sustainability"],
  ["Energy Monitoring", "/dashboard/energy"],
] as const;

const reports = [
  ["ESG Report", "/reports/esg"],
  ["CBAM", "/reports/cbam"],
  ["Green Loan", "/reports/green-loan"],
  ["Solar Investment", "/reports/solar"],
] as const;

export function AppShell({ children, section }: { children: React.ReactNode; section?: "dashboard" | "reports" }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const sectionLinks = section === "reports" ? reports : intelligence;
  return (
    <div className="min-h-screen bg-app-canvas">
      <header className="sticky top-0 z-40 grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-center gap-3"><button className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><ReMarginLogo /></div>
        <nav className="hidden items-center gap-1 lg:flex">
          <Link to="/dashboard/carbon" className="top-link">Dashboard <ChevronDown size={14} /></Link>
          {primary.map(({ label, to }) => <Link key={to} to={to} className="top-link">{label}</Link>)}
          <Link to="/reports/esg" className="top-link">Reports <ChevronDown size={14} /></Link>
        </nav>
        <div className="flex items-center gap-2"><button className="icon-button relative" aria-label="Notifications"><Bell size={18} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-warning" /></button><Link to="/profile" className="icon-button" aria-label="Profile"><UserRound size={18} /></Link></div>
      </header>
      <div className="flex">
        {open && <button className="fixed inset-0 z-40 bg-overlay lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] lg:w-60 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5 lg:hidden"><ReMarginLogo /><button className="icon-button-dark" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="nav-label">{section === "reports" ? "Report centre" : "Intelligence"}</p>
            <nav className="space-y-1">
              {sectionLinks.map(([label, to], index) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`side-link ${path === to ? "side-link-active" : ""}`}><span className="nav-index">0{index + 1}</span>{label}</Link>)}
            </nav>
            <p className="nav-label mt-8">Operations</p>
            <nav className="space-y-1">{primary.map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`side-link ${path === to ? "side-link-active" : ""}`}><Icon size={17} />{label}</Link>)}</nav>
          </div>
          <div className="border-t border-sidebar-border p-4">
            <Link to="/profile" className="mb-2 flex items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent"><span className="grid size-9 place-items-center rounded-md bg-accent font-bold text-accent-foreground">AK</span><span className="min-w-0"><span className="block truncate text-sm font-semibold">Arun Kumar</span><span className="block truncate text-xs text-sidebar-muted">Precision Works</span></span></Link>
            <button className="side-link w-full" onClick={() => { signOut(); navigate({ to: "/login" }); }}><LogOut size={17} />Sign out</button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background px-2 py-2 lg:hidden">
        <Link to="/dashboard/carbon" className="mobile-nav"><CircleGauge size={19} />Home</Link>
        <Link to="/upload" className="mobile-nav"><CloudUpload size={19} />Upload</Link>
        <Link to="/tracker" className="mobile-nav"><Wrench size={19} />Tracker</Link>
        <Link to="/reports/esg" className="mobile-nav"><FileText size={19} />Reports</Link>
        <Link to="/profile" className="mobile-nav"><UserRound size={19} />Profile</Link>
      </nav>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p></div>{action && <div className="shrink-0">{action}</div>}</div>;
}

export function KpiCard({ label, value, detail, tone = "default", featured = false, className = "" }: { label: string; value: string; detail: string; tone?: "default" | "success" | "warning"; featured?: boolean; className?: string }) {
  if (featured) {
    return (
      <article className={`panel border-transparent bg-primary text-primary-foreground ${className}`}>
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold uppercase text-primary-foreground/80">{label}</p>
          <span className={`status-dot bg-background shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
        </div>
        <p className="mt-4 font-display text-3xl font-bold">{value}</p>
        <p className="mt-2 text-xs text-primary-foreground/80">{detail}</p>
      </article>
    );
  }
  return (
    <article className={`metric-card metric-${tone} ${className}`}>
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
        <span className={`status-dot status-${tone}`} />
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
    </article>
  );
}

export function DemoBadge() { return <span className="demo-badge">Illustrative data</span>; }

export function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return <article className={`panel ${className}`}><div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="font-display text-lg font-bold">{title}</h2>{subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}</div><DemoBadge /></div><div className="h-64">{children}</div></article>;
}