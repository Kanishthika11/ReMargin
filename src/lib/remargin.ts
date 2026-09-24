export type MachineStatus = "Healthy" | "Due Soon" | "Service Due" | "Overdue";

export interface Machine {
  id: string;
  companyId: string;
  name: string;
  type: "CNC Lathe" | "CNC Milling" | "CNC Router" | "CNC Grinding" | "Other";
  manufacturer: string;
  model: string;
  ratedPower: number;
  lastService: string;
  nextService: string;
  interval: number;
  status: MachineStatus;
}

export interface Session {
  userId: string;
  companyId: string;
  name: string;
  email: string;
  company: string;
  setupCompleted: boolean;
}

const SESSION_KEY = "remargin-demo-session";
const COMPANY_KEY = "remargin-demo-company";

export const demoSession: Session = {
  userId: "usr_demo",
  companyId: "cmp_demo",
  name: "Arun Kumar",
  email: "arun@precisionworks.in",
  company: "Precision Works India",
  setupCompleted: true,
};

export const demoMachines: Machine[] = [
  { id: "m1", companyId: "cmp_demo", name: "CNC-01", type: "CNC Lathe", manufacturer: "ACE", model: "LT-20", ratedPower: 18.5, lastService: "18 Aug 2026", nextService: "18 Nov 2026", interval: 90, status: "Healthy" },
  { id: "m2", companyId: "cmp_demo", name: "CNC-02", type: "CNC Milling", manufacturer: "BFW", model: "Chakra VMC", ratedPower: 22, lastService: "03 Jul 2026", nextService: "01 Oct 2026", interval: 90, status: "Due Soon" },
  { id: "m3", companyId: "cmp_demo", name: "CNC-03", type: "CNC Grinding", manufacturer: "Micromatic", model: "GCU 260", ratedPower: 15, lastService: "12 May 2026", nextService: "10 Aug 2026", interval: 90, status: "Overdue" },
];

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(SESSION_KEY);
  return value ? (JSON.parse(value) as Session) : null;
}

export function setSession(session: Session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("remargin-session"));
}

export function signOut() {
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("remargin-session"));
}

export function registerDemo(data: Omit<Session, "userId" | "companyId" | "setupCompleted"> & { address: string; mobile: string }) {
  window.localStorage.setItem(COMPANY_KEY, JSON.stringify(data));
}

export function getRegisteredCompany() {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COMPANY_KEY);
  return value ? (JSON.parse(value) as Record<string, string>) : null;
}

export const chartMonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
export const energySeries = [1280, 1190, 1340, 1110, 1080, 1040];
export const idealEnergySeries = [1040, 1030, 1080, 1010, 1000, 980];
export const carbonSeries = [1.08, 1.02, 1.12, 0.96, 0.91, 0.86];
export const wasteSeries = [18400, 14200, 19600, 11800, 10200, 9600];

export const historyRows = [
  { date: "18 Sep 2026", type: "Meter + Scrap", energy: "1,200 kWh", waste: "200 kWh", loss: "₹9,600", scrap: "42 kg", yield: "91.6%", carbon: "0.86 t", status: "Action open" },
  { date: "11 Sep 2026", type: "Electricity bill", energy: "7,840 kWh", waste: "—", loss: "₹4,240", scrap: "—", yield: "—", carbon: "5.72 t", status: "Verified" },
  { date: "04 Sep 2026", type: "Meter", energy: "1,080 kWh", waste: "80 kWh", loss: "₹640", scrap: "—", yield: "—", carbon: "0.79 t", status: "Resolved" },
  { date: "28 Aug 2026", type: "Scrap", energy: "—", waste: "—", loss: "₹6,120", scrap: "58 kg", yield: "88.4%", carbon: "—", status: "Verified" },
];

export interface ApiAdapter {
  getMachines(companyId: string): Promise<Machine[]>;
  processUpload(companyId: string, payload: unknown): Promise<{ resultId: string }>;
  generateReport(companyId: string, type: string): Promise<{ downloadUrl: string }>;
}

/** REST-ready mock. Replace methods with authenticated FastAPI calls in production. */
export const mockApi: ApiAdapter = {
  async getMachines(companyId) { return demoMachines.filter((machine) => machine.companyId === companyId); },
  async processUpload(companyId) { await new Promise((resolve) => setTimeout(resolve, 700)); return { resultId: `result_${companyId}` }; },
  async generateReport(companyId, type) { await new Promise((resolve) => setTimeout(resolve, 900)); return { downloadUrl: `data:text/plain,ReMargin ${type} report for ${companyId}` }; },
};