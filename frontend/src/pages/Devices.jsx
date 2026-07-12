import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreHorizontal, ExternalLink } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, MONO } from "../theme";
import { DEVICES } from "..//data";
import StatusBadge from "../components/devices/StatusBadge";
import RowActionsMenu from "../components/devices/RowActionMenu";

const FILTERS = ["All", "In-use", "Spare", "Faulty", "Dispatched", "Retired"];

export default function Devices() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAction = (action, device) => {
    
    console.log(action, device.id);
  };

  const rows = DEVICES.filter((d) => {
    const matchesFilter = filter === "All" || d.status === filter.toLowerCase();
    const matchesQuery =
      query.trim() === "" ||
      `${d.manufacturer} ${d.model} ${d.id} ${d.dept}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Devices</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>
            {DEVICES.length} assets tracked
          </p>
        </div>
        <Link
          to="/devices/new"
          className="flex items-center gap-1.5 rounded-lg px-3.5 h-9 text-sm font-medium transition-opacity duration-150 hover:opacity-90"
          style={{ backgroundColor: BRAND, color: "#FFFCDC" }}
        >
          <Plus size={15} strokeWidth={2.5} />
          New Device
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 rounded-lg px-3 h-9 w-full max-w-xs"
          style={{ backgroundColor: PAGE_BG, border: `1px solid ${BORDER}` }}
        >
          <Search size={15} style={{ color: MUTED }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search devices…"
            className="bg-transparent border-none outline-none text-sm w-full"
            style={{ color: INK }}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-[12.5px] font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
              style={{
                backgroundColor: filter === f ? BRAND : "#FFFFFF",
                color: filter === f ? "#FFFCDC" : MUTED,
                border: `1px solid ${filter === f ? BRAND : BORDER}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl" style={CARD}>
        <div
          className="grid px-5 py-3 text-[11px] font-semibold uppercase tracking-wide"
          style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1.2fr 1fr 40px", color: MUTED, borderBottom: `1px solid ${BORDER}` }}
        >
          <span>Device</span>
          <span>Status</span>
          <span>Department</span>
          <span>Assigned To</span>
          <span>Updated</span>
          <span />
        </div>

        {rows.length === 0 && (
          <div className="px-5 py-10 text-center text-sm" style={{ color: MUTED }}>
            No devices match this search or filter.
          </div>
        )}

        {rows.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.id}
              className="grid items-center px-5 py-3 transition-colors duration-150"
              style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1.2fr 1fr 40px", borderBottom: `1px solid ${BORDER}` }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 36, height: 36, backgroundColor: BRAND }}>
                  <Icon size={16} color="#FFFCDC" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium truncate" style={{ color: INK }}>
                      {d.manufacturer} {d.model}
                    </p>
                    <ExternalLink size={12} style={{ color: MUTED }} />
                  </div>
                  <p className="text-[11.5px]" style={{ color: MUTED, fontFamily: MONO }}>{d.id}</p>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <StatusBadge status={d.status} />
              </div>

              <p className="text-[13px] truncate" style={{ color: INK }}>{d.dept}</p>

              <p className="text-[13px] truncate" style={{ color: d.shared ? ACCENT : INK, fontWeight: d.shared ? 500 : 400 }}>
                {d.assignedTo}
              </p>

              <p className="text-[12.5px]" style={{ color: MUTED, fontFamily: MONO }}>{d.updated}</p>

              <div className="relative justify-self-end">
                <button
                  onClick={() => setOpenMenuId(openMenuId === d.id ? null : d.id)}
                  style={{ color: MUTED }}
                  className="p-1 rounded"
                >
                  <MoreHorizontal size={16} />
                </button>
                {openMenuId === d.id && (
                  <RowActionsMenu device={d} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}