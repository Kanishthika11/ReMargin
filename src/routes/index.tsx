import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Camera, CircleDollarSign, Cloud, Factory, FileCheck2, Gauge, Leaf, Recycle, ShieldCheck, SunMedium, Wrench, ArrowUpRight, Network, Target, FileText, Cpu, ScanLine, CalendarDays, Lock } from "lucide-react";
import greenGlobeImage from "@/assets/green_globe.png";
import { HeroGlobe } from "@/components/hero-globe";
import noveltyImg1 from "@/assets/novelty_01.jpg";
import noveltyImg2 from "@/assets/novelty_02.jpg";
import noveltyImg3 from "@/assets/novelty_03.jpg";
import noveltyImg4 from "@/assets/novelty_04.jpg";
import noveltyImg5 from "@/assets/novelty_05.jpg";
import noveltyImg6 from "@/assets/novelty_06.jpg";
import { ReMarginLogo } from "@/components/remargin-logo";
import { ParticleSphere } from "@/components/particle-sphere";
import { ComparisonChart, ScopeChart, TrendChart } from "@/components/charts";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "ReMargin — Measure Waste. Reduce Cost. Build a Greener Factory." }, { name: "description", content: "ReMargin turns CNC factory energy and material waste into measurable savings, carbon insight and compliance-ready reports." }, { property: "og:title", content: "ReMargin — Factory sustainability intelligence" }, { property: "og:description", content: "Measure waste, reduce cost and build a greener CNC factory." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: LandingPage,
});

const features = [
  [Camera, "Photo-First Data Capture", "Upload meter, bill and production-slip photos. Review extracted values before they enter analysis."],
  [CircleDollarSign, "₹ Loss Alerts", "Translate excess energy and material use into an estimated monetary impact factory teams can act on."],
  [Recycle, "Scrap & Yield Tracking", "Measure input, output, yield and excess scrap with a clear cost connection."],
  [Wrench, "Fix Tracker", "Record corrective actions and compare performance after each intervention."],
  [FileCheck2, "Auto ESG Reporting", "Organize verified operational data into sustainability and ESG-oriented outputs."],
  [Cloud, "Carbon Tracking", "Track relevant Scope 1 and Scope 2 emissions and visualize changes over time."],
  [Gauge, "Maintenance Intelligence", "Connect service schedules and machine condition with unusual energy patterns."],
  [ShieldCheck, "Green Loan Proposal", "Frame upgrades with investment, savings, ROI and supporting factory evidence."],
  [SunMedium, "Solar Feasibility", "Use actual consumption patterns to model capacity, savings and payback."],
] as const;

const noveltyItems = [
  {
    num: "01",
    title: "Cost Intelligence",
    icon: CircleDollarSign,
    image: noveltyImg1,
    description: "Transforming operational inefficiencies into measurable financial impact, so teams can understand where value is being lost and prioritize corrective action."
  },
  {
    num: "02",
    title: "One Data Thread",
    icon: Network,
    image: noveltyImg2,
    description: "Energy, scrap, production and maintenance don't live in separate silos. ReMargin connects them in one operational picture."
  },
  {
    num: "03",
    title: "Verified Improvement",
    icon: Target,
    image: noveltyImg3,
    description: "Track interventions from identification to resolution and measure the resulting change — creating a clear, evidence-based improvement cycle."
  },
  {
    num: "04",
    title: "Reporting from the Same Data",
    icon: FileText,
    image: noveltyImg4,
    description: "Turn operational data into structured carbon, ESG and sustainability reporting without creating a separate reporting workflow."
  },
  {
    num: "05",
    title: "Built for Lean Teams",
    icon: Cpu,
    image: noveltyImg5,
    description: "No complicated rollout. No dependency on a dedicated technical team. Just a simpler path from factory data to useful action."
  },
  {
    num: "06",
    title: "Capture Without Complexity",
    icon: ScanLine,
    image: noveltyImg6,
    description: "Bills, meter readings, slips and production data can enter through the workflows factory teams already use."
  }
] as const;

const intelligenceLayers = [
  {
    id: "carbon",
    num: "01",
    title: "CARBON EMISSION TRACKING",
    eyebrow: "Scope 1 & 2 Intelligence",
    headline: "Real-Time Scope 1 & 2 Telemetry That Drives Factory Carbon Reduction",
    description: "ReMargin converts energy and fuel telemetry directly into verified carbon intensity metrics. Track emissions over time, identify peak contributors, and export compliance-ready sustainability reports.",
    checklist: [
      "Scope 1 Direct Generator & Combustion Telemetry",
      "Scope 2 Power Grid Electricity Carbon Analytics",
      "Per-Unit Carbon Intensity & ESG Compliance Exports"
    ],
    tags: ["CO₂e", "Scope 1 & 2", "Emissions trend", "Intensity"],
    icon: Leaf,
    route: "/dashboard/carbon",
    kpis: [
      { label: "Total CO₂e", value: "6.74 t", detail: "↓ 8.2% from previous period", tone: "success" as const },
      { label: "Scope 1", value: "1.21 t", detail: "18% of recorded emissions", tone: "default" as const },
      { label: "Scope 2", value: "5.53 t", detail: "82% electricity estimate", tone: "default" as const },
      { label: "Carbon Intensity", value: "0.74 kg/unit", detail: "↓ 5.4% per unit", tone: "success" as const },
    ],
    leftChartTitle: "Scope 1 vs Scope 2",
    leftChartSubtitle: "Recorded emissions split",
    leftChartType: "scope" as const,
    rightChartTitle: "Carbon Emissions Over Time",
    rightChartSubtitle: "Monthly estimated tCO₂e",
    rightChartType: "carbon" as const,
  },
  {
    id: "sustainability",
    num: "02",
    title: "SUSTAINABILITY ANALYTICS",
    eyebrow: "Yield & Cost Intelligence",
    headline: "Connect Energy Efficiency, Material Scrap & Cost Recovery in One Unified View",
    description: "Energy, scrap material, and machine performance shouldn't live in separate spreadsheets. ReMargin links raw input material to final yield, calculating exact monetary loss and verified savings.",
    checklist: [
      "Unified Yield & Material Scrap Operating Picture",
      "Financial Loss Calculations for Material Scrap",
      "Verified Corrective Fix Tracker with Post-Fix ROI"
    ],
    tags: ["Efficiency", "Scrap & yield", "Waste trends", "Improvements"],
    icon: Recycle,
    route: "/dashboard/sustainability",
    kpis: [
      { label: "Energy Efficiency", value: "86.7%", detail: "↑ 3.1 points", tone: "success" as const },
      { label: "Scrap Rate", value: "8.4%", detail: "↓ 1.2 points", tone: "success" as const },
      { label: "Production Yield", value: "91.6%", detail: "420 kg usable output", tone: "default" as const },
      { label: "Recovered Cost", value: "₹14,200", detail: "Verified actions", tone: "success" as const },
    ],
    leftChartTitle: "Energy Efficiency Trend",
    leftChartSubtitle: "Actual efficiency by month",
    leftChartType: "yield" as const,
    rightChartTitle: "Scrap Trend",
    rightChartSubtitle: "Material loss over time",
    rightChartType: "waste" as const,
  },
  {
    id: "energy",
    num: "03",
    title: "ENERGY MONITORING",
    eyebrow: "Telemetry & Waste Intelligence",
    headline: "Real-Time Telemetry & Avoidable Monetary Waste Detection Across CNC Machines",
    description: "Monitor live kWh consumption, peak demand spikes, and machine idle waste. ReMargin translates excess energy usage directly into monetary cost alerts so factory teams can act immediately.",
    checklist: [
      "Sub-meter & Photo OCR Ingestion for 100% Accuracy",
      "Peak Demand & Machine Idle Waste Detection Alerts",
      "Direct Rupee Cost Tied to Excess kWh Consumption"
    ],
    tags: ["Meter readings", "Peak usage", "₹ waste", "Machine insights"],
    icon: BarChart3,
    route: "/dashboard/energy",
    kpis: [
      { label: "Period Consumption", value: "7,840 kWh", detail: "All recorded sources", tone: "default" as const },
      { label: "Daily Average", value: "261 kWh", detail: "30-day average", tone: "default" as const },
      { label: "Peak Usage", value: "418 kWh", detail: "Highest recorded day", tone: "warning" as const },
      { label: "Estimated ₹ Waste", value: "₹9,600", detail: "1,200 kWh excess", tone: "warning" as const },
    ],
    leftChartTitle: "Daily Energy Consumption",
    leftChartSubtitle: "Actual kWh trend",
    leftChartType: "energy" as const,
    rightChartTitle: "Actual vs Ideal Energy",
    rightChartSubtitle: "Illustrative benchmark comparison",
    rightChartType: "comparison" as const,
  },
];

const slogans = [
  "Track Energy Usage & ₹ Loss",
  "Reduce Waste & Improve Yield",
  "Track Fixes & Verify Efficiency",
  "Automate ESG, BRSR & Carbon Reporting"
];

function LandingPage() {
  const [activeGap, setActiveGap] = useState("01");
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeNovelty, setActiveNovelty] = useState(0);
  const [activeIntelligence, setActiveIntelligence] = useState(0);
  const [activeSlogan, setActiveSlogan] = useState(0);

  useEffect(() => {
    const sloganTimer = setInterval(() => {
      setActiveSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(sloganTimer);
  }, []);

  useEffect(() => {
    const featureTimer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 9);
    }, 4000);
    return () => clearInterval(featureTimer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveGap(entry.target.id.replace('gap-', ''));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    ["01", "02", "03"].forEach((id) => {
      const el = document.getElementById(`gap-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for right column scrollable items updating left sticky menu
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute("data-intel-index");
            if (idxAttr !== null) {
              const idx = parseInt(idxAttr, 10);
              if (!isNaN(idx)) {
                setActiveIntelligence(idx);
              }
            }
          }
        });
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0.2,
      }
    );

    intelligenceLayers.forEach((_, idx) => {
      const el = document.getElementById(`intel-scroll-item-${idx}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return <div className="bg-background text-foreground min-h-screen">
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 text-foreground backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto grid h-20 max-w-[90rem] grid-cols-[auto_1fr_auto] items-center px-6 lg:px-12">
        <ReMarginLogo />
        <nav className="hidden justify-center gap-6 lg:flex">
          {["Problem", "Features", "Novelty", "Insights", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition hover:text-primary">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex gap-4">
          <Link to="/login" className="hidden items-center text-xs font-bold uppercase tracking-wider sm:flex hover:text-primary transition-colors">Login</Link>
          <Link to="/register" className="button-pill">Get Started <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </header>

    <main>
      <section className="relative min-h-[100vh] overflow-hidden bg-background flex flex-col justify-center pt-20">
        <div className="mx-auto flex max-w-[90rem] flex-col-reverse lg:flex-row items-center gap-12 px-6 lg:px-12 w-full">
          {/* Left Content */}
          <div className="flex-1 space-y-8 z-10 py-12 lg:py-0">
            <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl tracking-tight">
              From Invisible Loss to Intelligent Gain<br/>
              <span key={activeSlogan} className="text-primary animate-fade-in-up inline-block mt-2 text-2xl sm:text-3xl lg:text-4xl">{slogans[activeSlogan]}</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Know your factory energy—precisely.<br/>
              End-to-end clean-power and scrap intelligence powered by science, telemetry, and transparent data you can trust.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/register" className="button-pill">Get Started <ArrowUpRight size={16} /></Link>
              <a href="#features" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 text-xs font-bold uppercase tracking-wider hover:bg-muted transition-colors">Explore ReMargin</a>
            </div>
          </div>

          {/* Right Hero Video Graphic */}
          <div className="flex-1 relative w-full h-[50vh] lg:h-[80vh] flex items-center justify-center">
            <div className="relative w-full max-w-lg animate-float">
              <HeroGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Other sections with updated styling */}
      <section id="problem" className="relative py-24 overflow-hidden border-t border-border/50">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={greenGlobeImage} alt="Green globe" className="w-full h-full object-cover opacity-70 animate-bg-drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 mx-auto flex max-w-[90rem] flex-col lg:flex-row items-start gap-16 px-6 lg:px-12">
          {/* Left Side: Graph Card */}
          <div className="lg:w-1/2 flex items-center lg:sticky lg:top-64 h-fit pb-16 lg:pb-0 z-20">
            <div className="glass-card p-8 lg:p-10 rounded-3xl w-full border border-primary/20 shadow-[0_0_50px_rgba(var(--color-primary),0.05)] bg-card/80">
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3">
                   <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Data Streaming</span>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last 7 Days</span>
               </div>
               
               <h3 className="text-4xl lg:text-5xl font-display font-bold text-primary mb-3">+12.4 MWh</h3>
               <p className="text-sm text-muted-foreground mb-12">Verified generation increased across the portfolio over the past seven days.</p>
               
               {/* Static Bar Chart */}
               <div className="flex items-end gap-2 h-40 mb-10 border-b border-border/50 pb-2">
                 {[40, 60, 50, 70, 60, 80, 90, 70, 100, 80, 110, 90, 120].map((h, i) => (
                   <div key={i} className="flex-1 bg-primary/80 rounded-t-sm transition-all duration-300" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
               
               <div className="space-y-6">
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                   <div className="flex items-center gap-3 text-muted-foreground"><div className="size-1.5 rounded-full bg-primary"></div> Energy Waste Detected</div>
                   <div className="text-primary text-sm">8.42 MWh</div>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                   <div className="flex items-center gap-3 text-muted-foreground"><div className="size-1.5 rounded-full bg-primary"></div> Scrap Reduced</div>
                   <div className="text-primary text-sm">412 KG</div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Right Side: Sliding Contents */}
          <div className="lg:w-1/2 lg:pl-10 pb-40">
            {[
              {
                num: "01",
                title: "Smaller Manufacturers Lack Energy Data & Audit Evidence",
                text: (
                  <>
                    Smaller manufacturers often lack energy data and audit evidence to larger companies. In the IEA’s 2025 survey, <strong className="text-foreground font-bold">fewer than 15% of companies with &lt;100 employees had conducted an energy audit</strong>, while <strong className="text-foreground font-bold">40–80% of CNCs could not implement individual energy-efficiency measures</strong>.
                  </>
                ),
              },
              {
                num: "02",
                title: "Existing Tools Focus on kWh & Carbon, Not Financial Cost",
                text: (
                  <>
                    Most shops ignore existing tools because kWh and carbon don’t directly matter to their business but <strong className="text-foreground font-bold">cost does</strong>, and current tools don’t link energy waste to financial impact.
                  </>
                ),
              },
              {
                num: "03",
                title: "Fragmented Records Maintained in Silos",
                text: (
                  <>
                    Electricity bills, machine records, production data, fuel records and scrap data are often <strong className="text-foreground font-bold">maintained separately, making it difficult to connect energy consumption with cost, carbon and production performance</strong>.
                  </>
                ),
              },
            ].map(({ num, title, text }) => (
              <div 
                id={`gap-${num}`}
                key={num} 
                className={`transition-all duration-700 ease-out min-h-[50vh] flex flex-col justify-center ${activeGap === num ? 'opacity-100 translate-y-0 scale-100' : 'opacity-10 translate-y-16 scale-95'}`}
              >
                <p className="text-sm font-extrabold uppercase tracking-widest text-primary mb-5">Gap {num}</p>
                <h3 className="font-display text-3xl lg:text-4xl font-extrabold mb-6 leading-[1.15] text-foreground tracking-tight">{title}</h3>
                <div className="text-lg leading-relaxed text-foreground/90 font-medium max-w-lg">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative mx-auto max-w-[90rem] px-6 py-32 lg:px-12">
        <SectionIntro kicker="Connected capabilities" title="One operating system for factory improvement" text="Not another passive energy dashboard. ReMargin connects evidence, diagnosis, action and reporting." />
        
        <div className="mt-24 grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-start">
          {/* Left Cards (0, 1, 2) */}
          <div className="space-y-8 flex flex-col pt-12">
            {features.slice(0, 3).map(([Icon,title,text], idx) => (
              <article 
                key={title} 
                className={`glass-card p-8 rounded-3xl transition-all duration-500 border group relative overflow-hidden ${activeFeature === idx ? 'border-primary/60 scale-[1.02] shadow-[0_0_30px_rgba(var(--color-primary),0.15)] bg-gradient-to-br from-primary/10 to-card' : 'border-primary/20 bg-gradient-to-br from-card/80 to-card hover:border-primary/50 hover:scale-[1.02]'}`}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/0 blur-xl transition-opacity duration-700 ${activeFeature === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                
                <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-6 relative z-10 transition-colors ${activeFeature === idx ? 'bg-primary/30 border-primary/50' : 'bg-primary/10 border-primary/30 group-hover:bg-primary/20'}`}>
                  <Icon className="text-primary" size={20} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 relative z-10">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground relative z-10">{text}</p>
                
                <div className="mt-8 relative z-10">
                  <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-wider">
                    <ArrowUpRight size={14} /> Discover module
                  </a>
                </div>
              </article>
            ))}
          </div>
          
          {/* Center Column: Card 3 (Top) + Graphic (Bottom) */}
          <div className="flex flex-col items-center space-y-12">
            {/* Top Center Card (Card 3 - Fix Tracker) */}
            {features.slice(3, 4).map(([Icon,title,text], idx) => {
              const actualIdx = 3;
              return (
                <article 
                  key={title} 
                  className={`glass-card p-8 rounded-3xl transition-all duration-500 border w-full max-w-sm group relative overflow-hidden ${activeFeature === actualIdx ? 'border-primary/60 scale-[1.02] shadow-[0_0_30px_rgba(var(--color-primary),0.15)] bg-gradient-to-br from-primary/10 to-card' : 'border-primary/20 bg-gradient-to-br from-card/80 to-card hover:border-primary/50 hover:scale-[1.02]'}`}
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`absolute -inset-1 bg-gradient-to-t from-primary/30 to-primary/0 blur-xl transition-opacity duration-700 ${activeFeature === actualIdx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  
                  <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-6 relative z-10 transition-colors ${activeFeature === actualIdx ? 'bg-primary/30 border-primary/50' : 'bg-primary/10 border-primary/30 group-hover:bg-primary/20'}`}>
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 relative z-10">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground relative z-10">{text}</p>
                  
                  <div className="mt-8 relative z-10">
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-wider">
                      <ArrowUpRight size={14} /> Discover module
                    </a>
                  </div>
                </article>
              );
            })}

            {/* Center Graphic */}
            <div className="relative flex items-center justify-center w-full max-w-md mx-auto h-[400px]">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
              
              {/* Main sphere */}
              <div className="relative h-80 w-80 rounded-full border border-primary/20 bg-background/20 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(var(--color-primary),0.15)] group">
                <ParticleSphere />
                
                {/* Content (Cycling) */}
                <div key={activeFeature} className="relative z-10 text-center space-y-4 p-8 animate-fade-in w-full">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary h-8 line-clamp-2">{features[activeFeature][1]}</p>
                  <div className="font-display text-5xl font-extrabold text-foreground tracking-tighter shadow-sm">+95%</div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Visibility Reached</p>
                  
                  <div className="pt-4 grid grid-cols-2 gap-4 border-t border-border/50 mt-4 text-left">
                    <div>
                      <p className="text-lg font-bold text-foreground">70%</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Less Manual Effort</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">100%</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Audit-ready at any time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards (4, 5, 6) */}
          <div className="space-y-8 flex flex-col pt-12">
            {features.slice(4, 7).map(([Icon,title,text], idx) => {
              const actualIdx = idx + 4;
              return (
                <article 
                  key={title} 
                  className={`glass-card p-8 rounded-3xl transition-all duration-500 border group relative overflow-hidden ${activeFeature === actualIdx ? 'border-primary/60 scale-[1.02] shadow-[0_0_30px_rgba(var(--color-primary),0.15)] bg-gradient-to-bl from-primary/10 to-card' : 'border-primary/20 bg-gradient-to-bl from-card/80 to-card hover:border-primary/50 hover:scale-[1.02]'}`}
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`absolute -inset-1 bg-gradient-to-l from-primary/30 to-primary/0 blur-xl transition-opacity duration-700 ${activeFeature === actualIdx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  
                  <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-6 relative z-10 transition-colors ${activeFeature === actualIdx ? 'bg-primary/30 border-primary/50' : 'bg-primary/10 border-primary/30 group-hover:bg-primary/20'}`}>
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 relative z-10">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground relative z-10">{text}</p>
                  
                  <div className="mt-8 relative z-10">
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-wider">
                      <ArrowUpRight size={14} /> Discover module
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        
        {/* Remaining Features (Full size cards adjacent to each other) */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {features.slice(7).map(([Icon,title,text], idx) => {
            const actualIdx = idx + 7;
            return (
              <article 
                key={title} 
                className={`glass-card p-8 rounded-3xl transition-all duration-500 border group relative overflow-hidden ${activeFeature === actualIdx ? 'border-primary/60 scale-[1.02] shadow-[0_0_30px_rgba(var(--color-primary),0.15)] bg-gradient-to-t from-primary/10 to-card' : 'border-primary/20 bg-gradient-to-t from-card/80 to-card hover:border-primary/50 hover:scale-[1.02]'}`}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`absolute -inset-1 bg-gradient-to-b from-primary/30 to-primary/0 blur-xl transition-opacity duration-700 ${activeFeature === actualIdx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                
                <div className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-6 relative z-10 transition-colors ${activeFeature === actualIdx ? 'bg-primary/30 border-primary/50' : 'bg-primary/10 border-primary/30 group-hover:bg-primary/20'}`}>
                  <Icon className="text-primary" size={20} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 relative z-10">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground relative z-10">{text}</p>
                
                <div className="mt-8 relative z-10">
                  <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-wider">
                    <ArrowUpRight size={14} /> Discover module
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="novelty" className="bg-[#f4f9e8] py-32 text-zinc-900 relative overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#5c9c14] mb-4">The ReMargin difference</p>
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl tracking-tight text-[#1c3520]">What Makes ReMargin Different?</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#3a543e] font-medium">ReMargin connects energy, waste, money, maintenance, carbon and compliance in one workflow.</p>
          </div>
          
          <div className="space-y-4 max-w-7xl mx-auto">
            {noveltyItems.map((item, idx) => {
              const isActive = activeNovelty === idx;
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  onClick={() => setActiveNovelty(idx)}
                  onMouseEnter={() => setActiveNovelty(idx)}
                  className={`group relative rounded-xl p-5 lg:p-7 transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-[#c3f638] via-[#d7fa65] to-[#e8fca8] text-[#112615] shadow-xl scale-[1.005]"
                      : "bg-[#eef6d8] hover:bg-gradient-to-r hover:from-[#dcf878] hover:to-[#eef6d8] text-[#112615]"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_auto_1.6fr] items-center gap-6">
                    {/* Left: Number + Icon + Topic Name */}
                    <div className="flex items-center gap-4">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isActive ? "bg-[#112615] text-[#b4f63c] shadow-md" : "bg-white text-[#112615] shadow-sm"
                      }`}>
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Center Image Floating Card (Sunara Framer signature 3D visual preview) */}
                    <div className="relative flex items-center justify-center py-2 lg:py-0 px-2">
                      <div className={`transition-all duration-500 transform ${
                        isActive
                          ? "opacity-100 scale-105 rotate-[-3deg] translate-y-0"
                          : "opacity-40 scale-95 rotate-0 group-hover:opacity-75"
                      }`}>
                        <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl w-44 h-28 lg:w-52 lg:h-32 bg-black/10">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: Explanation */}
                    <div className="lg:pl-6">
                      <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                        isActive ? "text-[#112615] font-semibold" : "text-[#3a543e]"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="insights" className="bg-[#080c0a] border-y border-border/40 py-28 text-white relative">
        <div className="mx-auto max-w-[90rem] px-6 lg:px-12 relative z-10">
          {/* Top Header matching Auraform UI */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary mb-4">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              FEATURES SHOWCASE
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl">
              See What ReMargin AI Can Do for You
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-medium">
              Operational evidence becomes carbon, sustainability and energy intelligence without losing the underlying factory context.
            </p>
          </div>

          {/* Grid Layout: Constant/Sticky Left Menu + Scrollable Right Dashboards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
            {/* LEFT SIDE: Constant Sticky Menu (span 3 columns) */}
            <div className="hidden lg:block lg:col-span-3 sticky top-36 space-y-6 self-start border-l border-zinc-800/80 pl-6 z-20">
              {intelligenceLayers.map((layer, idx) => {
                const isActive = activeIntelligence === idx;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setActiveIntelligence(idx);
                      document.getElementById(`intel-scroll-item-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`w-full text-left py-2.5 flex items-center justify-between text-xs font-mono font-extrabold uppercase tracking-widest transition-all duration-300 group cursor-pointer ${
                      isActive ? "text-white scale-105" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span>{layer.title}</span>
                    <span
                      className={`size-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#b4f63c] shadow-[0_0_12px_#b4f63c] scale-125"
                          : "bg-zinc-700 opacity-40 group-hover:opacity-80"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile Horizontal Sticky Header Bar */}
            <div className="lg:hidden sticky top-20 z-20 py-3 bg-[#080c0a]/95 backdrop-blur-md flex items-center gap-2 overflow-x-auto border-b border-zinc-800/80 mb-6">
              {intelligenceLayers.map((layer, idx) => {
                const isActive = activeIntelligence === idx;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setActiveIntelligence(idx);
                      document.getElementById(`intel-scroll-item-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#b4f63c] text-black shadow-[0_0_15px_rgba(180,246,60,0.4)]"
                        : "bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {layer.num} {layer.title}
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE: Scrollable Dashboards & Info Cards (span 9 columns) */}
            <div className="lg:col-span-9 space-y-36">
              {intelligenceLayers.map((layer, idx) => {
                return (
                  <div
                    key={layer.id}
                    id={`intel-scroll-item-${idx}`}
                    data-intel-index={idx}
                    className="scroll-mt-36 space-y-12"
                  >
                    {/* Dashboard Frame (matching our website dashboard graphics & live charts) */}
                    <div className="relative group">
                      {/* Ambient Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-emerald-500/10 to-primary/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

                      <div className="relative rounded-3xl border border-zinc-800/90 bg-zinc-950/95 shadow-2xl overflow-hidden backdrop-blur-xl">
                        {/* macOS Window Title Bar */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-900/60">
                          <div className="flex items-center gap-2">
                            <span className="size-3 rounded-full bg-[#ff5f56]" />
                            <span className="size-3 rounded-full bg-[#ffbd2e]" />
                            <span className="size-3 rounded-full bg-[#27c93f]" />
                          </div>

                          <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                            <Lock size={12} className="text-[#b4f63c]" />
                            <span>remargin.app/dashboard/{layer.id}</span>
                          </div>

                          <Link
                            to={layer.route}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b4f63c] hover:text-white transition-colors"
                          >
                            <span>Full View</span>
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>

                        {/* Window Body — Live Website Dashboard View */}
                        <div className="p-6 lg:p-8 space-y-6">
                          {/* Dashboard Header Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
                            <div>
                              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b4f63c]">
                                {layer.eyebrow}
                              </span>
                              <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white mt-1">
                                {layer.title}
                              </h3>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300">
                              <CalendarDays size={14} className="text-primary" />
                              <span>Apr – Sep 2026</span>
                            </div>
                          </div>

                          {/* KPI Cards Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {layer.kpis.map((kpi) => (
                              <div
                                key={kpi.label}
                                className={`p-4 rounded-xl border bg-zinc-900/60 backdrop-blur-md ${
                                  kpi.tone === "warning"
                                    ? "border-amber-500/30 bg-amber-500/5"
                                    : kpi.tone === "success"
                                    ? "border-emerald-500/30 bg-emerald-500/5"
                                    : "border-zinc-800"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                    {kpi.label}
                                  </span>
                                  <span
                                    className={`size-2 rounded-full ${
                                      kpi.tone === "warning"
                                        ? "bg-amber-400"
                                        : kpi.tone === "success"
                                        ? "bg-[#b4f63c]"
                                        : "bg-zinc-600"
                                    }`}
                                  />
                                </div>
                                <p className="font-display text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                                  {kpi.value}
                                </p>
                                <p className="text-[11px] text-zinc-400 mt-1 font-medium">{kpi.detail}</p>
                              </div>
                            ))}
                          </div>

                          {/* Live Interactive Charts Pair */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                            <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
                              <div className="mb-4">
                                <h4 className="font-display text-base font-bold text-white">
                                  {layer.leftChartTitle}
                                </h4>
                                <p className="text-xs text-zinc-400">{layer.leftChartSubtitle}</p>
                              </div>
                              <div className="h-56">
                                {layer.leftChartType === "scope" ? (
                                  <ScopeChart />
                                ) : (
                                  <TrendChart kind={layer.leftChartType} />
                                )}
                              </div>
                            </div>

                            <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
                              <div className="mb-4">
                                <h4 className="font-display text-base font-bold text-white">
                                  {layer.rightChartTitle}
                                </h4>
                                <p className="text-xs text-zinc-400">{layer.rightChartSubtitle}</p>
                              </div>
                              <div className="h-56">
                                {layer.rightChartType === "comparison" ? (
                                  <ComparisonChart />
                                ) : (
                                  <TrendChart kind={layer.rightChartType} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Information & Feature Checklist Section (Matching Auraform Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 px-2">
                      <div className="lg:col-span-7 space-y-4">
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                          {layer.headline}
                        </h3>
                        <p className="text-base leading-relaxed text-zinc-400 font-medium">
                          {layer.description}
                        </p>
                        <div className="pt-2">
                          <Link
                            to={layer.route}
                            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#b4f63c] hover:text-white transition-colors"
                          >
                            <span>Explore {layer.title}</span>
                            <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-3">
                        {layer.checklist.map((item, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-3.5 p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/60 backdrop-blur-sm">
                            <span className="size-6 rounded-full bg-[#b4f63c]/20 border border-[#b4f63c]/40 flex items-center justify-center text-[#b4f63c] text-xs font-bold shrink-0">
                              ✓
                            </span>
                            <span className="text-sm font-semibold text-zinc-200">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-muted/30 border-y border-border/50 py-32">
        <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Start with your factory data</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold sm:text-6xl tracking-tight">Turn hidden waste into your next measurable saving.</h2>
          </div>
          <Link to="/register" className="button-pill shrink-0 scale-110">Create your workspace <ArrowUpRight size={18}/></Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}

function SectionIntro({ kicker,title,text,dark=false }: { kicker:string;title:string;text:string;dark?:boolean }) { 
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${dark?"text-primary-foreground/70":"text-primary"}`}>{kicker}</p>
      <h2 className={`font-display text-4xl font-bold sm:text-5xl tracking-tight ${dark?"text-primary-foreground":""}`}>{title}</h2>
      <p className={`mt-6 text-lg leading-relaxed ${dark?"text-primary-foreground/70":"text-muted-foreground"}`}>{text}</p>
    </div>
  ); 
}

function Comparison({title,items,accent=false}:{title:string;items:string[];accent?:boolean}) { 
  return (
    <div className={`p-10 ${accent?"bg-primary-foreground/10 text-primary-foreground":"bg-background"}`}>
      <p className="text-xs font-bold uppercase tracking-widest opacity-70">{title}</p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map(item => (
          <li key={item} className="flex items-center gap-3 text-sm font-bold">
            <span className={`flex-shrink-0 size-2 rounded-full ${accent?"bg-primary":"bg-muted-foreground"}`}/>
            {item}
          </li>
        ))}
      </ul>
    </div>
  ); 
}

function Footer(){
  return (
    <footer className="bg-background py-20 border-t border-border/50">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-12">
        <ReMarginLogo/>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Product","Dashboard|Energy Monitoring|Carbon Tracking|Sustainability Analytics|Reports|Maintenance"],
            ["Resources","How It Works|Features|Novelty|FAQ"],
            ["Account","Login|Register|Profile"],
            ["Support","Feedback|Contact Us|support@remargin.in|+91 90000 00000"]
          ].map(([h,list]) => (
            <div key={h}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">{h}</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground font-medium">
                {list.split("|").map(x => <li key={x} className="hover:text-foreground transition-colors cursor-pointer">{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap justify-between gap-6 border-t border-border pt-8 text-xs font-bold tracking-wider text-muted-foreground uppercase">
          <p>© 2026 ReMargin. All rights reserved.</p>
          <div className="flex gap-6">
            <p className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</p>
            <p className="hover:text-foreground transition-colors cursor-pointer">Terms</p>
          </div>
        </div>
      </div>
    </footer>
  )
}