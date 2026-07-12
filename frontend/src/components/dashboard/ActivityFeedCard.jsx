import React from "react";
import { PlugZap, Unplug, ArrowRightLeft, AlertTriangle, RefreshCcw, MoreHorizontal } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, DANGER, CARD, MONO } from "../../theme";
import { ACTIVITY_LOG } from "../../data";

const EVENT_META = {
  attach: { icon: PlugZap, tone: BRAND },
  detach: { icon: Unplug, tone: MUTED },
  transfer: { icon: ArrowRightLeft, tone: ACCENT },
  fault: { icon: AlertTriangle, tone: DANGER },
  status_change: { icon: RefreshCcw, tone: ACCENT },
};

export default function ActivityFeedCard() {
  return (
    <div className="rounded-2xl p-6" style={CARD}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium" style={{ color: INK }}>Activity Log</p>
          <p className="text-[12px]" style={{ color: MUTED }}>Latest device_logs events, most recent first</p>
        </div>
        <button style={{ color: MUTED }}>
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto pr-1 -mr-1">
        {ACTIVITY_LOG.map((entry, i) => {
          const meta = EVENT_META[entry.type] ?? EVENT_META.status_change;
          const Icon = meta.icon;
          const isLast = i === ACTIVITY_LOG.length - 1;
          return (
            <div key={entry.id} className="flex gap-3">
              {/* icon + connecting line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 30, height: 30, backgroundColor: `${meta.tone}18` }}
                >
                  <Icon size={14} style={{ color: meta.tone }} />
                </div>
                {!isLast && <div className="w-px flex-1 my-1" style={{ backgroundColor: BORDER }} />}
              </div>

              <div className="min-w-0 flex-1 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13.5px] font-medium leading-snug" style={{ color: INK }}>
                    {entry.title}
                  </p>
                  <span className="text-[11px] shrink-0 whitespace-nowrap" style={{ color: MUTED, fontFamily: MONO }}>
                    {entry.time}
                  </span>
                </div>
                <p className="text-[12px] mt-0.5" style={{ color: MUTED }}>{entry.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}