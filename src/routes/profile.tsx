import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Droplets,
  Edit3,
  FileText,
  Flame,
  Layers,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import {
  AuxiliaryEquipmentItem,
  CoolantSystemItem,
  FactoryProfileData,
  FuelRecord,
  getFactoryProfile,
  MachineProfile,
  saveFactoryProfile,
  ShiftTiming,
} from "@/lib/factory-profile";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Factory Profile & Setup — ReMargin" },
      { name: "description", content: "Manage factory details, CNC machines, auxiliary equipment, coolant systems, and fuel records." },
      { property: "og:title", content: "Factory Profile — ReMargin" },
      { property: "og:description", content: "Factory setup parameters for ReMargin energy and carbon estimation models." },
    ],
  }),
  component: ProfilePage,
});

const EQUIPMENT_TYPES = [
  "Air compressor",
  "HVAC",
  "Lighting",
  "Hydraulic pumps",
  "Lubrication system",
  "Chip conveyor",
  "Mist collector",
  "Dust extraction",
  "Water/coolant pumps",
  "Welding equipment",
  "Material handling",
  "Office equipment",
  "Other",
];

const FUEL_TYPES = ["Diesel", "Petrol", "LPG", "Natural Gas", "Other"];
const FUEL_UNITS = ["Litres", "kg", "m³", "Gallons"];
const MACHINE_TYPES = [
  "CNC Turning",
  "CNC Milling",
  "CNC Machining Center",
  "CNC Lathe",
  "CNC Grinding",
  "CNC Router",
  "Other",
];

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<FactoryProfileData>(() => getFactoryProfile());
  const [mode, setMode] = useState<"view" | "wizard">(() =>
    profile.setupCompleted ? "view" : "wizard"
  );
  const [step, setStep] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleStorageEvent = () => setProfile(getFactoryProfile());
    window.addEventListener("remargin-factory-profile-updated", handleStorageEvent);
    return () => window.removeEventListener("remargin-factory-profile-updated", handleStorageEvent);
  }, []);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }

  function startWizardAtStep(stepNum: number) {
    setStep(stepNum);
    setErrors({});
    setMode("wizard");
  }

  function handleSaveFullProfile(finalData: FactoryProfileData) {
    const saved = saveFactoryProfile(finalData);
    setProfile(saved);
    setMode("view");
    triggerToast("Factory profile updated successfully.");
  }

  // Helper to validate current step before proceeding
  function validateAndNext() {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!profile.userName.trim()) newErrors.userName = "Name is required.";
      if (!profile.companyName.trim()) newErrors.companyName = "Company name is required.";
    } else if (step === 1) {
      if (!profile.companyName.trim()) newErrors.companyName = "Factory name is required.";
      if (!profile.country.trim()) newErrors.country = "Country is required.";
      if (!profile.state.trim()) newErrors.state = "State is required.";
      if (!profile.city.trim()) newErrors.city = "City is required.";
    } else if (step === 2) {
      if (profile.machines.length === 0) {
        newErrors.machines = "Please add at least one CNC machine.";
      }
      profile.machines.forEach((m, idx) => {
        if (!m.name.trim()) newErrors[`m_name_${idx}`] = "Machine ID/Name is required.";
        if (m.ratedPower <= 0) newErrors[`m_power_${idx}`] = "Rated power must be > 0.";
      });
    } else if (step === 3) {
      // Validate operation hours vs available working hours
      profile.machines.forEach((m, idx) => {
        const total = m.operatingHours + m.idleHours + m.setupHours;
        if (total > profile.workingHoursPerDay) {
          newErrors[`m_hours_${idx}`] = `Total hours (${total}h) exceeds working hours/day (${profile.workingHoursPerDay}h).`;
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (step < 6) {
      setStep(step + 1);
    }
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Factory Configuration & Profile"
        title={mode === "view" ? "Factory Profile" : "Factory Setup Wizard"}
        description={
          mode === "view"
            ? "Permanent factory profile parameters used by ReMargin's energy estimation and carbon tracking models."
            : "Complete your step-by-step factory registration and equipment baseline."
        }
        action={
          mode === "view" ? (
            <button
              onClick={() => startWizardAtStep(0)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] text-white hover:bg-[#54be6c] transition-all"
            >
              <Pencil size={15} />
              <span>Edit Factory Setup</span>
            </button>
          ) : (
            <button
              onClick={() => setMode("view")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2.5 text-xs font-bold text-[#48a65e] hover:bg-[#113f2a] transition-all"
            >
              <ArrowLeft size={15} />
              <span>Cancel to Profile</span>
            </button>
          )
        }
      />

      {/* Success Toast */}
      {toastMessage && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-[#48a65e] bg-[#0c3120] p-4 text-[#48a65e] shadow-lg animate-fade-in-up">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-[#48a65e]" />
            <span className="text-sm font-bold text-white">{toastMessage}</span>
          </div>
        </div>
      )}

      {mode === "view" ? (
        <PersistentProfileView
          profile={profile}
          onEditSection={(stepIdx) => startWizardAtStep(stepIdx)}
        />
      ) : (
        <WizardView
          step={step}
          setStep={setStep}
          profile={profile}
          setProfile={setProfile}
          errors={errors}
          setErrors={setErrors}
          onNext={validateAndNext}
          onSubmit={() => handleSaveFullProfile(profile)}
        />
      )}
    </AppShell>
  );
}

/* =========================================================================
   PERSISTENT PROFILE VIEW
   ========================================================================= */
function PersistentProfileView({
  profile,
  onEditSection,
}: {
  profile: FactoryProfileData;
  onEditSection: (stepIndex: number) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Top Summary Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-[#0c3120] text-[#48a65e] border border-[#17452d] font-extrabold text-xl">
              {profile.companyName.substring(0, 2).toUpperCase() || "FC"}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-extrabold text-white">{profile.companyName}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0c3120] border border-[#48a65e]/60 px-2.5 py-0.5 text-[10px] font-extrabold text-[#48a65e]">
                  <ShieldCheck size={12} />
                  Verified Profile
                </span>
              </div>
              <p className="text-xs text-[#a2c2b0] mt-0.5 flex items-center gap-2">
                <span>{profile.city}, {profile.state}, {profile.country}</span>
                <span>•</span>
                <span>Reporting: {profile.reportingPeriod}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#17452d] bg-[#0c3120] px-3.5 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#8ca897]">CNC Machines</span>
              <strong className="font-display text-lg font-extrabold text-[#48a65e]">{profile.machines.length}</strong>
            </div>
            <div className="rounded-xl border border-[#17452d] bg-[#0c3120] px-3.5 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#8ca897]">Working Days</span>
              <strong className="font-display text-lg font-extrabold text-white">{profile.workingDays} days</strong>
            </div>
            <div className="rounded-xl border border-[#17452d] bg-[#0c3120] px-3.5 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-[#8ca897]">Daily Shifts</span>
              <strong className="font-display text-lg font-extrabold text-[#48a65e]">{profile.numShifts}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SECTION 0 & 1: FACTORY & ACCOUNT DETAILS */}
        <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
                <Building2 size={18} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-white">Factory Details</h3>
                <p className="text-[11px] text-[#a2c2b0]">Operating parameters & shift schedules</p>
              </div>
            </div>
            <button
              onClick={() => onEditSection(1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#17452d] bg-[#0c3120] px-3 py-1.5 text-xs font-bold text-[#48a65e] hover:bg-[#48a65e] hover:text-white transition-all"
            >
              <Pencil size={13} />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Factory Name</span>
              <strong className="text-white font-semibold">{profile.companyName}</strong>
            </div>
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Location</span>
              <strong className="text-white font-semibold">{profile.city}, {profile.state}, {profile.country}</strong>
            </div>
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Reporting Period</span>
              <strong className="text-[#48a65e] font-semibold">{profile.reportingPeriod}</strong>
            </div>
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Working Schedule</span>
              <strong className="text-white font-semibold">{profile.workingDays} days/month • {profile.workingHoursPerDay} hrs/day</strong>
            </div>
            <div className="col-span-2">
              <span className="block text-[#a2c2b0] text-[11px]">Shift Timings ({profile.numShifts} Shifts)</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {profile.shiftTimings.map((s, idx) => (
                  <span key={idx} className="rounded-md border border-[#17452d] bg-[#0c3120] px-2.5 py-1 text-[11px] font-bold text-[#48a65e]">
                    {s.name}: {s.start} – {s.end}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 0: ACCOUNT / REGISTRATION DETAILS */}
        <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
                <User size={18} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-white">Registration & User Account</h3>
                <p className="text-[11px] text-[#a2c2b0]">Account holder & contact info</p>
              </div>
            </div>
            <button
              onClick={() => onEditSection(0)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#17452d] bg-[#0c3120] px-3 py-1.5 text-xs font-bold text-[#48a65e] hover:bg-[#48a65e] hover:text-white transition-all"
            >
              <Pencil size={13} />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Full Name</span>
              <strong className="text-white font-semibold">{profile.userName}</strong>
            </div>
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Email Address</span>
              <strong className="text-white font-semibold">{profile.userEmail}</strong>
            </div>
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Phone Number</span>
              <strong className="text-white font-semibold">{profile.userPhone}</strong>
            </div>
            <div>
              <span className="block text-[#a2c2b0] text-[11px]">Registered Address</span>
              <strong className="text-white font-semibold truncate block">{profile.companyAddress}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 & 3: MACHINES & OPERATION */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
              <Cpu size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-white">CNC Machines & Operation Hours</h3>
              <p className="text-[11px] text-[#a2c2b0]">{profile.machines.length} active CNC machines configured</p>
            </div>
          </div>
          <button
            onClick={() => onEditSection(2)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#17452d] bg-[#0c3120] px-3 py-1.5 text-xs font-bold text-[#48a65e] hover:bg-[#48a65e] hover:text-white transition-all"
          >
            <Pencil size={13} />
            <span>Edit Machines</span>
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {profile.machines.map((m) => (
            <div key={m.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-[#48a65e] text-sm">{m.name}</span>
                <span className="rounded bg-[#072115] px-2 py-0.5 text-[10px] font-bold text-white border border-[#17452d]">
                  {m.ratedPower} kW
                </span>
              </div>
              <p className="text-xs text-[#a2c2b0]">{m.type} • {m.manufacturer || "N/A"} {m.model || ""}</p>
              
              <div className="pt-2 border-t border-[#17452d] grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="block text-[#8ca897]">Operating:</span>
                  <strong className="text-white font-bold">{m.operatingHours} h/day</strong>
                </div>
                <div>
                  <span className="block text-[#8ca897]">Production:</span>
                  <strong className="text-[#48a65e] font-bold">{m.productionHours} h/day</strong>
                </div>
                <div>
                  <span className="block text-[#8ca897]">Idle Hours:</span>
                  <strong className="text-amber-400 font-bold">{m.idleHours} h/day</strong>
                </div>
                <div>
                  <span className="block text-[#8ca897]">Setup Time:</span>
                  <strong className="text-white font-bold">{m.setupHours} h/day</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 & 4A: AUXILIARY & COOLANT */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
              <Zap size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-white">Auxiliary Equipment & Coolant Systems</h3>
              <p className="text-[11px] text-[#a2c2b0]">Compressors, pumps, and shared cooling infrastructure</p>
            </div>
          </div>
          <button
            onClick={() => onEditSection(4)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#17452d] bg-[#0c3120] px-3 py-1.5 text-xs font-bold text-[#48a65e] hover:bg-[#48a65e] hover:text-white transition-all"
          >
            <Pencil size={13} />
            <span>Edit Auxiliary</span>
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Auxiliary Equipment List */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#48a65e] uppercase tracking-wider">Auxiliary Equipment</h4>
            {profile.hasAuxiliary && profile.auxiliaryItems.length > 0 ? (
              profile.auxiliaryItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{item.name} ({item.type})</span>
                    <span className="text-[#48a65e]">{item.ratedPower} kW</span>
                  </div>
                  <p className="text-[11px] text-[#a2c2b0]">
                    Units: {item.units} • Operating: {item.operatingHours} h/day
                  </p>
                  <p className="text-[11px] text-[#8ca897] italic">Purpose: {item.purpose}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8ca897]">No auxiliary equipment configured.</p>
            )}
          </div>

          {/* Coolant Systems List */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#48a65e] uppercase tracking-wider flex items-center gap-1.5">
              <Droplets size={14} />
              Coolant Systems
            </h4>
            {profile.coolantSystems.length > 0 ? (
              profile.coolantSystems.map((cool) => (
                <div key={cool.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{cool.name}</span>
                    <span className="text-[#48a65e]">{cool.pumpPower} kW / pump</span>
                  </div>
                  <p className="text-[11px] text-[#a2c2b0]">
                    Pumps: {cool.numPumps} • Avg Operating: {cool.avgOperatingHours} h/day • Shared: {cool.shared ? "Yes" : "No"}
                  </p>
                  {cool.shared && cool.connectedMachines.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[10px] text-[#8ca897]">Connected:</span>
                      {cool.connectedMachines.map((mId) => (
                        <span key={mId} className="rounded bg-[#072115] px-1.5 py-0.5 text-[10px] font-bold text-[#48a65e] border border-[#17452d]">
                          {mId}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8ca897]">No coolant systems configured.</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5: FUEL RECORDS */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#17452d] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-[#0c3120] text-[#48a65e] border border-[#17452d]">
              <Flame size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-white">Fuel Records (Scope 1 Emissions)</h3>
              <p className="text-[11px] text-[#a2c2b0]">Diesel, LPG, boilers, generators, and company vehicles</p>
            </div>
          </div>
          <button
            onClick={() => onEditSection(5)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#17452d] bg-[#0c3120] px-3 py-1.5 text-xs font-bold text-[#48a65e] hover:bg-[#48a65e] hover:text-white transition-all"
          >
            <Pencil size={13} />
            <span>Edit Fuel</span>
          </button>
        </div>

        {profile.hasFuel && profile.fuelRecords.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {profile.fuelRecords.map((f) => (
              <div key={f.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="text-[#48a65e] text-sm">{f.type}</span>
                  <span className="rounded bg-[#072115] px-2 py-0.5 text-xs font-extrabold text-white border border-[#17452d]">
                    {f.quantity} {f.unit}
                  </span>
                </div>
                <p className="text-[#a2c2b0] text-[11px]">Period: {f.period} • Purpose: {f.purpose}</p>
                {f.sourceDocument && <p className="text-[#8ca897] text-[11px]">Source: {f.sourceDocument}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#8ca897]">No fuel consumption records registered.</p>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   STEP-BY-STEP SETUP WIZARD (STEPS 0 TO 6)
   ========================================================================= */
function WizardView({
  step,
  setStep,
  profile,
  setProfile,
  errors,
  setErrors,
  onNext,
  onSubmit,
}: {
  step: number;
  setStep: (s: number) => void;
  profile: FactoryProfileData;
  setProfile: React.Dispatch<React.SetStateAction<FactoryProfileData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onNext: () => void;
  onSubmit: () => void;
}) {
  const stepsList = [
    { num: 0, title: "Registration" },
    { num: 1, title: "Factory Details" },
    { num: 2, title: "Machines" },
    { num: 3, title: "Machine Operation" },
    { num: 4, title: "Auxiliary & Coolant" },
    { num: 5, title: "Fuel" },
    { num: 6, title: "Review & Submit" },
  ];

  function updateField<K extends keyof FactoryProfileData>(key: K, val: FactoryProfileData[K]) {
    setProfile((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  // Synchronize dynamic machine count in Step 2
  function setMachineCount(num: number) {
    const validNum = Math.max(1, Math.min(20, num));
    setProfile((prev) => {
      const current = [...prev.machines];
      if (validNum > current.length) {
        for (let i = current.length; i < validNum; i++) {
          const mNum = String(i + 1).padStart(2, "0");
          current.push({
            id: `CNC-${mNum}`,
            name: `CNC-${mNum}`,
            type: "CNC Turning",
            manufacturer: "ACE",
            model: "Model-100",
            ratedPower: 15,
            operatingHours: 8,
            idleHours: 2,
            setupHours: 1,
            productionHours: 6,
          });
        }
      } else if (validNum < current.length) {
        current.splice(validNum);
      }
      return { ...prev, numCncMachines: validNum, machines: current };
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Wizard Header Progress Indicator */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-5 text-white shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#48a65e]">
              Step {step} of 6
            </span>
            <h2 className="font-display text-lg font-bold text-white">
              {stepsList[step].title}
            </h2>
          </div>
          <span className="rounded-full bg-[#0c3120] border border-[#17452d] px-3 py-1 text-xs font-bold text-[#48a65e]">
            {Math.round((step / 6) * 100)}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="grid grid-cols-7 gap-1.5">
          {stepsList.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`h-2 rounded-full transition-all ${
                s.num === step
                  ? "bg-[#48a65e] shadow-[0_0_8px_#48a65e]"
                  : s.num < step
                  ? "bg-[#17452d]"
                  : "bg-[#0c3120]"
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Main Wizard Form Container matching Login/Register Dark Forest Card style */}
      <div className="rounded-2xl border border-[#17452d] bg-[#072115] p-6 sm:p-8 text-white shadow-xl space-y-6">
        {/* STEP 0: REGISTRATION DETAILS */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs text-[#a2c2b0] flex items-center gap-3">
              <Sparkles className="text-[#48a65e] shrink-0" size={20} />
              <p>
                Using registration information collected during account creation. These values are linked to your factory profile.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="form-label text-[#48a65e]">Full Name</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.userName}
                  onChange={(e) => updateField("userName", e.target.value)}
                />
                {errors.userName && <p className="text-xs text-red-400 mt-1">{errors.userName}</p>}
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Email Address</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  type="email"
                  value={profile.userEmail}
                  onChange={(e) => updateField("userEmail", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Mobile / Phone Number</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.userPhone}
                  onChange={(e) => updateField("userPhone", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Factory / Company Name</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
                {errors.companyName && <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>}
              </label>
            </div>
          </div>
        )}

        {/* STEP 1: FACTORY DETAILS */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-display text-base font-bold text-[#48a65e]">Factory Details</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="form-label text-[#48a65e]">Factory Name</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Country</span>
                <select
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.country}
                  onChange={(e) => updateField("country", e.target.value)}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                </select>
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">State</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.state}
                  onChange={(e) => updateField("state", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">City</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </label>

              <label className="block col-span-2">
                <span className="form-label text-[#48a65e]">Factory Address</span>
                <textarea
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e] min-h-20"
                  value={profile.factoryAddress}
                  onChange={(e) => updateField("factoryAddress", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Reporting Period</span>
                <input
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.reportingPeriod}
                  onChange={(e) => updateField("reportingPeriod", e.target.value)}
                  placeholder="e.g. August 2026"
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Working Days / Month</span>
                <input
                  type="number"
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.workingDays}
                  onChange={(e) => updateField("workingDays", Number(e.target.value))}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Working Hours / Day</span>
                <input
                  type="number"
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.workingHoursPerDay}
                  onChange={(e) => updateField("workingHoursPerDay", Number(e.target.value))}
                />
              </label>

              <label className="block">
                <span className="form-label text-[#48a65e]">Number of Shifts</span>
                <input
                  type="number"
                  className="form-input bg-[#072115] text-white border-[#17452d] focus:border-[#48a65e]"
                  value={profile.numShifts}
                  onChange={(e) => {
                    const count = Math.max(1, Number(e.target.value));
                    const newShifts: ShiftTiming[] = [];
                    for (let i = 0; i < count; i++) {
                      newShifts.push(
                        profile.shiftTimings[i] || {
                          name: `Shift ${i + 1}`,
                          start: i === 0 ? "08:00 AM" : "04:00 PM",
                          end: i === 0 ? "04:00 PM" : "12:00 AM",
                        }
                      );
                    }
                    setProfile({ ...profile, numShifts: count, shiftTimings: newShifts });
                  }}
                />
              </label>
            </div>

            {/* Dynamic Shift Timings */}
            <div className="pt-3 space-y-3">
              <h4 className="text-xs font-bold text-[#48a65e] uppercase tracking-wider">Shift Timings</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {profile.shiftTimings.map((s, idx) => (
                  <div key={idx} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-3 space-y-2">
                    <span className="text-xs font-bold text-white">{s.name}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className="form-input bg-[#072115] text-white text-xs border-[#17452d]"
                        value={s.start}
                        onChange={(e) => {
                          const updated = [...profile.shiftTimings];
                          updated[idx].start = e.target.value;
                          updateField("shiftTimings", updated);
                        }}
                        placeholder="Start (e.g. 8:00 AM)"
                      />
                      <input
                        className="form-input bg-[#072115] text-white text-xs border-[#17452d]"
                        value={s.end}
                        onChange={(e) => {
                          const updated = [...profile.shiftTimings];
                          updated[idx].end = e.target.value;
                          updateField("shiftTimings", updated);
                        }}
                        placeholder="End (e.g. 4:00 PM)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: MACHINES */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-[#48a65e]">CNC Machines Setup</h3>
                <p className="text-xs text-[#a2c2b0]">Specify the number of CNC machines in your shop floor.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Number of CNC Machines:</span>
                <input
                  type="number"
                  className="w-20 form-input bg-[#072115] text-white border-[#17452d] text-center font-bold text-sm"
                  value={profile.numCncMachines}
                  min={1}
                  max={20}
                  onChange={(e) => setMachineCount(Number(e.target.value))}
                />
              </div>
            </div>

            {/* List of Dynamic Machine Forms */}
            <div className="space-y-4">
              {profile.machines.map((m, idx) => (
                <div key={idx} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                    <span className="font-display font-extrabold text-[#48a65e] text-sm">Machine #{idx + 1}</span>
                    {profile.machines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.machines.filter((_, i) => i !== idx);
                          setProfile({ ...profile, numCncMachines: updated.length, machines: updated });
                        }}
                        className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="block">
                      <span className="form-label text-[#48a65e]">Machine ID / Name</span>
                      <input
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={m.name}
                        onChange={(e) => {
                          const updated = [...profile.machines];
                          updated[idx].name = e.target.value;
                          updated[idx].id = e.target.value;
                          updateField("machines", updated);
                        }}
                        placeholder="e.g. CNC-01"
                      />
                    </label>

                    <label className="block">
                      <span className="form-label text-[#48a65e]">Machine Type</span>
                      <select
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={m.type}
                        onChange={(e) => {
                          const updated = [...profile.machines];
                          updated[idx].type = e.target.value;
                          updateField("machines", updated);
                        }}
                      >
                        {MACHINE_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="form-label text-[#48a65e]">Rated Power (kW)</span>
                      <input
                        type="number"
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={m.ratedPower}
                        onChange={(e) => {
                          const updated = [...profile.machines];
                          updated[idx].ratedPower = Number(e.target.value);
                          updateField("machines", updated);
                        }}
                      />
                    </label>

                    <label className="block">
                      <span className="form-label text-[#a2c2b0]">Manufacturer (Optional)</span>
                      <input
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={m.manufacturer || ""}
                        onChange={(e) => {
                          const updated = [...profile.machines];
                          updated[idx].manufacturer = e.target.value;
                          updateField("machines", updated);
                        }}
                        placeholder="e.g. XYZ / Ace"
                      />
                    </label>

                    <label className="block">
                      <span className="form-label text-[#a2c2b0]">Model (Optional)</span>
                      <input
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={m.model || ""}
                        onChange={(e) => {
                          const updated = [...profile.machines];
                          updated[idx].model = e.target.value;
                          updateField("machines", updated);
                        }}
                        placeholder="e.g. ABC-200"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMachineCount(profile.machines.length + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-[#48a65e] hover:bg-[#113f2a] transition-all"
            >
              <Plus size={15} />
              <span>Add Another Machine</span>
            </button>
          </div>
        )}

        {/* STEP 3: MACHINE OPERATION */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-base font-bold text-[#48a65e]">Machine Operating Parameters</h3>
              <p className="text-xs text-[#a2c2b0]">
                Configure daily operating, idle, setup, and production hours for each machine.
              </p>
            </div>

            <div className="space-y-4">
              {profile.machines.map((m, idx) => {
                const totalHours = m.operatingHours + m.idleHours + m.setupHours;
                const isValid = totalHours <= profile.workingHoursPerDay;

                return (
                  <div key={m.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                      <span className="font-display font-extrabold text-[#48a65e] text-sm">{m.name} ({m.type})</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isValid ? "bg-[#072115] text-[#48a65e] border border-[#17452d]" : "bg-red-950 text-red-400 border border-red-800"
                        }`}
                      >
                        {isValid ? `Total: ${totalHours}h / ${profile.workingHoursPerDay}h Available` : `Exceeds max available hours!`}
                      </span>
                    </div>

                    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                      <label className="block">
                        <span className="form-label text-[#48a65e]">Operating (h/day)</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={m.operatingHours}
                          onChange={(e) => {
                            const updated = [...profile.machines];
                            updated[idx].operatingHours = Number(e.target.value);
                            updateField("machines", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Idle Hours (h/day)</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={m.idleHours}
                          onChange={(e) => {
                            const updated = [...profile.machines];
                            updated[idx].idleHours = Number(e.target.value);
                            updateField("machines", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Setup Time (h/day)</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={m.setupHours}
                          onChange={(e) => {
                            const updated = [...profile.machines];
                            updated[idx].setupHours = Number(e.target.value);
                            updateField("machines", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Production (h/day)</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={m.productionHours}
                          onChange={(e) => {
                            const updated = [...profile.machines];
                            updated[idx].productionHours = Number(e.target.value);
                            updateField("machines", updated);
                          }}
                        />
                      </label>
                    </div>

                    {errors[`m_hours_${idx}`] && (
                      <p className="text-xs text-red-400 font-semibold">{errors[`m_hours_${idx}`]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: AUXILIARY EQUIPMENT & COOLANT SYSTEM */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#48a65e]">Auxiliary Equipment</h3>
              <p className="text-xs text-[#a2c2b0]">Does your factory use auxiliary equipment (air compressors, HVAC, lighting, etc.)?</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => updateField("hasAuxiliary", true)}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                    profile.hasAuxiliary ? "bg-[#48a65e] text-white" : "bg-[#0c3120] text-white border border-[#17452d]"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateField("hasAuxiliary", false)}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                    !profile.hasAuxiliary ? "bg-[#48a65e] text-white" : "bg-[#0c3120] text-white border border-[#17452d]"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {profile.hasAuxiliary && (
              <div className="space-y-4 pt-2">
                {profile.auxiliaryItems.map((aux, idx) => (
                  <div key={aux.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                      <span className="font-bold text-[#48a65e]">Auxiliary Item #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.auxiliaryItems.filter((_, i) => i !== idx);
                          updateField("auxiliaryItems", updated);
                        }}
                        className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="block">
                        <span className="form-label text-[#48a65e]">Equipment Type</span>
                        <select
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={aux.type}
                          onChange={(e) => {
                            const updated = [...profile.auxiliaryItems];
                            updated[idx].type = e.target.value;
                            updateField("auxiliaryItems", updated);
                          }}
                        >
                          {EQUIPMENT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Equipment Name / ID</span>
                        <input
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={aux.name}
                          onChange={(e) => {
                            const updated = [...profile.auxiliaryItems];
                            updated[idx].name = e.target.value;
                            updateField("auxiliaryItems", updated);
                          }}
                          placeholder="e.g. Air Compressor 01"
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Rated Power (kW)</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={aux.ratedPower}
                          onChange={(e) => {
                            const updated = [...profile.auxiliaryItems];
                            updated[idx].ratedPower = Number(e.target.value);
                            updateField("auxiliaryItems", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Number of Units</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={aux.units}
                          onChange={(e) => {
                            const updated = [...profile.auxiliaryItems];
                            updated[idx].units = Number(e.target.value);
                            updateField("auxiliaryItems", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Operating Hours (h/day)</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={aux.operatingHours}
                          onChange={(e) => {
                            const updated = [...profile.auxiliaryItems];
                            updated[idx].operatingHours = Number(e.target.value);
                            updateField("auxiliaryItems", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#a2c2b0]">Purpose / Notes</span>
                        <input
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={aux.purpose}
                          onChange={(e) => {
                            const updated = [...profile.auxiliaryItems];
                            updated[idx].purpose = e.target.value;
                            updateField("auxiliaryItems", updated);
                          }}
                          placeholder="e.g. Shop floor air supply"
                        />
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItem: AuxiliaryEquipmentItem = {
                      id: `aux_${Date.now()}`,
                      type: "Air compressor",
                      name: `Aux Equipment ${profile.auxiliaryItems.length + 1}`,
                      ratedPower: 5,
                      units: 1,
                      operatingHours: 8,
                      purpose: "Factory supply",
                    };
                    updateField("auxiliaryItems", [...profile.auxiliaryItems, newItem]);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-[#48a65e] hover:bg-[#113f2a] transition-all"
                >
                  <Plus size={15} />
                  <span>Add Auxiliary Equipment</span>
                </button>
              </div>
            )}

            {/* STEP 4A: COOLANT SYSTEM SUBSECTION */}
            <div className="pt-6 border-t border-[#17452d] space-y-4">
              <div>
                <h3 className="font-display text-base font-bold text-[#48a65e] flex items-center gap-2">
                  <Droplets size={18} />
                  Coolant System
                </h3>
                <p className="text-xs text-[#a2c2b0]">Specify electricity-consuming coolant pumps and shared piping system.</p>
              </div>

              {profile.coolantSystems.map((cool, idx) => (
                <div key={cool.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                    <span className="font-bold text-[#48a65e]">Coolant System #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = profile.coolantSystems.filter((_, i) => i !== idx);
                        updateField("coolantSystems", updated);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="block">
                      <span className="form-label text-[#48a65e]">Coolant Pump Power (kW)</span>
                      <input
                        type="number"
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={cool.pumpPower}
                        onChange={(e) => {
                          const updated = [...profile.coolantSystems];
                          updated[idx].pumpPower = Number(e.target.value);
                          updateField("coolantSystems", updated);
                        }}
                      />
                    </label>

                    <label className="block">
                      <span className="form-label text-[#48a65e]">Avg Operating Hours (h/day)</span>
                      <input
                        type="number"
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={cool.avgOperatingHours}
                        onChange={(e) => {
                          const updated = [...profile.coolantSystems];
                          updated[idx].avgOperatingHours = Number(e.target.value);
                          updateField("coolantSystems", updated);
                        }}
                      />
                    </label>

                    <label className="block">
                      <span className="form-label text-[#48a65e]">Number of Pumps</span>
                      <input
                        type="number"
                        className="form-input bg-[#072115] text-white border-[#17452d]"
                        value={cool.numPumps}
                        onChange={(e) => {
                          const updated = [...profile.coolantSystems];
                          updated[idx].numPumps = Number(e.target.value);
                          updateField("coolantSystems", updated);
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <span className="form-label text-[#48a65e]">Is coolant system shared between machines?</span>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...profile.coolantSystems];
                          updated[idx].shared = true;
                          updateField("coolantSystems", updated);
                        }}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold ${
                          cool.shared ? "bg-[#48a65e] text-white" : "bg-[#072115] text-white border border-[#17452d]"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...profile.coolantSystems];
                          updated[idx].shared = false;
                          updateField("coolantSystems", updated);
                        }}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold ${
                          !cool.shared ? "bg-[#48a65e] text-white" : "bg-[#072115] text-white border border-[#17452d]"
                        }`}
                      >
                        No
                      </button>
                    </div>

                    {cool.shared && (
                      <div className="pt-2">
                        <span className="block text-[11px] text-[#a2c2b0] mb-1">Select Connected Machines:</span>
                        <div className="flex flex-wrap gap-2">
                          {profile.machines.map((m) => {
                            const isSelected = cool.connectedMachines.includes(m.id);
                            return (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => {
                                  const updated = [...profile.coolantSystems];
                                  const existing = updated[idx].connectedMachines;
                                  updated[idx].connectedMachines = isSelected
                                    ? existing.filter((id) => id !== m.id)
                                    : [...existing, m.id];
                                  updateField("coolantSystems", updated);
                                }}
                                className={`rounded-lg px-3 py-1 text-xs font-bold border transition-all ${
                                  isSelected
                                    ? "bg-[#48a65e] text-white border-[#48a65e]"
                                    : "bg-[#072115] text-[#a2c2b0] border-[#17452d]"
                                }`}
                              >
                                {m.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const newCool: CoolantSystemItem = {
                    id: `cool_${Date.now()}`,
                    name: `Coolant System ${profile.coolantSystems.length + 1}`,
                    pumpPower: 0.75,
                    avgOperatingHours: 10,
                    numPumps: 6,
                    shared: true,
                    connectedMachines: profile.machines.map((m) => m.id),
                  };
                  updateField("coolantSystems", [...profile.coolantSystems, newCool]);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-[#48a65e] hover:bg-[#113f2a] transition-all"
              >
                <Plus size={15} />
                <span>Add Another Coolant System</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: FUEL */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-[#48a65e]">Fuel Usage (Scope 1 Emissions)</h3>
              <p className="text-xs text-[#a2c2b0]">Does your factory use fuel (diesel generator, boilers, furnaces, vehicles)?</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => updateField("hasFuel", true)}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                    profile.hasFuel ? "bg-[#48a65e] text-white" : "bg-[#0c3120] text-white border border-[#17452d]"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateField("hasFuel", false)}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                    !profile.hasFuel ? "bg-[#48a65e] text-white" : "bg-[#0c3120] text-white border border-[#17452d]"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {profile.hasFuel && (
              <div className="space-y-4 pt-2">
                {profile.fuelRecords.map((f, idx) => (
                  <div key={f.id} className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                      <span className="font-bold text-[#48a65e]">Fuel Record #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.fuelRecords.filter((_, i) => i !== idx);
                          updateField("fuelRecords", updated);
                        }}
                        className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="block">
                        <span className="form-label text-[#48a65e]">Fuel Type</span>
                        <select
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={f.type}
                          onChange={(e) => {
                            const updated = [...profile.fuelRecords];
                            updated[idx].type = e.target.value;
                            updateField("fuelRecords", updated);
                          }}
                        >
                          {FUEL_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Quantity</span>
                        <input
                          type="number"
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={f.quantity}
                          onChange={(e) => {
                            const updated = [...profile.fuelRecords];
                            updated[idx].quantity = Number(e.target.value);
                            updateField("fuelRecords", updated);
                          }}
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Unit</span>
                        <select
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={f.unit}
                          onChange={(e) => {
                            const updated = [...profile.fuelRecords];
                            updated[idx].unit = e.target.value;
                            updateField("fuelRecords", updated);
                          }}
                        >
                          {FUEL_UNITS.map((u) => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Period</span>
                        <input
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={f.period}
                          onChange={(e) => {
                            const updated = [...profile.fuelRecords];
                            updated[idx].period = e.target.value;
                            updateField("fuelRecords", updated);
                          }}
                          placeholder="e.g. September 2026"
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#48a65e]">Purpose</span>
                        <input
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={f.purpose}
                          onChange={(e) => {
                            const updated = [...profile.fuelRecords];
                            updated[idx].purpose = e.target.value;
                            updateField("fuelRecords", updated);
                          }}
                          placeholder="e.g. Generator / Boiler"
                        />
                      </label>

                      <label className="block">
                        <span className="form-label text-[#a2c2b0]">Source Document</span>
                        <input
                          className="form-input bg-[#072115] text-white border-[#17452d]"
                          value={f.sourceDocument || ""}
                          onChange={(e) => {
                            const updated = [...profile.fuelRecords];
                            updated[idx].sourceDocument = e.target.value;
                            updateField("fuelRecords", updated);
                          }}
                          placeholder="e.g. Diesel invoice"
                        />
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newFuel: FuelRecord = {
                      id: `fuel_${Date.now()}`,
                      type: "Diesel",
                      quantity: 300,
                      unit: "Litres",
                      period: "September 2026",
                      purpose: "Generator",
                      sourceDocument: "Fuel Invoice",
                    };
                    updateField("fuelRecords", [...profile.fuelRecords, newFuel]);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-4 py-2 text-xs font-bold text-[#48a65e] hover:bg-[#113f2a] transition-all"
                >
                  <Plus size={15} />
                  <span>Add Fuel Record</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMIT */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-extrabold text-[#48a65e]">Review Factory Setup</h3>
              <p className="text-xs text-[#a2c2b0]">Review your factory baseline specifications before final submission.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Factory Summary Card */}
              <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                  <span className="font-bold text-[#48a65e] uppercase tracking-wider">1. Factory</span>
                  <button onClick={() => setStep(1)} className="text-xs text-[#48a65e] underline">Edit</button>
                </div>
                <p className="font-bold text-white">{profile.companyName}</p>
                <p className="text-[#a2c2b0]">{profile.city}, {profile.state}, {profile.country}</p>
                <p className="text-[#a2c2b0]">{profile.workingDays} working days • {profile.numShifts} shifts</p>
              </div>

              {/* Registration Summary Card */}
              <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                  <span className="font-bold text-[#48a65e] uppercase tracking-wider">2. Registration</span>
                  <button onClick={() => setStep(0)} className="text-xs text-[#48a65e] underline">Edit</button>
                </div>
                <p className="font-bold text-white">{profile.userName}</p>
                <p className="text-[#a2c2b0]">{profile.userEmail}</p>
                <p className="text-[#a2c2b0]">{profile.userPhone}</p>
              </div>

              {/* Machines Summary Card */}
              <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                  <span className="font-bold text-[#48a65e] uppercase tracking-wider">3. Machines</span>
                  <button onClick={() => setStep(2)} className="text-xs text-[#48a65e] underline">Edit</button>
                </div>
                <p className="font-bold text-white">{profile.machines.length} CNC Machines</p>
                <ul className="space-y-1 text-[#a2c2b0]">
                  {profile.machines.map((m) => (
                    <li key={m.id}>{m.name} — {m.type} ({m.ratedPower} kW)</li>
                  ))}
                </ul>
              </div>

              {/* Operations Summary Card */}
              <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                  <span className="font-bold text-[#48a65e] uppercase tracking-wider">4. Machine Operation</span>
                  <button onClick={() => setStep(3)} className="text-xs text-[#48a65e] underline">Edit</button>
                </div>
                <ul className="space-y-1 text-[#a2c2b0]">
                  {profile.machines.map((m) => (
                    <li key={m.id}>{m.name} — {m.operatingHours} h/day ({m.idleHours}h idle)</li>
                  ))}
                </ul>
              </div>

              {/* Auxiliary Summary Card */}
              <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                  <span className="font-bold text-[#48a65e] uppercase tracking-wider">5. Auxiliary & Coolant</span>
                  <button onClick={() => setStep(4)} className="text-xs text-[#48a65e] underline">Edit</button>
                </div>
                <p className="text-[#a2c2b0]">
                  Auxiliary Items: {profile.hasAuxiliary ? profile.auxiliaryItems.length : 0}
                </p>
                <p className="text-[#a2c2b0]">
                  Coolant Systems: {profile.coolantSystems.length}
                </p>
              </div>

              {/* Fuel Summary Card */}
              <div className="rounded-xl border border-[#17452d] bg-[#0c3120] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#17452d] pb-2">
                  <span className="font-bold text-[#48a65e] uppercase tracking-wider">6. Fuel</span>
                  <button onClick={() => setStep(5)} className="text-xs text-[#48a65e] underline">Edit</button>
                </div>
                {profile.hasFuel && profile.fuelRecords.length > 0 ? (
                  profile.fuelRecords.map((f) => (
                    <p key={f.id} className="text-[#a2c2b0]">{f.type} — {f.quantity} {f.unit} ({f.purpose})</p>
                  ))
                ) : (
                  <p className="text-[#8ca897]">No fuel records.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#17452d]">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#17452d] bg-[#0c3120] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#113f2a] transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#48a65e] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg hover:bg-[#54be6c] transition-all"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-[#48a65e] px-8 py-3 text-sm font-extrabold text-white shadow-xl hover:bg-[#54be6c] transition-all"
            >
              <CheckCircle2 size={18} />
              <span>Submit Factory Setup</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
