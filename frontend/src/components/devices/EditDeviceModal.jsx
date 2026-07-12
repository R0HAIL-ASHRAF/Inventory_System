import React, { useState } from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, CARD } from "../../theme";
import { CATEGORIES, SPEC_SCHEMAS, defaultSpecsFor } from "../deviceScheme";

export default function EditDeviceModal({ device, onClose, onSave }) {
  const [type, setType] = useState(device.type);
  const [form, setForm] = useState({
    manufacturer: device.manufacturer,
    model: device.model,
    status: device.status,
    dept: device.dept,
    specs: { ...defaultSpecsFor(device.type), ...(device.specs || {}) },
  });

  const schema = SPEC_SCHEMAS[type] || [];

  const handleTypeChange = (newType) => {
    const fresh = defaultSpecsFor(newType);
    // carry over any spec values that still apply under the new schema
    const carried = Object.keys(fresh).reduce((acc, k) => {
      acc[k] = form.specs[k] !== undefined ? form.specs[k] : fresh[k];
      return acc;
    }, {});
    setType(newType);
    setForm((f) => ({ ...f, specs: carried }));
  };

  const setSpec = (key, value) => setForm((f) => ({ ...f, specs: { ...f.specs, [key]: value } }));

  const handleSubmit = () => {
    onSave({ ...device, ...form, type });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-semibold" style={{ color: INK }}>Edit Device</p>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-[12px]" style={{ color: MUTED }}>Category</span>
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
              style={{ border: `1px solid ${BORDER}`, color: INK }}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <Field label="Manufacturer" value={form.manufacturer} onChange={(v) => setForm((f) => ({ ...f, manufacturer: v }))} />
          <Field label="Model" value={form.model} onChange={(v) => setForm((f) => ({ ...f, model: v }))} />
          <Field label="Department" value={form.dept} onChange={(v) => setForm((f) => ({ ...f, dept: v }))} />

          {schema.length > 0 && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wide pt-2" style={{ color: MUTED }}>Specs</p>
              {schema.map((f) => (
                <SpecField key={f.key} field={f} value={form.specs[f.key]} onChange={(v) => setSpec(f.key, v)} />
              ))}
            </>
          )}
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
        style={{ border: `1px solid ${BORDER}`, color: INK }}
      />
    </label>
  );
}

function SpecField({ field, value, onChange }) {
  if (field.type === "boolean") {
    return (
      <label className="flex items-center justify-between">
        <span className="text-[12px]" style={{ color: MUTED }}>{field.label}</span>
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <label className="block">
        <span className="text-[12px]" style={{ color: MUTED }}>{field.label}</span>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
          style={{ border: `1px solid ${BORDER}`, color: INK }}
        >
          <option value="" disabled>Select…</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  }
  if (field.type === "number") {
    return <Field label={field.label} value={value} onChange={(v) => onChange(v === "" ? "" : Number(v))} />;
  }
  return <Field label={field.label} value={value} onChange={onChange} />;
}