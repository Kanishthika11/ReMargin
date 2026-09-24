import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronDown,
  Download,
  FileCheck2,
  FileText,
  Info,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { PdfPreviewContainer } from "@/components/pdf-viewer";
import { getFactoryProfile } from "@/lib/factory-profile";
import {
  GeneratedReportResponse,
  ReportType,
  requestGenerateReport,
} from "@/services/reportService";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — ReMargin" },
      {
        name: "description",
        content:
          "Generate and download sustainability, financing and investment reports for your factory.",
      },
      { property: "og:title", content: "Reports — ReMargin" },
      {
        property: "og:description",
        content:
          "Generate and download sustainability, financing and investment reports for your factory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReportsPage,
});

export interface ReportOption {
  type: ReportType;
  name: string;
  description: string;
}

export const REPORT_OPTIONS: ReportOption[] = [
  {
    type: "ESG_EVIDENCE",
    name: "ESG Evidence Report",
    description:
      "Generate an evidence-first sustainability report using factory energy, emissions, production and supporting evidence.",
  },
  {
    type: "GREEN_LOAN",
    name: "Green Loan Enablement Report",
    description:
      "Generate a lender-oriented report containing project, use-of-proceeds, baseline, sustainability KPI and evidence information.",
  },
  {
    type: "SOLAR_INVESTMENT",
    name: "Solar Investment Report",
    description:
      "Generate a solar investment planning report containing energy baseline, solar sizing, financial case and implementation information.",
  },
];

export function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState<ReportType | "">("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [generatedReport, setGeneratedReport] = useState<GeneratedReportResponse | null>(null);

  const selectedOption = REPORT_OPTIONS.find((r) => r.type === selectedReportType);

  async function handleGenerateReport() {
    if (!selectedReportType) return;

    setIsGenerating(true);
    setErrorState(null);

    try {
      const factoryProfile = getFactoryProfile();
      const companyId = factoryProfile?.companyName
        ? `FACTORY-${factoryProfile.companyName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}`
        : "FACTORY-001";
      const companyName = factoryProfile?.companyName || "Precision Works";

      const reportResponse = await requestGenerateReport(companyId, selectedReportType, companyName);
      setGeneratedReport(reportResponse);
    } catch (err) {
      console.error("Report generation error:", err);
      setErrorState("Unable to generate the report. Please try again. If the problem continues, check your factory data or contact support.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDownload() {
    if (!generatedReport) return;
    const a = document.createElement("a");
    a.href = generatedReport.pdfUrl;
    a.download = generatedReport.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Factory Reporting"
        title="Reports"
        description="Generate and download sustainability, financing and investment reports for your factory."
      />

      {/* Main Selection & Generation Controls Card */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-xl space-y-6 mb-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
            <FileCheck2 size={20} />
          </span>
          <div>
            <h2 className="font-display font-extrabold text-white text-lg">Report Generation</h2>
            <p className="text-xs text-[#a2c2b0]">
              Select a report type to request an official PDF report from the backend.
            </p>
          </div>
        </div>

        {/* Report Selector Component */}
        <ReportSelector
          selectedType={selectedReportType}
          onSelect={(type) => {
            setSelectedReportType(type);
            setErrorState(null);
          }}
          disabled={isGenerating}
        />

        {/* Report Description Component */}
        {selectedOption && <ReportDescription option={selectedOption} />}

        {/* Generate Report Button Component */}
        <div className="flex items-center justify-between pt-2 border-t border-[#17452d]">
          {isGenerating && selectedOption ? (
            <div className="flex items-center gap-2 text-xs font-bold text-[#48a65e]">
              <span className="text-[#a2c2b0]">Selected Report:</span>
              <span className="text-white">{selectedOption.name}</span>
            </div>
          ) : (
            <div />
          )}

          <GenerateReportButton
            disabled={!selectedReportType || isGenerating}
            isGenerating={isGenerating}
            onClick={handleGenerateReport}
          />
        </div>
      </div>

      {/* Conditional States */}
      {isGenerating ? (
        <ReportLoadingState selectedReportName={selectedOption?.name || undefined} />
      ) : errorState ? (
        <ReportErrorState
          errorMessage={errorState}
          onRetry={handleGenerateReport}
        />
      ) : generatedReport ? (
        <ReportPreview
          report={generatedReport}
          selectedReportName={selectedOption?.name || "Report"}
          onDownload={handleDownload}
          onRegenerate={handleGenerateReport}
        />
      ) : (
        <ReportEmptyState />
      )}
    </AppShell>
  );
}

/* =========================================================================
 * SUB-COMPONENTS
 * ========================================================================= */

export function ReportSelector({
  selectedType,
  onSelect,
  disabled,
}: {
  selectedType: ReportType | "";
  onSelect: (type: ReportType) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-[#48a65e] uppercase tracking-wider">
        Select Report
      </label>
      <div className="relative">
        <select
          id="report-select-dropdown"
          className="w-full form-input bg-[#0c3120] text-white border-[#17452d] focus:border-[#48a65e] text-sm py-3 px-4 rounded-xl appearance-none font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          value={selectedType}
          disabled={disabled}
          onChange={(e) => onSelect(e.target.value as ReportType)}
        >
          <option value="">-- Select Report --</option>
          {REPORT_OPTIONS.map((r) => (
            <option key={r.type} value={r.type}>
              {r.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-4 top-3.5 text-[#48a65e] pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
}

export function ReportDescription({ option }: { option: ReportOption }) {
  return (
    <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs text-[#a2c2b0] flex items-start gap-3 animate-fade-in">
      <Info size={18} className="text-[#48a65e] shrink-0 mt-0.5" />
      <div>
        <strong className="block text-white font-bold text-sm mb-1">{option.name}</strong>
        <p className="leading-relaxed text-[#a2c2b0]">{option.description}</p>
      </div>
    </div>
  );
}

export function GenerateReportButton({
  disabled,
  isGenerating,
  onClick,
}: {
  disabled: boolean;
  isGenerating: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-8 py-3 text-sm font-extrabold text-white shadow-xl hover:bg-[#54be6c] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    >
      {isGenerating ? (
        <Loader2 size={18} className="animate-spin text-white" />
      ) : (
        <Sparkles size={18} />
      )}
      <span>{isGenerating ? "Generating report..." : "Generate Report"}</span>
    </button>
  );
}

export function ReportLoadingState({ selectedReportName }: { selectedReportName?: string | undefined }) {
  return (
    <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-12 text-center text-white shadow-xl space-y-4 animate-fade-in">
      <div className="flex justify-center">
        <div className="relative">
          <div className="size-16 rounded-full border-4 border-[#17452d] border-t-[#48a65e] animate-spin" />
          <FileText className="absolute inset-0 m-auto text-[#48a65e] size-6" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-extrabold text-white">Generating your report...</h3>
        {selectedReportName && (
          <p className="text-xs text-[#48a65e] font-semibold mt-1">
            Selected Report: {selectedReportName}
          </p>
        )}
        <p className="text-xs text-[#a2c2b0] mt-2">
          Requesting backend report generation and PDF compilation. Please wait.
        </p>
      </div>
    </div>
  );
}

export function ReportErrorState({
  errorMessage,
  onRetry,
}: {
  errorMessage: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#7f1d1d] bg-[#1c0a0a] p-8 text-center text-white shadow-xl space-y-4 animate-fade-in">
      <div className="flex justify-center text-[#ef4444]">
        <AlertCircle size={40} />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-white">Unable to generate the report.</h3>
        <p className="text-xs text-[#fca5a5] max-w-md mx-auto">
          Please try again. If the problem continues, check your factory data or contact support.
        </p>
        {errorMessage && (
          <p className="text-[11px] font-mono text-zinc-400 mt-2 bg-[#2d1212] p-2 rounded-lg inline-block">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="pt-2">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-[#ef4444] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg hover:bg-[#dc2626] transition-all cursor-pointer"
        >
          <RefreshCw size={15} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}

export function ReportEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#17452d] bg-[#072115]/50 p-12 text-center text-white shadow-xs space-y-3">
      <div className="flex justify-center text-[#7a9d88]">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#0c3120] border border-[#17452d] text-[#48a65e]">
          <FileText size={28} />
        </span>
      </div>
      <div>
        <h3 className="text-base font-extrabold text-white">Your report will appear here</h3>
        <p className="text-xs text-[#a2c2b0] mt-1 max-w-sm mx-auto">
          Select a report type and click Generate Report to create a PDF.
        </p>
      </div>
    </div>
  );
}

export function ReportPreview({
  report,
  selectedReportName,
  onDownload,
  onRegenerate,
}: {
  report: GeneratedReportResponse;
  selectedReportName: string;
  onDownload: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#17452d] bg-[#072115] p-5 text-white shadow-xl">
        <div>
          <h3 className="font-display text-lg font-extrabold text-white">{selectedReportName}</h3>
          <p className="text-xs text-[#a2c2b0] mt-0.5">
            Generated: <span className="text-white font-semibold">{report.generatedAt}</span>
          </p>
        </div>

        <button
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg hover:bg-[#54be6c] transition-all cursor-pointer"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Embedded PDF Viewer */}
      <PdfPreviewContainer
        pdfUrl={report.pdfUrl}
        reportTitle={selectedReportName}
        reportId={report.reportId}
        generatedDate={report.generatedAt}
        onDownload={onDownload}
        onRegenerate={onRegenerate}
      />
    </div>
  );
}
