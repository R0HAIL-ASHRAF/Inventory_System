import React from "react";
import { INK, MUTED, SUCCESS, DANGER, ACCENT, CARD } from "../theme";
import { Laptop, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const metrics = [
  { title: "Total Devices", value: "214", trend: "↗ 12% increase", color: SUCCESS, icon: Laptop },
  { title: "In-use", value: "145", subtitle: "/ 214", trend: "↘ 2% decrease", color: DANGER, icon: CheckCircle },
  { title: "Spare", value: "47", subtitle: "/ 214", trend: "↗ 5% increase", color: ACCENT, icon: Clock },
  { title: "Faulty", value: "22", subtitle: "/ 214", trend: "↗ 1% increase", color: DANGER, icon: AlertTriangle },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => (
        <div key={idx} style={CARD} className="p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="p-2 rounded-lg" 
              style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
            >
              <metric.icon size={20} />
            </div>
          </div>
          <div>
            <p style={{ color: MUTED }} className="text-sm font-medium mb-1">{metric.title}</p>
            <div className="flex items-baseline gap-1">
              <h3 style={{ color: INK }} className="text-3xl font-bold">{metric.value}</h3>
              {metric.subtitle && <span style={{ color: MUTED }} className="text-sm">{metric.subtitle}</span>}
            </div>
            <p style={{ color: metric.color }} className="text-xs mt-3 font-medium">
              {metric.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}