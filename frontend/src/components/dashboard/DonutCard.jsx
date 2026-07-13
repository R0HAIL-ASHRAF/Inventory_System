import React from "react";
import { MoreHorizontal, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { INK, MUTED, CARD, MONO, FONT_DISPLAY, DANGER, CREAM } from "../../theme";
import { HEALTH_DATA } from "../../data";

export default function DonutCard() {
  return (
    <div className="rounded-2xl p-6 flex flex-col" style={{ ...CARD, minHeight: 220 }}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-[33px] font-semibold uppercase tracking-[0.03em]" style={{ color: CREAM, fontFamily: FONT_DISPLAY }}>
          Inventory Health
          </p>
        <button style={{ color: MUTED }}>
          <MoreHorizontal size={18} />
        </button>
      </div>
      <p
        className="text-2xl font-semibold mb-1"
        style={{ fontFamily: MONO, color: "#fe0000", fontFeatureSettings: "'tnum'" }}
      >
        22 flagged
      </p>

      <div className="flex-1 flex items-center gap-4">
        <div style={{ width: 120, height: 120 }} className="shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={HEALTH_DATA} dataKey="value" innerRadius={40} outerRadius={58} paddingAngle={3} strokeWidth={0}>
                {HEALTH_DATA.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <AlertTriangle
            size={25}
            style={{ color: DANGER, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
          />
        </div>
        <div className="space-y-2">
          {HEALTH_DATA.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-[17px]">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span style={{ color: MUTED }}>{d.name}</span>
              <span className="font-semibold" style={{ color: d.color, fontFamily: MONO, fontFeatureSettings: "'tnum'" }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}