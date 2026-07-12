import React, { useState } from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, CARD } from "../../theme";
import { DESIGNATIONS } from "../../data";

export default function EditEmployeeModal({ employee, onClose, onSave }) {
  const [form, setForm] = useState({
    first: employee.name.first,
    last: employee.name.last,
    designation: employee.designation,
    phones: employee.phones.join(", "),
    emails: employee.emails.join(", "),
    address: { ...employee.address },
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setAddr = (key) => (e) => setForm((f) => ({ ...f, address: { ...f.address, [key]: e.target.value } }));

  const handleSubmit = () => {
    onSave({
      ...employee,
      name: { first: form.first, last: form.last },
      designation: form.designation,
      phones: form.phones.split(",").map((s) => s.trim()).filter(Boolean),
      emails: form.emails.split(",").map((s) => s.trim()).filter(Boolean),
      address: form.address,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-semibold" style={{ color: INK }}>Edit Employee</p>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" value={form.first} onChange={set("first")} />
            <Field label="Last Name" value={form.last} onChange={set("last")} />
          </div>

          <label className="block">
            <span className="text-[12px]" style={{ color: MUTED }}>Designation</span>
            <select
              value={form.designation}
              onChange={set("designation")}
              className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
              style={{ border: `1px solid ${BORDER}`, color: INK }}
            >
              {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>

          <Field label="Phone Numbers (comma-separated)" value={form.phones} onChange={set("phones")} />
          <Field label="Emails (comma-separated)" value={form.emails} onChange={set("emails")} />

          <p className="text-[11px] font-semibold uppercase tracking-wide pt-2" style={{ color: MUTED }}>Address</p>
          <Field label="Street" value={form.address.street} onChange={setAddr("street")} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Town" value={form.address.town} onChange={setAddr("town")} />
            <Field label="City" value={form.address.city} onChange={setAddr("city")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Province" value={form.address.province} onChange={setAddr("province")} />
            <Field label="Country" value={form.address.country} onChange={setAddr("country")} />
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