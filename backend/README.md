# ReMargin Backend Architecture

This backend directory provides a complete modular implementation corresponding to the 13-stage ReMargin Backend Architecture:

## 13-Stage Architecture Pipeline

1. **Factory Setup (`/api/v1/factory`)**
   - Factory details & regional emission factors
   - Machine specifications (CNC-01, CNC-02, etc.)
   - Production details & setup/idle parameters
   - Auxiliary equipment configuration (Compressor, HVAC, Coolant, Pumps)

2. **Upload Data (`/api/v1/upload`)**
   - Electricity bill processing (PDF/Image)
   - Fuel bills & material records
   - Production logs & scrap records

3. **Data Extraction (`/api/v1/extraction`)**
   - OCR processing for bills & documents
   - Data parsing, validation & structured data extraction

4. **Energy Estimation (`/api/v1/energy`)**
   - Machine energy breakdown (Cutting, Idle, Setup, Operating hours)
   - Auxiliary energy breakdown (Compressor, Coolant, HVAC, Lighting, Pumps)

5. **Energy Reconciliation (`/api/v1/reconciliation`)**
   - Actual electricity bill vs estimated consumption comparison
   - Unallocated energy identification & reconciliation error calculation (%)

6. **Confidence Score (`/api/v1/confidence`)**
   - Reliability model (MAE, RMSE, MAPE metrics)
   - Data completeness & data quality scoring

7. **Cost Calculation (`/api/v1/cost`)**
   - Energy-to-cost conversion (₹ per machine, ₹ per activity, ₹ per auxiliary, ₹ per part, total electricity cost)

8. **Carbon Calculation (`/api/v1/carbon`)**
   - Scope 1 emissions (Fuel: Diesel/LPG/NG)
   - Scope 2 emissions (Purchased electricity)
   - Total CO₂e (kg/t) & CO₂e per part calculation

9. **Scrap Analysis (`/api/v1/scrap`)**
   - Production efficiency metrics (Total production, Good parts, Scrap quantity)
   - Yield % & Scrap rate % analysis
   - Material-related emissions tracking

10. **Baseline & Trend Analysis (`/api/v1/trends`)**
    - Historical data comparison
    - Energy, cost, CO₂e, and scrap rate trends over time

11. **Opportunities & Recommendations (`/api/v1/recommendations`)**
    - Automated detection of high energy usage, high idle time, and process inefficiencies
    - Actionable interventions & savings opportunities

12. **Evidence Report Generation (`/api/v1/reports`)**
    - ESG / CBAM audit-ready report creation
    - Summary of methodology, assumptions, source documents, and emission factors
    - PDF & Excel export capabilities

13. **Dashboard & History (`/api/v1/dashboard`)**
    - Aggregated metrics for energy, cost, and carbon dashboards
    - Machine-wise breakdowns and historical data feeds
