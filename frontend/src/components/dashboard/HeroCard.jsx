import React, {useState} from "react";
import { MoreHorizontal, HelpCircle } from "lucide-react";
import { STATUS_BREAKDOWN, TREND } from "../../data";
import { INK, MUTED, BORDER, ACCENT, ACCENT_SOFT, CARD, SURFACE, BRAND, MONO, FONT_DISPLAY, FONT_SANS, DANGER, CREAM } from "../../theme";
import { dashboardTourSteps } from "../tour/TourSteps";

const cardHelp = dashboardTourSteps.find((s) => s.target === '[data-tour="dashboard-hero"]');

export default function HeroCard() {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between"
      style={{ background: `linear-gradient(135deg, ${BRAND}, #f5e834)`, color: CREAM, minHeight: 220 }}
    >
      <div className="flex items-start justify-between">
        <p className="text-[33px] font-semibold uppercase tracking-[0.03em]" style={{ color: CREAM, fontFamily: FONT_DISPLAY }}>
          Total Devices
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

      <div>
        <p
          className="text-5xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: MONO, fontFeatureSettings: "'tnum'" }}
        >
          214
        </p>
        
      </div>

      <div className="flex items-center gap-5 pt-4" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.16)" }}>
        {STATUS_BREAKDOWN.map((s) => (
          <div key={s.label}>
            <p className="text-[17px] tracking-[0.01em]" style={{ color: "#000000" }}>{s.label}</p>
            <p className="text-[33px] font-semibold" style={{ fontFamily: MONO, fontFeatureSettings: "'tnum'", color:s.color }}>{s.pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}