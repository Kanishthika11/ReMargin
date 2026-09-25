import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Edit3,
  Eye,
  FileImage,
  FileText,
  HelpCircle,
  History,
  Image as ImageIcon,
  Info,
  Pencil,
  Plus,
  RefreshCw,
  ScanLine,
  Sparkles,
  UploadCloud,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { demoSession, historyRows as initialHistoryRows, mockApi } from "@/lib/remargin";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Factory Data — ReMargin" },
      { name: "description", content: "Upload and verify energy, scrap and electricity records." },
      { property: "og:title", content: "Upload Factory Data — ReMargin" },
      { property: "og:description", content: "Photo-first factory data capture and verification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: UploadPage,
});

export interface UploadFileRecord {
  name: string;
  url: string;
  type: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  type: string;
  energy: string;
  waste: string;
  loss: string;
  scrap: string;
  yield: string;
  carbon: string;
  status: string;
}

function UploadPage() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<"info" | "daily" | "bill" | "history">("info");

  // Upload files state with image previews
  const [files, setFiles] = useState<Record<string, UploadFileRecord>>({});

  // Daily upload state
  const [startMeter, setStartMeter] = useState("14200");
  const [endMeter, setEndMeter] = useState("15400");
  const [machine1Hours, setMachine1Hours] = useState("7.5");
  const [machine2Hours, setMachine2Hours] = useState("6.8");
  const [machine3Hours, setMachine3Hours] = useState("5.2");
  const [inputKg, setInputKg] = useState("500");
  const [outputKg, setOutputKg] = useState("458");
  const [scrapKg, setScrapKg] = useState("42");
  const [materialType, setMaterialType] = useState("EN8 Steel");

  // Electricity Bill state
  const [billDate, setBillDate] = useState("2026-09-18");
  const [billPeriod, setBillPeriod] = useState("Bimonthly (Aug–Sep 2026)");
  const [billUnits, setBillUnits] = useState("7840");
  const [billAmount, setBillAmount] = useState("66640");

  // Processing & toast states
  const [processing, setProcessing] = useState(false);
  const [dailySubmitted, setDailySubmitted] = useState(false);

  // History logs state & editing modal state
  const [logs, setLogs] = useState<HistoryItem[]>(
    initialHistoryRows.map((item, idx) => ({ ...item, id: `log_${idx}` }))
  );
  const [editingLog, setEditingLog] = useState<HistoryItem | null>(null);

  // Calculated values
  const energyUsed = Number(endMeter) - Number(startMeter);
  const totalMachineHours = (Number(machine1Hours) || 0) + (Number(machine2Hours) || 0) + (Number(machine3Hours) || 0);
  const yieldPct = Number(inputKg) > 0 ? (Number(outputKg) / Number(inputKg)) * 100 : 0;
  const scrapPct = Number(inputKg) > 0 ? (Number(scrapKg) / Number(inputKg)) * 100 : 0;
  const invalidMeter = startMeter !== "" && endMeter !== "" && energyUsed < 0;

  function handleFileChange(key: string, selectedFile?: File) {
    if (!selectedFile) return;
    const isImage =
      selectedFile.type.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|svg|gif|bmp|heic)$/i.test(selectedFile.name);
    const previewUrl = isImage ? URL.createObjectURL(selectedFile) : "";
    setFiles((prev) => ({
      ...prev,
      [key]: {
        name: selectedFile.name,
        url: previewUrl,
        type: selectedFile.type || (isImage ? "image/png" : "application/pdf"),
      },
    }));
  }

  function handleDailySubmit(e: React.FormEvent) {
    e.preventDefault();
    const newEntry: HistoryItem = {
      id: `log_${Date.now()}`,
      date: "25 Sep 2026",
      type: "Meter + Scrap (Daily)",
      energy: energyUsed > 0 ? `${energyUsed.toLocaleString()} kWh` : "1,200 kWh",
      waste: "160 kWh",
      loss: "₹1,280",
      scrap: scrapKg ? `${scrapKg} kg` : "42 kg",
      yield: yieldPct > 0 ? `${yieldPct.toFixed(1)}%` : "91.6%",
      carbon: "0.82 t",
      status: "Verified",
    };
    setLogs([newEntry, ...logs]);
    setDailySubmitted(true);
    setTimeout(() => setDailySubmitted(false), 4000);
  }

  async function handleBillProcess() {
    setProcessing(true);
    await mockApi.processUpload(demoSession.companyId, { billUnits, billAmount, billDate, files });
    
    // Add bill entry to logs
    const billEntry: HistoryItem = {
      id: `log_${Date.now()}`,
      date: billDate ? new Date(billDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "18 Sep 2026",
      type: "Electricity bill",
      energy: billUnits ? `${Number(billUnits).toLocaleString()} kWh` : "7,840 kWh",
      waste: "—",
      loss: billAmount ? `₹${Number(billAmount).toLocaleString()}` : "₹66,640",
      scrap: "—",
      yield: "—",
      carbon: "5.72 t",
      status: "Verified",
    };
    setLogs([billEntry, ...logs]);
    
    // Redirect to Result page
    nav({ to: "/result" });
  }

  function handleSaveEdit() {
    if (!editingLog) return;
    setLogs(logs.map((item) => (item.id === editingLog.id ? editingLog : item)));
    setEditingLog(null);
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Data capture & verification"
        title="Upload Factory Data"
        description="Submit meter scans, production slips, and electricity bills with automated verification and audit history."
      />

      {/* 4 Tabs Navigation Bar */}
      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-[#072115] border border-[#17452d] p-1.5 shadow-md">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
            activeTab === "info"
              ? "bg-[#48a65e] text-white shadow-sm"
              : "text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
          }`}
        >
          <Info size={16} />
          <span>1. How It Works & Rules</span>
        </button>

        <button
          onClick={() => setActiveTab("daily")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
            activeTab === "daily"
              ? "bg-[#48a65e] text-white shadow-sm"
              : "text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
          }`}
        >
          <ScanLine size={16} />
          <span>2. Daily Production & Meter</span>
        </button>

        <button
          onClick={() => setActiveTab("bill")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
            activeTab === "bill"
              ? "bg-[#48a65e] text-white shadow-sm"
              : "text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
          }`}
        >
          <FileText size={16} />
          <span>3. Electricity Bill Upload</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
            activeTab === "history"
              ? "bg-[#48a65e] text-white shadow-sm"
              : "text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
          }`}
        >
          <History size={16} />
          <span>4. History Logs & Edit</span>
        </button>
      </div>

      {/* TAB 1: HOW IT WORKS & GUIDELINES */}
      {activeTab === "info" && (
        <div className="space-y-6">
          {/* Section 1: Flowchart Diagram */}
          <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-[#48a65e]" size={20} />
              <div>
                <h2 className="font-display text-lg font-bold text-white">How Your Upload Works</h2>
                <p className="text-xs text-[#a2c2b0]">Follow these steps to upload details and view your instant results on the Results page</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-center">
                <span className="grid size-9 place-items-center rounded-full bg-[#48a65e] text-white font-black text-xs mx-auto mb-2">1</span>
                <h3 className="font-display text-sm font-bold text-white mb-1">Upload Details</h3>
                <p className="text-[11px] text-[#a2c2b0]">Enter or upload meter readings, scrap production slips, or electricity bills in Tab 2 or Tab 3.</p>
              </div>

              <div className="relative rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-center">
                <span className="grid size-9 place-items-center rounded-full bg-[#48a65e] text-white font-black text-xs mx-auto mb-2">2</span>
                <h3 className="font-display text-sm font-bold text-white mb-1">Verify Readings</h3>
                <p className="text-[11px] text-[#a2c2b0]">Review energy used (kWh), production output (kg), and scrap percentages.</p>
              </div>

              <div className="relative rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-center">
                <span className="grid size-9 place-items-center rounded-full bg-[#48a65e] text-white font-black text-xs mx-auto mb-2">3</span>
                <h3 className="font-display text-sm font-bold text-white mb-1">Process & Save Data</h3>
                <p className="text-[11px] text-[#a2c2b0]">Click Submit or Process Data to record entry in the Audit History log.</p>
              </div>

              <div className="relative rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-center">
                <span className="grid size-9 place-items-center rounded-full bg-[#48a65e] text-white font-black text-xs mx-auto mb-2">4</span>
                <h3 className="font-display text-sm font-bold text-white mb-1">Get Instant Results</h3>
                <p className="text-[11px] text-[#a2c2b0]">Redirect to the Results page to see cost impact, carbon intensity, and action plan.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Upload Rules & Guidelines */}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-5 text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e]">
                  <FileText size={18} />
                </span>
                <h3 className="font-display text-base font-bold text-white">Electricity Bill Rules</h3>
              </div>
              <ul className="text-xs text-[#a2c2b0] space-y-2 list-disc pl-4">
                <li><strong className="text-white">Upload Frequency:</strong> Bimonthly or monthly official utility bill document should be uploaded.</li>
                <li><strong className="text-white">Format:</strong> PDF file or clear JPG/PNG photo of the full tariff invoice.</li>
                <li><strong className="text-white">Validation:</strong> Ensure billing period dates and total kWh match utility meter cycle.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-5 text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e]">
                  <ScanLine size={18} />
                </span>
                <h3 className="font-display text-base font-bold text-white">Energy Meter Scan Rules</h3>
              </div>
              <ul className="text-xs text-[#a2c2b0] space-y-2 list-disc pl-4">
                <li><strong className="text-white">Upload Frequency:</strong> Daily upload is recommended for real-time idle waste tracking.</li>
                <li><strong className="text-white">Requirements:</strong> Photograph main shop floor digital sub-meter showing start and end readings.</li>
                <li><strong className="text-white">Validation:</strong> End reading cannot be lower than start reading.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-5 text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e]">
                  <FileImage size={18} />
                </span>
                <h3 className="font-display text-base font-bold text-white">Scrap & Production Scan</h3>
              </div>
              <ul className="text-xs text-[#a2c2b0] space-y-2 list-disc pl-4">
                <li><strong className="text-white">Upload Frequency:</strong> Daily upload is necessary for accurate yield calculation.</li>
                <li><strong className="text-white">Requirements:</strong> Include production shift log, total input kg, output kg, and scrap kg.</li>
                <li><strong className="text-white">Validation:</strong> Output kg + scrap kg must equal total input material weight.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Live Image Preview Box */}
          <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-md">
            <h3 className="font-display text-base font-bold text-white mb-3 flex items-center gap-2">
              <Eye className="text-[#48a65e]" size={18} />
              Uploaded Image Preview Box
            </h3>

            {Object.keys(files).length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(files).map(([key, record]) => (
                  <div key={key} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#48a65e]">
                      <span className="uppercase tracking-wider">{key} preview</span>
                      <span className="rounded bg-[#072115] px-2 py-0.5 text-[10px] text-white">OCR Ready</span>
                    </div>
                    {record.url ? (
                      <img src={record.url} alt={record.name} className="h-40 w-full object-cover rounded-md border border-[#17452d]" />
                    ) : (
                      <div className="h-40 w-full rounded-md bg-[#072115] flex flex-col items-center justify-center text-center p-3">
                        <FileText className="text-[#48a65e] size-8 mb-2" />
                        <span className="text-xs font-bold text-white truncate max-w-full">{record.name}</span>
                        <span className="text-[10px] text-[#a2c2b0] mt-1">PDF Document Selected</span>
                      </div>
                    )}
                    <p className="text-[11px] text-[#a2c2b0] truncate">{record.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#17452d] bg-[#0c3120]/50 p-8 text-center">
                <ImageIcon className="mx-auto text-[#8ca897] size-10 mb-2" />
                <p className="text-sm font-bold text-white">No uploaded document preview available yet</p>
                <p className="text-xs text-[#a2c2b0] mt-1">Upload a photo in Tab 2 (Daily Upload) or Tab 3 (Electricity Bill) to see live preview here.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DAILY PRODUCTION & METER UPLOAD */}
      {activeTab === "daily" && (
        <form onSubmit={handleDailySubmit} className="space-y-6">
          {dailySubmitted && (
            <div className="rounded-xl bg-[#0c3120] border border-[#48a65e] p-4 text-[#48a65e] flex items-center justify-between shadow-md animate-fade-in-up">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#48a65e]" />
                <div>
                  <p className="text-sm font-bold text-white">Daily Upload Submitted Successfully!</p>
                  <p className="text-xs text-[#a2c2b0]">Record has been calculated and logged into History Logs (Tab 4).</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className="rounded-lg bg-[#48a65e] text-white hover:bg-[#54be6c] transition-all"
              >
                View History
              </button>
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-2">
            {/* Energy Meter Scan Card */}
            <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
                  <ScanLine size={20} />
                </span>
                <div>
                  <h2 className="font-display font-bold text-[#48a65e] text-lg">Energy Meter Scan</h2>
                  <p className="text-xs text-[#a2c2b0]">Daily sub-meter photo and readings</p>
                </div>
              </div>

              <Dropzone
                name="meter"
                fileRecord={files.meter}
                onFile={(f) => handleFileChange("meter", f)}
              />

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="form-label text-[#48a65e]">Start Meter (kWh)</span>
                  <input
                    className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                    type="number"
                    value={startMeter}
                    onChange={(e) => setStartMeter(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="form-label text-[#48a65e]">End Meter (kWh)</span>
                  <input
                    className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                    type="number"
                    value={endMeter}
                    onChange={(e) => setEndMeter(e.target.value)}
                  />
                </label>
              </div>

              {/* Production Hours per Machine (3 Machines) */}
              <div className="pt-2 border-t border-[#17452d] space-y-2">
                <span className="form-label text-[#48a65e] block font-bold text-xs uppercase tracking-wider">
                  Production Hours per Machine
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[#a2c2b0] mb-1 block">Machine 1 (CNC-01)</span>
                    <input
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e] text-xs"
                      type="number"
                      step="0.1"
                      min="0"
                      max="24"
                      value={machine1Hours}
                      onChange={(e) => setMachine1Hours(e.target.value)}
                      placeholder="e.g. 7.5"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[#a2c2b0] mb-1 block">Machine 2 (CNC-02)</span>
                    <input
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e] text-xs"
                      type="number"
                      step="0.1"
                      min="0"
                      max="24"
                      value={machine2Hours}
                      onChange={(e) => setMachine2Hours(e.target.value)}
                      placeholder="e.g. 6.8"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[#a2c2b0] mb-1 block">Machine 3 (CNC-03)</span>
                    <input
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e] text-xs"
                      type="number"
                      step="0.1"
                      min="0"
                      max="24"
                      value={machine3Hours}
                      onChange={(e) => setMachine3Hours(e.target.value)}
                      placeholder="e.g. 5.2"
                    />
                  </label>
                </div>
              </div>

              {invalidMeter ? (
                <p className="text-xs text-red-400 font-semibold">End meter reading cannot be lower than start reading.</p>
              ) : (
                <div className="space-y-2">
                  {energyUsed >= 0 && startMeter && endMeter && (
                    <div className="flex items-center justify-between rounded-xl bg-[#0c3120] border border-[#17452d] p-3 text-xs text-[#48a65e]">
                      <span>Calculated Energy Used:</span>
                      <strong className="text-white font-display text-base font-bold">{energyUsed.toLocaleString()} kWh</strong>
                    </div>
                  )}
                  {totalMachineHours > 0 && (
                    <div className="flex items-center justify-between rounded-xl bg-[#0c3120] border border-[#17452d] p-3 text-xs text-[#48a65e]">
                      <span>Total Production Operating Hours:</span>
                      <strong className="text-white font-display text-base font-bold">{totalMachineHours.toFixed(1)} hrs</strong>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Scrap & Production Data Card */}
            <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
                  <FileImage size={20} />
                </span>
                <div>
                  <h2 className="font-display font-bold text-[#48a65e] text-lg">Scrap & Production Data</h2>
                  <p className="text-xs text-[#a2c2b0]">Daily shift slip and material weights</p>
                </div>
              </div>

              <Dropzone
                name="scrap"
                fileRecord={files.scrap}
                onFile={(f) => handleFileChange("scrap", f)}
              />

              <label className="block">
                <span className="form-label text-[#48a65e]">Input Material Type</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  placeholder="e.g. EN8 Steel"
                />
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                <label className="block">
                  <span className="form-label text-[#48a65e]">Input (kg)</span>
                  <input
                    className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                    type="number"
                    value={inputKg}
                    onChange={(e) => setInputKg(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="form-label text-[#48a65e]">Output (kg)</span>
                  <input
                    className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                    type="number"
                    value={outputKg}
                    onChange={(e) => setOutputKg(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="form-label text-[#48a65e]">Scrap (kg)</span>
                  <input
                    className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                    type="number"
                    value={scrapKg}
                    onChange={(e) => setScrapKg(e.target.value)}
                  />
                </label>
              </div>

              {yieldPct > 0 && (
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#0c3120] border border-[#17452d] p-3 text-xs text-[#48a65e]">
                  <div>
                    <span className="block text-[#a2c2b0]">Production Yield:</span>
                    <strong className="text-white font-display text-base font-bold">{yieldPct.toFixed(1)}%</strong>
                  </div>
                  <div>
                    <span className="block text-[#a2c2b0]">Scrap Percentage:</span>
                    <strong className="text-white font-display text-base font-bold">{scrapPct.toFixed(1)}%</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-6 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-[#54be6c] transition-all"
            >
              <CheckCircle2 size={18} />
              <span>Submit Daily Upload</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: ELECTRICITY BILL UPLOAD */}
      {activeTab === "bill" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-md space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
                <FileText size={20} />
              </span>
              <div>
                <h2 className="font-display font-bold text-[#48a65e] text-lg">Official Electricity Bill Upload</h2>
                <p className="text-xs text-[#a2c2b0]">Upload bimonthly/monthly tariff invoice with billing calendar selector</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Vertical Card Dropzone (Left - 6 cols) */}
              <div className="lg:col-span-6">
                <Dropzone
                  name="bill"
                  fileRecord={files.bill}
                  onFile={(f) => handleFileChange("bill", f)}
                />
              </div>

              {/* Controls & Inputs (Right - 6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                {/* Calendar & Billing Period Selector */}
                <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#48a65e]">Billing Calendar & Details</h3>
                  <label className="block">
                    <span className="form-label text-[#48a65e] flex items-center gap-1.5">
                      <CalendarIcon size={14} />
                      Select Bill Date / Calendar
                    </span>
                    <input
                      type="date"
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                      value={billDate}
                      onChange={(e) => setBillDate(e.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="form-label text-[#48a65e]">Billing Cycle</span>
                    <select
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                      value={billPeriod}
                      onChange={(e) => setBillPeriod(e.target.value)}
                    >
                      <option value="Bimonthly (Aug–Sep 2026)">Bimonthly (Aug–Sep 2026)</option>
                      <option value="Monthly (Sep 2026)">Monthly (Sep 2026)</option>
                      <option value="Bimonthly (Jun–Jul 2026)">Bimonthly (Jun–Jul 2026)</option>
                      <option value="Monthly (Aug 2026)">Monthly (Aug 2026)</option>
                    </select>
                  </label>
                </div>

                {/* Units & Amount */}
                <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#48a65e]">Consumption & Cost</h3>
                  <label className="block">
                    <span className="form-label text-[#48a65e]">Units Consumed (kWh)</span>
                    <input
                      type="number"
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                      value={billUnits}
                      onChange={(e) => setBillUnits(e.target.value)}
                      placeholder="7840"
                    />
                  </label>

                  <label className="block">
                    <span className="form-label text-[#48a65e]">Total Amount (₹)</span>
                    <input
                      type="number"
                      className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="66640"
                    />
                  </label>
                </div>

                {/* Process Data Button with redirect */}
                <div className="flex flex-col items-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleBillProcess}
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#48a65e] px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:bg-[#54be6c] transition-all disabled:opacity-50"
                  >
                    <Sparkles size={18} />
                    <span>{processing ? "Processing Bill & Redirecting..." : "Process Data"}</span>
                  </button>
                  <p className="text-xs text-[#a2c2b0] text-center w-full">
                    Clicking Process Data logs the entry and automatically redirects to the Result page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HISTORY LOGS & EDIT */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="text-[#48a65e]" size={20} />
                <h2 className="font-display text-lg font-bold text-white">Upload Audit History & Logs</h2>
              </div>
              <span className="text-xs text-[#8ca897] font-semibold">{logs.length} Total Records</span>
            </div>

            {/* Table of logs */}
            <div className="overflow-x-auto rounded-xl border border-[#17452d]">
              <table className="w-full text-left text-xs text-white">
                <thead className="bg-[#0c3120] text-[#48a65e] uppercase tracking-wider text-[10px] font-extrabold border-b border-[#17452d]">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Energy (kWh)</th>
                    <th className="p-3">Waste</th>
                    <th className="p-3">Loss (₹)</th>
                    <th className="p-3">Scrap</th>
                    <th className="p-3">Yield</th>
                    <th className="p-3">Carbon</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17452d] bg-[#072115]">
                  {logs.map((item) => (
                    <tr key={item.id} className="hover:bg-[#0c3120]/50 transition-all">
                      <td className="p-3 font-semibold text-[#8ca897] whitespace-nowrap">{item.date}</td>
                      <td className="p-3 text-[#a2c2b0] whitespace-nowrap">{item.type}</td>
                      <td className="p-3 font-bold text-white whitespace-nowrap">{item.energy}</td>
                      <td className="p-3 text-red-400 whitespace-nowrap">{item.waste}</td>
                      <td className="p-3 font-bold text-white whitespace-nowrap">{item.loss}</td>
                      <td className="p-3 text-[#a2c2b0] whitespace-nowrap">{item.scrap}</td>
                      <td className="p-3 text-[#48a65e] font-bold whitespace-nowrap">{item.yield}</td>
                      <td className="p-3 text-white whitespace-nowrap">{item.carbon}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            item.status === "Action open"
                              ? "bg-amber-950/60 text-amber-400 border border-amber-800/50"
                              : item.status === "Resolved"
                              ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50"
                              : "bg-[#0c3120] text-[#48a65e] border border-[#17452d]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setEditingLog({ ...item })}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#0c3120] border border-[#17452d] px-2.5 py-1 text-[11px] font-bold text-[#48a65e] hover:bg-[#48a65e] hover:text-white transition-all"
                        >
                          <Pencil size={12} />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LOG MODAL */}
      {editingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-[#072115] border border-[#17452d] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
              <h3 className="font-display text-base font-extrabold text-[#48a65e] flex items-center gap-2">
                <Pencil size={16} />
                Edit Upload Log Record
              </h3>
              <button
                onClick={() => setEditingLog(null)}
                className="rounded-lg p-1 text-[#a2c2b0] hover:bg-[#0c3120] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3 grid-cols-2 text-xs">
              <label className="block">
                <span className="form-label text-[#48a65e]">Date</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.date}
                  onChange={(e) => setEditingLog({ ...editingLog, date: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Type</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.type}
                  onChange={(e) => setEditingLog({ ...editingLog, type: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Energy</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.energy}
                  onChange={(e) => setEditingLog({ ...editingLog, energy: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Waste</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.waste}
                  onChange={(e) => setEditingLog({ ...editingLog, waste: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Loss (₹)</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.loss}
                  onChange={(e) => setEditingLog({ ...editingLog, loss: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Scrap (kg)</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.scrap}
                  onChange={(e) => setEditingLog({ ...editingLog, scrap: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Yield</span>
                <input
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.yield}
                  onChange={(e) => setEditingLog({ ...editingLog, yield: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Status</span>
                <select
                  className="form-input text-white bg-[#072115] border-[#17452d] focus:border-[#48a65e]"
                  value={editingLog.status}
                  onChange={(e) => setEditingLog({ ...editingLog, status: e.target.value })}
                >
                  <option value="Verified">Verified</option>
                  <option value="Action open">Action open</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#17452d]">
              <button
                type="button"
                onClick={() => setEditingLog(null)}
                className="rounded-lg border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-white hover:bg-[#113f2a]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-lg bg-[#48a65e] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#54be6c]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Dropzone({
  name,
  fileRecord,
  onFile,
}: {
  name: string;
  fileRecord?: UploadFileRecord;
  onFile: (file?: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) onFile(droppedFile);
      }}
      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all overflow-hidden w-full ${
        isDragging
          ? "border-[#48a65e] bg-[#0c3120]"
          : fileRecord
          ? "border-[#48a65e]/80 bg-[#05180f] shadow-lg"
          : "border-[#48a65e]/50 bg-[#0c3120]/60 hover:border-[#48a65e] hover:bg-[#0c3120]"
      }`}
    >
      {fileRecord ? (
        <div className="relative w-full h-[460px] md:h-[500px] rounded-xl overflow-hidden bg-[#05180f] flex items-center justify-center p-3 group">
          {fileRecord.url ? (
            <img
              src={fileRecord.url}
              alt={fileRecord.name}
              className="w-full h-full object-contain drop-shadow-md rounded-lg"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <FileText className="text-[#48a65e] size-16 mb-4 animate-bounce" />
              <span className="text-base font-bold text-white max-w-full truncate">{fileRecord.name}</span>
              <span className="text-xs text-[#a2c2b0] mt-2">PDF Document Ready</span>
            </div>
          )}

          {/* Top-right Status Badge */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#072115]/90 border border-[#48a65e] px-3.5 py-1.5 text-xs font-bold text-[#48a65e] backdrop-blur-md shadow-md">
            <CheckCircle2 size={15} />
            <span>Uploaded</span>
          </div>

          {/* Bottom Info & Replace Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#072115] via-[#072115]/85 to-transparent p-4 flex items-end justify-between transition-all group-hover:from-[#072115]/95">
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <ImageIcon className="text-[#48a65e] shrink-0 size-4" />
              <span className="text-xs font-extrabold text-white truncate max-w-xs">{fileRecord.name}</span>
            </div>
            <span className="shrink-0 rounded-lg bg-[#48a65e] px-3 py-1.5 text-xs font-black text-white shadow group-hover:scale-105 transition-transform">
              Click or drop to replace
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-4 py-16 text-center px-6 min-h-[380px] flex flex-col items-center justify-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-[#0c3120] text-[#48a65e] border border-[#17452d] shadow-inner">
            <UploadCloud size={32} />
          </div>
          <div className="space-y-1">
            <span className="block text-base font-extrabold text-[#48a65e]">Drop vertical photo or click to browse</span>
            <span className="block text-xs text-[#a2c2b0]">Full vertical card layout for photos & documents</span>
            <span className="block text-[11px] text-[#8ca897] pt-1">Supports JPG, PNG, WEBP, PDF</span>
          </div>
        </div>
      )}
      <input
        className="hidden"
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </label>
  );
}