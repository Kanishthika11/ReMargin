import { generatePdfDocument } from "./pdfGenerator";

export type ReportType = "ESG_EVIDENCE" | "GREEN_LOAN" | "SOLAR_INVESTMENT";

export interface GeneratedReportResponse {
  reportType: ReportType;
  reportId: string;
  generatedAt: string;
  pdfBlob: Blob;
  pdfUrl: string;
  filename: string;
}

/**
 * Frontend Service Interface for triggering report generation from the backend API.
 * The frontend sends the selected reportType and authenticated company context to POST /reports/generate.
 */
export async function requestGenerateReport(
  companyId: string,
  reportType: ReportType,
  companyName: string = "ReMargin CNC Manufacturing Unit — Demo Factory"
): Promise<GeneratedReportResponse> {
  // Simulated backend API response producing valid PDF Blob stream
  await new Promise((resolve) => setTimeout(resolve, 800));

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const dateFilename = now.toISOString().slice(0, 10);
  const safeCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, "_");

  let typePrefix = "ReMargin_ESG_Evidence_Report";
  if (reportType === "GREEN_LOAN") {
    typePrefix = "ReMargin_Green_Loan_Report";
  } else if (reportType === "SOLAR_INVESTMENT") {
    typePrefix = "ReMargin_Solar_Investment_Plan_Report";
  }

  const filename = `${typePrefix}_${safeCompanyName}_${dateFilename}.pdf`;

  // Generate authentic PDF document matching official templates
  const pdfBlob = generatePdfDocument(reportType, companyName);
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return {
    reportType,
    reportId: `RM-${reportType.slice(0, 3)}-${Date.now().toString().slice(-6)}`,
    generatedAt: `${dateFormatted} at ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`,
    pdfBlob,
    pdfUrl,
    filename,
  };
}
