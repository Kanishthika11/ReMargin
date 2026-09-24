import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Plus,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { demoMachines, Machine } from "@/lib/remargin";

export const Route = createFileRoute("/tracker")({
  head: () => ({
    meta: [
      { title: "Maintenance Tracker — ReMargin" },
      { name: "description", content: "Track CNC service dates and maintenance-related efficiency risks." },
      { property: "og:title", content: "Maintenance Tracker — ReMargin" },
      { property: "og:description", content: "Machine service intelligence connected to energy performance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Tracker,
});

export interface TrackerMachine extends Machine {
  notes?: string;
  completed?: boolean;
}

function formatDateStr(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calculateNextServiceDate(lastDateStr: string, intervalDays: number): string {
  const parsed = new Date(lastDateStr);
  const baseDate = isNaN(parsed.getTime()) ? new Date() : parsed;
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  return formatDateStr(nextDate);
}

function Tracker() {
  const [machines, setMachines] = useState<TrackerMachine[]>(() =>
    demoMachines.map((m) => ({ ...m }))
  );

  // Add Note Modal state
  const [noteMachineId, setNoteMachineId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Add Machine Record Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMachine, setNewMachine] = useState({
    name: "",
    type: "CNC Milling" as TrackerMachine["type"],
    manufacturer: "",
    model: "",
    ratedPower: "20",
    interval: "90",
    lastServiceDate: "2026-09-25",
  });

  // Open note modal for specific machine
  function openNoteModal(m: TrackerMachine) {
    setNoteMachineId(m.id);
    setNoteText(m.notes || "");
  }

  // Save note for machine
  function handleSaveNote() {
    if (!noteMachineId) return;
    setMachines((prev) =>
      prev.map((m) => (m.id === noteMachineId ? { ...m, notes: noteText } : m))
    );
    setNoteMachineId(null);
    setNoteText("");
  }

  // Mark machine service complete and recalculate next service date dynamically
  function handleCompleteService(id: string) {
    const today = new Date();
    const todayStr = formatDateStr(today);

    setMachines((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextDateStr = calculateNextServiceDate(todayStr, m.interval);
          return {
            ...m,
            lastService: todayStr,
            nextService: nextDateStr,
            status: "Healthy",
            completed: true,
          };
        }
        return m;
      })
    );
  }

  // Add new machine record
  function handleAddMachineSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newMachine.name.trim()) return;

    const lastDateObj = newMachine.lastServiceDate
      ? new Date(newMachine.lastServiceDate)
      : new Date();
    const lastDateFormatted = formatDateStr(lastDateObj);
    const intervalNum = Number(newMachine.interval) || 90;
    const nextDateFormatted = calculateNextServiceDate(lastDateFormatted, intervalNum);

    const createdMachine: TrackerMachine = {
      id: `m_${Date.now()}`,
      companyId: "cmp_demo",
      name: newMachine.name.trim(),
      type: newMachine.type,
      manufacturer: newMachine.manufacturer.trim() || "Generic",
      model: newMachine.model.trim() || "V1",
      ratedPower: Number(newMachine.ratedPower) || 15,
      interval: intervalNum,
      lastService: lastDateFormatted,
      nextService: nextDateFormatted,
      status: "Healthy",
      completed: false,
    };

    setMachines([createdMachine, ...machines]);
    setShowAddModal(false);
    setNewMachine({
      name: "",
      type: "CNC Milling",
      manufacturer: "",
      model: "",
      ratedPower: "20",
      interval: "90",
      lastServiceDate: "2026-09-25",
    });
  }

  const overdueCount = machines.filter((m) => m.status === "Overdue" && !m.completed).length;

  return (
    <AppShell>
      <PageHeader
        title="Machine Tracker"
        description="Every machine shown belongs to Precision Works India’s demonstration company workspace."
        action={
          <button
            onClick={() => setShowAddModal(true)}
            className="button-primary inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-4 py-2.5 text-xs font-extrabold text-white shadow-lg hover:bg-[#54be6c] transition-all"
          >
            <Plus size={16} />
            <span>Add record</span>
          </button>
        }
      />

      {/* Alert Warning if any machine is overdue */}
      {overdueCount > 0 && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-warning/30 bg-[#0c3120] p-4 text-[#48a65e] shadow-sm">
          <AlertTriangle className="text-warning shrink-0" size={20} />
          <div>
            <p className="text-sm font-bold text-white">
              Maintenance due for {machines.filter((m) => m.status === "Overdue" && !m.completed).map((m) => m.name).join(", ")}
            </p>
            <p className="text-xs text-[#a2c2b0]">Service is overdue and recent consumption is above baseline.</p>
          </div>
        </div>
      )}

      {/* Machine Cards Grid */}
      <div className="grid gap-5 xl:grid-cols-3">
        {machines.map((m) => (
          <article className="panel bg-[#072115] border-[#17452d] flex flex-col justify-between" key={m.id}>
            <div>
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
                  <Wrench size={20} />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    m.status === "Healthy" || m.completed
                      ? "bg-[#0c3120] text-[#48a65e] border border-[#17452d]"
                      : m.status === "Due Soon"
                      ? "bg-amber-950/80 text-amber-400 border border-amber-800"
                      : "bg-red-950/80 text-red-400 border border-red-800"
                  }`}
                >
                  {m.completed ? "Service Completed" : m.status}
                </span>
              </div>

              <h2 className="mt-4 font-display text-xl font-extrabold text-[#48a65e]">{m.name}</h2>
              <p className="text-xs text-[#a2c2b0]">
                {m.type} · {m.manufacturer} {m.model}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs border-t border-b border-[#17452d] py-3">
                <div>
                  <dt className="text-[#a2c2b0]">Rated power</dt>
                  <dd className="mt-0.5 font-bold text-white">{m.ratedPower} kW</dd>
                </div>
                <div>
                  <dt className="text-[#a2c2b0]">Interval</dt>
                  <dd className="mt-0.5 font-bold text-white">{m.interval} days</dd>
                </div>
                <div>
                  <dt className="text-[#a2c2b0]">Last service</dt>
                  <dd className="mt-0.5 font-bold text-white">{m.lastService}</dd>
                </div>
                <div>
                  <dt className="text-[#a2c2b0]">Next service</dt>
                  <dd className="mt-0.5 font-extrabold text-[#48a65e]">{m.nextService}</dd>
                </div>
              </dl>

              {/* Display Notes if present */}
              {m.notes && (
                <div className="mt-3 rounded-xl bg-[#0c3120] border border-[#17452d] p-3 text-xs space-y-1 animate-fade-in-up">
                  <div className="flex items-center justify-between text-[#48a65e] font-bold">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={13} />
                      Maintenance Note
                    </span>
                    <button
                      onClick={() => openNoteModal(m)}
                      className="text-[10px] text-[#a2c2b0] hover:text-white underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-white text-xs font-medium italic">"{m.notes}"</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => openNoteModal(m)}
                className="button-secondary flex-1 border-[#17452d] bg-[#0c3120] text-white hover:bg-[#113f2a] transition-all text-xs font-bold py-2 rounded-xl"
              >
                {m.notes ? "Edit notes" : "Add notes"}
              </button>
              <button
                onClick={() => handleCompleteService(m.id)}
                disabled={m.completed}
                className={`button-primary flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-extrabold transition-all ${
                  m.completed
                    ? "bg-[#0c3120] text-[#8ca897] border border-[#17452d] opacity-60 cursor-not-allowed"
                    : "bg-[#48a65e] text-white hover:bg-[#54be6c] shadow-md"
                }`}
              >
                <CheckCircle2 size={14} />
                <span>{m.completed ? "Completed" : "Complete"}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* POPUP MODAL 1: ADD / EDIT NOTES */}
      {noteMachineId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
              <h3 className="font-display text-base font-extrabold text-[#48a65e] flex items-center gap-2">
                <MessageSquare size={18} />
                Maintenance Notes for {machines.find((m) => m.id === noteMachineId)?.name}
              </h3>
              <button
                onClick={() => setNoteMachineId(null)}
                className="rounded-lg p-1 text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-[#a2c2b0]">Enter comments / inspection notes:</span>
              <textarea
                rows={4}
                className="form-input w-full bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e] p-3 text-xs rounded-xl"
                placeholder="e.g. Spindle oil replaced, vibration levels within limit, next belt check in 30 days."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </label>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#17452d]">
              <button
                type="button"
                onClick={() => setNoteMachineId(null)}
                className="rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-white hover:bg-[#113f2a]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="rounded-xl bg-[#48a65e] px-5 py-2 text-xs font-extrabold text-white hover:bg-[#54be6c] shadow-md"
              >
                Submit Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL 2: ADD NEW MACHINE RECORD */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-fade-in">
          <form onSubmit={handleAddMachineSubmit} className="w-full max-w-lg rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
              <h3 className="font-display text-base font-extrabold text-[#48a65e] flex items-center gap-2">
                <Plus size={18} />
                Add Machine Maintenance Record
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3 grid-cols-2 text-xs">
              <label className="block">
                <span className="form-label text-[#48a65e]">Machine ID / Name *</span>
                <input
                  required
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  placeholder="e.g. CNC-04"
                  value={newMachine.name}
                  onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Machine Type</span>
                <select
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={newMachine.type}
                  onChange={(e) => setNewMachine({ ...newMachine, type: e.target.value as TrackerMachine["type"] })}
                >
                  <option value="CNC Milling">CNC Milling</option>
                  <option value="CNC Lathe">CNC Lathe</option>
                  <option value="CNC Grinding">CNC Grinding</option>
                  <option value="CNC Router">CNC Router</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Manufacturer</span>
                <input
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  placeholder="e.g. HAAS / ACE"
                  value={newMachine.manufacturer}
                  onChange={(e) => setNewMachine({ ...newMachine, manufacturer: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Model</span>
                <input
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  placeholder="e.g. VF-2 / LT-20"
                  value={newMachine.model}
                  onChange={(e) => setNewMachine({ ...newMachine, model: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Rated Power (kW)</span>
                <input
                  type="number"
                  required
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  placeholder="22"
                  value={newMachine.ratedPower}
                  onChange={(e) => setNewMachine({ ...newMachine, ratedPower: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Service Interval (Days)</span>
                <input
                  type="number"
                  required
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  placeholder="90"
                  value={newMachine.interval}
                  onChange={(e) => setNewMachine({ ...newMachine, interval: e.target.value })}
                />
              </label>

              <label className="block col-span-2">
                <span className="form-label text-[#48a65e]">Last Service Date</span>
                <input
                  type="date"
                  required
                  className="form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={newMachine.lastServiceDate}
                  onChange={(e) => setNewMachine({ ...newMachine, lastServiceDate: e.target.value })}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#17452d]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-white hover:bg-[#113f2a]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#48a65e] px-6 py-2 text-xs font-extrabold text-white hover:bg-[#54be6c] shadow-md"
              >
                Add Machine Record
              </button>
            </div>
          </form>
        </div>
      )}
    </AppShell>
  );
}