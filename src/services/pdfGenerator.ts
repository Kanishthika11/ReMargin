import { jsPDF } from "jspdf";
import { ReportType } from "./reportService";

export function generatePdfDocument(
  reportType: ReportType,
  companyName: string = "ReMargin CNC Manufacturing Unit — Demo Factory"
): Blob {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  if (reportType === "GREEN_LOAN") {
    buildGreenLoanReport(doc, companyName);
  } else if (reportType === "SOLAR_INVESTMENT") {
    buildSolarInvestmentReport(doc, companyName);
  } else {
    buildEsgEvidenceReport(doc, companyName);
  }

  return doc.output("blob");
}

/* =========================================================================
 * HELPER UTILITIES FOR PDF DRAWING
 * ========================================================================= */
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_LEFT = 15;
const MARGIN_RIGHT = 15;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

function addHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(title, MARGIN_LEFT, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235); // blue-600
  doc.text(subtitle, MARGIN_LEFT, 24);
}

function addSectionHeading(doc: jsPDF, title: string, yPos: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(title, MARGIN_LEFT, yPos);
  return yPos + 6;
}

function addParagraph(doc: jsPDF, text: string, yPos: number, fontSize: number = 9): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);
  doc.setTextColor(51, 65, 85); // slate-700
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  doc.text(lines, MARGIN_LEFT, yPos);
  return yPos + lines.length * (fontSize * 0.45) + 3;
}

interface TableColumn {
  header: string;
  width: number; // percentage or mm
  align?: "left" | "center" | "right";
}

function drawTable(
  doc: jsPDF,
  columns: TableColumn[],
  rows: (string | number)[][],
  startY: number
): number {
  let y = startY;
  const rowHeight = 6;
  const headerHeight = 7;

  // Calculate column mm widths
  const colWidths = columns.map((col) => (col.width / 100) * CONTENT_WIDTH);

  // Draw Header Row
  doc.setFillColor(235, 243, 250); // Light blue background
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, headerHeight, "F");
  doc.setDrawColor(203, 213, 225); // border slate-300
  doc.setLineWidth(0.2);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, headerHeight, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59); // slate-800

  let currentX = MARGIN_LEFT;
  columns.forEach((col, idx) => {
    const colW = colWidths[idx];
    const textX = col.align === "right" ? currentX + colW - 3 : currentX + 3;
    doc.text(col.header, textX, y + 4.8, { align: col.align || "left" });
    currentX += colW;
  });

  y += headerHeight;

  // Draw Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);

  rows.forEach((row, rowIndex) => {
    // Check if new page needed
    if (y + rowHeight > PAGE_HEIGHT - 15) {
      doc.addPage();
      y = 20;
    }

    // Alternating background
    if (rowIndex % 2 === 1) {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, rowHeight, "F");
    }

    doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, rowHeight, "S");

    currentX = MARGIN_LEFT;
    row.forEach((cell, colIndex) => {
      const colW = colWidths[colIndex];
      const colDef = columns[colIndex];
      const textX = colDef?.align === "right" ? currentX + colW - 3 : currentX + 3;
      doc.setTextColor(30, 41, 59);
      doc.text(String(cell), textX, y + 4.2, { align: colDef?.align || "left" });
      currentX += colW;
    });

    y += rowHeight;
  });

  return y + 4;
}

/* =========================================================================
 * 1. GREEN LOAN REPORT BUILDER (een_Loan)
 * ========================================================================= */
function buildGreenLoanReport(doc: jsPDF, companyName: string) {
  // Page 1
  addHeader(doc, "ReMargin — Green Loan Report", `01 Apr 2026 – 30 Sep 2026 | ${companyName}`);

  let y = 32;

  // 1. Borrower & Project Identification
  y = addSectionHeading(doc, "1. Borrower & Project Identification", y);
  y = drawTable(
    doc,
    [
      { header: "Field", width: 32 },
      { header: "Value", width: 48 },
      { header: "Status", width: 20 },
    ],
    [
      ["Borrower / factory", companyName, "Planning value"],
      ["Country / region", "India / Karnataka", "Planning value"],
      ["Project", "Rooftop Solar PV + CNC Energy Efficiency Programme", "Planning value"],
      ["Loan amount", "Rs. 823,380", "Derived planning value"],
      ["Tenure", "5 years", "Planning assumption"],
      ["Interest rate", "9.0% p.a.", "Planning assumption"],
      ["Reporting period", "01 Apr 2026 – 30 Sep 2026", "Dataset"],
    ],
    y
  );

  // 2. Use of Proceeds
  y = addSectionHeading(doc, "2. Use of Proceeds", y);
  y = drawTable(
    doc,
    [
      { header: "Eligible use", width: 35 },
      { header: "Planned structure", width: 65 },
    ],
    [
      ["Solar PV / renewable electricity", "Rooftop PV; EPC invoice + commissioning evidence"],
      ["Energy-efficiency equipment", "CNC efficiency upgrades; invoice + specification"],
      ["Monitoring / metering", "Electricity and solar generation meters; installation evidence"],
    ],
    y
  );
  y = addParagraph(doc, "Completed structure is a planning template; the supplied dataset does not contain these invoices.", y, 8);

  // 3. Baseline
  y = addSectionHeading(doc, "3. Baseline", y);
  y = drawTable(
    doc,
    [
      { header: "KPI", width: 45 },
      { header: "Baseline", width: 30, align: "right" },
      { header: "Unit", width: 25 },
    ],
    [
      ["Actual energy", "53,466.22", "kWh"],
      ["Scope 1", "4.734", "tCO2e"],
      ["Scope 2", "21.170", "tCO2e"],
      ["Total emissions", "25.904", "tCO2e"],
      ["Carbon intensity", "1.184", "kgCO2e/unit"],
      ["Energy efficiency", "82.91", "%"],
      ["Scrap rate", "11.69", "%"],
      ["Production yield", "88.31", "%"],
    ],
    y
  );

  // 4. Sustainability KPIs
  y = addSectionHeading(doc, "4. Sustainability KPIs", y);
  y = drawTable(
    doc,
    [
      { header: "KPI", width: 25 },
      { header: "Baseline", width: 20, align: "right" },
      { header: "Unit", width: 25 },
      { header: "Target", width: 30 },
    ],
    [
      ["Scope 1", "4.734", "tCO2e / period", "Maintain at or below baseline"],
      ["Scope 2", "21.170", "tCO2e / period", "Reduce through renewable electricity"],
      ["Carbon intensity", "1.184", "kgCO2e/unit", "<= 1.00 kgCO2e/unit"],
      ["Energy efficiency", "82.91", "%", ">= 85%"],
      ["Scrap rate", "11.69", "%", "<= 8%"],
      ["Production yield", "88.31", "%", ">= 92%"],
    ],
    y
  );

  // 5. Impact Measurement
  y = addSectionHeading(doc, "5. Impact Measurement", y);
  y = addParagraph(
    doc,
    "Monthly monitoring: energy, Scope 1/2, carbon intensity, production yield, scrap rate and project progress. Targets are ReMargin planning targets and should be lender-approved.",
    y
  );

  // 6. Reporting & Verification
  y = addSectionHeading(doc, "6. Reporting & Verification", y);
  y = addParagraph(
    doc,
    "Recommended evidence: bills, fuel records, production/quality data, machine register, project meter records, invoices, commissioning documents, emission-factor sources and annual KPI review.",
    y
  );

  // Page 2
  doc.addPage();
  y = 20;

  // 7. Financing Structure
  y = addSectionHeading(doc, "7. Financing Structure", y);
  y = drawTable(
    doc,
    [
      { header: "Item", width: 35 },
      { header: "Value", width: 25, align: "right" },
      { header: "Basis", width: 40 },
    ],
    [
      ["Project CAPEX", "Rs. 1,176,257", "21.4 kWp x Rs. 55,000/kWp"],
      ["Green financing share", "70%", "Planning assumption"],
      ["Loan amount", "Rs. 823,380", "CAPEX x share"],
      ["Interest rate", "9.0% p.a.", "Planning assumption"],
      ["Tenure", "5 years", "Planning assumption"],
      ["Monthly debt service", "Rs. 17,092", "Planning calculation"],
    ],
    y
  );

  // 8. Milestones & Covenants
  y = addSectionHeading(doc, "8. Milestones & Covenants", y);
  y = addParagraph(
    doc,
    "Project completion; documented use of proceeds; annual KPI reporting; meter evidence; document retention; review of material deviations and corrective actions.",
    y
  );

  // 9. Important Note
  y = addSectionHeading(doc, "9. Important Note", y);
  y = addParagraph(
    doc,
    "Completed demonstration Green Loan report. Financing values and targets are planning assumptions, not lender commitments or certification.",
    y
  );
}

/* =========================================================================
 * 2. SOLAR INVESTMENT PLAN REPORT BUILDER (Solar)
 * ========================================================================= */
function buildSolarInvestmentReport(doc: jsPDF, companyName: string) {
  addHeader(doc, "ReMargin — Solar Investment Plan Report", `01 Apr 2026 – 30 Sep 2026 | ${companyName}`);

  let y = 32;

  // 1. Investment Objective
  y = addSectionHeading(doc, "1. Investment Objective", y);
  y = addParagraph(
    doc,
    "Offset approximately 30% of annualized factory electricity demand with rooftop solar PV while improving auditable Scope 2 and electricity-cost reporting.",
    y
  );
  y = addParagraph(doc, "The 30% target is a ReMargin planning assumption added to complete the model.", y);

  // 2. Baseline
  y = addSectionHeading(doc, "2. Baseline", y);
  y = drawTable(
    doc,
    [
      { header: "Metric", width: 60 },
      { header: "Result", width: 40, align: "right" },
    ],
    [
      ["Six-month actual energy", "53,466.22 kWh"],
      ["Six-month expected energy", "49,277.46 kWh"],
      ["Six-month ideal energy", "43,129.73 kWh"],
      ["Energy gap", "4,188.76 kWh"],
      ["Energy gap vs expected", "8.50%"],
      ["Total expenditure", "Rs. 1,796,832.30"],
      ["Scope 2", "21.170 tCO2e"],
    ],
    y
  );

  // 3. System Sizing
  y = addSectionHeading(doc, "3. System Sizing", y);
  y = drawTable(
    doc,
    [
      { header: "Parameter", width: 35 },
      { header: "Planning value", width: 30, align: "right" },
      { header: "Basis", width: 35 },
    ],
    [
      ["Annualized energy", "106,932.44 kWh/year", "6-month actual x 2"],
      ["Target solar share", "30%", "Planning assumption"],
      ["Annual solar generation", "32,079.73 kWh/year", "Load x share"],
      ["Specific yield", "1,500 kWh/kWp/year", "Planning assumption"],
      ["Estimated system size", "21.4 kWp", "Generation / yield"],
    ],
    y
  );
  y = addParagraph(
    doc,
    "Final engineering requires roof survey, shading, structural review, load profile and electrical/interconnection checks.",
    y,
    8
  );

  // 4. Financial Case
  y = addSectionHeading(doc, "4. Financial Case", y);
  y = drawTable(
    doc,
    [
      { header: "Item", width: 35 },
      { header: "Planning value", width: 30, align: "right" },
      { header: "Basis", width: 35 },
    ],
    [
      ["CAPEX", "Rs. 1,176,257", "Rs. 55,000/kWp"],
      ["Electricity tariff", "Rs. 8.00/kWh", "Planning assumption"],
      ["Gross annual savings", "Rs. 256,638", "Generation x tariff"],
      ["Annual O&M", "Rs. 17,644", "1.5% CAPEX"],
      ["Net annual benefit", "Rs. 238,994", "Savings - O&M"],
      ["Simple payback", "4.92 years", "CAPEX / net benefit"],
    ],
    y
  );
  y = addParagraph(
    doc,
    "Planning assumptions must be replaced by site-specific EPC, tariff, financing and O&M; data before investment approval.",
    y,
    8
  );

  // 5. Environmental Impact Logic
  y = addSectionHeading(doc, "5. Environmental Impact Logic", y);
  y = addParagraph(
    doc,
    "Planning solar generation: 32,080 kWh/year. Actual Scope 2 result in the dataset: 21.170 tCO2e for the reporting period. Final avoided emissions require documented project generation and accounting treatment.",
    y
  );

  // 6. Implementation Roadmap
  y = addSectionHeading(doc, "6. Implementation Roadmap", y);
  y = drawTable(
    doc,
    [
      { header: "Phase", width: 22 },
      { header: "Activities", width: 43 },
      { header: "Evidence", width: 35 },
    ],
    [
      ["Feasibility", "Roof/site survey, load study, shading, structure", "Survey + load profile"],
      ["Commercial", "EPC bids, financing, savings case", "Quotes + financial model"],
      ["Approval", "Electrical/grid approvals", "Approval records"],
      ["Installation", "PV, inverter, protection, meter", "Invoices + records"],
      ["Commissioning", "Testing and meter verification", "Commissioning certificate"],
      ["Operations", "Monthly generation/performance tracking", "Generation meter + ReMargin"],
    ],
    y
  );

  // 7. ReMargin Monitoring
  y = addSectionHeading(doc, "7. ReMargin Monitoring", y);
  y = addParagraph(
    doc,
    "Track solar generation, solar share, avoided purchased kWh, estimated avoided CO2e, savings, availability, performance ratio and evidence completeness.",
    y
  );
}

/* =========================================================================
 * 3. ESG EVIDENCE REPORT BUILDER
 * ========================================================================= */
function buildEsgEvidenceReport(doc: jsPDF, companyName: string) {
  // Page 1
  addHeader(doc, "ReMargin — ESG Evidence Report", `01 Apr 2026 – 30 Sep 2026 | ${companyName}`);

  let y = 32;

  // 1. Cover & Report Identification
  y = addSectionHeading(doc, "1. Cover & Report Identification", y);
  y = addParagraph(doc, `Factory: ${companyName}`, y);
  y = addParagraph(doc, "Country / Region: India / Karnataka", y);
  y = addParagraph(doc, "Report ID: RM-DEMO-2026-09", y);
  y = addParagraph(doc, "Generated from the supplied dashboard dataset.", y);
  y += 2;

  // 2. Executive Summary
  y = addSectionHeading(doc, "2. Executive Summary", y);
  y = drawTable(
    doc,
    [
      { header: "Metric", width: 35 },
      { header: "Result", width: 30, align: "right" },
      { header: "Unit / basis", width: 35 },
    ],
    [
      ["Scope 1", "4.734", "tCO2e / period"],
      ["Scope 2", "21.170", "tCO2e / period"],
      ["Total emissions", "25.904", "tCO2e / period"],
      ["Baseline emissions", "28.758", "tCO2e / period"],
      ["Carbon intensity", "1.184", "kgCO2e / unit"],
      ["Scrap rate", "11.69", "%"],
      ["Production yield", "88.31", "%"],
      ["Energy efficiency", "82.91", "%"],
      ["Actual energy", "53,466.22", "kWh"],
      ["Expected energy", "49,277.46", "kWh"],
      ["Energy gap", "4,188.76", "kWh / 8.50% above expected"],
      ["Expenditure", "Rs. 1,796,832.30", "period"],
    ],
    y
  );
  y = addParagraph(
    doc,
    "Factory identity and report metadata are presentation assumptions; operational KPI results are taken from the supplied dataset.",
    y,
    8
  );

  // 3. Energy Evidence Register
  y = addSectionHeading(doc, "3. Energy Evidence Register", y);
  y = drawTable(
    doc,
    [
      { header: "ID", width: 15 },
      { header: "Metric", width: 25 },
      { header: "Source", width: 25 },
      { header: "Result", width: 20, align: "right" },
      { header: "Classification", width: 15 },
    ],
    [
      ["E-001", "Actual energy", "Uploaded dataset", "53,466.22 kWh", "Dataset result"],
      ["E-002", "Expected energy", "Uploaded dataset", "49,277.46 kWh", "Dataset result"],
      ["E-003", "Ideal energy", "Uploaded dataset", "43,129.73 kWh", "Dataset result"],
      ["E-004", "Energy gap", "Derived", "4,188.76 kWh", "Calculated"],
      ["E-005", "Tariff", "ReMargin assumption", "Rs. 8.00/kWh", "Planning value"],
    ],
    y
  );

  // 4. Scope 1 Evidence
  y = addSectionHeading(doc, "4. Scope 1 Evidence", y);
  y = addParagraph(
    doc,
    "Reported Scope 1: 4.734 tCO2e. Presentation basis: diesel/LPG operational-fuel records. Underlying fuel quantity/source documents were not supplied.",
    y
  );

  // 5. Scope 2 Evidence
  y = addSectionHeading(doc, "5. Scope 2 Evidence", y);
  y = addParagraph(
    doc,
    "Reported Scope 2: 21.170 tCO2e. Planning emission-factor metadata: 0.71 kgCO2e/kWh. This factor is an assumption for report completeness, not source evidence for the supplied total.",
    y
  );

  // 6. Production Carbon
  y = addSectionHeading(doc, "6. Production Carbon", y);
  y = addParagraph(doc, "Average carbon intensity: 1.184 kgCO2e/unit. The report preserves the dataset's unit basis.", y);

  // 7. Scrap & Yield
  y = addSectionHeading(doc, "7. Scrap & Yield", y);
  y = drawTable(
    doc,
    [
      { header: "Metric", width: 40 },
      { header: "Result", width: 30, align: "right" },
      { header: "Basis", width: 30 },
    ],
    [
      ["Material input", "85,616.20 kg", "Dataset"],
      ["Usable output", "75,603.82 kg", "Dataset"],
      ["Scrap loss", "10,012.38 kg", "Dataset"],
      ["Scrap rate", "11.69%", "Calculated"],
      ["Production yield", "88.31%", "Calculated"],
    ],
    y
  );

  // Page 2
  doc.addPage();
  y = 20;

  // 8. Baseline & Opportunity Analysis
  y = addSectionHeading(doc, "8. Baseline & Opportunity Analysis", y);
  y = addParagraph(
    doc,
    "Actual energy is 4,188.76 kWh (8.50%) above expected. This is an investigation signal, not automatically waste. Necessary cutting, setup, coolant and auxiliary consumption is not labelled waste without comparable-job evidence.",
    y
  );

  // 9. Data Quality & Confidence
  y = addSectionHeading(doc, "9. Data Quality & Confidence", y);
  y = drawTable(
    doc,
    [
      { header: "Component", width: 35 },
      { header: "Treatment", width: 65 },
    ],
    [
      ["Source quality", "Dataset results + clearly marked planning metadata"],
      ["Completeness", "Operational fields supplied; primary evidence gaps completed as assumptions"],
      ["Model validation", "Not supplied; no invented validation statistic"],
      ["Bill reconciliation", "Not supplied; not claimed verified"],
      ["Freshness", "Period recorded: 01 Apr 2026 – 30 Sep 2026"],
    ],
    y
  );

  // 10. Methodology & Evidence Register
  y = addSectionHeading(doc, "10. Methodology & Evidence Register", y);
  y = addParagraph(
    doc,
    "Primary source: ReMargin_Full_6_Month_Dataset.csv. Derived metrics are calculated directly from supplied columns. Planning values are explicitly labelled as assumptions.",
    y
  );

  // 11. Boundary Statement
  y = addSectionHeading(doc, "11. Boundary Statement", y);
  y = addParagraph(
    doc,
    "Presentation-ready demonstration report. Planning assumptions must be replaced by primary documents before external assurance, financing or regulatory submission.",
    y
  );
}
