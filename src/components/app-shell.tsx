import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, CircleGauge, CloudUpload, FileText, History, LogOut, Menu, UserRound, Wrench, X } from "lucide-react";
import { useState } from "react";
import { ReMarginLogo } from "./remargin-logo";
import logoImage from "@/assets/logo_transparent.png";
import { signOut } from "@/lib/remargin";

const primary = [
  { label: "Upload", to: "/upload", icon: CloudUpload },
  { label: "Tracker", to: "/tracker", icon: Wrench },
  { label: "Result", to: "/result", icon: CircleGauge },
  { label: "History", to: "/history", icon: History },
  { label: "Reports", to: "/reports", icon: FileText },
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

export function AppShell({ children }: { children: React.ReactNode; section?: "dashboard" | "reports" }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const sectionLinks = intelligence;

  return (
    <div className="min-h-screen bg-[#f2f5f3] font-sans text-[#072115]">
      {/* Top Header Bar matching Landing Page Dark Navbar Theme */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#14422e] bg-[#072115]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex items-center gap-3">
          <button className="text-zinc-300 hover:text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <ReMarginLogo variant="dark" />
        </div>

        <div className="flex items-center gap-3">
          {/* Profile Icon Button */}
          <Link
            to="/profile"
            className="flex size-9 items-center justify-center rounded-full border border-[#17452d] bg-[#0c3120] text-zinc-300 hover:text-white hover:bg-[#0d3826] hover:border-[#48a65e]/40 transition-all"
            aria-label="Factory Profile Setup"
            title="Factory Profile & Setup"
          >
            <UserRound size={18} />
          </Link>

          {/* Alert Button */}
          <button className="relative flex size-9 items-center justify-center rounded-full border border-[#17452d] bg-[#0c3120] text-zinc-300 hover:text-white hover:bg-[#0d3826] hover:border-[#48a65e]/40 transition-all" aria-label="Alerts & Notifications">
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#ef4444] ring-2 ring-[#072115]" />
          </button>
        </div>
      </header>

      <div className="flex">
        {open && <button className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}

        {/* Sidebar matching Spark Admin Dark Forest Theme */}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#072115] text-[#e2ebe5] transition-transform lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Logo Header using ReMargin Landing Page Logo */}
          <div className="flex h-16 items-center justify-between border-b border-[#14422e] px-5 lg:hidden">
            <ReMarginLogo variant="dark" />
            <button className="text-zinc-400 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <p className="px-3 pb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-[#7a9d88]">
                INTELLIGENCE
              </p>
              <nav className="space-y-2">
                {sectionLinks.map(([label, to], index) => {
                  const isActive = path === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`group relative flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 overflow-hidden ${
                        isActive
                          ? "bg-[#11291b] text-white shadow-xs border-l-4 border-l-[#48a65e] border-y border-r border-[#1a3f28]"
                          : "text-[#a2c2b0] hover:bg-[#0e2417] hover:text-white border-l-4 border-l-transparent hover:border-l-[#48a65e]/50"
                      }`}
                    >
                      <span className="font-extrabold text-[#48a65e] text-xs shrink-0">
                        0{index + 1}
                      </span>
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="px-3 pb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-[#7a9d88]">OPERATIONS</p>
              <nav className="space-y-2">
                {primary.map(({ label, to, icon: Icon }) => {
                  const isActive = path === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`group relative flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 overflow-hidden ${
                        isActive
                          ? "bg-[#11291b] text-white shadow-xs border-l-4 border-l-[#48a65e] border-y border-r border-[#1a3f28]"
                          : "text-[#a2c2b0] hover:bg-[#0e2417] hover:text-white border-l-4 border-l-transparent hover:border-l-[#48a65e]/50"
                      }`}
                    >
                      <Icon size={16} className={`shrink-0 transition-colors ${isActive ? "text-[#48a65e]" : "text-[#8aa897] group-hover:text-[#48a65e]"}`} />
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom User Profile Section */}
          <div className="border-t border-[#14422e] p-4">
            <Link to="/profile" className="flex items-center gap-3 px-1 mb-3 cursor-pointer hover:opacity-90 transition-opacity">
              <span className="grid size-9 place-items-center rounded-lg bg-[#48a65e] font-extrabold text-xs text-white">
                AK
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">Arun Kumar</p>
                <p className="truncate text-[11px] text-[#7a9d88]">Precision Works</p>
              </div>
            </Link>
            <button
              className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-bold text-[#94b3a0] hover:text-white transition-colors"
              onClick={() => { signOut(); navigate({ to: "/login" }); }}
            >
              <LogOut size={15} />
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
        {eyebrow && <p className="text-xs font-extrabold uppercase tracking-wider text-[#48a65e] mb-1">{eyebrow}</p>}
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
      <article className={`relative overflow-hidden rounded-xl bg-[#072115] p-4 text-white shadow-md border border-[#17452d] ${className}`}>
        {/* ReMargin Logo Decorative Watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none select-none">
          <img src={logoImage} alt="" className="w-28 h-28 object-contain" />
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#17452d] bg-[#0c3120] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#48a65e]">
            <span className="size-1 rounded-full bg-[#48a65e] animate-pulse" />
            {label}
          </span>
          <span className="text-[10px] font-semibold text-[#8ca897]">Live</span>
        </div>

        <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">{value}</p>
        <p className="mt-1 text-[11px] font-semibold text-[#48a65e]">{detail}</p>
      </article>
    );
  }

  const isWarning = tone === "warning" || detail.includes("excess") || detail.includes("loss");

  return (
    <article className={`rounded-xl border border-[#e1e8e2] bg-white p-4 shadow-xs hover:shadow-md transition-all ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#557060] truncate">{label}</p>
      </div>

      <p className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-[#072115]">{value}</p>

      <div className="mt-1.5 flex items-center justify-between text-[11px]">
        <span className={`font-semibold ${isWarning ? "text-[#ef4444]" : "text-[#10b981]"}`}>
          {detail}
        </span>
      </div>
    </article>
  );
}

export function DemoBadge() {
  return null;
}

export function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`rounded-2xl border border-[#e1e8e2] bg-white p-6 shadow-xs ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-extrabold text-[#072115]">{title}</h2>
          {subtitle && <p className="mt-1 text-xs font-medium text-[#557060]">{subtitle}</p>}
        </div>
      </div>
      <div className="h-64">{children}</div>
    </article>
  );
}