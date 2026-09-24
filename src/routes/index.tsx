import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Camera, CircleDollarSign, Cloud, Factory, FileCheck2, Gauge, Leaf, Recycle, ShieldCheck, SunMedium, Wrench } from "lucide-react";
import heroImage from "@/assets/remargin-factory.jpg";
import { ReMarginLogo } from "@/components/remargin-logo";

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

function LandingPage() {
  return <div className="bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-sidebar/90 text-sidebar-foreground backdrop-blur-xl">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <ReMarginLogo />
        <nav className="hidden justify-center gap-1 lg:flex">{["Problem", "Solution", "Features", "Novelty", "Insights", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="rounded-md px-3 py-2 text-xs font-semibold text-sidebar-muted transition hover:bg-sidebar-accent hover:text-sidebar-foreground">{item}</a>)}</nav>
        <div className="flex gap-2"><Link to="/login" className="hidden min-h-10 items-center px-3 text-sm font-bold sm:inline-flex">Login</Link><Link to="/register" className="button-primary min-h-10">Register <ArrowRight size={15} /></Link></div>
      </div>
    </header>

    <main>
      <section className="relative min-h-[92vh] overflow-hidden bg-sidebar text-sidebar-foreground">
        <img src={heroImage} alt="CNC manufacturing floor monitored by an operator" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-sidebar)_5%,color-mix(in_oklab,var(--color-sidebar)_88%,transparent)_44%,color-mix(in_oklab,var(--color-sidebar)_22%,transparent)_100%)]" />
        <div className="dark-grid relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-accent"><span className="h-px w-8 bg-accent" /> Factory decision intelligence</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">Measure Waste.<br /><span className="text-accent">Reduce Cost.</span><br />Build a Greener Factory.</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-sidebar-muted sm:text-lg">ReMargin helps CNC MSMEs turn unmeasured energy and material waste into actionable ₹ savings, carbon insights and compliance-ready reports.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/register" className="button-primary">Get Started <ArrowRight size={16} /></Link><a href="#solution" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-sidebar-border px-5 text-sm font-bold hover:bg-sidebar-accent">Explore ReMargin</a></div>
          <div className="mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-md border border-sidebar-border bg-sidebar-border sm:grid-cols-5">
            {["Energy waste|200 kWh", "₹ cost impact|₹1,600", "Carbon|0.86 tCO₂e", "Scrap|42 kg", "Efficiency|83.3%"].map((item) => { const [label, value] = item.split("|"); return <div key={label} className="bg-sidebar/90 p-4"><p className="text-[10px] uppercase text-sidebar-muted">{label}</p><p className="mt-2 font-display text-xl font-bold">{value}</p><p className="mt-1 text-[9px] text-sidebar-muted">Illustrative</p></div>; })}
          </div>
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><SectionIntro kicker="The challenge" title="Why CNC MSMEs Need ReMargin" text="Factory decisions are often trapped between fragmented records, technical measurements and changing reporting expectations." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">{[
          ["01", "Energy & ESG Data Is Difficult to Capture", "Many MSMEs rely on manual collection, fragmented records or specialist support.", "Factory → bills & slips → fragmented data → limited visibility", "Capture data without complex setup"],
          ["02", "Energy Waste Is Not Always Visible as ₹ Loss", "Technical metrics such as kWh, carbon and efficiency can be difficult to translate into immediate business decisions.", "1,200 kWh excess → ₹9,600 estimated impact", "Translate inefficiency into business language"],
          ["03", "Carbon Data Is Increasingly Important", "Export-oriented manufacturers may need reliable emissions information for covered products, supply chains or customer requirements.", "Energy + operations → structured carbon records", "Build an auditable data trail"],
        ].map(([num,title,text,flow,solution]) => <article key={num} className="panel flex min-h-80 flex-col"><span className="font-display text-sm font-bold text-primary">GAP {num}</span><h3 className="mt-6 font-display text-2xl font-bold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p><div className="my-6 border-y border-border py-4 text-xs font-semibold text-primary">{flow}<span className="block pt-1 text-[10px] font-normal text-muted-foreground">Illustrative workflow</span></div><p className="mt-auto flex items-center gap-2 text-sm font-bold"><ArrowRight size={15} className="text-primary" />{solution}</p></article>)}</div>
      </section>

      <section id="solution" className="bg-sidebar py-24 text-sidebar-foreground"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionIntro dark kicker="Connected workflow" title="From Factory Data to Action" text="Workers photograph records or enter values manually. ReMargin verifies, standardizes and converts them into a practical improvement cycle." />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{["Capture", "OCR / manual", "Verify", "Analyze ₹ impact", "Track & report"].map((step,i) => <div key={step} className="relative rounded-md border border-sidebar-border bg-sidebar-accent/40 p-5"><span className="text-xs text-accent">0{i+1}</span><p className="mt-8 font-display font-bold">{step}</p>{i<4 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden text-accent lg:block" size={22} />}</div>)}</div>
        <p className="mt-8 max-w-3xl text-sm text-sidebar-muted">Inputs include electricity meters, bills, scrap and production slips, machine specifications and maintenance information.</p></div></section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><SectionIntro kicker="Connected capabilities" title="One operating system for factory improvement" text="Not another passive energy dashboard. ReMargin connects evidence, diagnosis, action and reporting." /><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{features.map(([Icon,title,text]) => <article key={title} className="bg-background p-7 transition hover:bg-muted"><Icon className="text-primary" size={23} /><h3 className="mt-6 font-display text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></section>

      <section id="novelty" className="bg-app-canvas py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionIntro kicker="The ReMargin difference" title="What Makes ReMargin Different?" text="ReMargin connects energy, waste, money, maintenance, carbon and compliance in one workflow." /><div className="mt-12 grid overflow-hidden rounded-md border border-border lg:grid-cols-2"><Comparison title="Traditional approach" items={["kWh numbers", "Disconnected bills", "Manual reports", "Technical data", "Reactive maintenance", "Separate sustainability work"]} /><Comparison accent title="ReMargin" items={["₹ impact", "Unified factory data", "Automated reports", "Actionable insights", "Fix verification", "Sustainability + financial analysis"]} /></div><div className="mt-10 flex flex-wrap items-center justify-center gap-3">{["MEASURE", "UNDERSTAND", "QUANTIFY", "ACT", "VERIFY", "REPORT"].map((item,i) => <div key={item} className="flex items-center gap-3"><span className="rounded-full border border-primary/30 bg-background px-4 py-2 text-xs font-extrabold text-primary">{item}</span>{i<5&&<ArrowRight size={15} className="text-muted-foreground" />}</div>)}</div></div></section>

      <section id="insights" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><SectionIntro kicker="Three intelligence layers" title="See performance from every business angle" text="Operational evidence becomes carbon, sustainability and energy intelligence without losing the underlying factory context." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{[[Leaf,"Carbon Emission Tracking",["CO₂e","Scope 1 & 2","Emissions trend","Intensity"]],[Recycle,"Sustainability Analytics",["Efficiency","Scrap & yield","Waste trends","Improvements"]],[BarChart3,"Energy Monitoring",["Meter readings","Peak usage","₹ waste","Machine insights"]]].map(([Icon,title,items]) => { const I=Icon as typeof Leaf; return <article key={title as string} className="panel"><I size={28} className="text-primary"/><h3 className="mt-8 font-display text-2xl font-bold">{title as string}</h3><div className="my-7 flex flex-wrap gap-2">{(items as string[]).map(x=><span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground" key={x}>{x}</span>)}</div><Link to="/login" className="button-secondary">Explore <ArrowRight size={15}/></Link></article>; })}</div></section>

      <section id="contact" className="bg-primary py-20 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8"><div><p className="text-xs font-bold uppercase text-accent">Start with your factory data</p><h2 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-5xl">Turn hidden waste into your next measurable saving.</h2></div><Link to="/register" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-md bg-background px-6 text-sm font-extrabold text-foreground">Create your workspace <ArrowRight size={16}/></Link></div></section>
    </main>
    <Footer />
  </div>;
}

function SectionIntro({ kicker,title,text,dark=false }: { kicker:string;title:string;text:string;dark?:boolean }) { return <div className="max-w-3xl"><p className="eyebrow">{kicker}</p><h2 className={`font-display text-3xl font-bold sm:text-5xl ${dark?"text-sidebar-foreground":""}`}>{title}</h2><p className={`mt-5 leading-7 ${dark?"text-sidebar-muted":"text-muted-foreground"}`}>{text}</p></div>; }
function Comparison({title,items,accent=false}:{title:string;items:string[];accent?:boolean}) { return <div className={`p-8 ${accent?"bg-primary text-primary-foreground":"bg-background"}`}><p className="text-xs font-bold uppercase opacity-70">{title}</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{items.map(item=><li key={item} className="flex items-center gap-2 text-sm font-semibold"><span className={`size-1.5 rounded-full ${accent?"bg-accent":"bg-muted-foreground"}`}/>{item}</li>)}</ul></div>; }
function Footer(){return <footer className="bg-sidebar py-16 text-sidebar-foreground"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><ReMarginLogo/><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[["Product","Dashboard|Energy Monitoring|Carbon Tracking|Sustainability Analytics|Reports|Maintenance"],["Resources","How It Works|Features|Novelty|FAQ"],["Account","Login|Register|Profile"],["Support","Feedback|Contact Us|support@remargin.in|+91 90000 00000"]].map(([h,list])=><div key={h}><h3 className="text-xs font-bold uppercase text-accent">{h}</h3><ul className="mt-4 space-y-2 text-sm text-sidebar-muted">{list.split("|").map(x=><li key={x}>{x}</li>)}</ul></div>)}</div><div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-sidebar-border pt-6 text-xs text-sidebar-muted"><p>© 2026 ReMargin. All rights reserved.</p><p>Privacy Policy · Terms</p></div></div></footer>}