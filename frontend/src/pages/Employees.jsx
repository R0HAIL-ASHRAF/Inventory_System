import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, MONO } from "../theme";
import { EMPLOYEES, DEPARTMENTS } from "../data";
import RowActionsMenu from "../components/employees/RowActionsMenu";
import ViewEmployeeModal from "../components/employees/ViewEmployeeModal";
import EditEmployeeModal from "../components/employees/EditEmployeeModal";
import TransferPlacementModal from "../components/employees/TransferPlacementModal";
import DeleteEmployeeModal from "../components/employees/DeleteEmployeeModal";

const initials = (e) => `${e.name.first[0]}${e.name.last[0]}`.toUpperCase();

export default function Employees() {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // { type, employee }

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

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Employees</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>{employees.length} people on record</p>
        </div>
        <Link
          to="/employees/new"
          className="flex items-center gap-1.5 rounded-lg px-3.5 h-9 text-sm font-medium transition-opacity duration-150 hover:opacity-90"
          style={{ backgroundColor: BRAND, color: "#FFFCDC" }}
        >
          <Plus size={15} strokeWidth={2.5} />
          New Employee
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
            placeholder="Search employees…"
            className="bg-transparent border-none outline-none text-sm w-full"
            style={{ color: INK,
              outline:"none",
              boxShadow:"none"
             }}
          />
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="text-[12.5px] font-medium px-3 h-9 rounded-lg outline-none"
          style={{ backgroundColor: "#FFFFFF", color: INK, border: `1px solid ${BORDER}` }}
        >
          <option value="All">All departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl" style={CARD}>
        <div
          className="grid px-5 py-3 text-[11px] font-semibold uppercase tracking-wide"
          style={{ gridTemplateColumns: "2.2fr 1.3fr 1fr 1.3fr 40px", color: MUTED, borderBottom: `1px solid ${BORDER}` }}
        >
          <span>Employee</span>
          <span>Designation</span>
          <span>Department</span>
          <span>Placement</span>
          <span />
        </div>

        {rows.length === 0 && (
          <div className="px-5 py-10 text-center text-sm" style={{ color: MUTED }}>
            No employees match this search or filter.
          </div>
        )}

        {rows.map((e) => (
          <div
            key={e.id}
            className="grid items-center px-5 py-3 transition-colors duration-150"
            style={{ gridTemplateColumns: "2.2fr 1.3fr 1fr 1.3fr 40px", borderBottom: `1px solid ${BORDER}` }}
            onMouseEnter={(ev) => (ev.currentTarget.style.backgroundColor = PAGE_BG)}
            onMouseLeave={(ev) => (ev.currentTarget.style.backgroundColor = "transparent")}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="flex items-center justify-center rounded-full shrink-0 text-[12px] font-semibold"
                style={{ width: 34, height: 34, backgroundColor: BRAND, color: "#FFFCDC" }}
              >
                {initials(e)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: INK }}>
                  {e.name.first} {e.name.last}
                </p>
                <p className="text-[11.5px]" style={{ color: MUTED, fontFamily: MONO }}>{e.id}</p>
              </div>
            </div>

            <p className="text-[13px] truncate" style={{ color: INK }}>{e.designation}</p>
            <p className="text-[13px] truncate" style={{ color: INK }}>{e.department}</p>
            <p className="text-[12.5px] truncate" style={{ color: MUTED }}>
              {[e.section, e.room || e.cabin].filter(Boolean).join(" · ") || "—"}
            </p>

            <div className="relative justify-self-end">
              <button
                onClick={() => setOpenMenuId(openMenuId === e.id ? null : e.id)}
                style={{ color: MUTED }}
                className="p-1 rounded"
              >
                <MoreHorizontal size={16} />
              </button>
              {openMenuId === e.id && (
                <RowActionsMenu employee={e} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
              )}
            </div>
          </div>
        ))}
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