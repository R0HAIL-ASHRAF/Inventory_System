import React, { useState } from "react";
import { Plus, MoreHorizontal, MapPin, Layers, DoorOpen } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, CARD, PAGE_BG } from "../theme";
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

export default function Departments() {
  const [departments, setDepartments] = useState(DEPARTMENT_TREE);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // { type, department }

  const handleAction = (action, department) => setActiveModal({ type: action, department });
  const closeModal = () => setActiveModal(null);

  const updateDepartment = (updated) => {
    setDepartments((list) => list.map((d) => (d.id === updated.id ? updated : d)));
  };

  const addDepartment = (dep) => setDepartments((list) => [...list, dep]);

  const removeDepartment = (department) => {
    setDepartments((list) => list.filter((d) => d.id !== department.id));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Departments</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>{departments.length} departments configured</p>
        </div>
        <button
          onClick={() => setActiveModal({ type: "new", department: null })}
          className="flex items-center gap-1.5 rounded-lg px-3.5 h-9 text-sm font-medium transition-opacity duration-150 hover:opacity-90"
          style={{ backgroundColor: BRAND, color: "#FFFCDC" }}
        >
          <Plus size={15} strokeWidth={2.5} />
          New Department
        </button>
      </div>

      {/* Grid of department cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dep) => (
          <div
            key={dep.id}
            className="rounded-2xl p-5 relative transition-colors duration-150 cursor-pointer"
            style={CARD}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CARD.backgroundColor)}
            onClick={() => handleAction("diagram", dep)}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold" style={{ color: INK }}>{dep.name}</p>
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === dep.id ? null : dep.id); }}
                  style={{ color: MUTED }}
                  className="p-1 rounded"
                >
                  <MoreHorizontal size={16} />
                </button>
                {openMenuId === dep.id && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <RowActionsMenu department={dep} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Stat icon={MapPin} label="Locations" value={dep.locations.length} />
              <Stat icon={Layers} label="Sections" value={countSections(dep)} />
              <Stat icon={DoorOpen} label="Rooms / Cabins" value={countRooms(dep)} />
            </div>
          </div>
        ))}
      </div>

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

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px]" style={{ color: MUTED }}>
      <Icon size={13} />
      <span>{label}</span>
      <span className="ml-auto font-medium" style={{ color: INK }}>{value}</span>
    </div>
  );
}