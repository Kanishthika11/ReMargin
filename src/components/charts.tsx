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

const grid = "rgba(15, 44, 57, .07)";
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: "#0d2935", padding: 12, cornerRadius: 6 } },
  scales: { x: { grid: { display: false }, ticks: { color: "#6c7d83" } }, y: { grid: { color: grid }, border: { display: false }, ticks: { color: "#6c7d83" } } },
};

export function TrendChart({ kind = "carbon" }: { kind?: "carbon" | "energy" | "waste" | "yield" }) {
  const values = kind === "carbon" ? carbonSeries : kind === "waste" ? wasteSeries : kind === "yield" ? [87, 89, 88, 91, 92, 93] : energySeries;
  return <Line options={options} data={{ labels: chartMonths, datasets: [{ data: values, borderColor: "#087f70", backgroundColor: "rgba(8,127,112,.12)", fill: true, tension: 0.38, pointRadius: 3, pointBackgroundColor: "#087f70" }] }} />;
}

export function ComparisonChart() {
  return <Bar options={options} data={{ labels: chartMonths, datasets: [{ label: "Actual", data: energySeries, backgroundColor: "#0d3846", borderRadius: 5 }, { label: "Ideal", data: idealEnergySeries, backgroundColor: "#5bc6a5", borderRadius: 5 }] }} />;
}

export function ScopeChart() {
  return <Doughnut options={{ responsive: true, maintainAspectRatio: false, cutout: "72%", plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } } } }} data={{ labels: ["Scope 1", "Scope 2"], datasets: [{ data: [18, 82], backgroundColor: ["#e6a33e", "#087f70"], borderWidth: 0 }] }} />;
}