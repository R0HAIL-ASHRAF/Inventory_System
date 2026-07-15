import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreHorizontal, HelpCircle, Download } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, FONT_DISPLAY, SURFACE, CREAMt, MONO } from "../theme";
import { EMPLOYEES, DEPARTMENTS } from "../data";
import RowActionsMenu from "../components/employees/RowActionsMenu";
import ViewEmployeeModal from "../components/employees/ViewEmployeeModal";
import EditEmployeeModal from "../components/employees/EditEmployeeModal";
import TransferPlacementModal from "../components/employees/TransferPlacementModal";
import DeleteEmployeeModal from "../components/employees/DeleteEmployeeModal";
import { useTour } from "../components/tour/Tour";
import { employeeTourSteps } from "../components/tour/TourSteps";

const initials = (e) => `${e.name.first[0]}${e.name.last[0]}`.toUpperCase();

export default function Employees() {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // { type, employee }
  const [focusedSearch, setFocusedSearch] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const { startTour, hasSeenTour } = useTour();

  const handleAction = (action, employee) => setActiveModal({ type: action, employee });
  const closeModal = () => setActiveModal(null);

  const updateEmployee = (updated) => {
    setEmployees((list) => list.map((e) => (e.id === updated.id ? updated : e)));
  };

  const removeEmployee = (employee) => {
    setEmployees((list) => list.filter((e) => e.id !== employee.id));
  };

  const rows = employees.filter((e) => {
    const matchesDept = deptFilter === "All" || e.department === deptFilter;
    const matchesQuery =
      query.trim() === "" ||
      `${e.name.first} ${e.name.last} ${e.id} ${e.designation} ${e.department}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return matchesDept && matchesQuery;
  });

  useEffect(() => {
    if (!hasSeenTour("employees")) {
      const t = setTimeout(() => startTour("employees", employeeTourSteps), 600);
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
          <p className="text-[33px] font-bold tracking-tight" style={{ color: "#FFFFFF" }}>Employees</p>

          <div className="flex items-center gap-2 mt-1 select-none" data-tour="employees-count">
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[23px] font-bold tracking-wide"
              style={{ backgroundColor: `${BRAND}18`, color: ACCENT, fontFamily: FONT_DISPLAY, fontFeatureSettings: "'tnum'" }}
            >
              {employees.length}
            </span>
            <span className="text-[17px] font-semibold tracking-tight" style={{ color: ACCENT }}>
              people on record
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => startTour("employees", employeeTourSteps)}
            className="p-2 rounded-lg hover:bg-black/5"
            title="Take a tour"
          >
            <HelpCircle size={33} style={{ color: ACCENT }} />
          </button>

          <Link
            to="/employees/new"
            data-tour="employees-new"
            className="flex items-center gap-1.5 rounded-xl px-4 h-10 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-95"
            style={{ backgroundColor: ACCENT, color: "#FFFCDC" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            New Employee
          </Link>
           <Link
            to=""
            data-tour="devices-new"
            className="flex items-center gap-1.5 rounded-xl px-4 h-10 text-sm font-semibold transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-95"
            style={{ backgroundColor: ACCENT, color: "#FFFCDC" }}
          >
            <Download size={16} strokeWidth={2.5} />
            Import CSV
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap bg-black/[0.01] p-3 rounded-2xl border" style={{ borderColor: BORDER }}>

        <div
          data-tour="employees-search"
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
            placeholder="Search employees…"
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
            style={{ color: INK, outline: "none", boxShadow: "none" }}
          />
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          data-tour="employees-filter"
          className="text-[12.5px] font-semibold px-3 h-10 rounded-xl outline-none cursor-pointer border transition-all hover:bg-slate-50/50"
          style={{ backgroundColor: CREAMt, color: INK, borderColor: BORDER }}
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border overflow-hidden transition-shadow duration-300 shadow-sm" style={{ ...CARD, borderColor: BORDER }}>
        <div
          className="grid px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider select-none bg-black/[0.01]"
          style={{
            gridTemplateColumns: "2.2fr 1.3fr 1fr 1.3fr 40px",
            color: MUTED,
            borderBottom: `1.5px solid ${BORDER}`
          }}
        >
          <span>Employee</span>
          <span>Designation</span>
          <span>Department</span>
          <span>Placement</span>
          <span />
        </div>

        {rows.length === 0 && (
          <div className="px-6 py-14 text-center text-sm font-medium animate-table-row" style={{ color: MUTED }}>
            No registered employees match your chosen filters.
          </div>
        )}

        <div className="divide-y" style={{ borderColor: BORDER }}>
          {rows.map((e, idx) => {
            const isHovered = hoveredRowId === e.id;
            const isMenuOpen = openMenuId === e.id;

            return (
              <div
                key={e.id}
                className="grid items-center px-6 py-3.5 transition-all duration-200 ease-out animate-table-row opacity-0"
                onMouseEnter={() => setHoveredRowId(e.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                style={{
                  gridTemplateColumns: "2.2fr 1.3fr 1fr 1.3fr 40px",
                  backgroundColor: isHovered || isMenuOpen ? CREAMt : "transparent",
                  transform: isHovered ? "translateX(4px)" : "translateX(0px)",
                  animationDelay: `${idx * 25}ms`,
                  position: "relative",
                  zIndex: isMenuOpen ? 40 : isHovered ? 10 : 1
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 text-[12px] font-semibold transition-all duration-300"
                    style={{
                      width: 34,
                      height: 34,
                      backgroundColor: ACCENT,
                      color: "#FFFCDC",
                      transform: isHovered ? "scale(1.06)" : "scale(1)"
                    }}
                  >
                    {initials(e)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-bold truncate transition-colors duration-150" style={{ color: isHovered ? ACCENT : INK }}>
                      {e.name.first} {e.name.last}
                    </p>
                    <p className="text-[11px] font-medium tracking-wide" style={{ color: MUTED, fontFamily: MONO }}>
                      {e.id}
                    </p>
                  </div>
                </div>

                <p className="text-[13px] font-semibold truncate" style={{ color: INK }}>{e.designation}</p>

                <p className="text-[13px] font-semibold truncate" style={{ color: INK }}>{e.department}</p>

                <p className="text-[12.5px] font-semibold truncate" style={{ color: MUTED }}>
                  {[e.section, e.room || e.cabin].filter(Boolean).join(" · ") || "—"}
                </p>

                <div className="relative justify-self-end">
                  <button
                    {...(idx === 0 ? { "data-tour": "employees-row-menu" } : {})}
                    onClick={(eEvent) => {
                      eEvent.stopPropagation();
                      setOpenMenuId(isMenuOpen ? null : e.id);
                    }}
                    style={{ color: isMenuOpen ? ACCENT : MUTED }}
                    className="p-1.5 rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-90"
                  >
                    <MoreHorizontal size={16} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 z-50">
                      <RowActionsMenu employee={e} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeModal?.type === "view" && (
        <ViewEmployeeModal employee={activeModal.employee} onClose={closeModal} />
      )}
      {activeModal?.type === "edit" && (
        <EditEmployeeModal employee={activeModal.employee} onClose={closeModal} onSave={updateEmployee} />
      )}
      {activeModal?.type === "transfer" && (
        <TransferPlacementModal
          employee={activeModal.employee}
          onClose={closeModal}
          onTransfer={(t) => updateEmployee({ ...activeModal.employee, ...t })}
        />
      )}
      {activeModal?.type === "delete" && (
        <DeleteEmployeeModal employee={activeModal.employee} onClose={closeModal} onConfirm={removeEmployee} />
      )}
    </div>
  );
}