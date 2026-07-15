import React, { useState } from "react";

import { MoreHorizontal, AlertTriangle, HelpCircle } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { INK, MUTED, BORDER, ACCENT, ACCENT_SOFT, CARD, SURFACE, MONO, FONT_DISPLAY, FONT_SANS, DANGER, CREAM } from "../../theme";
import { HEALTH_DATA } from "../../data";
import { dashboardTourSteps } from "../tour/TourSteps";

const cardHelp = dashboardTourSteps.find((s) => s.target === '[data-tour="dashboard-donut"]');

export default function DonutCard() {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <div className="rounded-2xl p-6 flex flex-col" style={{ ...CARD, minHeight: 220 }}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-[33px] font-semibold uppercase tracking-[0.03em]" style={{ color: CREAM, fontFamily: FONT_DISPLAY }}>
          Inventory Health
          </p>
        <div
          className="relative"
          onMouseEnter={() => setHelpOpen(true)}
          onMouseLeave={() => setHelpOpen(false)}
        >
          <button
            style={{ color: helpOpen ? ACCENT : MUTED }}
            className="p-1.5 rounded-lg transition-all duration-200 hover:bg-black/5"
            aria-label="About this card"
          >
            <HelpCircle size={17} />
          </button>

          {helpOpen && cardHelp && (
            <div
              role="tooltip"
              className="absolute right-0 top-full mt-2 z-50 w-64 rounded-xl p-3.5 shadow-xl border"
              style={{
                backgroundColor: SURFACE,
                borderColor: BORDER,
                boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                animation: "helpTipIn 150ms ease-out",
              }}
            >
              <p className="text-[12.5px] font-semibold mb-1" style={{ color: INK, fontFamily: FONT_SANS }}>
                {cardHelp.title}
              </p>
              <p className="text-[11.5px] leading-relaxed" style={{ color: MUTED, fontFamily: FONT_SANS }}>
                {cardHelp.body}
              </p>
              {/* little pointer nub */}
              <div
                className="absolute -top-1 right-4 w-2 h-2 rotate-45 border-l border-t"
                style={{ backgroundColor: SURFACE, borderColor: BORDER }}
              />
            </div>
          )}
        </div>
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