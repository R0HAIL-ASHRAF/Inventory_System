import React from "react";
import { MoreHorizontal } from "lucide-react";
import Sparkline from "./Sparkline";
import { BRAND, CREAM, MONO } from "../../theme";
import { STATUS_BREAKDOWN, TREND } from "../../data";

export default function HeroCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between"
      style={{ background: `linear-gradient(135deg, ${BRAND}, #4E5F57)`, color: CREAM, minHeight: 220 }}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium" style={{ color: "#B7C2BB" }}>Total Devices</p>
        <button className="opacity-70 hover:opacity-100">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div>
        <p className="text-4xl font-semibold tracking-tight mb-3" style={{ fontFamily: MONO }}>214</p>
        <Sparkline points={TREND} />
      </div>

      <div className="flex items-center gap-5 pt-4" style={{ borderTop: "1px solid rgba(255,252,220,0.16)" }}>
        {STATUS_BREAKDOWN.map((s) => (
          <div key={s.label}>
            <p className="text-[11px]" style={{ color: "#B7C2BB" }}>{s.label}</p>
            <p className="text-sm font-semibold" style={{ fontFamily: MONO }}>{s.pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}