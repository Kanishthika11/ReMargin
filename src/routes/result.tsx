import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, IndianRupee, Lightbulb } from "lucide-react";
import { useState } from "react";
import { AppShell, DemoBadge, KpiCard, PageHeader } from "@/components/app-shell";
import { EstimatedVsActualScoreChart } from "@/components/charts";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Factory Efficiency Results — ReMargin" },
      { name: "description", content: "Review energy waste, scrap loss and corrective recommendations." },
      { property: "og:title", content: "Factory Efficiency Results — ReMargin" },
      { property: "og:description", content: "From waste evidence to cost impact and action." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const [ack, setAck] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Latest analysis · 18 Sep 2026"
        title="Factory Efficiency Results"
        description="Verified inputs converted into estimated waste, cost impact and supported improvement actions."
        action={<DemoBadge />}
      />

      {/* Single grid section containing all 6 KPI cards */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-6">
        <KpiCard label="Actual energy" value="1,200 kWh" detail="Verified meter difference" />
        <KpiCard label="Estimated ideal" value="1,000 kWh" detail="Illustrative baseline" />
        <KpiCard label="Excess energy" value="200 kWh" detail="16.7% above baseline" tone="warning" />
        <KpiCard label="Energy efficiency" value="83.3%" detail="Estimated performance" tone="warning" />
        <KpiCard label="Scrap efficiency" value="91.6%" detail="42 kg scrap loss" tone="success" />
        <KpiCard label="Confidence score" value="94.2%" detail="High model accuracy" tone="success" />
      </div>

      {/* 3-column single section containing Main Cost Impact, Scrap Wastage, and Estimated vs Actual Score Graph */}
      <section className="mt-5 grid gap-5 xl:grid-cols-3">
        <article className="panel bg-[#072115] border-[#17452d]">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow text-[#95eb27]">Main cost impact</p>
              <h2 className="font-display text-4xl font-bold text-white">₹9,600</h2>
            </div>
            <span className="grid size-14 place-items-center rounded-md bg-[#0c3120] text-warning border border-[#17452d]">
              <IndianRupee size={26} />
            </span>
          </div>
          <div className="mt-7 space-y-3">
            {[
              ["Energy-related loss", "₹1,600"],
              ["Scrap-related loss", "₹8,000"],
            ].map(([a, b]) => (
              <div className="flex justify-between border-b border-[#17452d] pb-3 text-sm" key={a}>
                <span className="text-[#a2c2b0]">{a}</span>
                <strong className="text-white">{b}</strong>
              </div>
            ))}
          </div>
        </article>
        <article className="panel bg-[#072115] border-[#17452d]">
          <p className="eyebrow text-[#95eb27]">Scrap wastage</p>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              ["Input material", "500 kg EN8"],
              ["Production output", "458 kg"],
              ["Scrap weight", "42 kg"],
              ["Scrap percentage", "8.4%"],
              ["Usable yield", "91.6%"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="text-xs text-[#a2c2b0]">{a}</p>
                <p className="mt-1 font-display text-xl font-bold text-white">{b}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="panel bg-[#072115] border-[#17452d] flex flex-col justify-between">
          <div>
            <p className="eyebrow text-[#95eb27]">Estimated vs Actual</p>
            <h3 className="font-display text-lg font-bold text-white mb-2">Score Comparison</h3>
          </div>
          <div className="h-44 w-full my-auto">
            <EstimatedVsActualScoreChart />
          </div>
          <div className="flex justify-between border-t border-[#17452d] pt-3 text-xs text-[#a2c2b0]">
            <span>Est: <strong className="text-[#10b981]">83.3%</strong></span>
            <span>Act: <strong className="text-[#95eb27]">91.6%</strong></span>
            <span>Variance: <strong className="text-[#95eb27]">+8.3%</strong></span>
          </div>
        </article>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <article className="panel bg-[#072115] border-[#17452d]">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[#95eb27]">
            <AlertTriangle size={20} className="text-warning" />
            Possible causes
          </h2>
          <div className="mt-5 space-y-3">
            {[
              "CNC-03 maintenance is overdue and its allocated energy is above baseline.",
              "Idle-period consumption was detected in the submitted meter window.",
              "Scrap percentage exceeds the verified recent production baseline.",
            ].map((x) => (
              <p className="rounded-md bg-[#0c3120] border border-[#17452d] p-3 text-sm text-white" key={x}>
                {x}
              </p>
            ))}
          </div>
        </article>
        <article className="panel bg-[#072115] border-[#17452d]">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[#95eb27]">
            <Lightbulb size={20} className="text-[#95eb27]" />
            Recommended actions
          </h2>
          <div className="mt-5 space-y-3">
            {[
              "Service CNC-03 and inspect spindle/load condition.",
              "Review machine operating hours and reduce idle operation.",
              "Investigate the two shifts with elevated material scrap.",
            ].map((x) => (
              <p className="flex gap-2 text-sm text-white" key={x}>
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#95eb27]" />
                {x}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="panel mt-5 mb-20 lg:mb-0 bg-[#072115] border-[#17452d]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-[#95eb27]">Fix tracker</p>
            <h2 className="font-display text-xl font-bold text-white">CNC-03 energy and maintenance review</h2>
          </div>
          <div className="flex gap-2">
            <button className="button-secondary border-[#17452d] bg-[#0c3120] text-white hover:bg-[#113f2a]" onClick={() => setAck(true)}>
              {ack ? "Acknowledged" : "Acknowledge issue"}
            </button>
            <button className="button-primary" onClick={() => setDone(true)} disabled={!ack}>
              {done ? "Action completed" : "Mark completed"}
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label>
            <span className="form-label text-[#95eb27]">Corrective action</span>
            <input className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#95eb27]" defaultValue="Inspect spindle load and complete scheduled service" />
          </label>
          <label>
            <span className="form-label text-[#95eb27]">Action date</span>
            <input className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#95eb27]" type="date" />
          </label>
        </div>
        {done && (
          <p className="mt-4 flex items-center gap-2 rounded-md bg-[#0c3120] border border-[#17452d] p-3 text-sm font-semibold text-[#95eb27]">
            <CheckCircle2 size={17} />
            Action recorded. Future uploads will compare before and after performance.
          </p>
        )}
      </section>
    </AppShell>
  );
}