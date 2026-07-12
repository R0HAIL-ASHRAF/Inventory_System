import React, { useState } from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, CARD } from "../../theme";
import { DEPARTMENTS } from "../../data";

export default function TransferPlacementModal({ employee, onClose, onTransfer }) {
  const [form, setForm] = useState({
    department: employee.department,
    location: employee.location,
    section: employee.section,
    room: employee.room,
    cabin: employee.cabin,
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    onTransfer(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl p-5" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: INK }}>Transfer Placement</p>
            <p className="text-[12px]" style={{ color: MUTED }}>{employee.name.first} {employee.name.last} · {employee.id}</p>
          </div>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-[12px]" style={{ color: MUTED }}>Department</span>
            <select
              value={form.department}
              onChange={set("department")}
              className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
              style={{ border: `1px solid ${BORDER}`, color: INK }}
            >
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <Field label="Location" value={form.location} onChange={set("location")} />
          <Field label="Section" value={form.section} onChange={set("section")} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Room" value={form.room} onChange={set("room")} />
            <Field label="Cabin" value={form.cabin} onChange={set("cabin")} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="text-sm px-3.5 h-9 rounded-lg" style={{ color: MUTED, border: `1px solid ${BORDER}` }}>Cancel</button>
          <button onClick={handleSubmit} className="text-sm px-3.5 h-9 rounded-lg font-medium" style={{ backgroundColor: BRAND, color: "#FFFCDC" }}>Transfer</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-[12px]" style={{ color: MUTED }}>{label}</span>
      <input
        value={value ?? ""}
        onChange={onChange}
        className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
        style={{ border: `1px solid ${BORDER}`, color: INK }}
      />
    </label>
  );
}