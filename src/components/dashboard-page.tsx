import { CalendarDays, Download, Lightbulb, TrendingDown, Wrench } from "lucide-react";
import { AppShell, ChartCard, KpiCard, PageHeader } from "./app-shell";
import { BaselineVsCurrentChart, ComparisonChart, CostVsCarbonChart, ExpectedVsEstimatedEnergyChart, ProductEmissionChart, ScopeChart, ScrapBarChart, TrendChart, YieldRadarChart } from "./charts";

const content = {
  carbon: { title:"Carbon Tracker", description:"Track Scope 1 and Scope 2 emissions across factory lines to measure carbon intensity, optimize energy footprint, lower operating costs, and meet ESG sustainability compliance goals.", kpis:[["Total CO₂e","6.74 t","↓ 8.2% from previous period","success"],["Scope 1","1.21 t","18% of recorded emissions","default"],["Scope 2","5.53 t","Electricity-related estimate","default"],["Carbon intensity","0.74 kg/unit","↓ 5.4% per unit","success"],["Period change","−0.60 t","Improvement vs last period","success"]], charts:[]},
  sustainability: { title:"Sustainability Analytics", description:"Connect energy efficiency, material yield and cost recovery in one operating view.", kpis:[["Energy efficiency","86.7%","↑ 3.1 points","success"],["Scrap rate","8.4%","↓ 1.2 points","success"],["Production yield","91.6%","420 kg usable output","success"],["Energy cost","₹84,600","Current period estimate","default"],["Estimated ₹ loss","₹9,600","Energy + material waste","warning"],["Recovered cost","₹14,200","Verified improvement actions","success"]], charts:[["Energy efficiency trend","Actual efficiency by month","yield"],["Yield trend","Usable output percentage radar","radar_yield"],["Scrap trend","Material loss by date","scrap_bar"]]},
  energy: { title:"Energy Monitoring", description:"See consumption, peak demand and the monetary cost of avoidable energy use.", kpis:[["Bimonthly energy consumption","15,680 kWh","Bimonthly recorded sources","default"],["Daily average","261 kWh","60-day average","default"],["Peak consumption","418 kWh","Highest recorded day","warning"],["Energy cost","₹133,280","At verified tariff","default"],["Estimated ₹ waste","₹19,200","2,400 kWh excess","warning"]], charts:[["Bimonthly energy consumption","Actual kWh trend","energy"],["Actual vs ideal energy","Illustrative benchmark comparison","comparison"]]},
} as const;

const sdgGoals = [
  { id: 1, title: "NO POVERTY", bg: "#e5243b", desc: "End poverty in all its forms everywhere" },
  { id: 2, title: "ZERO HUNGER", bg: "#dda63a", desc: "End hunger & promote sustainable agriculture" },
  { id: 3, title: "GOOD HEALTH & WELL-BEING", bg: "#4c9f38", desc: "Ensure healthy lives & promote well-being" },
  { id: 4, title: "QUALITY EDUCATION", bg: "#c5192d", desc: "Ensure inclusive & equitable quality education" },
  { id: 5, title: "GENDER EQUALITY", bg: "#ff3a21", desc: "Achieve gender equality & empower women" },
  { id: 6, title: "CLEAN WATER & SANITATION", bg: "#26bde2", desc: "Ensure sustainable management of water" },
  { id: 7, title: "AFFORDABLE & CLEAN ENERGY", bg: "#fcc30b", desc: "Ensure access to affordable & clean energy" },
  { id: 8, title: "DECENT WORK & ECONOMIC GROWTH", bg: "#a21942", desc: "Promote sustained & inclusive economic growth" },
  { id: 9, title: "INDUSTRY, INNOVATION & INFRASTRUCTURE", bg: "#fd6925", desc: "Build resilient infrastructure & foster innovation" },
  { id: 10, title: "REDUCED INEQUALITIES", bg: "#dd1367", desc: "Reduce inequality within and among countries" },
  { id: 11, title: "SUSTAINABLE CITIES & COMMUNITIES", bg: "#fd9d24", desc: "Make cities inclusive, safe & resilient" },
  { id: 12, title: "RESPONSIBLE CONSUMPTION & PRODUCTION", bg: "#bf8b2e", desc: "Ensure sustainable consumption & production" },
  { id: 13, title: "CLIMATE ACTION", bg: "#3f7e44", desc: "Take urgent action to combat climate change" },
  { id: 14, title: "LIFE BELOW WATER", bg: "#0a97d9", desc: "Conserve & sustainably use marine resources" },
  { id: 15, title: "LIFE ON LAND", bg: "#56c02b", desc: "Protect & restore terrestrial ecosystems" },
  { id: 16, title: "PEACE, JUSTICE & STRONG INSTITUTIONS", bg: "#00689d", desc: "Promote peaceful & inclusive societies" },
  { id: 17, title: "PARTNERSHIPS FOR THE GOALS", bg: "#19486a", desc: "Strengthen global partnerships for SDGs" },
];

function SdgMarqueeBanner() {
  const doubleGoals = [...sdgGoals, ...sdgGoals];

  return (
    <div className="mt-8 relative overflow-hidden w-full py-2">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f2f5f3] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f2f5f3] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-4">
          {doubleGoals.map((goal, idx) => (
            <div
              key={`${goal.id}-${idx}`}
              className="w-44 h-44 rounded-xl p-3.5 text-white flex flex-col justify-between shadow-md select-none shrink-0 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: goal.bg }}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl font-black opacity-90 leading-none">{goal.id}</span>
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                  SDG {goal.id}
                </span>
              </div>
              <div>
                <h4 className="font-display text-xs font-black uppercase leading-snug tracking-tight drop-shadow-xs mb-1">
                  {goal.title}
                </h4>
                <p className="text-[9px] font-medium leading-tight opacity-90 border-t border-white/20 pt-1">
                  {goal.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

function CarbonKpiCardsBlock() {
  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      {/* Total CO2e Featured Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#072115] p-5 text-white shadow-md border border-[#17452d]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#17452d] bg-[#0c3120] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#95eb27]">
            <span className="size-1.5 rounded-full bg-[#95eb27] animate-pulse" />
            Total CO₂e
          </span>
          <span className="text-[10px] font-semibold text-[#8ca897]">Updated live</span>
        </div>
        <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white">6.74 t</p>
        <p className="mt-1 text-xs font-semibold text-[#95eb27]">↓ 8.2% from previous period</p>
      </div>

      {/* Scope 1 & Scope 2 Stacked Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Scope 1</span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-[#072115]">1.21 t</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#10b981]">18% recorded</p>
        </div>
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Scope 2</span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-[#072115]">5.53 t</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#10b981]">Electricity est.</p>
        </div>
      </div>

      {/* Carbon Intensity & Period Change Stacked Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Intensity</span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-[#072115]">0.74 <span className="text-xs text-[#557060] font-normal">kg/unit</span></p>
          <p className="mt-0.5 text-[11px] font-medium text-[#10b981]">↓ 5.4% per unit</p>
        </div>
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Period Change</span>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-[#072115]">-0.60 t</p>
          <p className="mt-0.5 text-[11px] font-medium text-[#10b981]">Improvement</p>
        </div>
      </div>
    </div>
  );
}

function EnergyKpiCardsBlock() {
  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      {/* Featured Bimonthly Energy Consumption Dark Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#072115] p-4 text-white shadow-md border border-[#17452d]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#17452d] bg-[#0c3120] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#95eb27]">
            <span className="size-1.5 rounded-full bg-[#95eb27] animate-pulse" />
            Bimonthly Consumption
          </span>
          <span className="text-[10px] font-semibold text-[#8ca897]">Updated live</span>
        </div>
        <p className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-white">15,680 kWh</p>
        <p className="mt-0.5 text-[11px] font-semibold text-[#95eb27]">Bimonthly recorded sources</p>
      </div>

      {/* Daily Average & Peak Consumption Stacked Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-3 shadow-xs">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Daily Average</span>
          <p className="mt-1 font-display text-xl font-extrabold text-[#072115]">261 kWh</p>
          <p className="mt-0.5 text-[10px] font-medium text-[#10b981]">60-day average</p>
        </div>
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-3 shadow-xs">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Peak Consumption</span>
          <p className="mt-1 font-display text-xl font-extrabold text-[#072115]">418 kWh</p>
          <p className="mt-0.5 text-[10px] font-medium text-[#f59e0b]">Highest day</p>
        </div>
      </div>

      {/* Energy Cost & Estimated Waste Stacked Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-3 shadow-xs">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Energy Cost</span>
          <p className="mt-1 font-display text-xl font-extrabold text-[#072115]">₹133,280</p>
          <p className="mt-0.5 text-[10px] font-medium text-[#10b981]">Verified tariff</p>
        </div>
        <div className="rounded-xl border border-[#e1e8e2] bg-white p-3 shadow-xs">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#7a9d88]">Est. ₹ Waste</span>
          <p className="mt-1 font-display text-xl font-extrabold text-[#072115]">₹19,200</p>
          <p className="mt-0.5 text-[10px] font-medium text-[#ef4444]">2,400 kWh excess</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardPage({ kind }: { kind: keyof typeof content }) { 
  const page=content[kind]; 
  const is2Col = kind === "sustainability";
  return (
    <AppShell section="dashboard">
      <PageHeader 
        eyebrow="Precision Works India" 
        title={page.title} 
        description={page.description} 
        action={
          <button className="inline-flex items-center gap-2 rounded-full border border-[#e1e8e2] bg-white px-4 py-2 text-xs font-bold text-[#072115] shadow-xs hover:bg-[#f8faf8] transition-all">
            <CalendarDays size={15} className="text-[#10b981]" />
            <span>Apr–Sep 2026</span>
          </button>
        }
      />

      {kind === "carbon" ? (
        <div className="space-y-6">
          {/* First Div: Carbon emissions over time & Scope 1 vs Scope 2 graph */}
          <div className="grid gap-5 lg:grid-cols-3">
            <ChartCard 
              title="Carbon emissions over time" 
              subtitle="Monthly estimated tCO₂e"
              className="lg:col-span-2"
            >
              <TrendChart kind="carbon" />
            </ChartCard>
            <ChartCard 
              title="Scope 1 vs Scope 2" 
              subtitle="Recorded emissions split"
              className="lg:col-span-1"
            >
              <ScopeChart />
            </ChartCard>
          </div>

          {/* Second Div: Cards alignment on the left side & CO2 emission by product graph on the right */}
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <CarbonKpiCardsBlock />
            </div>
            <ChartCard 
              title="CO₂ emissions by product" 
              subtitle="Estimated emissions per manufactured part type"
              className="lg:col-span-2"
            >
              <ProductEmissionChart />
            </ChartCard>
          </div>

          {/* Third Div: Remaining graphs aligned neatly side-by-side */}
          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard 
              title="Baseline vs current CO₂ emissions" 
              subtitle="Monthly reduction against target benchmark"
              className="lg:col-span-1"
            >
              <BaselineVsCurrentChart />
            </ChartCard>
            <ChartCard 
              title="Cost vs carbon footprint" 
              subtitle="Monetary expenditure vs carbon intensity ratio"
              className="lg:col-span-1"
            >
              <CostVsCarbonChart />
            </ChartCard>
          </div>
        </div>
      ) : kind === "energy" ? (
        <div className="space-y-6">
          {/* First Div: Bimonthly energy consumption graph */}
          <ChartCard 
            title="Bimonthly energy consumption" 
            subtitle="Actual kWh trend"
          >
            <TrendChart kind="energy" />
          </ChartCard>

          {/* Second Div: 3-column grid combining both graphs and the cards block into one section */}
          <div className="grid gap-5 lg:grid-cols-3">
            <ChartCard 
              title="Expected vs estimated energy" 
              subtitle="Target model comparison"
              className="lg:col-span-1"
            >
              <ExpectedVsEstimatedEnergyChart />
            </ChartCard>
            <ChartCard 
              title="Actual vs ideal energy" 
              subtitle="Illustrative benchmark comparison"
              className="lg:col-span-1"
            >
              <ComparisonChart />
            </ChartCard>
            <div className="lg:col-span-1">
              <EnergyKpiCardsBlock />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={`mb-6 grid gap-3 grid-cols-2 sm:grid-cols-3 ${page.kpis.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
            {page.kpis.map(([a,b,c,d], index) => (
              <KpiCard 
                key={a} 
                label={a} 
                value={b} 
                detail={c} 
                tone={d} 
                featured={index === 0} 
              />
            ))}
          </div>
          <div className={`grid gap-5 ${is2Col ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {page.charts.map(([a,b,c], index) => (
              <ChartCard 
                key={a} 
                title={a} 
                subtitle={b}
                className={index === 0 ? (is2Col ? "lg:col-span-2" : "lg:col-span-2") : "lg:col-span-1"}
              >
                {c==="radar_yield"?<YieldRadarChart/>:c==="scrap_bar"?<ScrapBarChart/>:c==="scope"?<ScopeChart/>:c==="product_emission"?<ProductEmissionChart/>:c==="baseline_vs_current"?<BaselineVsCurrentChart/>:c==="cost_vs_carbon"?<CostVsCarbonChart/>:c==="comparison"?<ComparisonChart/>:<TrendChart kind={c as any}/>}
              </ChartCard>
            ))}
          </div>

          {/* Render SDG Marquee Running Animation Banner below graphs on Sustainability Page */}
          {kind === "sustainability" && <SdgMarqueeBanner />}
        </>
      )}

      {kind==="energy" && (
        <div className="mt-6 rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-6 text-[#991b1b] shadow-xs">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#dc2626]">Potential Energy Loss Alert</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-display text-3xl font-extrabold text-[#991b1b]">₹9,600 estimated loss</p>
              <p className="mt-1 text-sm font-medium text-[#b91c1c]">Based on 1,200 kWh excess consumption at the verified tariff.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#991b1b]">
              <span className="size-1.5 rounded-full bg-[#ef4444]" />
              Illustrative estimate
            </span>
          </div>
        </div>
      )}
      <p className="mt-6 pb-20 text-right text-xs font-medium text-[#8ca897] lg:pb-0">Last updated 22 Sep 2026, 07:32 IST</p>
    </AppShell> 
  );
}