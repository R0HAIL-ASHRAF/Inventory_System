import React, { useMemo, useState } from "react";
import {
  Search,
  Download,
  Zap,
  AlertTriangle,
  ArrowLeftRight,
  Wrench,
  Trash2,
  PlusCircle,
  ChevronDown,
  Filter,
} from "lucide-react";
import {
  INK,
  MUTED,
  BORDER,
  ACCENT,
  BRAND,
  CARD,
  PAGE_BG,
  MONO,
  SURFACE,
  CREAMt,
  CREAM,
  SUCCESS,
  DANGER,
  FONT_DISPLAY,
  FONT_SANS,
} from "../theme";

const TYPE_CONFIG = {
  assigned: { icon: Zap, tone: ACCENT, label: "Assigned" },
  faulty: { icon: AlertTriangle, tone: DANGER, label: "Flagged faulty" },
  transfer: { icon: ArrowLeftRight, tone: CREAM, label: "Transferred" },
  repaired: { icon: Wrench, tone: SUCCESS, label: "Repaired" },
  provisioned: { icon: PlusCircle, tone: SUCCESS, label: "Provisioned" },
  removed: { icon: Trash2, tone: DANGER, label: "Removed" },
};

const TYPE_FILTERS = ["all", "assigned", "faulty", "transfer", "repaired", "provisioned", "removed"];

const now = new Date("2026-07-15T16:40:00");
const mins = (n) => new Date(now.getTime() - n * 60000).toISOString();
const hrs = (n) => new Date(now.getTime() - n * 3600000).toISOString();
const days = (n) => new Date(now.getTime() - n * 86400000).toISOString();

const LOGS = [
  { id: 1, type: "assigned", title: "ThinkPad X1 Carbon assigned", subtitle: "to Bilal Ahmed", dept: "Engineering", actor: "Aisha Raza", time: mins(6) },
  { id: 2, type: "faulty", title: "HP LaserJet M428 flagged faulty", subtitle: "Paper jam sensor error", dept: "Front Office", actor: "System", time: mins(42) },
  { id: 3, type: "transfer", title: "Dell UltraSharp U2723 transferred", subtitle: "Design → Marketing", dept: "Marketing", actor: "Aisha Raza", time: hrs(3) },
  { id: 4, type: "provisioned", title: "Dell PowerEdge R450 provisioned", subtitle: "IT Infra · Rack 4B", dept: "IT Infra", actor: "Hamid Raza", time: hrs(5) },
  { id: 5, type: "repaired", title: "Canon imageRUNNER repaired", subtitle: "Fuser unit replaced under warranty", dept: "Front Office", actor: "Vendor · Canon SLA", time: hrs(9) },
  { id: 6, type: "assigned", title: "iPhone 14 assigned", subtitle: "to Sana Khan", dept: "Front Office", actor: "Aisha Raza", time: days(1) },
  { id: 7, type: "removed", title: "MacBook Pro 2018 retired", subtitle: "End of lifecycle · 5yr threshold", dept: "Design", actor: "Aisha Raza", time: days(1) },
  { id: 8, type: "faulty", title: "UPS Unit #4 flagged faulty", subtitle: "Battery health below 20%", dept: "IT Infra", actor: "System", time: days(2) },
  { id: 9, type: "transfer", title: "Cisco Switch 24P transferred", subtitle: "IT Infra → New Karachi office", dept: "IT Infra", actor: "Hamid Raza", time: days(2) },
  { id: 10, type: "provisioned", title: "5x ThinkPad E14 provisioned", subtitle: "New hire batch · Engineering", dept: "Engineering", actor: "Aisha Raza", time: days(4) },
  { id: 11, type: "repaired", title: "ThinkPad X1 Carbon repaired", subtitle: "Keyboard replacement", dept: "Engineering", actor: "Vendor · Lenovo SLA", time: days(6) },
  { id: 12, type: "removed", title: "HP LaserJet P1102 disposed", subtitle: "Beyond economical repair", dept: "Front Office", actor: "Aisha Raza", time: days(9) },
];

function relativeTime(iso) {
  const diffMs = now - new Date(iso);
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const d = Math.round(hrs / 24);
  return `${d}d ago`;
}

function dayBucket(iso) {
  const d = new Date(iso);
  const diffDays = Math.floor((now - d) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This week";
  return "Earlier";
}

function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

export default function ActivityLogs() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [focusedSearch, setFocusedSearch] = useState(false);

  const filtered = useMemo(() => {
    return LOGS.filter((l) => {
      const matchesType = typeFilter === "all" || l.type === typeFilter;
      const matchesQuery =
        query.trim() === "" ||
        `${l.title} ${l.subtitle} ${l.dept} ${l.actor}`.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  const grouped = useMemo(() => {
    const buckets = {};
    filtered.forEach((l) => {
      const b = dayBucket(l.time);
      if (!buckets[b]) buckets[b] = [];
      buckets[b].push(l);
    });
    return buckets;
  }, [filtered]);

  const bucketOrder = ["Today", "Yesterday", "This week", "Earlier"].filter((b) => grouped[b]?.length);
  const mostRecentId = LOGS[0]?.id;

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes logRowUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .log-row { animation: logRowUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(18,173,52,0.55); }
          70%  { box-shadow: 0 0 0 7px rgba(18,173,52,0); }
          100% { box-shadow: 0 0 0 0 rgba(18,173,52,0); }
        }
        .live-node { animation: livePulse 1.8s infinite; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[33px] font-bold tracking-tight" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>
            Activity Logs
          </p>
          <div className="flex items-center gap-2 mt-1 select-none">
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[17px] font-bold"
              style={{ backgroundColor: `${ACCENT}18`, color: ACCENT, fontFamily: MONO, fontFeatureSettings: "'tnum'" }}
            >
              {filtered.length}
            </span>
            <span className="text-[13.5px]" style={{ color: SURFACE, opacity: 0.75, fontFamily: FONT_SANS }}>
              events recorded across your fleet
            </span>
          </div>
        </div>

        <button
          className="flex items-center gap-1.5 rounded-xl px-4 h-10 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-95"
          style={{ backgroundColor: ACCENT, color: CREAMt }}
        >
          <Download size={15} strokeWidth={2.5} />
          Export CSV
        </button>
      </div>

      {/* Search + type filters */}
      <div className="flex items-center gap-3 flex-wrap bg-black/[0.01] p-3 rounded-2xl border" style={{ borderColor: BORDER }}>
        <div
          className="flex items-center gap-2 rounded-xl px-3.5 h-10 w-full max-w-xs transition-all duration-200"
          style={{
            backgroundColor: PAGE_BG,
            border: `1.5px solid ${focusedSearch ? ACCENT : BORDER}`,
            boxShadow: focusedSearch ? `0 0 0 4px rgba(201,162,39,0.12)` : "none",
          }}
        >
          <Search size={15} style={{ color: focusedSearch ? ACCENT : MUTED, 
            boxShadow: "none", outline:"none"
           }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocusedSearch(true)}
            onBlur={() => setFocusedSearch(false)}
            placeholder="Search events, devices, people…"
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
            style={{ color: INK, outline:"none" }}
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {TYPE_FILTERS.map((t) => {
            const cfg = TYPE_CONFIG[t];
            const active = typeFilter === t;
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-semibold transition-all duration-150"
                style={{
                  background: active ? (cfg ? `${cfg.tone}1c` : `${ACCENT}1c`) : ACCENT,
                  color: SURFACE,
                  border: `1px solid ${active ? "transparent" : BORDER}`,
                }}
              >
                {cfg && <cfg.icon size={12} />}
                {t === "all" ? "All events" : cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ ...CARD, borderColor: BORDER }}>
        {filtered.length === 0 && (
          <div className="px-6 py-14 text-center text-sm font-medium" style={{ color: MUTED }}>
            No activity matches your current filters.
          </div>
        )}

        <div className="px-6 py-5">
          {bucketOrder.map((bucket, bIdx) => (
            <div key={bucket} className={bIdx > 0 ? "mt-6" : ""}>
              <div
                className="sticky top-0 z-10 flex items-center gap-2 py-2 mb-1"
                style={{ background: "#fcfae9" }}
              >
                <span
                  className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                  style={{ background: PAGE_BG, color: ACCENT, fontFamily: MONO }}
                >
                  {bucket}
                </span>
                <div className="flex-1 h-px" style={{ background: BORDER }} />
              </div>

              <div className="relative pl-1">
                {/* connecting timeline rail */}
                <div className="absolute left-[19px] top-2 bottom-2 w-px" style={{ background: CREAMt }} />

                {grouped[bucket].map((log, idx) => {
                  const cfg = TYPE_CONFIG[log.type];
                  const isLatest = log.id === mostRecentId;

                  return (
                    <div
                      key={log.id}
                      className="log-row relative flex items-start gap-3.5 py-3 pl-0.5"
                      style={{ animationDelay: `${idx * 20}ms` }}
                    >
                      <div
                        className={`relative z-10 flex items-center justify-center rounded-full shrink-0 ${isLatest ? "live-node" : ""}`}
                        style={{
                          width: 38,
                          height: 38,
                          background: SURFACE,
                          border: `2px solid ${cfg.tone}`,
                        }}
                      >
                        <cfg.icon size={15} color={cfg.tone} />
                      </div>

                      <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[13.5px] font-bold" style={{ color: INK, fontFamily: FONT_SANS }}>
                              {log.title}
                            </p>
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${cfg.tone}1c`, color: cfg.tone, fontFamily: MONO }}
                            >
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-[12.5px] mt-0.5" style={{ color: MUTED, opacity: 0.75 }}>
                            {log.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className="flex items-center justify-center rounded-full text-[9px] font-bold"
                              style={{ width: 18, height: 18, background: `${ACCENT}22`, color: ACCENT }}
                            >
                              {initials(log.actor)}
                            </div>
                            <span className="text-[11px] font-medium" style={{ color: MUTED, opacity: 0.65 }}>
                              {log.actor}
                            </span>
                            <span style={{ color: BORDER }}>·</span>
                            <span className="text-[11px] font-medium" style={{ color: MUTED, opacity: 0.5 }}>
                              {log.dept}
                            </span>
                          </div>
                        </div>

                        <span
                          className="text-[11px] font-semibold whitespace-nowrap shrink-0 pt-0.5"
                          style={{ color: MUTED, opacity: 0.5, fontFamily: MONO }}
                        >
                          {relativeTime(log.time)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filtered.length > 0 && (
          <button
            className="w-full py-3.5 text-[12.5px] font-semibold flex items-center justify-center gap-1.5 transition-colors duration-150 hover:bg-black/[0.02]"
            style={{ color: ACCENT, borderTop: `1px solid ${BORDER}` }}
          >
            Load older events
            <ChevronDown size={13} />
          </button>
        )}
      </div>
    </div>
  );
}