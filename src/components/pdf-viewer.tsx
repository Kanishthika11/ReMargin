import { jsPDF } from "jspdf";
import {
  CheckCircle2,
  Download,
  FileText,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useState } from "react";

export function PdfPreviewContainer({
  pdfDoc,
  pdfUrl: externalPdfUrl,
  reportTitle,
  reportId,
  generatedDate,
  onDownload,
  onRegenerate,
}: {
  pdfDoc?: jsPDF | null;
  pdfUrl?: string | null;
  reportTitle: string;
  reportId: string;
  generatedDate: string;
  onDownload: () => void;
  onRegenerate?: () => void;
}) {
  const [internalPdfUrl, setInternalPdfUrl] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  useEffect(() => {
    if (externalPdfUrl) {
      setInternalPdfUrl(externalPdfUrl);
      return;
    }

    if (pdfDoc) {
      const blob = pdfDoc.output("blob");
      const url = URL.createObjectURL(blob);
      setInternalPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfDoc, externalPdfUrl]);

  const activePdfUrl = externalPdfUrl || internalPdfUrl;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Report Status Header */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-5 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
            <FileText size={20} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-white text-base">{reportTitle}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0c3120] border border-[#48a65e] px-2.5 py-0.5 text-[10px] font-bold text-[#48a65e]">
                <CheckCircle2 size={12} />
                Generated Successfully
              </span>
            </div>
            <p className="text-xs text-[#a2c2b0] mt-0.5">
              Report ID: <strong className="text-white font-mono">{reportId}</strong> • Generated on {generatedDate}
            </p>
          </div>
        </div>

        {/* Toolbar & Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 rounded-xl border border-[#17452d] bg-[#0c3120] p-1 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(60, z - 15))}
              className="p-1.5 text-[#a2c2b0] hover:text-white hover:bg-[#113f2a] rounded-lg transition-all"
              title="Zoom Out"
            >
              <ZoomOut size={15} />
            </button>
            <span className="px-2 font-mono font-bold text-[#48a65e]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(160, z + 15))}
              className="p-1.5 text-[#a2c2b0] hover:text-white hover:bg-[#113f2a] rounded-lg transition-all"
              title="Zoom In"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-3 py-2 text-xs font-bold text-white hover:bg-[#113f2a] transition-all"
            >
              <RefreshCw size={14} />
              <span>Regenerate</span>
            </button>
          )}

          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#54be6c] shadow-md transition-all cursor-pointer"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Embedded PDF Preview Frame */}
      <div className="rounded-2xl border border-[#17452d] bg-[#05180f] p-3 shadow-xl overflow-hidden">
        {activePdfUrl ? (
          <div
            className="w-full transition-all duration-300 mx-auto overflow-auto"
            style={{ height: "720px", transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          >
            <iframe
              src={`${activePdfUrl}#toolbar=1&navpanes=0`}
              className="w-full h-full rounded-xl border border-[#17452d] bg-white shadow-inner"
              title={reportTitle}
            />
          </div>
        ) : (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <RefreshCw className="text-[#48a65e] size-8 animate-spin mb-2" />
            <span className="text-xs font-bold text-white">Rendering PDF Preview...</span>
          </div>
        )}
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex items-center justify-between pt-2">
        {onRegenerate ? (
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2.5 text-xs font-bold text-[#48a65e] hover:bg-[#113f2a] transition-all cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Regenerate Report</span>
          </button>
        ) : <div />}

        <button
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg hover:bg-[#54be6c] transition-all cursor-pointer"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}

