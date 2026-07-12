import React from "react";
import { MoreHorizontal, ArrowRightLeft } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, Cell } from "recharts";
import { INK, MUTED, BORDER, ACCENT, ACCENT_SOFT, CARD, MONO, DANGER } from "../../theme";
import { WEEKLY_ACTIVITY } from "../../data";

export default function ActivityChartCard() {
  return (
    <div className="rounded-2xl p-6" style={CARD}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium" style={{ color: INK }}>Weekly Activity</p>
          <p className="text-[12px]" style={{ color: MUTED }}>Attach / detach / transfer events</p>
        </div>
        <button style={{ color: MUTED }}>
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div style={{ height: 140 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={WEEKLY_ACTIVITY} barGap={6}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: MUTED }} />
            <Bar dataKey="events" radius={[5, 5, 5, 5]} barSize={18}>
              {WEEKLY_ACTIVITY.map((d, i) => (
                <Cell key={i} fill={i === 3 ? ACCENT_SOFT : "#EFEAD8"} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="trend" stroke={DANGER} strokeWidth={1.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-3 pt-4 mt-2" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 34, height: 34, backgroundColor: `${ACCENT}18` }}>
          <ArrowRightLeft size={16} style={{ color: ACCENT }} />
        </div>
        <div className="flex-1">
          <p className="text-[12px]" style={{ color: MUTED }}>Resolved this week</p>
        </div>
        <p className="text-base font-semibold" style={{ fontFamily: MONO, color: INK }}>58</p>
      </div>
    </div>
  );
}