import React, { useState } from "react";
import { MoreHorizontal, ArrowRightLeft } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, Cell, Tooltip } from "recharts";
import { INK, MUTED, BORDER, ACCENT, ACCENT_SOFT, CARD, MONO, FONT_DISPLAY, DANGER, CREAM } from "../../theme";
import { WEEKLY_ACTIVITY } from "../../data";

export default function ActivityChartCard() {
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [isFooterHovered, setIsFooterHovered] = useState(false);

  return (
    <div className="rounded-2xl p-6 transition-all duration-300 animate-fade-in" style={CARD}>
      {/* Premium Chart Page Styles */}
      <style>{`
        @keyframes chartCardEntrance {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: chartCardEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Header Info */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[27px] font-semibold uppercase tracking-[0.03em]" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>
            Weekly Activity</p>
          <p className="text-[14px] mt-0.5" style={{ color: CREAM }}>Attach / detach / transfer events</p>
        </div>
        <button 
          style={{ color: MUTED }} 
          className="p-1 rounded-lg transition-all duration-200 hover:bg-black/5 hover:text-black active:scale-95"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Chart Canvas Container */}
      <div style={{ height: 140 }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={WEEKLY_ACTIVITY} 
            barGap={6}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: MUTED, fontFamily: MONO }} 
            />

            {/* Custom Premium Tooltip */}
            <Tooltip
              cursor={{ fill: "transparent" }} // Disables the default blocky layout mask
              animationDuration={200}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div 
                      className="rounded-lg px-2.5 py-1.5 shadow-xl border backdrop-blur-sm transition-all duration-150"
                      style={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.96)", 
                        borderColor: BORDER, 
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
                      }}
                    >
                      <p style={{ color: INK, fontFamily: MONO }} className="text-[11px] font-semibold">
                        {payload[0].value} Events
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Interactive Bars with Fading Effects */}
            <Bar 
              dataKey="events" 
              radius={[5, 5, 5, 5]} 
              barSize={18}
              animationDuration={1000}
            >
              {WEEKLY_ACTIVITY.map((d, i) => {
                const isTargetHighlighted = i === 3;
                const baseColor = isTargetHighlighted ? ACCENT_SOFT : "#EFEAD8";
                
                // Dim down non-hovered bars when a selection focus is active
                const hasActiveSelection = hoveredBarIndex !== null;
                const isCurrentlyHovered = hoveredBarIndex === i;
                const dynamicOpacity = hasActiveSelection ? (isCurrentlyHovered ? 1 : 0.35) : 1;

                return (
                  <Cell 
                    key={`bar-cell-${i}`} 
                    fill={isCurrentlyHovered ? ACCENT : baseColor}
                    opacity={dynamicOpacity}
                    style={{ 
                      transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
                      cursor: "pointer"
                    }}
                    onMouseEnter={() => setHoveredBarIndex(i)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  />
                );
              })}
            </Bar>

            {/* Trendline Overlays */}
            <Line 
              type="monotone" 
              dataKey="trend" 
              stroke={DANGER} 
              strokeWidth={1.75} 
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: DANGER }}
              animationDuration={1200}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Summary Row Footnote */}
      <div 
        className="flex items-center gap-3 pt-4 mt-2 transition-all duration-300 rounded-xl px-2 -mx-2 cursor-pointer"
        style={{ 
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: isFooterHovered ? `${ACCENT}08` : "transparent",
          transform: isFooterHovered ? "translateX(2px)" : "translateX(0px)"
        }}
        onMouseEnter={() => setIsFooterHovered(true)}
        onMouseLeave={() => setIsFooterHovered(false)}
      >
        <div 
          className="flex items-center justify-center rounded-lg shrink-0 transition-transform duration-300" 
          style={{ 
            width: 34, 
            height: 34, 
            backgroundColor: `${ACCENT}18`,
            transform: isFooterHovered ? "scale(1.06)" : "scale(1)"
          }}
        >
          <ArrowRightLeft 
            size={16} 
            style={{ color: ACCENT }} 
            className={`transition-transform duration-500 ${isFooterHovered ? 'rotate-180' : ''}`}
          />
        </div>
        
        <div className="flex-1">
          <p className="text-[12px] font-medium transition-colors duration-200" style={{ color: isFooterHovered ? ACCENT : MUTED }}>
            Resolved this week
          </p>
        </div>

        <p 
          className="text-base font-semibold transition-all duration-200" 
          style={{ 
            fontFamily: MONO, 
            color: INK, 
            fontFeatureSettings: "'tnum'",
            transform: isFooterHovered ? "scale(1.05)" : "scale(1)"
          }}
        >
          58
        </p>
      </div>
    </div>
  );
}