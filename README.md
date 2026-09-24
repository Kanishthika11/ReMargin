# FactoryIQ Insights

Build a complete, modern, production-quality web application called "ReMargin".

ReMargin is an energy, sustainability, carbon and waste intelligence platform designed for CNC-based MSME manufacturing companies.

CORE IDEA:

ReMargin helps CNC manufacturing MSMEs measure energy and material waste, convert inefficiencies into monetary loss (₹), identify possible causes, track corrective actions, monitor machines and maintenance, and generate sustainability/compliance/financial reports.

The website should NOT look like a generic admin dashboard. It should look like a premium industrial sustainability SaaS platform designed specifically for manufacturing companies.

The application should be responsive and work well on desktop, tablet and mobile.

==================================================

1. TECHNOLOGY STACK

==================================================

Frontend:

- React

- Tailwind CSS

- Chart.js

Backend:

- Python FastAPI

- Pydantic for API/input validation

Data processing:

- Google Cloud Vision API for OCR

- Pillow for image preprocessing

Database:

- PostgreSQL

Background processing:

- Redis

- Celery

Scheduled jobs:

- APScheduler

PDF generation:

- ReportLab

Deployment-ready structure:

- Frontend: Render

- Backend: Railway

IMPORTANT:

Create the application architecture so the frontend can communicate with a FastAPI backend through REST APIs.

For now, if external API credentials are unavailable, create clean mock/service layers so the UI works fully and the backend integration can be connected later.

Do not hardcode company-specific data globally.

All user/company/machine/upload/result/report/history data must be associated with the authenticated company/user.

==================================================

2. BRANDING

==================================================

Application name:

ReMargin

Primary concept:

"Turn energy waste into measurable savings."

Suggested main tagline:

"Measure Waste. Reduce Cost. Build a Greener Factory."

Alternative supporting statement:

"From energy data to ₹ savings, carbon insights and compliance-ready reports."

Visual identity:

- Premium industrial + sustainability aesthetic

- Clean modern SaaS interface

- Professional enough for factory owners and OEM-facing businesses

- Use a dark navy/deep blue base with teal/green sustainability accents

- Use white/light surfaces for cards

- Subtle gradients

- Rounded but professional cards

- Minimal glassmorphism only where appropriate

- Avoid excessive futuristic effects

- Avoid childish illustrations

- Use manufacturing, energy, carbon, analytics and sustainability visual language

- Use clean icons

- Use smooth micro-interactions

- Use charts and data visualization prominently

Create a ReMargin logo/wordmark area in the header.

==================================================

3. PUBLIC WEBSITE / LANDING PAGE

==================================================

Route:

/

The landing page must be visually impressive because it is the first page shown to judges, factory owners and visitors.

HEADER:

- ReMargin logo on the LEFT

- Navigation links in the center:

  - Problem

  - Solution

  - Features

  - Novelty

  - Insights

  - Contact

- On the RIGHT:

  - Login button

  - Register button

- Sticky header while scrolling

- Smooth scrolling to sections

HERO SECTION:

Large headline:

"Measure Waste. Reduce Cost. Build a Greener Factory."

Supporting text:

"ReMargin helps CNC MSMEs turn unmeasured energy and material waste into actionable ₹ savings, carbon insights and compliance-ready reports."

Primary CTA:

"Get Started"

Secondary CTA:

"Explore ReMargin"

Hero visual:

Create a sophisticated manufacturing analytics visual showing:

- CNC machines

- energy consumption

- ₹ loss

- carbon emissions

- efficiency

- sustainability analytics

connected together.

Include animated/stat cards such as:

- Energy Waste

- ₹ Cost Impact

- Carbon Emissions

- Scrap

- Efficiency

Do not invent unsupported real-world statistics in the hero. Use conceptual/sample dashboard values clearly marked as illustrative if necessary.

==================================================

4. LANDING PAGE — THE THREE GAPS

==================================================

Create a section titled:

"Why CNC MSMEs Need ReMargin"

Explain the three core gaps from the project.

GAP 1 — DATA & CAPABILITY GAP

Title:

"Energy & ESG Data Is Difficult to Capture"

Description:

"Many manufacturing MSMEs have limited access to granular energy data, continuous monitoring infrastructure and dedicated technical expertise. Existing processes can depend heavily on manual collection, fragmented records or specialist support."

Show visual:

Factory → Bills/Meters/Slips → Data Fragmentation → Limited Visibility

CTA/label:

"Capture data without complex setup"

GAP 2 — FINANCIAL TRANSLATION GAP

Title:

"Energy Waste Is Not Always Visible as ₹ Loss"

Description:

"Technical metrics such as kWh, carbon and efficiency are difficult to translate into immediate business decisions. ReMargin converts energy and material inefficiencies into understandable monetary impact."

Example card:

"1,200 kWh excess consumption"

↓

"₹9,600 estimated cost impact"

Clearly label numerical examples as illustrative.

GAP 3 — CARBON & COMPLIANCE DATA GAP

Title:

"Carbon Data Is Becoming Increasingly Important"

Description:

"Export-oriented manufacturers may need reliable emissions information for sustainability and applicable regulatory or customer requirements. ReMargin organizes factory data into structured carbon and reporting outputs."

Important:

Do NOT claim that CBAM applies to every CNC factory or every shipment.

Present CBAM as a relevant use case for covered products/supply chains.

Use three visually distinct cards with:

- Problem icon

- Short explanation

- "How ReMargin addresses it"

==================================================

5. HOW REMARGIN SOLVES THE PROBLEM

==================================================

Section title:

"From Factory Data to Action"

Create a visual process:

INPUT

↓

Capture

↓

OCR / Manual Entry

↓

Verification

↓

Standardization

↓

Analysis

↓

₹ Impact

↓

Recommendations

↓

Action Tracking

↓

Reports

Show these as connected cards.

Input sources:

- Electricity meter

- Electricity bill

- Scrap/production slip

- Machine specifications

- Maintenance information

Explain:

"Workers can photograph bills and slips or manually enter values. ReMargin processes the information and converts it into actionable insights."

==================================================

6. FEATURE HIGHLIGHTS

==================================================

Create a premium feature grid.

Feature 1:

"Photo-First Data Capture"

- Upload meter/bill/slip photos

- OCR extracts relevant information

- Human verification before processing

Feature 2:

"₹ Loss Alerts"

- Convert excess energy usage into estimated monetary loss

- Show specific causes where available

Feature 3:

"Scrap & Yield Tracking"

- Track input material

- Track production output

- Calculate yield

- Quantify excess scrap

- Convert scrap into ₹ impact

Feature 4:

"Fix Tracker"

- Identify issue

- Record corrective action

- Track improvement

- Verify whether efficiency improved

Feature 5:

"Auto ESG Reporting"

- Generate sustainability information

- Generate ESG/BRSR-oriented reports

Feature 6:

"Carbon Tracking"

- Track relevant Scope 1 and Scope 2 emissions

- Show carbon trends

Feature 7:

"Maintenance Tracker"

- Track machine service dates

- Maintenance alerts

- Link maintenance status with energy patterns

Feature 8:

"Green Loan Proposal"

- Use energy-saving data

- Show investment/savings/ROI information

- Generate proposal/report

Feature 9:

"Solar Feasibility"

- Analyze energy consumption

- Estimate suitable solar investment

- Show savings and payback information

==================================================

7. NOVELTY SECTION

==================================================

Create a dedicated section titled:

"What Makes ReMargin Different?"

Use a large visual comparison.

Traditional approach:

- kWh numbers

- disconnected bills

- manual reports

- technical data

- reactive maintenance

- separate sustainability work

ReMargin:

- ₹ impact

- unified factory data

- automated reports

- actionable insights

- fix tracking

- integrated sustainability + financial analysis

Main novelty statement:

"ReMargin connects energy, waste, money, maintenance, carbon and compliance in one workflow."

Highlight this workflow:

MEASURE

→ UNDERSTAND

→ QUANTIFY

→ ACT

→ VERIFY

→ REPORT

Do NOT describe ReMargin as simply an energy monitoring dashboard.

==================================================

8. THREE MAIN INFORMATION AREAS

==================================================

Create a section:

"Three Intelligence Layers"

Three large cards:

1. CARBON EMISSION TRACKING

Description:

"Track relevant factory emissions and visualize carbon trends from collected energy and operational data."

Include:

- CO₂e

- Scope 1

- Scope 2

- emissions trend

- emissions intensity

2. SUSTAINABILITY ANALYTICS

Description:

"Understand energy efficiency, material waste, production yield and sustainability performance."

Include:

- energy efficiency

- scrap

- yield

- waste

- sustainability trends

- improvement tracking

3. ENERGY MONITORING

Description:

"Monitor factory energy consumption and identify excessive usage and potential ₹ loss."

Include:

- meter readings

- energy consumption

- peak usage

- estimated loss

- efficiency

- machine-level information

Each card should have a "Explore" button.

==================================================

9. LANDING PAGE FOOTER

==================================================

Create a professional footer.

Columns:

PRODUCT

- Dashboard

- Energy Monitoring

- Carbon Tracking

- Sustainability Analytics

- Reports

- Maintenance

RESOURCES

- How It Works

- Features

- Novelty

- FAQ

ACCOUNT

- Login

- Register

- Profile

SUPPORT

- Feedback

- Contact Us

CONTACT:

- Email

- Phone

- Company support information

Include:

- Privacy Policy

- Terms

- Copyright

- Social/contact icons if appropriate

==================================================

10. REGISTRATION FLOW

==================================================

Route:

/register

When user clicks Register, show a professional multi-step registration form.

Required fields:

1. Full Name

2. Gmail / Email

3. Password

4. Confirm Password

5. Company Name

6. Company Address

7. Mobile Number

Validation must be implemented.

VALIDATION:

Full Name:

- Required

- Minimum reasonable length

- No invalid characters

Email:

- Required

- Valid email format

- Display clear validation error

Password:

- Required

- Minimum 8 characters

- At least one uppercase

- At least one lowercase

- At least one number

- At least one special character

Confirm Password:

- Must match password

Company Name:

- Required

Address:

- Required

Mobile:

- Required

- Valid Indian mobile number format

- 10 digits

Show inline validation messages.

Password strength indicator should be visible.

Prevent submission if any field is invalid.

After successful registration:

→ Store user/company information in PostgreSQL

→ Redirect to LOGIN page

==================================================

11. LOGIN PAGE

==================================================

Route:

/login

Clean professional login page.

Fields:

- Company Name

- Password

Buttons:

- Login

- Forgot Password

- Register

Authentication must verify the credentials against the database.

After successful login:

IF FIRST LOGIN:

→ Redirect to /setup

IF RETURNING USER:

→ Redirect directly to /dashboard

Do not show setup again after it has been completed.

==================================================

12. SETUP PAGE / FIRST-TIME COMPANY PROFILE

==================================================

Route:

/setup

This page appears only during first login.

After setup completion, this same page becomes:

"/profile"

Title:

"Set Up Your Factory"

SECTION 1 — COMPANY DETAILS

Automatically populate the details entered during registration:

- Name

- Email

- Company Name

- Address

- Mobile

Allow the user to edit them.

SECTION 2 — FACTORY DETAILS

Ask:

"How many CNC machines does your company have?"

Number input.

After entering the number, dynamically generate machine forms.

For EACH machine capture:

- Machine Name / ID

- Machine Type

- Manufacturer

- Model

- Rated Power / Wattage

- Operating Power if available

- Machine age

- Installation date if available

- Service interval

- Last service date

- Next service date

- Optional notes

Machine types can include:

- CNC Lathe

- CNC Milling

- CNC Router

- CNC Grinding

- Other

Provide:

"+ Add Machine"

Each machine must be stored as a separate database record linked to the company.

DATABASE RELATIONSHIP:

Company

  |

  ├── Machine 1

  ├── Machine 2

  ├── Machine 3

  └── Machine N

Do not store all machine information as one large text field.

Use a proper relational database structure.

After setup:

→ Save company

→ Save all machines

→ Mark setupCompleted = true

→ Redirect to /dashboard

==================================================

13. MAIN APPLICATION NAVIGATION

==================================================

After login/setup, use a persistent application layout.

TOP NAVBAR:

Left:

- ReMargin logo

Center/Left navigation:

- Dashboard

- Upload

- Tracker

- Result

- Reports

- History

Right:

- Notifications

- Profile icon

Profile icon:

→ opens profile/setup details

Include logout option.

Use active navigation states.

==================================================

14. DASHBOARD DROPDOWN

==================================================

When user clicks "Dashboard":

Show dropdown:

1. Carbon Tracker

2. Sustainability Analytics

3. Energy Monitoring

The Dashboard root should open:

/dashboard/carbon

This should be the default dashboard landing page.

==================================================

15. DASHBOARD COMMON LAYOUT

==================================================

Create a reusable dashboard layout.

LEFT SIDEBAR:

Style it similar to a clean ChatGPT-style navigation sidebar.

Sidebar items:

- Carbon Tracker

- Sustainability Analytics

- Energy Monitoring

Main content area changes based on selected sidebar item.

Do NOT reload the entire application unnecessarily.

Use shared layout components.

==================================================

16. CARBON TRACKER DASHBOARD

==================================================

Route:

/dashboard/carbon

This is the first dashboard page shown.

Top:

- Page title

- Factory name

- Date range selector

- Export/report shortcut

KPI CARDS:

- Total CO₂e

- Scope 1

- Scope 2

- Carbon intensity

- Change from previous period

Charts:

1. Carbon emissions over time

2. Scope 1 vs Scope 2

3. Carbon emissions by machine/category if data is available

4. Monthly trend

Use Chart.js.

Show:

"Last updated"

Use clearly labeled sample/empty states if there is insufficient real data.

==================================================

17. SUSTAINABILITY ANALYTICS

==================================================

Route:

/dashboard/sustainability

Sidebar remains visible.

KPIs:

- Energy efficiency

- Scrap rate

- Production yield

- Energy cost

- Estimated ₹ loss

- Savings/recovered cost

Charts:

- Energy efficiency trend

- Scrap trend

- Yield trend

- ₹ loss trend

- Energy vs production

Add a section:

"Improvement Opportunities"

Cards showing:

- High energy usage

- Excess scrap

- Maintenance-related inefficiency

- Potential savings

==================================================

18. ENERGY MONITORING

==================================================

Route:

/dashboard/energy

KPIs:

- Current period consumption

- Average consumption

- Peak consumption

- Estimated energy cost

- Estimated ₹ waste

Charts:

- Daily energy consumption

- Shift-level consumption

- Machine-level consumption

- Actual vs ideal energy

Show:

"Potential Energy Loss"

Example:

"₹9,600 estimated loss"

Clearly mark example/mock values when no actual data exists.

==================================================

19. UPLOAD PAGE

==================================================

Route:

/upload

Create a clean three-section data input page.

SECTION 1 — ENERGY METER

Title:

"Energy Meter Scan"

Options:

A. Upload meter image

B. Manually enter values

Upload:

- Drag and drop

- Browse file

- Image preview

- Remove/re-upload

OCR flow:

Upload image

→ Pillow preprocessing

→ Google Cloud Vision OCR

→ Extract start unit/end unit

→ Display extracted values

→ Human verification

→ Save

Manual fields:

- Start Unit

- End Unit

These fields should be optional individually depending on whether OCR/manual input is used.

Calculate:

Energy Used = End Unit - Start Unit

Validate:

- End unit cannot be less than start unit

- Values must be numeric

- No negative energy consumption

SECTION 2 — SCRAP / PRODUCTION

Title:

"Scrap & Production Data"

Options:

- Upload scrap slip

- Manual entry

Fields:

- Input Material

- Input Material Weight

- Production Output

- Production Output Weight

- Scrap Weight

- Unit

Calculate:

Yield

Scrap percentage

Potential material loss

Validate numerical values.

SECTION 3 — ELECTRICITY BILL

Title:

"Electricity Bill"

Upload:

- Image/PDF if supported

- Preview

- OCR processing

Extract where possible:

- Billing period

- Units consumed

- Amount

- Tariff/rate

Allow human verification before saving.

PRIMARY BUTTON:

"Process Data"

After successful submission:

→ Save upload record to database

→ Calculate results

→ Redirect to /result

==================================================

20. RESULT PAGE

==================================================

Route:

/result

This page shows the result generated from the latest upload.

Title:

"Factory Efficiency Results"

SECTION 1 — ENERGY WASTAGE

Show:

- Actual energy

- Expected/ideal energy where benchmark data exists

- Excess energy

- Energy efficiency %

- Estimated ₹ loss

Use visual indicators.

Example:

Actual:

1,200 kWh

Estimated ideal:

1,000 kWh

Excess:

200 kWh

Estimated cost impact:

₹1,600

Clearly label assumptions/estimates.

SECTION 2 — SCRAP WASTAGE

Show:

- Input material

- Production output

- Scrap

- Yield %

- Scrap %

- Estimated ₹ impact

SECTION 3 — MAIN COST IMPACT

Large highlighted card:

"Estimated Cost Impact"

Example:

"₹9,600"

Break down:

- Energy-related loss

- Scrap-related loss

- Other identified losses

SECTION 4 — POSSIBLE CAUSES

Possible causes may include:

- Excessive machine usage

- Abnormal energy consumption

- Idle machine operation

- Maintenance overdue

- Excess scrap

- Production inefficiency

Only show causes supported by available data/rules.

SECTION 5 — POSSIBLE SOLUTIONS

Display recommendation cards.

Examples:

- Review machine operating hours

- Check maintenance status

- Reduce idle operation

- Investigate abnormal energy spikes

- Reduce material waste

- Consider load shifting where applicable

SECTION 6 — FIX TRACKER

Allow user to:

- Mark issue as acknowledged

- Add corrective action

- Set action date

- Mark action completed

- Add notes

After subsequent data is uploaded, compare before/after performance.

==================================================

21. TRACKER PAGE

==================================================

Route:

/tracker

This is the maintenance tracker.

Display all machines belonging to the logged-in company.

Each machine gets a card/table row.

Show:

- Machine ID

- Machine type

- Manufacturer

- Model

- Rated power

- Last service

- Next service

- Service interval

- Status

Statuses:

- Healthy

- Due Soon

- Service Due

- Overdue

Create alerts when service date is reached.

Example:

"Maintenance due for CNC-03"

Allow:

- Update service date

- Add maintenance record

- Add maintenance notes

- Mark service completed

Do not mix machines between companies.

Every machine record must be filtered by authenticated company ID.

==================================================

22. HISTORY PAGE

==================================================

Route:

/history

This page contains historical result logs.

Each upload/result should create a history record.

Show:

- Date

- Upload type

- Energy consumption

- Energy waste

- ₹ loss

- Scrap

- Yield

- Carbon estimate

- Status

Allow:

- View result

- Open detailed result

- Download related report if available

- Search

- Filter by date

- Filter by type

Use pagination for large datasets.

==================================================

23. REPORTS NAVIGATION

==================================================

When user clicks "Reports":

Show dropdown:

1. ESG

2. CBAM

3. Green Loan

4. Solar Investment

Use route structure:

/reports/esg

/reports/cbam

/reports/green-loan

/reports/solar

==================================================

24. REPORT COMMON PAGE

==================================================

All report pages should use a common report layout.

Left sidebar similar to ChatGPT.

Sidebar:

- ESG

- CBAM

- Green Loan

- Solar Investment

Main content:

Report information

Data summary

Eligibility/status

Generate button

Download button

==================================================

25. ESG REPORT

==================================================

Route:

/reports/esg

Title:

"ESG / Sustainability Report"

Show report preview information:

- Company details

- Reporting period

- Energy consumption

- Energy efficiency

- Carbon emissions

- Scope 1

- Scope 2

- Scrap

- Production yield

- Improvements

- Relevant sustainability metrics

Button:

"Generate ESG Report"

After generation:

"Download PDF"

Use ReportLab on the backend to generate the PDF.

==================================================

26. CBAM REPORT

==================================================

Route:

/reports/cbam

IMPORTANT:

Do not claim CBAM applies automatically to every company or CNC factory.

First show:

"CBAM Applicability Check"

Ask:

- Number of machines

- Product/material category

- Export destination

- Relevant product information

For the requested product workflow:

If machine count > 30:

→ Enable "Generate CBAM Report"

If machine count <= 30:

→ Show a clear informational state and leave report generation disabled according to the requested prototype rule.

However, keep the eligibility logic modular so it can later be replaced by proper product/category-based CBAM applicability rules.

Show:

- Carbon data available

- Scope 1

- Scope 2

- Reporting period

- Data completeness

Button:

"Generate CBAM Report"

Then:

"Download PDF"

==================================================

27. GREEN LOAN REPORT

==================================================

Route:

/reports/green-loan

Title:

"Green Loan Proposal"

Show:

- Current energy cost

- Identified energy loss

- Potential savings

- Proposed improvement

- Estimated investment

- Expected annual savings

- ROI

- Payback period

- Supporting factory data

Button:

"Generate Green Loan Proposal"

Then:

"Download PDF"

Use ReportLab for PDF generation.

==================================================

28. SOLAR INVESTMENT REPORT

==================================================

Route:

/reports/solar

Title:

"Solar Investment Feasibility"

Show:

- Current energy consumption

- Estimated annual electricity cost

- Suggested solar capacity

- Estimated generation

- Estimated savings

- Investment estimate

- Payback period

- Long-term savings

Button:

"Generate Solar Feasibility Report"

Then:

"Download PDF"

Use actual stored energy-consumption data where available.

==================================================

29. PROFILE PAGE

==================================================

Route:

/profile

This is the same information initially entered during setup.

Sections:

COMPANY PROFILE:

- Name

- Email

- Company

- Address

- Mobile

FACTORY PROFILE:

- Number of machines

MACHINE MANAGEMENT:

Display every machine.

Allow:

- Edit machine

- Add machine

- Remove machine

- Update specifications

- Update service details

Save all changes to PostgreSQL.

==================================================

30. DATABASE DESIGN

==================================================

Use PostgreSQL with proper relational design.

Suggested entities:

Users

- id

- name

- email

- password_hash

- company_id

- created_at

Companies

- id

- company_name

- address

- mobile

- setup_completed

- created_at

Machines

- id

- company_id

- machine_name

- machine_type

- manufacturer

- model

- rated_power

- operating_power

- installation_date

- service_interval

- last_service_date

- next_service_date

- notes

EnergyRecords

- id

- company_id

- machine_id if applicable

- start_unit

- end_unit

- energy_used

- tariff

- energy_cost

- source

- timestamp

ScrapRecords

- id

- company_id

- input_material

- input_weight

- production_output

- production_weight

- scrap_weight

- yield

- timestamp

ElectricityBills

- id

- company_id

- billing_period

- units_consumed

- amount

- tariff

- image_url/path

- verification_status

Uploads

- id

- company_id

- upload_type

- file_url/path

- OCR_text

- verification_status

- created_at

Results

- id

- company_id

- upload_id

- energy_waste

- energy_efficiency

- energy_cost_loss

- scrap_loss

- total_cost_impact

- carbon_estimate

- recommendations

- created_at

MaintenanceRecords

- id

- company_id

- machine_id

- service_date

- next_service_date

- notes

- status

Reports

- id

- company_id

- report_type

- reporting_period

- generated_at

- file_path

History

- id

- company_id

- result_id

- created_at

IMPORTANT:

Every company-specific table must have company_id or an equivalent relationship.

Never expose one company's data to another company.

==================================================

31. AUTHENTICATION & SECURITY

==================================================

Implement proper authentication.

Passwords must NEVER be stored as plain text.

Use secure password hashing such as bcrypt through the backend.

Use authenticated sessions/JWT-based authentication.

Protect all private routes:

/dashboard/*

/upload

/result

/tracker

/reports/*

/history

/profile

/setup

Unauthenticated users should be redirected to /login.

Authenticated users should only access their own company's data.

==================================================

32. RESPONSIVE DESIGN

==================================================

Desktop:

- Full sidebar

- Wide dashboard

- Multiple KPI cards

- Charts side by side

Tablet:

- Collapsible sidebar

- Responsive cards

Mobile:

- Bottom navigation or hamburger navigation

- Stacked KPI cards

- Scrollable charts

- Mobile-friendly upload interface

- Large touch-friendly buttons

==================================================

33. EMPTY STATES

==================================================

The application must look polished even when there is no data.

For example:

"No energy data yet"

"Upload your first meter reading to start tracking energy."

"No maintenance records"

"Add your CNC machines in Factory Setup."

"No reports generated"

"Generate your first sustainability report."

Do NOT display fake production data as if it were real company data.

Use clearly marked demo/sample data only if necessary for visual preview.

==================================================

34. ERROR HANDLING

==================================================

Create user-friendly errors.

Examples:

"Invalid email address."

"Passwords do not match."

"End meter reading cannot be lower than start reading."

"Please upload a valid image."

"OCR could not confidently read this document. Please verify the values manually."

"Report generation failed. Please try again."

"Session expired. Please log in again."

==================================================

35. UI COMPONENT SYSTEM

==================================================

Create reusable components:

- Navbar

- Footer

- Sidebar

- DashboardLayout

- KPI Card

- Chart Card

- Upload Card

- OCR Verification Card

- Machine Card

- Maintenance Alert

- Report Card

- Result Card

- Recommendation Card

- Modal

- Confirmation Dialog

- Toast Notification

- Data Table

- Date Range Picker

- File Upload component

Avoid duplicating layouts across pages.

==================================================

36. USER JOURNEY

==================================================

PUBLIC USER:

Landing Page

    ↓

Register

    ↓

Company Registration

    ↓

Login

    ↓

First Login

    ↓

Factory Setup

    ↓

Add Machines

    ↓

Dashboard

    ↓

Carbon Tracker

RETURNING USER:

Landing Page

    ↓

Login

    ↓

Dashboard

    ↓

Carbon Tracker

DATA WORKFLOW:

Dashboard

    ↓

Upload

    ↓

Energy Meter / Scrap / Electricity Bill

    ↓

OCR + Manual Verification

    ↓

Process Data

    ↓

Result

    ↓

Recommendations

    ↓

Fix Tracker

    ↓

History

    ↓

Reports

==================================================

37. DESIGN DETAILS FOR JUDGES / HACKATHON

==================================================

The UI should communicate these concepts immediately:

1. Energy is being measured.

2. Waste is being quantified.

3. Waste is converted into ₹ impact.

4. Carbon emissions are tracked.

5. Maintenance is connected to efficiency.

6. Corrective actions are tracked.

7. Sustainability reports can be generated.

8. Financial opportunities such as green loans are supported.

9. Solar investment decisions are supported.

The dashboard should make the most important information immediately visible:

"How much energy did I use?"

"How much energy did I waste?"

"How much money did I lose?"

"How much carbon did I generate?"

"What should I fix?"

"What can I save?"

==================================================

38. IMPORTANT PRODUCT PRINCIPLE

==================================================

Do NOT build this as a simple CRUD application.

The interface should feel like an intelligent factory decision-support platform.

The central relationship should visually appear throughout the application:

ENERGY

↓

WASTE

↓

₹ LOSS

↓

CAUSE

↓

ACTION

↓

SAVINGS

↓

CARBON IMPACT

↓

REPORTING

Use this relationship throughout the dashboard, result page and reports.

==================================================

39. FINAL PAGE STRUCTURE

==================================================

PUBLIC:

/

├── /login

├── /register

├── /contact

└── /feedback

AUTHENTICATED:

/setup

/profile

/dashboard

/dashboard/carbon

/dashboard/sustainability

/dashboard/energy

/upload

/result

/tracker

/history

/reports

/reports/esg

/reports/cbam

/reports/green-loan

/reports/solar

==================================================

40. FINAL REQUIREMENT

==================================================

Generate the complete frontend UI with all pages, routing, navigation, dropdowns, sidebar navigation, responsive layouts, forms, validations, charts, cards, upload interfaces, result views, report interfaces and profile/machine management.

The application should be visually consistent across all pages.

Use realistic but clearly labeled demo data for visualizing charts before actual company data exists.

Implement the database relationships and API-ready architecture so that the application can later connect directly to FastAPI + PostgreSQL.

Prioritize:

- Excellent UX

- Clean industrial design

- Sustainability visual language

- Strong information hierarchy

- Consistent navigation

- Responsive design

- Proper validation

- Company-level data isolation

- Reusable components

- Professional charts

- Clear ₹ impact visualization

- Professional report-generation UI

Do not simplify the application into only a dashboard.

Build the complete multi-page ReMargin product described above.

recreate the same website link ui : https://zephyra.framer.website/

and for graphs and dashboards use this ui link: https://themewagon.github.io/spark-admin/

same tech stack and same pages. build completely and give eebsite

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/292f9430-e2ae-4ed6-b9a0-5df0fe3a9e57).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
