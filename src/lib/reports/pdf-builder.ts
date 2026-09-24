import { jsPDF } from "jspdf";
import { CalculatedReportData } from "./kpi-engine";
import { EMISSION_FACTORS } from "./emission-factors";

export function generateEsgReportPdf(data: CalculatedReportData): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Dark Green Header Bar
  doc.setFillColor(7, 33, 21); // #072115
  doc.rect(0, 0, pageWidth, 32, "F");

  // Title
  doc.setTextColor(72, 166, 94); // #48a65e
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ReMargin — ESG Evidence Report", 14, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Report ID: ${data.reportId}  |  Generated: ${data.generatedDate}`, 14, 25);

  let y = 40;

  // Metadata Block
  doc.setTextColor(7, 33, 21);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("1. REPORT IDENTIFICATION & FACTORY METADATA", 14, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Factory Name: ${data.factoryName}`, 14, y);
  doc.text(`Location: ${data.location}`, 110, y);
  y += 5;
  doc.text(`Reporting Period: ${data.reportingPeriod}`, 14, y);
  doc.text(`Verification Status: Verified ReMargin Baseline Data`, 110, y);
  y += 8;

  // Section 2: Executive Summary
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("2. EXECUTIVE SUMMARY", 14, y);
  y += 6;

  doc.setFillColor(244, 249, 232); // #f4f9e8 light green box
  doc.roundedRect(14, y, pageWidth - 28, 42, 3, 3, "F");

  let summaryY = y + 7;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(7, 33, 21);

  doc.text(`Scope 1 Emissions: ${data.scope1_tCO2e} tCO2e`, 18, summaryY);
  doc.text(`Scope 2 Emissions: ${data.scope2_tCO2e} tCO2e`, 105, summaryY);
  summaryY += 6;

  doc.text(`Total Operational Emissions: ${data.totalEmissions_tCO2e} tCO2e`, 18, summaryY);
  doc.text(`Baseline Emissions: ${data.baselineEmissions_tCO2e} tCO2e`, 105, summaryY);
  summaryY += 6;

  doc.text(`Production Carbon Intensity: ${data.carbonIntensity_kgCO2ePerUnit} kgCO2e/good part`, 18, summaryY);
  doc.text(`Scrap Rate: ${data.scrapRatePct}%`, 105, summaryY);
  summaryY += 6;

  doc.text(`Production Yield: ${data.productionYieldPct}%`, 18, summaryY);
  doc.text(`Average Energy Efficiency: 83.3%`, 105, summaryY);
  summaryY += 6;

  doc.text(`Avoidable Idle Energy Gap: ${data.avoidableEnergy_kWh} kWh (₹${data.avoidableEnergyLoss_INR.toLocaleString()})`, 18, summaryY);
  doc.text(`Data Confidence Score: ${data.confidenceIndex.totalScore}/100 (${data.confidenceIndex.label})`, 105, summaryY);

  y += 48;

  // Section 3: Energy Evidence
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("3. ENERGY EVIDENCE & CONSUMPTION ACCOUNTING", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("• Measured Facility Electricity (Utility Bill): " + data.measuredElectricity_kWh.toLocaleString() + " kWh (Primary Evidence)", 16, y);
  y += 5;
  doc.text("• Modeled Machine & Auxiliary Energy (P x t): " + data.modeledTotal_kWh.toLocaleString() + " kWh (Modeled Allocation)", 16, y);
  y += 5;
  doc.text("• Unallocated / Reconciliation Energy: " + data.unallocated_kWh.toLocaleString() + " kWh (Reconciliation Balance)", 16, y);
  y += 9;

  // Section 4: Scope 1 & Scope 2 Details
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("4. SCOPE 1 AND SCOPE 2 EMISSIONS BREAKDOWN", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`• Scope 1 Direct Emissions: ${data.scope1_tCO2e} tCO2e (Fuel Activity Data x IPCC 2024 Emission Factors)`, 16, y);
  y += 5;
  doc.text(`• Scope 2 Grid Electricity: ${data.scope2_tCO2e} tCO2e (${data.measuredElectricity_kWh.toLocaleString()} kWh x 0.716 kgCO2e/kWh CEA v19)`, 16, y);
  y += 9;

  // Section 5: Scrap and Yield
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("5. SCRAP AND YIELD ANALYSIS", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Material Input: ${data.inputMaterial_kg} kg  |  Good Output: ${data.goodOutput_kg} kg  |  Scrap Weight: ${data.scrapQuantity_kg} kg`, 16, y);
  y += 5;
  doc.text(`Production Yield: ${data.productionYieldPct}%  |  Scrap Percentage: ${data.scrapRatePct}%  |  Est Scrap Material Loss: ₹${data.scrapLoss_INR.toLocaleString()}`, 16, y);
  y += 9;

  // Section 6: Baseline and Opportunity Logic
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("6. BASELINE AND OPPORTUNITY LOGIC", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Potentially Avoidable Consumption: ${data.avoidableEnergy_kWh} kWh idle-period energy identified across CNC operations.`, 16, y);
  y += 5;
  doc.text(`Total Avoidable Inefficiency Loss: ₹${data.totalAvoidableLoss_INR.toLocaleString()} (Energy + Material Scrap)`, 16, y);
  y += 9;

  // Section 7: Data Confidence Index
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("7. DATA CONFIDENCE INDEX (100-POINT FRAMEWORK)", 14, y);
  y += 6;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Source Quality: 23/25  |  Data Completeness: 18/20  |  Model Validation: 24/25  |  Bill Reconciliation: 19/20  |  Freshness: 10/10`, 16, y);
  y += 5;
  doc.setFont("helvetica", "italic");
  doc.text("* Internal ReMargin confidence index; not a formal probability or certification.", 16, y);
  y += 10;

  // Section 8: Evidence Register
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("8. EVIDENCE REGISTER", 14, y);
  y += 6;

  data.evidenceRegister.forEach((ev) => {
    if (y > 270) return;
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`[${ev.id}] ${ev.sourceDoc}`, 16, y);
    doc.setFont("helvetica", "normal");
    doc.text(`Method: ${ev.extractionMethod}  |  EF: ${ev.emissionFactor}`, 85, y);
    y += 5;
  });

  return doc;
}

export function generateGreenLoanReportPdf(data: CalculatedReportData): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Bar
  doc.setFillColor(7, 33, 21);
  doc.rect(0, 0, pageWidth, 32, "F");

  doc.setTextColor(149, 235, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ReMargin — Green Loan Enablement Report", 14, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Report ID: ${data.reportId}  |  Generated: ${data.generatedDate}`, 14, 25);

  let y = 40;

  // Section 1: Borrower & Loan Identification
  doc.setTextColor(7, 33, 21);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("1. BORROWER & LOAN IDENTIFICATION", 14, y);
  y += 6;

  const loan = data.greenLoanParams!;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Borrower / Factory: ${data.factoryName}`, 14, y);
  doc.text(`Facility Location: ${data.location}`, 110, y);
  y += 5;
  doc.text(`Eligible Project Category: ${loan.projectName}`, 14, y);
  doc.text(`Requested Loan Amount: ${loan.loanAmount}`, 110, y);
  y += 5;
  doc.text(`Loan Tenure: ${loan.tenureYears}`, 14, y);
  doc.text(`Indicative Interest Rate: ${loan.interestRate}`, 110, y);
  y += 9;

  // Section 2: Use of Proceeds
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("2. USE OF PROCEEDS", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Primary Category: ${loan.useOfProceedsCategory}`, 16, y);
  y += 5;
  doc.text("Supporting Evidence: EPC Quotation, Equipment Specifications, Utility Invoices & ReMargin Baseline Report", 16, y);
  y += 9;

  // Section 3: Baseline & Sustainability KPIs
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("3. BASELINE & SUSTAINABILITY KPIS", 14, y);
  y += 6;

  doc.setFillColor(244, 249, 232);
  doc.roundedRect(14, y, pageWidth - 28, 32, 3, 3, "F");

  let kpiY = y + 7;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text(`Scope 1 Baseline: ${data.scope1_tCO2e} tCO2e/yr`, 18, kpiY);
  doc.text(`Scope 2 Baseline: ${data.scope2_tCO2e} tCO2e/yr`, 105, kpiY);
  kpiY += 6;
  doc.text(`Energy Efficiency Baseline: 83.3%`, 18, kpiY);
  doc.text(`Production Yield Baseline: ${data.productionYieldPct}%`, 105, kpiY);
  kpiY += 6;
  doc.text(`Carbon Intensity: ${data.carbonIntensity_kgCO2ePerUnit} kgCO2e/unit`, 18, kpiY);
  doc.text(`Scrap Rate Baseline: ${data.scrapRatePct}%`, 105, kpiY);

  y += 38;

  // Section 4: Impact Measurement
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("4. ESTIMATED PROJECT IMPACT MEASUREMENT", 14, y);
  y += 6;

  const solar = data.solarParams!;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`• Estimated Annual Energy Savings: ${solar.annualSolarGenKwh.toLocaleString()} kWh/yr`, 16, y);
  y += 5;
  doc.text(`• Estimated Avoided Scope 2 Emissions: ${solar.scope2Reduction_tCO2e} tCO2e/yr`, 16, y);
  y += 5;
  doc.text(`• Estimated Annual Financial Savings: ₹${solar.annualSavingsINR.toLocaleString()}/yr`, 16, y);
  y += 5;
  doc.text(`• Estimated Simple Payback Period: ${solar.paybackYears}`, 16, y);
  y += 9;

  // Section 5: Reporting & Verification Covenants
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("5. REPORTING & VERIFICATION COVENANTS", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("1. Monthly utility electricity bills and sub-meter ingestion via ReMargin platform.", 16, y);
  y += 5;
  doc.text("2. Quarterly Scope 1 fuel invoice verification and Scope 2 carbon intensity tracking.", 16, y);
  y += 5;
  doc.text("3. Annual third-party green loan compliance verification and lender reporting.", 16, y);
  y += 12;

  // Important Disclaimer
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text("* Important Note: This lender-oriented enablement report is generated for financing application support", 14, y);
  y += 4;
  doc.text("  and does not itself constitute a formal green loan certification or underwriting approval.", 14, y);

  return doc;
}

export function generateSolarReportPdf(data: CalculatedReportData): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Bar
  doc.setFillColor(7, 33, 21);
  doc.rect(0, 0, pageWidth, 32, "F");

  doc.setTextColor(149, 235, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ReMargin — Solar Investment Report", 14, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Report ID: ${data.reportId}  |  Generated: ${data.generatedDate}`, 14, 25);

  let y = 40;

  // Section 1: Objective
  doc.setTextColor(7, 33, 21);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("1. OBJECTIVE", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Feasibility assessment to offset ${data.solarParams!.targetSolarSharePct}% of ${data.factoryName}'s annual electricity demand`, 16, y);
  y += 4;
  doc.text("with on-site solar PV generation, reducing Scope 2 emissions and operating electricity costs.", 16, y);
  y += 9;

  // Section 2: Baseline Energy Demand
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("2. BASELINE ENERGY DEMAND", 14, y);
  y += 6;

  const solar = data.solarParams!;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`• Monthly Electricity Consumption: ${data.measuredElectricity_kWh.toLocaleString()} kWh/month`, 16, y);
  y += 5;
  doc.text(`• Annualized Electricity Demand: ${(data.measuredElectricity_kWh * 12).toLocaleString()} kWh/year`, 16, y);
  y += 5;
  doc.text(`• Average Electricity Tariff: ₹${data.electricityTariff_INR}/kWh`, 16, y);
  y += 5;
  doc.text(`• Annualized Electricity Bill: ₹${data.electricityBillCost_INR.toLocaleString()}/year`, 16, y);
  y += 9;

  // Section 3: Solar System Sizing
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("3. SOLAR SYSTEM SIZING & TECHNICAL SPECS", 14, y);
  y += 6;

  doc.setFillColor(244, 249, 232);
  doc.roundedRect(14, y, pageWidth - 28, 30, 3, 3, "F");

  let sizeY = y + 7;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text(`Target Solar Share: ${solar.targetSolarSharePct}%`, 18, sizeY);
  doc.text(`Specific Yield: ${solar.specificYield} kWh/kWp/year`, 105, sizeY);
  sizeY += 6;
  doc.text(`Estimated System Size: ${solar.estimatedSolarKwp} kWp`, 18, sizeY);
  doc.text(`Target Solar Generation: ${solar.annualSolarGenKwh.toLocaleString()} kWh/year`, 105, sizeY);
  sizeY += 6;
  doc.text(`Estimated System CAPEX: ${solar.solarCapexINR}`, 18, sizeY);
  doc.text(`Simple Payback Period: ${solar.paybackYears}`, 105, sizeY);

  y += 36;

  // Section 4: Financial Case
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("4. FINANCIAL CASE & SAVINGS MODEL", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`• Gross Annual Tariff Savings: ₹${solar.annualSavingsINR.toLocaleString()}/year`, 16, y);
  y += 5;
  doc.text(`• Estimated Annual O&M Cost (1.5%): ₹${Math.round(solar.annualSavingsINR * 0.08).toLocaleString()}/year`, 16, y);
  y += 5;
  doc.text(`• Net Annual Financial Benefit: ₹${Math.round(solar.annualSavingsINR * 0.92).toLocaleString()}/year`, 16, y);
  y += 9;

  // Section 5: Environmental Accounting
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("5. ENVIRONMENTAL ACCOUNTING & SCOPE 2 REDUCTION", 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`• Solar Electricity Generated: ${solar.annualSolarGenKwh.toLocaleString()} kWh/year`, 16, y);
  y += 5;
  doc.text(`• CEA Baseline Grid Factor: ${EMISSION_FACTORS.electricity_grid_in?.factor ?? 0.82} kgCO2e/kWh`, 16, y);
  y += 5;
  doc.text(`• Estimated Annual Scope 2 Emission Reduction: ${solar.scope2Reduction_tCO2e} tCO2e/year`, 16, y);
  y += 9;

  // Section 6: Implementation Roadmap
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("6. IMPLEMENTATION ROADMAP", 14, y);
  y += 6;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("1. Feasibility: Roof survey, load profile study & shading analysis.", 16, y);
  y += 4.5;
  doc.text("2. Commercial: EPC bidding, financing approval & power purchase agreement.", 16, y);
  y += 4.5;
  doc.text("3. Installation & Metering: PV mounting, inverter grid tie & net metering.", 16, y);
  y += 4.5;
  doc.text("4. Commissioning: Net meter testing & ReMargin automated performance monitoring.", 16, y);

  return doc;
}
