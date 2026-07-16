import React, { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  MapPin,
  Layers,
  DoorOpen,
  Building2,
  ArrowUpRight,
  LayoutGrid,
  Rows3,
  ChevronDown,
  Waypoints,
} from "lucide-react";
import {
  INK,
  MUTED,
  BORDER,
  BRAND,
  CARD,
  PAGE_BG,
  ACCENT,
  BRAND_SOFT,
  CREAM,
  CREAMt,
  SURFACE,
  SUCCESS,
  MONO,
  FONT_DISPLAY,
  FONT_SANS,
} from "../theme";
import { DEPARTMENT_TREE } from "../data";
import RowActionsMenu from "../components/departments/RowActionsMenu";
import ViewDepartmentModal from "../components/departments/ViewDepartmentModal";
import EditDepartmentModal from "../components/departments/EditDepartmentModal";
import ManageStructureModal from "../components/departments/ManageStructureModal";
import DepartmentDiagram from "../components/departments/DepartmentDiagram";
import DeleteDepartmentModal from "../components/departments/DeleteDepartmentModal";
import NewDepartmentModal from "../components/departments/NewDepartmentModal";

const countSections = (dep) => dep.locations.reduce((n, l) => n + l.sections.length, 0);
const countRooms = (dep) =>
  dep.locations.reduce(
    (n, l) => n + l.sections.reduce((m, s) => m + s.rooms.length + s.cabins.length, 0),
    0
  );

const TILE_TONES = [ACCENT, CREAM, SUCCESS];

function initialsOf(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function MiniStat({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex-1 rounded-xl p-3" style={{ background: PAGE_BG, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center justify-center rounded-lg mb-2" style={{ width: 26, height: 26, background: `${tone}1c` }}>
        <Icon size={13} color={tone} />
      </div>
      <p className="text-[19px] font-bold leading-none" style={{ fontFamily: FONT_DISPLAY, color: INK, fontFeatureSettings: "'tnum'" }}>
        {value}
      </p>
      <p className="text-[10.5px] mt-1 leading-none" style={{ color: MUTED, opacity: 0.6, fontFamily: FONT_SANS }}>
        {label}
      </p>
    </div>
  );
}

function FootprintBar({ locationCount, sectionCount, roomCount, tone }) {
  const maxVal = Math.max(locationCount, sectionCount, roomCount, 1);
  return (
    <div className="flex items-end gap-1.5 h-8 px-0.5">
      {[
        ["L", locationCount],
        ["S", sectionCount],
        ["R", roomCount],
      ].map(([label, val]) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm transition-all duration-500"
            style={{ height: `${Math.max(6, (val / maxVal) * 24)}px`, background: `${tone}55` }}
          />
          <span style={{ fontFamily: MONO, fontSize: 9, color: MUTED, opacity: 0.45 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function InlineBar({ value, max, tone }) {
  const pct = Math.max(6, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: BORDER }}>
      <div style={{ width: `${pct}%`, height: "100%", background: tone, transition: "width 400ms ease" }} />
    </div>
  );
}

export default function Departments() {
  const [departments, setDepartments] = useState(DEPARTMENT_TREE);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [view, setView] = useState("grid");
  const [expandedId, setExpandedId] = useState(null);

  const handleAction = (action, department) => setActiveModal({ type: action, department });
  const closeModal = () => setActiveModal(null);

  const updateDepartment = (updated) => {
    setDepartments((list) => list.map((d) => (d.id === updated.id ? updated : d)));
  };

  const addDepartment = (dep) => setDepartments((list) => [...list, dep]);

  const removeDepartment = (department) => {
    setDepartments((list) => list.filter((d) => d.id !== department.id));
  };

  const maxRooms = Math.max(...departments.map(countRooms), 1);

  return (
    <div className="space-y-5">
      <style>{`
        @keyframes deptCardUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dept-card, .dept-row { animation: deptCardUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 400px; }
        }
        .dept-expand { animation: expandDown 0.25s ease forwards; overflow: hidden; }
      `}</style>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[33px] font-semibold" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>
            Departments
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[15px] font-bold"
              style={{ backgroundColor: `${BRAND}18`, color: ACCENT, fontFamily: MONO, fontFeatureSettings: "'tnum'" }}
            >
              {departments.length}
            </span>
            <p className="text-[13.5px]" style={{ color: CREAMt, opacity: 0.75, fontFamily: FONT_SANS }}>
              departments configured
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl p-1" style={{ background: "rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setView("grid")}
              title="Grid view"
              className="p-1.5 rounded-lg transition-all duration-150"
              style={{ background: view === "grid" ? ACCENT : "transparent" }}
            >
              <LayoutGrid size={15} color={CREAMt} style={{ opacity: view === "grid" ? 1 : 0.55 }} />
            </button>
            <button
              onClick={() => setView("table")}
              title="Table view"
              className="p-1.5 rounded-lg transition-all duration-150"
              style={{ background: view === "table" ? ACCENT : "transparent" }}
            >
              <Rows3 size={15} color={CREAMt} style={{ opacity: view === "table" ? 1 : 0.55 }} />
            </button>
          </div>

          <button
            onClick={() => setActiveModal({ type: "new", department: null })}
            className="flex items-center gap-1.5 rounded-xl px-4 h-10 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-95"
            style={{ backgroundColor: ACCENT, color: CREAMt }}
          >
            <Plus size={16} strokeWidth={2.5} />
            New Department
          </button>
        </div>
      </div>

      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dep, idx) => {
            const isHovered = hoveredId === dep.id;
            const isMenuOpen = openMenuId === dep.id;
            const tone = TILE_TONES[idx % TILE_TONES.length];
            const roomCount = countRooms(dep);
            const sectionCount = countSections(dep);
            const locationCount = dep.locations.length;

            return (
              <div
                key={dep.id}
                className="dept-card rounded-2xl p-5 relative cursor-pointer transition-all duration-200"
                style={{
                  ...CARD,
                  borderLeft: `3px solid ${isHovered ? tone : "transparent"}`,
                  boxShadow: isHovered ? "0 14px 32px -16px rgba(0,0,0,0.28)" : CARD.boxShadow,
                  animationDelay: `${idx * 30}ms`,
                }}
                onMouseEnter={() => setHoveredId(dep.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleAction("diagram", dep)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300"
                      style={{ width: 42, height: 42, background: `${tone}1c`, transform: isHovered ? "scale(1.06)" : "scale(1)" }}
                    >
                      <Building2 size={19} color={tone} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[16px] font-bold truncate" style={{ color: isHovered ? tone : INK, fontFamily: FONT_DISPLAY }}>
                          {dep.name}
                        </p>
                        <ArrowUpRight size={13} style={{ color: MUTED, opacity: isHovered ? 1 : 0.3, transition: "opacity 150ms ease" }} />
                      </div>
                      <p className="text-[11px] font-medium tracking-wide uppercase" style={{ color: MUTED, opacity: 0.5, fontFamily: MONO }}>
                        Dept #{initialsOf(dep.name)}-{String(idx + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(isMenuOpen ? null : dep.id);
                      }}
                      style={{ color: isMenuOpen ? tone : MUTED }}
                      className="p-1.5 rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-90"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {isMenuOpen && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <RowActionsMenu department={dep} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <MiniStat icon={MapPin} label="Locations" value={locationCount} tone={tone} />
                  <MiniStat icon={Layers} label="Sections" value={sectionCount} tone={tone} />
                  <MiniStat icon={DoorOpen} label="Rooms/Cabins" value={roomCount} tone={tone} />
                </div>

                <FootprintBar locationCount={locationCount} sectionCount={sectionCount} roomCount={roomCount} tone={tone} />
              </div>
            );
          })}
        </div>
      )}

      {view === "table" && (
        <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ ...CARD, borderColor: BORDER }}>
          <div
            className="grid px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider select-none bg-black/[0.01]"
            style={{ gridTemplateColumns: "2.2fr 0.9fr 0.9fr 0.9fr 1.4fr 40px 32px", color: MUTED, borderBottom: `1.5px solid ${BORDER}` }}
          >
            <span>Department</span>
            <span>Locations</span>
            <span>Sections</span>
            <span>Rooms/Cabins</span>
            <span>Footprint</span>
            <span />
            <span />
          </div>

          <div className="divide-y" style={{ borderColor: BORDER }}>
            {departments.map((dep, idx) => {
              const isMenuOpen = openMenuId === dep.id;
              const isExpanded = expandedId === dep.id;
              const tone = TILE_TONES[idx % TILE_TONES.length];
              const roomCount = countRooms(dep);
              const sectionCount = countSections(dep);
              const locationCount = dep.locations.length;

              return (
                <div key={dep.id}>
                  <div
                    className="dept-row grid items-center px-6 py-3.5 cursor-pointer transition-all duration-150"
                    style={{
                      gridTemplateColumns: "2.2fr 0.9fr 0.9fr 0.9fr 1.4fr 40px 32px",
                      backgroundColor: isExpanded ? PAGE_BG : "transparent",
                      animationDelay: `${idx * 25}ms`,
                    }}
                    onClick={() => setExpandedId(isExpanded ? null : dep.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 32, height: 32, background: `${tone}1c` }}>
                        <Building2 size={15} color={tone} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-bold truncate" style={{ color: INK, fontFamily: FONT_SANS }}>{dep.name}</p>
                        <p className="text-[10.5px] font-medium tracking-wide uppercase" style={{ color: MUTED, opacity: 0.5, fontFamily: MONO }}>
                          Dept #{initialsOf(dep.name)}-{String(idx + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                    <span className="text-[13px] font-semibold" style={{ color: INK, fontFamily: MONO }}>{locationCount}</span>
                    <span className="text-[13px] font-semibold" style={{ color: INK, fontFamily: MONO }}>{sectionCount}</span>
                    <span className="text-[13px] font-semibold" style={{ color: INK, fontFamily: MONO }}>{roomCount}</span>

                    <div className="pr-4">
                      <InlineBar value={roomCount} max={maxRooms} tone={tone} />
                    </div>

                    <div className="relative justify-self-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(isMenuOpen ? null : dep.id);
                        }}
                        style={{ color: isMenuOpen ? tone : MUTED }}
                        className="p-1.5 rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-90"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {isMenuOpen && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <RowActionsMenu department={dep} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                        </div>
                      )}
                    </div>

                    <ChevronDown
                      size={16}
                      style={{ color: MUTED, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}
                      className="justify-self-end"
                    />
                  </div>

                  {isExpanded && (
                    <div className="dept-expand px-6 pb-4" style={{ background: PAGE_BG }}>
                      <div className="flex items-center justify-between pt-1 pb-3">
                        <p className="text-[11.5px] font-semibold uppercase tracking-wide" style={{ color: MUTED, opacity: 0.6, fontFamily: MONO }}>
                          Location breakdown
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("diagram", dep);
                          }}
                          className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                          style={{ background: `${tone}1c`, color: tone }}
                        >
                          <Waypoints size={13} />
                          View full diagram
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {dep.locations.map((loc) => (
                          <div key={loc.id || loc.name} className="rounded-xl p-3" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                            <p className="text-[12.5px] font-bold truncate mb-1.5" style={{ color: INK }}>{loc.name}</p>
                            <div className="flex items-center gap-3 text-[11px]" style={{ color: MUTED }}>
                              <span className="flex items-center gap-1"><Layers size={11} />{loc.sections.length} sections</span>
                              <span className="flex items-center gap-1">
                                <DoorOpen size={11} />
                                {loc.sections.reduce((n, s) => n + s.rooms.length + s.cabins.length, 0)} rooms
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeModal?.type === "view" && (
        <ViewDepartmentModal department={activeModal.department} onClose={closeModal} />
      )}

      {activeModal?.type === "edit" && (
        <EditDepartmentModal department={activeModal.department} onClose={closeModal} onSave={updateDepartment} />
      )}

      {activeModal?.type === "structure" && (
        <ManageStructureModal department={activeModal.department} onClose={closeModal} onSave={updateDepartment} />
      )}

      {activeModal?.type === "diagram" && (
        <DepartmentDiagram department={activeModal.department} onClose={closeModal} />
      )}

      {activeModal?.type === "new" && (
        <NewDepartmentModal onClose={closeModal} onCreate={addDepartment} />
      )}

      {activeModal?.type === "delete" && (
        <DeleteDepartmentModal department={activeModal.department} onClose={closeModal} onConfirm={removeDepartment} />
      )}
    </div>
  );
}