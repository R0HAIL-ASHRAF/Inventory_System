import React from "react";
import { MoreHorizontal } from "lucide-react";
import Sparkline from "./Sparkline";
import { BRAND, CREAM, MONO, FONT_DISPLAY } from "../../theme";
import { STATUS_BREAKDOWN, TREND } from "../../data";

export default function HeroCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between"
      style={{ background: `linear-gradient(135deg, ${BRAND}, #f5e834)`, color: CREAM, minHeight: 220 }}
    >
      <div className="flex items-start justify-between">
        <p className="text-[33px] font-semibold uppercase tracking-[0.03em]" style={{ color: CREAM, fontFamily: FONT_DISPLAY }}>
          Total Devices
          </p>
        <button className="opacity-70 hover:opacity-100">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div>
        <p
          className="text-5xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: MONO, fontFeatureSettings: "'tnum'" }}
        >
          214
        </p>
        <Sparkline points={TREND} />
      </div>

      <div className="flex items-center gap-5 pt-4" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.16)" }}>
        {STATUS_BREAKDOWN.map((s) => (
          <div key={s.label}>
            <p className="text-[11px] tracking-[0.01em]" style={{ color: "#000000" }}>{s.label}</p>
            <p className="text-sm font-semibold" style={{ fontFamily: MONO, fontFeatureSettings: "'tnum'" }}>{s.pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}