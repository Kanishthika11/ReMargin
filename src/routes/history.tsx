import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileText, History as HistoryIcon } from "lucide-react";
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

const mockHistory = [
  { id: "UP-9082", date: "18 Sep 2026", type: "Energy Meter & Scrap", status: "Verified", meter: "7,840 kWh", yield: "91.6%" },
  { id: "UP-9051", date: "11 Sep 2026", type: "Electricity Bill (Aug)", status: "Verified", meter: "7,620 kWh", yield: "90.2%" },
  { id: "UP-8994", date: "04 Sep 2026", type: "Energy Meter Scan", status: "Verified", meter: "7,910 kWh", yield: "89.8%" },
  { id: "UP-8920", date: "28 Aug 2026", type: "Scrap & Production", status: "Verified", meter: "7,450 kWh", yield: "91.1%" },
];

function HistoryPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Audit Log"
        title="Upload History"
        description="Historical log of all data submissions, verified meter readings, and scrap data uploads."
      />
      <div className="panel bg-[#072115] border-[#17452d]">
        <div className="flex items-center gap-3 mb-6">
          <span className="grid size-10 place-items-center rounded-md bg-[#0c3120] text-[#95eb27] border border-[#17452d]">
            <HistoryIcon size={20} />
          </span>
          <div>
            <h2 className="font-display font-bold text-[#95eb27] text-lg">Submissions Log</h2>
            <p className="text-xs text-[#a2c2b0]">4 verified data uploads in current quarter</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#17452d] text-xs font-extrabold uppercase text-[#95eb27]">
                <th className="pb-3 px-2">ID</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Type</th>
                <th className="pb-3 px-2">Energy Meter</th>
                <th className="pb-3 px-2">Yield</th>
                <th className="pb-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17452d]">
              {mockHistory.map((h) => (
                <tr key={h.id} className="hover:bg-[#0c3120]/60 transition-colors">
                  <td className="py-3 px-2 font-mono text-xs font-bold text-[#95eb27]">{h.id}</td>
                  <td className="py-3 px-2 text-[#a2c2b0]">{h.date}</td>
                  <td className="py-3 px-2 font-semibold text-white">{h.type}</td>
                  <td className="py-3 px-2 text-white">{h.meter}</td>
                  <td className="py-3 px-2 text-white">{h.yield}</td>
                  <td className="py-3 px-2 text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0c3120] border border-[#17452d] px-2.5 py-1 text-[11px] font-bold text-[#95eb27]">
                      <CheckCircle2 size={13} />
                      {h.status}
                    </span>
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
