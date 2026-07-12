import React, { useState } from "react";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, MONO, DANGER, SUCCESS, PAGE_BG } from "../../theme";
import { RECENT_DEVICES, RECENT_PEOPLE } from "../../data";

export default function DeviceTable() {
  const [tab, setTab] = useState("devices");
  const rows = tab === "devices" ? RECENT_DEVICES : RECENT_PEOPLE;

  return (
    <div className="rounded-2xl p-6" style={CARD}>
      <div className="flex items-center gap-6 mb-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
        {[
          { key: "devices", label: "Recent Devices" },
          { key: "people", label: "Recent People" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="pb-3 text-sm font-medium relative"
            style={{ color: tab === t.key ? INK : MUTED }}
          >
            {t.label}
            {tab === t.key && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full" style={{ backgroundColor: ACCENT }} />}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {rows.map((r) => {
          const Icon = r.icon;
          const up = r.change >= 0;
          return (
            <div
              key={r.name}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-150"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 36, height: 36, backgroundColor: BRAND }}>
                <Icon size={16} color="#ffffff" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium truncate" style={{ color: INK }}>{r.name}</p>
                  <ExternalLink size={12} style={{ color: MUTED }} />
                </div>
                <p className="text-[11.5px] truncate" style={{ color: MUTED }}>{r.sub}</p>
              </div>

              <p className="text-[12.5px] w-28 shrink-0 hidden sm:block" style={{ color: MUTED }}>{r.dept}</p>

              <div className="flex items-center gap-1.5 w-20 shrink-0 justify-end">
                <span className="text-[13px] font-medium" style={{ color: INK, fontFamily: MONO }}>{r.stat}</span>
              </div>

              {r.change !== 0 && (
                <div
                  className="flex items-center gap-0.5 text-[11.5px] font-medium px-1.5 py-0.5 rounded shrink-0"
                  style={{ color: up ? SUCCESS : DANGER, backgroundColor: up ? "rgba(92,130,100,0.12)" : "rgba(184,80,58,0.12)" }}
                >
                  {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(r.change)}%
                </div>
              )}

              <button style={{ color: MUTED }} className="shrink-0 p-1">
                <MoreHorizontal size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}