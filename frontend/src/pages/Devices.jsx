import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreHorizontal, ExternalLink } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, MONO } from "../theme";
import { DEVICES, DEPARTMENTS } from "../data";
import StatusBadge from "../components/devices/StatusBadge";
import RowActionsMenu from "../components/devices/RowActionMenu";
import ViewDeviceModal from "../components/devices/ViewDeviceModal";
import EditDeviceModal from "../components/devices/EditDeviceModal";
import TransferDepartmentModal from "../components/devices/TransferDepatModal";
import MarkFaultyModal from "../components/devices/MarkFaultyModal";
import DeleteDeviceModal from "../components/devices/DeleteDeviceModal";

const STATUS_FILTERS = ["All", "In-use", "Spare", "Faulty", "Dispatched", "Retired"];

export default function Devices() {
  const [devices, setDevices] = useState(DEVICES);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // { type, device }

  const categories = ["All", ...Array.from(new Set(devices.map((d) => d.type)))];

  // Every device supports the same five actions now — no more shared/personal split.
  const handleAction = (action, device) => setActiveModal({ type: action, device });

  const closeModal = () => setActiveModal(null);

  const updateDevice = (updated) => {
    setDevices((list) => list.map((d) => (d.id === updated.id ? updated : d)));
  };

  const removeDevice = (device) => {
    setDevices((list) => list.filter((d) => d.id !== device.id));
  };

  const rows = devices.filter((d) => {
    const matchesStatus = statusFilter === "All" || d.status === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "All" || d.type === categoryFilter;
    const matchesDept = deptFilter === "All" || d.dept === deptFilter;
    const matchesQuery =
      query.trim() === "" ||
      `${d.manufacturer} ${d.model} ${d.id} ${d.dept} ${d.type}`.toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesCategory && matchesDept && matchesQuery;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Devices</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>
            {devices.length} assets tracked
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

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-[12.5px] font-medium px-3 h-9 rounded-lg outline-none"
          style={{ backgroundColor: "#FFFFFF", color: INK, border: `1px solid ${BORDER}` }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>
          ))}
        </select>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="text-[12.5px] font-medium px-3 h-9 rounded-lg outline-none"
          style={{ backgroundColor: "#FFFFFF", color: INK, border: `1px solid ${BORDER}` }}
        >
          <option value="All">All departments</option>
          {DEPARTMENTS.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className="text-[12.5px] font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
              style={{
                backgroundColor: statusFilter === f ? BRAND : "#FFFFFF",
                color: statusFilter === f ? "#FFFCDC" : MUTED,
                border: `1px solid ${statusFilter === f ? BRAND : BORDER}`,
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
                  <p className="text-[11.5px]" style={{ color: MUTED, fontFamily: MONO }}>{d.id} · {d.type}</p>
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

      {activeModal?.type === "view" && <ViewDeviceModal device={activeModal.device} onClose={closeModal} />}

      {activeModal?.type === "edit" && (
        <EditDeviceModal device={activeModal.device} onClose={closeModal} onSave={updateDevice} />
      )}

      {activeModal?.type === "transfer" && (
        <TransferDepartmentModal
          device={activeModal.device}
          onClose={closeModal}
          onTransfer={(t) => updateDevice({ ...activeModal.device, dept: t.new_department })}
        />
      )}

      {activeModal?.type === "flag-faulty" && (
        <MarkFaultyModal
          device={activeModal.device}
          onClose={closeModal}
          onConfirm={() => updateDevice({ ...activeModal.device, status: "faulty" })}
        />
      )}

      {activeModal?.type === "delete" && (
        <DeleteDeviceModal device={activeModal.device} onClose={closeModal} onConfirm={removeDevice} />
      )}
    </div>
  );
}