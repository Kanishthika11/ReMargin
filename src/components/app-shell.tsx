import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, CalendarDays, ChevronDown, CircleGauge, CloudUpload, FileText, History, LogOut, Menu, Plus, Search, UserRound, Wrench, X } from "lucide-react";
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
    <div className="min-h-screen bg-[#f2f5f3] font-sans text-[#072115]">
      {/* Top Header Bar matching Spark Admin */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#e1e8e2] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>

          {/* Search Bar Pill matching Spark Admin */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#e1e8e2] bg-[#f8faf8] px-4 py-1.5 text-xs text-[#557060] w-64 lg:w-80">
            <Search size={15} className="text-[#8ca897]" />
            <input
              type="text"
              placeholder="Search in ReMargin..."
              className="w-full bg-transparent border-none outline-none text-xs text-[#072115] placeholder-[#8ca897]"
            />
          </div>

          <button className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#072115] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#0c3120] transition-colors">
            <Plus size={14} className="text-[#95eb27]" />
            <span>Create</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Selector Pill matching Spark Admin */}
          <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#e1e8e2] bg-[#f8faf8] px-3.5 py-1.5 text-xs font-bold text-[#072115]">
            <CalendarDays size={14} className="text-[#10b981]" />
            <span>Apr 12, 2026 – Sep 23, 2026</span>
          </div>

          <button className="icon-button relative" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#10b981]" />
          </button>

          <Link to="/profile" className="flex items-center gap-2 rounded-full border border-[#e1e8e2] bg-[#f8faf8] p-1 pr-3 hover:bg-[#e8efe9] transition-colors">
            <span className="grid size-7 place-items-center rounded-full bg-[#072115] font-bold text-xs text-[#95eb27]">AK</span>
            <span className="hidden sm:inline text-xs font-bold text-[#072115]">Arun Kumar</span>
          </Link>
        </div>
      </header>

      <div className="flex">
        {open && <button className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}

        {/* Sidebar matching Spark Admin Dark Forest Theme */}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#072115] text-[#e2ebe5] transition-transform lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Logo Header matching Spark Admin */}
          <div className="flex h-16 items-center justify-between border-b border-[#14422e] px-5">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-[#95eb27] text-[#072115] font-black text-sm">
                ✱
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">ReMargin</span>
            </div>
            <button className="text-zinc-400 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#7a9d88]">
                {section === "reports" ? "REPORT CENTRE" : "DASHBOARD MENU"}
              </p>
              <nav className="space-y-1">
                {sectionLinks.map(([label, to]) => {
                  const isActive = path === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#0d3826] text-white shadow-sm ring-1 ring-[#95eb27]/30"
                          : "text-[#94b3a0] hover:bg-[#0c3120] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`size-2 rounded-full ${isActive ? "bg-[#95eb27] shadow-[0_0_8px_#95eb27]" : "bg-zinc-600"}`} />
                        <span>{label}</span>
                      </div>
                      {isActive && <span className="text-[#95eb27] font-bold">→</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#7a9d88]">OPERATIONS</p>
              <nav className="space-y-1">
                {primary.map(({ label, to, icon: Icon }) => {
                  const isActive = path === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#0d3826] text-white"
                          : "text-[#94b3a0] hover:bg-[#0c3120] hover:text-white"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-[#95eb27]" : "text-[#7a9d88]"} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User Profile Card at Sidebar Bottom matching Spark Admin */}
          <div className="border-t border-[#14422e] p-4">
            <Link to="/profile" className="mb-2 flex items-center gap-3 rounded-xl bg-[#0c3120] p-3 text-white hover:bg-[#0d3826] transition-colors">
              <span className="grid size-8 place-items-center rounded-lg bg-[#95eb27] font-extrabold text-xs text-[#072115]">AK</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">Arun Kumar</p>
                <p className="truncate text-[10px] text-[#8ca897]">Administrator</p>
              </div>
            </Link>
            <button
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#8ca897] hover:bg-[#0c3120] hover:text-white transition-colors"
              onClick={() => { signOut(); navigate({ to: "/login" }); }}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[#e1e8e2] bg-white px-2 py-2 lg:hidden">
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
  return (
    <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="text-xs font-extrabold uppercase tracking-wider text-[#10b981] mb-1">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-extrabold text-[#072115] sm:text-4xl tracking-tight">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm font-medium text-[#557060]">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function KpiCard({ label, value, detail, tone = "default", featured = false, className = "" }: { label: string; value: string; detail: string; tone?: "default" | "success" | "warning"; featured?: boolean; className?: string }) {
  if (featured) {
    return (
      <article className={`relative overflow-hidden rounded-2xl bg-[#072115] p-6 text-white shadow-xl ${className}`}>
        {/* Spark Star Decorative Watermark */}
        <div className="absolute -right-6 -bottom-6 text-[#95eb27]/10 pointer-events-none select-none">
          <svg width="160" height="160" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0L58 38L96 30L68 58L96 86L58 78L50 116L42 78L4 86L32 58L4 30L42 38Z" />
          </svg>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#17452d] bg-[#0c3120] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#95eb27]">
            <span className="size-2 rounded-full bg-[#95eb27] animate-pulse" />
            {label}
          </span>
          <span className="text-xs font-semibold text-[#8ca897]">Updated live</span>
        </div>

        <p className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white">{value}</p>
        <p className="mt-2 text-xs font-medium text-[#a2bcae]">{detail}</p>

        <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#95eb27] hover:underline cursor-pointer">
          <span>See Statistics</span>
          <span>→</span>
        </div>
      </article>
    );
  }

  const isWarning = tone === "warning" || detail.includes("excess") || detail.includes("loss");

  return (
    <article className={`rounded-2xl border border-[#e1e8e2] bg-white p-6 shadow-sm hover:shadow-md transition-all ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-[#557060]">{label}</p>
        <span className={`size-2.5 rounded-full ${isWarning ? "bg-[#ef4444]" : "bg-[#10b981]"}`} />
      </div>

      <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#072115]">{value}</p>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className={`font-semibold ${isWarning ? "text-[#ef4444]" : "text-[#10b981]"}`}>
          {detail}
        </span>
      </div>
    </article>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f4f1] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#557060]">
      <span className="size-1.5 rounded-full bg-[#10b981]" />
      Verified Telemetry
    </span>
  );
}

export function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`rounded-2xl border border-[#e1e8e2] bg-white p-6 shadow-sm hover:shadow-md transition-all ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-extrabold text-[#072115]">{title}</h2>
          {subtitle && <p className="mt-1 text-xs text-[#557060] font-medium">{subtitle}</p>}
        </div>
        <DemoBadge />
      </div>
      <div className="h-64">{children}</div>
    </article>
  );
}