import React from "react";
import { AlertTriangle } from "lucide-react";
import { INK, MUTED, CARD, MONO } from "../../theme";

export default function StatCard({
  label = "Metric",
  value = "0",
  icon: Icon = AlertTriangle,
  tone = "#110d35",
  progress = 0,
}) {
  return (
    <div className="rounded-2xl p-5 flex items-center gap-4" style={CARD}>
      <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 48, height: 48, backgroundColor: `${tone}18` }}>
        <Icon size={20} style={{ color: tone }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1.5">
          <p
            className="text-lg font-semibold"
            style={{ fontFamily: MONO, color: INK, fontFeatureSettings: "'tnum'" }}
          >
            {value}
          </p>
          <p className="text-[12px] font-medium truncate ml-2" style={{ color: MUTED }}>{label}</p>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#EFEAD8" }}>
          <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: tone }} />
        </div>
      </div>
    </div>
  );
}