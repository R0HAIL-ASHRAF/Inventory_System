import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreHorizontal, ExternalLink, HelpCircle, Download } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, MONO, SURFACE, CREAMt } from "../theme";
import { DEVICES, DEPARTMENTS } from "../data";
import StatusBadge from "../components/devices/StatusBadge";
import RowActionsMenu from "../components/devices/RowActionMenu";
import ViewDeviceModal from "../components/devices/ViewDeviceModal";
import EditDeviceModal from "../components/devices/EditDeviceModal";
import TransferDepartmentModal from "../components/devices/TransferDepatModal";
import MarkFaultyModal from "../components/devices/MarkFaultyModal";
import DeleteDeviceModal from "../components/devices/DeleteDeviceModal";
import { useTour } from "../components/tour/Tour";
import { devicesTourSteps } from "../components/tour/TourSteps";
import Pagination from "../components/common/Pagination";

const STATUS_FILTERS = ["All", "In-use", "Spare", "Faulty", "Dispatched", "Retired"];
const PAGE_SIZE = 8;

export default function Devices() {
  const [devices, setDevices] = useState(DEVICES);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // { type, device }
  const [focusedSearch, setFocusedSearch] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [page, setPage] = useState(1);
  const { startTour, hasSeenTour } = useTour();

  const categories = ["All", ...Array.from(new Set(devices.map((d) => d.type)))];

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

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter, categoryFilter, deptFilter]);

  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const pagedRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (!hasSeenTour("devices")) {
      const t = setTimeout(() => startTour("devices", devicesTourSteps), 600);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes pageItemUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-table-row { 
          animation: pageItemUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>

      {/* Header Block */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[33px] font-bold tracking-tight" style={{ color: ACCENT }}>Devices</p>

          <div className="flex items-center gap-2 mt-1 select-none" data-tour="devices-count">
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[23px] font-bold tracking-wide"
              style={{ backgroundColor: `${BRAND}18`, color: ACCENT, fontFamily: MONO, fontFeatureSettings: "'tnum'" }}
            >
              {devices.length}
            </span>
            <span className="text-[17px] font-semibold tracking-tight" style={{ color: ACCENT }}>
              active corporate assets cataloged
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => startTour("devices", devicesTourSteps)}
            className="p-2 rounded-lg hover:bg-black/5"
            title="Take a tour"
          >
            <HelpCircle size={23} style={{ color: ACCENT }} />
          </button>

          <Link
            to="/devices/new"
            data-tour="devices-new"
            className="flex items-center gap-1.5 rounded-xl px-4 h-10 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-95"
            style={{ backgroundColor: ACCENT, color: "#FFFCDC" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Export CSV
          </Link>
          <button
            type="button"
            onClick={() => {}}
            className="flex items-center gap-1.5 rounded-xl px-4 h-10 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-95"
            style={{ border: `1px solid ${BORDER}`, color: SURFACE, backgroundColor: ACCENT }}
          >
            <Download size={16} strokeWidth={2.5} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap bg-black/[0.01] p-3 rounded-2xl border" style={{ borderColor: BORDER }}>

        <div
          data-tour="devices-search"
          className="flex items-center gap-2 rounded-xl px-3.5 h-10 w-full max-w-xs transition-all duration-200"
          style={{
            backgroundColor: PAGE_BG,
            border: `1.5px solid ${focusedSearch ? ACCENT : BORDER}`,
            boxShadow: focusedSearch ? `0 0 0 4px rgba(201,162,39,0.12)` : "none"
          }}
        >
          <Search size={15} style={{ color: focusedSearch ? ACCENT : MUTED }} className="transition-colors duration-150" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocusedSearch(true)}
            onBlur={() => setFocusedSearch(false)}
            placeholder="Search assets…"
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
            style={{ color: INK, outline: "none", boxShadow: "none" }}
          />
        </div>

        {/* Filters group — wrapped so the tour can target all three as one step */}
        <div className="flex items-center gap-3" data-tour="devices-filters">
          {/* Categories Dropdown List */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-[12.5px] font-semibold px-3 h-10 rounded-xl outline-none cursor-pointer border transition-all hover:bg-slate-50/50"
            style={{ backgroundColor: CREAMt, color: INK, borderColor: BORDER }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>

          {/* Departments Dropdown List */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-[12.5px] font-semibold px-3 h-10 rounded-xl outline-none cursor-pointer border transition-all hover:bg-slate-50/50"
            style={{ backgroundColor: CREAMt, color: INK, borderColor: BORDER }}
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>

          {/* Unified Status Dropdown List */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-[12.5px] font-semibold px-3 h-10 rounded-xl outline-none cursor-pointer border transition-all hover:bg-slate-50/50"
            style={{ backgroundColor: CREAMt, color: INK, borderColor: BORDER }}
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f} value={f}>{f === "All" ? "All Statuses" : f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Assets Grid Table Container */}
      <div className="rounded-2xl border overflow-hidden transition-shadow duration-300 shadow-sm" style={{ ...CARD, borderColor: BORDER }}>
        {/* Table Column Headers */}
        <div
          className="grid px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider select-none bg-black/[0.01]"
          style={{
            gridTemplateColumns: "2.4fr 1.1fr 1.2fr 1.3fr 1.1fr 40px",
            color: MUTED,
            borderBottom: `1.5px solid ${BORDER}`
          }}
        >
          <span>Device Details</span>
          <span>Status</span>
          <span>Department</span>
          <span>Assigned Account</span>
          <span>Last Updated</span>
          <span />
        </div>

        {/* Empty States Handling Layer */}
        {rows.length === 0 && (
          <div className="px-6 py-14 text-center text-sm font-medium animate-table-row" style={{ color: MUTED }}>
            No registered assets match your chosen filters.
          </div>
        )}

        {/* Data Rows Iterator — renders only the current page's slice */}
        <div className="divide-y" style={{ borderColor: BORDER }}>
          {pagedRows.map((d, idx) => {
            const Icon = d.icon;
            const isHovered = hoveredRowId === d.id;
            const isMenuOpen = openMenuId === d.id;

            return (
              <div
                key={d.id}
                className="grid items-center px-6 py-3.5 transition-all duration-200 ease-out animate-table-row opacity-0"
                onMouseEnter={() => setHoveredRowId(d.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                style={{
                  gridTemplateColumns: "2.4fr 1.1fr 1.2fr 1.3fr 1.1fr 40px",
                  transform: isHovered ? "translateX(4px)" : "translateX(0px)",
                  animationDelay: `${idx * 25}ms`,
                  position: "relative",
                  zIndex: isMenuOpen ? 40 : isHovered ? 10 : 1
                }}
              >
                {/* Identification Frame */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0 transition-all duration-300"
                    style={{
                      width: 38,
                      height: 38,
                      backgroundColor: BRAND,
                      transform: isHovered ? "scale(1.06)" : "scale(1)"
                    }}
                  >
                    <Icon size={16} color="#1d522a" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[13.5px] font-bold truncate transition-colors duration-150" style={{ color: isHovered ? ACCENT : INK }}>
                        {d.manufacturer} {d.model}
                      </p>
                      <ExternalLink
                        size={12}
                        className="transition-all duration-200"
                        style={{
                          color: MUTED,
                          opacity: isHovered ? 1 : 0.3,
                          transform: isHovered ? "translate(1px, -1px)" : "none"
                        }}
                      />
                    </div>
                    <p className="text-[11px] font-medium tracking-wide" style={{ color: MUTED, fontFamily: MONO }}>
                      {d.id} <span className="opacity-40">·</span> {d.type}
                    </p>
                  </div>
                </div>

                {/* Status Indicator Cell */}
                <div className="flex flex-col items-start">
                  <StatusBadge status={d.status} />
                </div>

                {/* Department String Cell */}
                <p className="text-[13px] font-semibold truncate" style={{ color: INK }}>{d.dept}</p>

                {/* Assignment Target Field */}
                <p className="text-[13px] font-medium truncate transition-all" style={{ color: d.shared ? ACCENT : INK, fontWeight: d.shared ? 600 : 500 }}>
                  {d.assignedTo || "Unassigned"}
                </p>

                {/* Chronology / Metric Time Field */}
                <p className="text-[12px] font-semibold" style={{ color: MUTED, fontFamily: MONO }}>{d.updated}</p>

                {/* Context Menu Dropdown Anchor Row Layer */}
                <div className="relative justify-self-end">
                  <button
                    {...(idx === 0 ? { "data-tour": "devices-row-menu" } : {})}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(isMenuOpen ? null : d.id);
                    }}
                    style={{ color: isMenuOpen ? ACCENT : MUTED }}
                    className="p-1.5 rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-90"
                  >
                    <MoreHorizontal size={16} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 z-50">
                      <RowActionsMenu device={d} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination — client-side for now (see PAGE_SIZE); swap totalItems/pagedRows
            for a real API response later without touching Pagination itself */}
        {rows.length > 0 && (
          <div className="px-6 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Modals Injections Core Mounts System */}
      {activeModal?.type === "view" && <ViewDeviceModal device={activeModal.device} onClose={closeModal} />}
      {activeModal?.type === "edit" && <EditDeviceModal device={activeModal.device} onClose={closeModal} onSave={updateDevice} />}
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
      {activeModal?.type === "delete" && <DeleteDeviceModal device={activeModal.device} onClose={closeModal} onConfirm={removeDevice} />}
    </div>
  );
}