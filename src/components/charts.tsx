import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { carbonSeries, chartMonths, energySeries, idealEnergySeries, wasteSeries } from "@/lib/remargin";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const grid = "rgba(7, 33, 21, 0.06)";
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2", titleFont: { family: "Sora, sans-serif", weight: 700 }, bodyFont: { family: "Manrope, sans-serif", weight: 500 } } },
  scales: { x: { grid: { display: false }, ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } } }, y: { grid: { color: grid }, border: { display: false }, ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } } } },
};

export function TrendChart({ kind = "carbon" }: { kind?: "carbon" | "energy" | "waste" | "yield" }) {
  const values = kind === "carbon" ? carbonSeries : kind === "waste" ? wasteSeries : kind === "yield" ? [87, 89, 88, 91, 92, 93] : energySeries;
  const strokeColor = kind === "waste" ? "#ef4444" : "#072115";
  const fillColor = kind === "waste" ? "rgba(239, 68, 68, 0.12)" : "rgba(7, 33, 21, 0.08)";
  return <Line options={options} data={{ labels: chartMonths, datasets: [{ data: values, borderColor: strokeColor, backgroundColor: fillColor, fill: true, tension: 0.38, pointRadius: 4, pointBackgroundColor: "#95eb27", pointHoverRadius: 6 }] }} />;
}

export function ComparisonChart() {
  return <Bar options={options} data={{ labels: chartMonths, datasets: [{ label: "Actual", data: energySeries, backgroundColor: "#072115", borderRadius: 6 }, { label: "Ideal", data: idealEnergySeries, backgroundColor: "#95eb27", borderRadius: 6 }] }} />;
}

export function ScopeChart() {
  return <Doughnut options={{ responsive: true, maintainAspectRatio: false, cutout: "74%", plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { weight: 500 } } } } }} data={{ labels: ["Scope 1", "Scope 2"], datasets: [{ data: [18, 82], backgroundColor: ["#072115", "#95eb27"], borderWidth: 0 }] }} />;
}