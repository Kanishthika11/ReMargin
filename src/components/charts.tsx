import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { carbonSeries, chartMonths, energySeries, idealEnergySeries, wasteSeries } from "@/lib/remargin";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler);

const grid = "rgba(7, 33, 21, 0.06)";
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2", titleFont: { family: "Sora, sans-serif", weight: 700 }, bodyFont: { family: "Manrope, sans-serif", weight: 500 } }
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } } },
    y: { grid: { color: grid }, border: { display: false }, ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } } }
  },
};

export function TrendChart({ kind = "carbon" }: { kind?: "carbon" | "energy" | "waste" | "yield" }) {
  const values = kind === "carbon" ? carbonSeries : kind === "waste" ? wasteSeries : kind === "yield" ? [87, 89, 88, 91, 92, 93] : energySeries;
  const strokeColor = kind === "waste" ? "#ef4444" : "#072115";
  const fillColor = kind === "waste" ? "rgba(239, 68, 68, 0.12)" : "rgba(7, 33, 21, 0.08)";
  const yAxisTitle = kind === "carbon" ? "Emissions (tCO₂e)" : kind === "waste" ? "Material Loss (kg)" : kind === "yield" ? "Yield Percentage (%)" : "Consumption (kWh)";

  const customOptions = {
    ...options,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      y: {
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: yAxisTitle, color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };

  return <Line options={customOptions} data={{ labels: chartMonths, datasets: [{ data: values, borderColor: strokeColor, backgroundColor: fillColor, fill: true, tension: 0.38, pointRadius: 4, pointBackgroundColor: "#95eb27", pointHoverRadius: 6 }] }} />;
}

export function ComparisonChart() {
  const customOptions = {
    ...options,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      y: {
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Energy Consumption (kWh)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };

  return <Bar options={customOptions} data={{ labels: chartMonths, datasets: [{ label: "Actual", data: energySeries, backgroundColor: "#072115", borderRadius: 6 }, { label: "Ideal", data: idealEnergySeries, backgroundColor: "#95eb27", borderRadius: 6 }] }} />;
}

export function ScopeChart() {
  return <Doughnut options={{ responsive: true, maintainAspectRatio: false, cutout: "74%", plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { weight: 500 } } } } }} data={{ labels: ["Scope 1 (Direct)", "Scope 2 (Electricity)"], datasets: [{ data: [18, 82], backgroundColor: ["#072115", "#95eb27"], borderWidth: 0 }] }} />;
}

export function YieldRadarChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { family: "Manrope, sans-serif", weight: 600 } }
      },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      r: {
        angleLines: { color: "rgba(7, 33, 21, 0.1)" },
        grid: { color: "rgba(7, 33, 21, 0.1)" },
        pointLabels: { color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 10 } },
        ticks: { display: false }
      }
    }
  };

  const data = {
    labels: ["Output Yield", "Quality Rate", "Machine Uptime", "Speed Index", "Material Efficiency", "Tool Precision"],
    datasets: [
      {
        label: "Baseline Target",
        data: [88, 85, 90, 87, 85, 89],
        borderColor: "#072115",
        backgroundColor: "rgba(7, 33, 21, 0.12)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#072115"
      },
      {
        label: "Actual (Apr–Sep 2026)",
        data: [93, 91, 95, 94, 92, 94],
        borderColor: "#95eb27",
        backgroundColor: "rgba(149, 235, 39, 0.25)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#95eb27"
      }
    ]
  };

  return <Radar options={customOptions} data={data} />;
}

export function ScrapBarChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      y: {
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 }, callback: (v: any) => `₹${v / 1000}k` },
        title: { display: true, text: "Material Loss (₹)", color: "#ef4444", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };

  const data = {
    labels: chartMonths,
    datasets: [
      {
        label: "Scrap Loss (₹)",
        data: [18.4, 14.2, 19.6, 11.8, 10.2, 9.6].map(x => x * 1000),
        backgroundColor: ["#ef4444", "#f97316", "#ef4444", "#10b981", "#95eb27", "#95eb27"],
        borderRadius: 6,
        barThickness: 24
      }
    ]
  };

  return <Bar options={customOptions} data={data} />;
}

export function ProductEmissionChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { family: "Manrope, sans-serif", weight: 600 } } },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      y: {
        stacked: true,
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Emissions (tCO₂e)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };
  const data = {
    labels: chartMonths,
    datasets: [
      { label: "EN8 Shafts", data: [0.42, 0.39, 0.45, 0.38, 0.36, 0.34], backgroundColor: "#072115", borderRadius: 4 },
      { label: "Cast Gears", data: [0.32, 0.30, 0.34, 0.28, 0.27, 0.25], backgroundColor: "#10b981", borderRadius: 4 },
      { label: "Steel Plates", data: [0.20, 0.19, 0.21, 0.18, 0.17, 0.16], backgroundColor: "#95eb27", borderRadius: 4 },
      { label: "Flanges", data: [0.10, 0.09, 0.08, 0.08, 0.07, 0.07], backgroundColor: "#34d399", borderRadius: 4 },
      { label: "Precision Pins", data: [0.04, 0.05, 0.04, 0.04, 0.04, 0.04], backgroundColor: "#a2c2b0", borderRadius: 4 },
    ]
  };
  return <Bar options={customOptions} data={data} />;
}

export function BaselineVsCurrentChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { family: "Manrope, sans-serif", weight: 600 } } },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      y: {
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Emissions (tCO₂e)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };
  const data = {
    labels: chartMonths,
    datasets: [
      {
        type: "line" as const,
        label: "Baseline Target (t)",
        data: [1.30, 1.25, 1.20, 1.15, 1.10, 1.00],
        borderColor: "#072115",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: "#072115",
        tension: 0.2
      },
      {
        type: "bar" as const,
        label: "Current Emissions (t)",
        data: [1.08, 1.02, 1.12, 0.96, 0.91, 0.86],
        backgroundColor: "#95eb27",
        borderRadius: 6,
        barThickness: 20
      }
    ]
  };
  return <Bar options={customOptions} data={data as any} />;
}

export function CostVsCarbonChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { family: "Manrope, sans-serif", weight: 600 } } },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      yCost: {
        type: "linear" as const,
        position: "left" as const,
        min: 75000,
        max: 100000,
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#072115", font: { family: "Manrope, sans-serif", weight: 600 }, callback: (v: any) => `₹${Number(v) / 1000}k` },
        title: { display: true, text: "Cost (₹)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      yCarbon: {
        type: "linear" as const,
        position: "right" as const,
        min: 0.8,
        max: 1.4,
        stepSize: 0.1,
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#10b981", font: { family: "Manrope, sans-serif", weight: 600 }, callback: (v: any) => `${Number(v).toFixed(1)} t` },
        title: { display: true, text: "Carbon (t)", color: "#10b981", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };
  const data = {
    labels: chartMonths,
    datasets: [
      {
        label: "Energy Cost (₹)",
        data: [92000, 88000, 96000, 84000, 81000, 78000],
        borderColor: "#072115",
        backgroundColor: "rgba(7, 33, 21, 0.08)",
        fill: true,
        yAxisID: "yCost",
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#072115"
      },
      {
        label: "Carbon Footprint (tCO₂e)",
        data: [1.25, 1.18, 1.30, 1.10, 1.04, 0.98],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        fill: true,
        yAxisID: "yCarbon",
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#95eb27"
      }
    ]
  };
  return <Line options={customOptions} data={data} />;
}

export function ExpectedVsEstimatedEnergyChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { usePointStyle: true, boxWidth: 8, color: "#374151", font: { family: "Manrope, sans-serif", weight: 600 } } },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Month (2026)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      },
      y: {
        grid: { color: grid },
        border: { display: false },
        ticks: { color: "#637381", font: { family: "Manrope, sans-serif", weight: 600 } },
        title: { display: true, text: "Energy (kWh)", color: "#072115", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };

  const data = {
    labels: chartMonths,
    datasets: [
      {
        type: "line" as const,
        label: "Expected Energy (kWh)",
        data: [1100, 1080, 1150, 1050, 1030, 1000],
        borderColor: "#072115",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: "#072115",
        tension: 0.3
      },
      {
        type: "bar" as const,
        label: "Estimated Energy (kWh)",
        data: [1280, 1190, 1340, 1110, 1080, 1040],
        backgroundColor: "#95eb27",
        borderRadius: 6,
        barThickness: 20
      }
    ]
  };

  return <Bar options={customOptions} data={data as any} />;
}

export function EstimatedVsActualScoreChart() {
  const customOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#072115", padding: 12, cornerRadius: 8, titleColor: "#ffffff", bodyColor: "#e1e8e2" }
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: { color: "rgba(255, 255, 255, 0.08)" },
        border: { display: false },
        ticks: { color: "#a2c2b0", font: { family: "Manrope, sans-serif", weight: 600 }, callback: (v: any) => `${v}%` }
      },
      y: {
        grid: { display: false },
        ticks: { color: "#ffffff", font: { family: "Sora, sans-serif", weight: 700, size: 11 } }
      }
    }
  };

  const data = {
    labels: ["Estimated Score", "Actual Score"],
    datasets: [
      {
        data: [83.3, 91.6],
        backgroundColor: ["#10b981", "#95eb27"],
        borderRadius: 6,
        barThickness: 22
      }
    ]
  };

  return <Bar options={customOptions} data={data} />;
}