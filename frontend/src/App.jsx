import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import { Laptop2, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

// This is the composition root: it owns "which page is active" and hands
// that page to Layout as children. Swap useState for React Router
// (or your router of choice) once you have real routes — Layout doesn't
// care either way, it just renders whatever it's given.

const STATS = [
  { label: "Total Devices", value: "214", icon: Laptop2, tint: "#2B6CB0" },
  { label: "In Use", value: "178", icon: CheckCircle2, tint: "#2F9E6B" },
  { label: "Flagged Faulty", value: "6", icon: AlertTriangle, tint: "#DC5B4C" },
  { label: "Dispatched (30d)", value: "23", icon: TrendingUp, tint: "#B98A2E" },
];

function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4"
              style={{ border: "1px solid #E7EBF0", boxShadow: "0 1px 3px rgba(16,24,40,0.05)" }}
            >
              <span
                className="flex items-center justify-center rounded-lg mb-3"
                style={{ width: 34, height: 34, backgroundColor: `${s.tint}18` }}
              >
                <Icon size={17} style={{ color: s.tint }} />
              </span>
              <p
                className="text-2xl font-semibold"
                style={{ color: "#14202E", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {s.value}
              </p>
              <p className="text-[12.5px] mt-0.5" style={{ color: "#64748B" }}>
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="bg-white rounded-xl p-8 flex items-center justify-center"
        style={{ border: "1px solid #E7EBF0", minHeight: 320, color: "#94A3B8" }}
      >
        Device table goes here
      </div>
    </div>
  );
}

function Placeholder({ name }) {
  return (
    <div
      className="bg-white rounded-xl p-8 flex items-center justify-center"
      style={{ border: "1px solid #E7EBF0", minHeight: 400, color: "#94A3B8" }}
    >
      {name} page goes here
    </div>
  );
}

export default function App() {
  const [page] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    devices: <Placeholder name="Devices" />,
    people: <Placeholder name="People" />,
    departments: <Placeholder name="Departments" />,
  };

  return <Layout>{pages[page] ?? <Dashboard />}</Layout>;
}