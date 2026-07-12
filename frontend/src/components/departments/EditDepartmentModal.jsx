import React, { useState } from "react";
import { X, Plus, Trash2, Layers } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, DANGER, CARD } from "../../theme";
import { EMPLOYEES } from "../../data";

export default function EditDepartmentModal({ department, onClose, onSave, onManageStructure }) {
  const [name, setName] = useState(department.name);
  const [managerId, setManagerId] = useState(department.manager_id || "");
  const [locations, setLocations] = useState(department.locations);
  const [newLocation, setNewLocation] = useState("");

  const addLocation = () => {
    if (!newLocation.trim()) return;
    setLocations((list) => [
      ...list,
      { id: `LOC-${Date.now()}`, branch_location: newLocation.trim(), sections: [] },
    ]);
    setNewLocation("");
  };

  const removeLocation = (id) => setLocations((list) => list.filter((l) => l.id !== id));

  const handleSubmit = () => {
    onSave({ ...department, name, manager_id: managerId || null, locations });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-semibold" style={{ color: INK }}>Edit Department</p>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-[12px]" style={{ color: MUTED }}>Department Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
              style={{ border: `1px solid ${BORDER}`, color: INK }}
            />
          </label>

          <label className="block">
            <span className="text-[12px]" style={{ color: MUTED }}>Manager</span>
            <select
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
              style={{ border: `1px solid ${BORDER}`, color: INK }}
            >
              <option value="">No manager assigned</option>
              {EMPLOYEES.map((e) => (
                <option key={e.id} value={e.id}>{e.name.first} {e.name.last} — {e.designation}</option>
              ))}
            </select>
          </label>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: MUTED }}>Locations</p>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc.id} className="flex items-center justify-between px-3 py-2 rounded-lg text-[13px]" style={{ border: `1px solid ${BORDER}` }}>
                  <span style={{ color: INK }}>{loc.branch_location}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onManageStructure?.(loc.id)}
                      title="Manage sections, rooms, and cabins for this location"
                      style={{ color: MUTED }}
                    >
                      <Layers size={13} />
                    </button>
                    <button onClick={() => removeLocation(loc.id)} style={{ color: DANGER }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
              {locations.length === 0 && (
                <p className="text-[12px]" style={{ color: MUTED }}>No locations yet.</p>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <input
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="e.g. Karachi Branch"
                className="flex-1 px-3 h-9 rounded-lg text-sm outline-none"
                style={{ border: `1px solid ${BORDER}`, color: INK }}
              />
              <button onClick={addLocation} className="flex items-center gap-1 px-3 h-9 rounded-lg text-[12.5px] font-medium" style={{ border: `1px solid ${BORDER}`, color: INK }}>
                <Plus size={13} />
                Add
              </button>
            </div>
            <p className="text-[11px] mt-1.5" style={{ color: MUTED }}>
              Removing a location here doesn't undo — save to confirm. Use the <Layers size={10} className="inline" /> icon to manage sections, rooms, and cabins inside a location.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="text-sm px-3.5 h-9 rounded-lg" style={{ color: MUTED, border: `1px solid ${BORDER}` }}>Cancel</button>
          <button onClick={handleSubmit} className="text-sm px-3.5 h-9 rounded-lg font-medium" style={{ backgroundColor: BRAND, color: "#FFFCDC" }}>Save</button>
        </div>
      </div>
    </div>
  );
}