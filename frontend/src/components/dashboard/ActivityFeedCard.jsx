import React, { useState } from "react";
import { PlugZap, Unplug, ArrowRightLeft, AlertTriangle, RefreshCcw, MoreHorizontal } from "lucide-react";
import { INK, MUTED, BORDER, CREAM, ACCENT, BRAND, DANGER, CARD, MONO, FONT_DISPLAY, PAGE_BG } from "../../theme";
import { ACTIVITY_LOG } from "../../data";

const EVENT_META = {
  attach: { icon: PlugZap, tone: CREAM },
  detach: { icon: Unplug, tone: MUTED },
  transfer: { icon: ArrowRightLeft, tone: ACCENT },
  fault: { icon: AlertTriangle, tone: DANGER },
  status_change: { icon: RefreshCcw, tone: ACCENT },
};

export default function ActivityFeedCard() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="rounded-2xl p-6 transition-all duration-300" style={CARD}>
      {/* Premium staggered entry and scrollbar track overrides */}
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-feed-item {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-feed-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-feed-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-feed-scroll::-webkit-scrollbar-thumb {
          background: ${BORDER};
          border-radius: 10px;
        }
        .custom-feed-scroll::-webkit-scrollbar-thumb:hover {
          background: ${MUTED}40;
        }
      `}</style>

      {/* Card Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.03em]" style={{ color: INK, fontFamily: FONT_DISPLAY }}>Activity Log</p>
          <p className="text-[12px] mt-0.5" style={{ color: MUTED }}>Latest device_logs events, most recent first</p>
        </div>
        <button 
          style={{ color: MUTED }} 
          className="p-1 rounded-lg transition-all duration-200 hover:bg-black/5 hover:text-black active:scale-95"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Scrolling Content Feed Area */}
      <div className="max-h-80 overflow-y-auto pr-2 -mr-2 custom-feed-scroll space-y-0.5">
        {ACTIVITY_LOG.map((entry, i) => {
          const meta = EVENT_META[entry.type] ?? EVENT_META.status_change;
          const Icon = meta.icon;
          const isLast = i === ACTIVITY_LOG.length - 1;
          const isHovered = hoveredIndex === i;

          return (
            <div 
              key={entry.id} 
              className="flex gap-4 px-2 py-2 rounded-xl transition-all duration-200 animate-feed-item opacity-0"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                // Shading effect: Soft highlight when hovering a specific event trail row
                backgroundColor: isHovered ? PAGE_BG : "transparent",
                animationDelay: `${i * 30}ms`
              }}
            >
              {/* Timeline Indicator Node + Path Trace */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    width: 32, 
                    height: 32, 
                    // Invert color matching theme profile on hover selection
                    backgroundColor: isHovered ? meta.tone : `${meta.tone}14`,
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    // Shadow glow based dynamically on context-tone
                    boxShadow: isHovered ? `0 4px 12px ${meta.tone}35` : "none"
                  }}
                >
                  <Icon 
                    size={13} 
                    style={{ color: isHovered ? "#FFFFFF" : meta.tone }} 
                    className="transition-colors duration-200" 
                  />
                </div>

                {/* Intelligent path lighting connection */}
                {!isLast && (
                  <div 
                    className="w-[1.5px] flex-1 my-1.5 transition-colors duration-300" 
                    style={{ 
                      backgroundColor: isHovered ? meta.tone : BORDER 
                    }} 
                  />
                )}
              </div>

              {/* Text Block Content Wrapper */}
              <div className="min-w-0 flex-1 pb-2 pt-1">
                <div className="flex items-start justify-between gap-3">
                  <p 
                    className="text-[13.5px] font-medium leading-snug transition-colors duration-150" 
                    style={{ color: isHovered ? ACCENT : INK }}
                  >
                    {entry.title}
                  </p>
                  <span
                    className="text-[11px] shrink-0 whitespace-nowrap transition-transform duration-200"
                    style={{ 
                      color: MUTED, 
                      fontFamily: MONO, 
                      fontFeatureSettings: "'tnum'",
                      transform: isHovered ? "translateX(-2px)" : "none"
                    }}
                  >
                    {entry.time}
                  </span>
                </div>
                <p 
                  className="text-[12px] mt-0.5 transition-opacity duration-200" 
                  style={{ color: MUTED, opacity: isHovered ? 0.9 : 0.7 }}
                >
                  {entry.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}