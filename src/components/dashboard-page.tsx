import { CalendarDays, Download, Lightbulb, TrendingDown, Wrench } from "lucide-react";
import { AppShell, ChartCard, KpiCard, PageHeader } from "./app-shell";
import { ComparisonChart, ScopeChart, TrendChart } from "./charts";

const content = {
  carbon: { title:"Carbon Tracker", description:"Track relevant factory emissions and understand what is driving the trend.", kpis:[["Total CO₂e","6.74 t","↓ 8.2% from previous period","success"],["Scope 1","1.21 t","18% of recorded emissions","default"],["Scope 2","5.53 t","Electricity-related estimate","default"],["Carbon intensity","0.74 kg/unit","↓ 5.4% per unit","success"],["Period change","−0.60 t","Improvement vs last period","success"]], charts:[["Carbon emissions over time","Monthly estimated tCO₂e","carbon"],["Scope 1 vs Scope 2","Recorded emissions split","scope"],["Emissions by machine","Estimated from machine energy share","comparison"],["Monthly trend","Rolling factory carbon performance","carbon"]]},
  sustainability: { title:"Sustainability Analytics", description:"Connect energy efficiency, material yield and cost recovery in one operating view.", kpis:[["Energy efficiency","86.7%","↑ 3.1 points","success"],["Scrap rate","8.4%","↓ 1.2 points","success"],["Production yield","91.6%","420 kg usable output","success"],["Energy cost","₹84,600","Current period estimate","default"],["Estimated ₹ loss","₹9,600","Energy + material waste","warning"],["Recovered cost","₹14,200","Verified improvement actions","success"]], charts:[["Energy efficiency trend","Actual efficiency by month","yield"],["Scrap trend","Material loss over time","waste"],["Yield trend","Usable output percentage","yield"],["₹ loss trend","Estimated avoidable cost","waste"]]},
  energy: { title:"Energy Monitoring", description:"See consumption, peak demand and the monetary cost of avoidable energy use.", kpis:[["Period consumption","7,840 kWh","All recorded sources","default"],["Daily average","261 kWh","30-day average","default"],["Peak consumption","418 kWh","Highest recorded day","warning"],["Energy cost","₹66,640","At verified tariff","default"],["Estimated ₹ waste","₹9,600","1,200 kWh excess","warning"]], charts:[["Daily energy consumption","Actual kWh trend","energy"],["Actual vs ideal energy","Illustrative benchmark comparison","comparison"],["Shift-level consumption","Recorded shift totals","energy"],["Machine-level consumption","Allocated energy estimate","comparison"]]},
} as const;

export function DashboardPage({ kind }: { kind: keyof typeof content }) { 
  const page=content[kind]; 
  return (
    <AppShell section="dashboard">
      <PageHeader 
        eyebrow="Precision Works India" 
        title={page.title} 
        description={page.description} 
        action={
          <div className="flex gap-2">
            <button className="button-secondary"><CalendarDays size={15}/>Apr–Sep 2026</button>
            <button className="button-primary hidden sm:inline-flex"><Download size={15}/>Export</button>
          </div>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {page.kpis.map(([a,b,c,d], index) => (
          <KpiCard 
            key={a} 
            label={a} 
            value={b} 
            detail={c} 
            tone={d} 
            featured={index === 0} 
            className={index === 0 ? "lg:col-span-2" : "lg:col-span-1"}
          />
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {page.charts.map(([a,b,c], index) => (
          <ChartCard 
            key={a} 
            title={a} 
            subtitle={b}
            className={index === 0 ? "lg:col-span-2" : "lg:col-span-1"}
          >
            {c==="scope"?<ScopeChart/>:c==="comparison"?<ComparisonChart/>:<TrendChart kind={c}/>}
          </ChartCard>
        ))}
      </div>
      {kind==="sustainability" && (
        <section className="mt-6">
          <h2 className="font-display text-xl font-bold">Improvement Opportunities</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[[Lightbulb,"High energy usage","CNC-02 is 12% above its recent baseline."],[TrendingDown,"Excess scrap","Milling scrap increased on two recent shifts."],[Wrench,"Maintenance link","CNC-03 is overdue and shows elevated consumption."],[Lightbulb,"Potential savings","Reviewing three actions may recover ₹18,400/month."]].map(([Icon,t,d])=>{const I=Icon as typeof Lightbulb;return <article className="panel" key={t as string}><I className="text-primary" size={20}/><h3 className="mt-5 font-bold">{t as string}</h3><p className="mt-2 text-sm text-muted-foreground">{d as string}</p></article>})}
          </div>
        </section>
      )}
      {kind==="energy" && (
        <div className="mt-6 rounded-md border border-warning/30 bg-warning-soft p-6">
          <p className="eyebrow text-warning">Potential Energy Loss</p>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-display text-4xl font-bold">₹9,600 estimated loss</p>
              <p className="mt-2 text-sm text-muted-foreground">Based on 1,200 kWh excess consumption at the verified tariff.</p>
            </div>
            <span className="demo-badge">Illustrative estimate</span>
          </div>
        </div>
      )}
      <p className="mt-6 pb-20 text-right text-xs text-muted-foreground lg:pb-0">Last updated 22 Sep 2026, 07:32 IST</p>
    </AppShell> 
  );
}