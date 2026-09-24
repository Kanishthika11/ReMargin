import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Eye, History as HistoryIcon, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Upload History — ReMargin" },
      { name: "description", content: "Historical record of uploaded factory data and OCR verification status." },
    ],
  }),
  component: HistoryPage,
});

export interface HistoryRecord {
  id: string;
  date: string;
  type: string;
  energy: string;
  excess: string;
  loss: string;
  scrap: string;
  yield: string;
  confidence: string;
  status: string;
}

const historyLogs: HistoryRecord[] = [
  {
    id: "UP-9082",
    date: "18 Sep 2026",
    type: "Energy Meter & Scrap",
    energy: "1,200 kWh",
    excess: "200 kWh",
    loss: "₹9,600",
    scrap: "42 kg",
    yield: "91.6%",
    confidence: "94.2%",
    status: "Verified",
  },
  {
    id: "UP-9051",
    date: "11 Sep 2026",
    type: "Electricity Bill (Aug)",
    energy: "7,840 kWh",
    excess: "520 kWh",
    loss: "₹4,240",
    scrap: "38 kg",
    yield: "90.2%",
    confidence: "96.5%",
    status: "Verified",
  },
  {
    id: "UP-8994",
    date: "04 Sep 2026",
    type: "Energy Meter Scan",
    energy: "1,080 kWh",
    excess: "80 kWh",
    loss: "₹640",
    scrap: "24 kg",
    yield: "89.8%",
    confidence: "92.1%",
    status: "Resolved",
  },
  {
    id: "UP-8920",
    date: "28 Aug 2026",
    type: "Scrap & Production",
    energy: "1,150 kWh",
    excess: "150 kWh",
    loss: "₹6,120",
    scrap: "58 kg",
    yield: "91.1%",
    confidence: "95.0%",
    status: "Verified",
  },
];

function HistoryPage() {
  const nav = useNavigate();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Audit Log & Results Sync"
        title="Upload History"
        description="Historical log of all data submissions, verified meter readings, scrap analytics, and saved Result page values."
      />

      <div className="panel bg-[#072115] border-[#17452d]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#17452d] pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
              <HistoryIcon size={20} />
            </span>
            <div>
              <h2 className="font-display font-bold text-[#48a65e] text-lg">Submissions & Result Logs</h2>
              <p className="text-xs text-[#a2c2b0]">Stores result page metrics and verified data uploads</p>
            </div>
          </div>

          <Link
            to="/result"
            className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-[#54be6c] transition-all"
          >
            <Sparkles size={15} />
            <span>Latest Result Page</span>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#17452d]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#17452d] bg-[#0c3120] text-[#48a65e] font-extrabold uppercase text-[10px] tracking-wider">
                <th className="p-3">ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actual Energy</th>
                <th className="p-3">Excess / Waste</th>
                <th className="p-3">Cost Loss</th>
                <th className="p-3">Scrap / Yield</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Result Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17452d] bg-[#072115]">
              {historyLogs.map((h) => (
                <tr key={h.id} className="hover:bg-[#0c3120]/60 transition-colors">
                  <td className="p-3 font-mono text-xs font-bold text-[#48a65e]">{h.id}</td>
                  <td className="p-3 font-semibold text-white whitespace-nowrap">{h.date}</td>
                  <td className="p-3 text-[#a2c2b0] whitespace-nowrap">{h.type}</td>
                  <td className="p-3 font-bold text-white whitespace-nowrap">{h.energy}</td>
                  <td className="p-3 text-red-400 whitespace-nowrap">{h.excess}</td>
                  <td className="p-3 font-bold text-white whitespace-nowrap">{h.loss}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-white font-semibold">{h.scrap}</span>{" "}
                    <span className="text-[#48a65e] font-bold">({h.yield})</span>
                  </td>
                  <td className="p-3 text-[#48a65e] font-bold whitespace-nowrap">{h.confidence}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0c3120] border border-[#17452d] px-2.5 py-0.5 text-[10px] font-bold text-[#48a65e]">
                      <CheckCircle2 size={12} />
                      {h.status}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => nav({ to: "/result" })}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#48a65e] px-3 py-1.5 text-xs font-extrabold text-white shadow-xs hover:bg-[#54be6c] hover:scale-105 transition-all"
                    >
                      <Eye size={14} />
                      <span>See Result</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
