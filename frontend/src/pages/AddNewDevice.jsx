import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Laptop2, Printer, ArrowLeft } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, CARD, SURFACE } from "../theme";
import { DEPARTMENTS } from "../data";
import { CATEGORIES, SPEC_SCHEMAS, defaultSpecsFor } from "../components/deviceScheme";

const STATUSES = ["dispatched", "in-use", "spare", "faulty", "retired"];

const inputStyle = {
  border: `1px solid ${BORDER}`,
  backgroundColor: SURFACE,
  color: INK,
};

const baseInput =
  "w-full rounded-lg px-3 h-9 text-sm outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.14)]";

function Field({ label, children, optional }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium mb-1.5 block" style={{ color: INK }}>
        {label}
        {optional && <span className="font-normal ml-1" style={{ color: MUTED }}>(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl p-6" style={CARD}>
      <p className="text-sm font-semibold mb-0.5" style={{ color: INK }}>{title}</p>
      {subtitle && <p className="text-[12px] mb-4" style={{ color: MUTED }}>{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

// Renders one input, driven entirely by the schema field's `type`.
function SpecField({ field, value, onChange }) {
  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-[13px] pt-6" style={{ color: INK }}>
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <Field label={field.label}>
        <select className={baseInput} style={inputStyle} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>Select…</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
    );
  }
  if (field.type === "number") {
    return (
      <Field label={field.label}>
        <input
          type="number"
          className={baseInput}
          style={inputStyle}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </Field>
    );
  }
  return (
    <Field label={field.label}>
      <input className={baseInput} style={inputStyle} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export default function NewDevice() {
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);
  const [deviceType, setDeviceType] = useState(CATEGORIES[0]);

  const [form, setForm] = useState({
    manufacturer: "",
    model: "",
    status: "spare",
    specs: defaultSpecsFor(CATEGORIES[0]),
    department: DEPARTMENTS[0],
    location: "",
    section: "",
    room_or_cabin: "",
    assigned_to: "",
    shared_users: "",
    assigned_date: "",
  });

  const specSchema = SPEC_SCHEMAS[deviceType] || [];

  const handleTypeChange = (newType) => {
    const fresh = defaultSpecsFor(newType);
    // Carry over values for keys that exist in both schemas (e.g. ip_address, mac_address).
    const carried = Object.keys(fresh).reduce((acc, k) => {
      acc[k] = form.specs[k] !== undefined ? form.specs[k] : fresh[k];
      return acc;
    }, {});
    setDeviceType(newType);
    setForm((f) => ({ ...f, specs: carried }));
  };

  const set = (key) => (e) => {
    const value = e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const setSpec = (key, value) => setForm((f) => ({ ...f, specs: { ...f.specs, [key]: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your API — this just logs the shape that would be sent.
    const payload = {
      device_type: deviceType,
      is_shared: isShared,
      manufacturer: form.manufacturer,
      model: form.model,
      status: form.status,
      specs: form.specs,
      assignment: isShared
        ? {
            department_id: form.department,
            location_id: form.location,
            section_id: form.section,
            room_id: form.room_or_cabin || undefined,
            shared_users: form.shared_users ? form.shared_users.split(",").map((s) => s.trim()) : [],
            assigned_date: form.assigned_date || undefined,
          }
        : {
            user_id: form.assigned_to,
            department_id: form.department,
            location_id: form.location,
            section_id: form.section,
            room_id: form.room_or_cabin || undefined,
            assigned_date: form.assigned_date,
          },
    };
    console.log("New device payload:", payload);
    navigate("/devices");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/devices")}
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{ width: 34, height: 34, border: `1px solid ${BORDER}`, color: MUTED }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Add New Device</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>Register a new asset in the inventory</p>
        </div>
      </div>

      {/* Assignment mode toggle — governs assignment shape only, not specs */}
      <div className="rounded-2xl p-2 flex gap-2" style={CARD}>
        {[
          { key: false, label: "Personal Device", sub: "Assigned to one person", icon: Laptop2 },
          { key: true, label: "Shared Equipment", sub: "Multiple users or a room/location", icon: Printer },
        ].map((opt) => {
          const Icon = opt.icon;
          const active = isShared === opt.key;
          return (
            <button
              key={String(opt.key)}
              type="button"
              onClick={() => setIsShared(opt.key)}
              className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-150"
              style={{ backgroundColor: active ? BRAND : "transparent", color: active ? "#FFFCDC" : INK }}
            >
              <Icon size={18} />
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-[11.5px]" style={{ color: active ? "#C7D1CB" : MUTED }}>{opt.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Basic info */}
      <Section title="Basic Info">
        <Field label="Device Type">
          <select className={baseInput} style={inputStyle} value={deviceType} onChange={(e) => handleTypeChange(e.target.value)}>
            {CATEGORIES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={baseInput} style={inputStyle} value={form.status} onChange={set("status")}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Manufacturer">
          <input className={baseInput} style={inputStyle} placeholder="e.g. Dell" value={form.manufacturer} onChange={set("manufacturer")} required />
        </Field>
        <Field label="Model">
          <input className={baseInput} style={inputStyle} placeholder="e.g. Latitude 5440" value={form.model} onChange={set("model")} required />
        </Field>
      </Section>

      {/* Specs — fully driven by SPEC_SCHEMAS[deviceType], no more if/else per category */}
      {specSchema.length > 0 && (
        <Section title="Specifications" subtitle={`${deviceType}-specific fields`}>
          {specSchema.map((f) => (
            <SpecField key={f.key} field={f} value={form.specs[f.key]} onChange={(v) => setSpec(f.key, v)} />
          ))}
        </Section>
      )}

      {/* Assignment */}
      <Section title="Assignment" subtitle={isShared ? "Where this shared device lives" : "Who this device is assigned to"}>
        <Field label="Department">
          <select className={baseInput} style={inputStyle} value={form.department} onChange={set("department")}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Location">
          <input className={baseInput} style={inputStyle} placeholder="e.g. Head Office" value={form.location} onChange={set("location")} required />
        </Field>
        <Field label="Section">
          <input className={baseInput} style={inputStyle} placeholder="e.g. 2nd Floor" value={form.section} onChange={set("section")} required />
        </Field>
        <Field label={isShared ? "Room" : "Room / Cabin"} optional>
          <input className={baseInput} style={inputStyle} placeholder="e.g. Room 204" value={form.room_or_cabin} onChange={set("room_or_cabin")} />
        </Field>

        {!isShared ? (
          <>
            <Field label="Assigned To">
              <input className={baseInput} style={inputStyle} placeholder="Search employee…" value={form.assigned_to} onChange={set("assigned_to")} required />
            </Field>
            <Field label="Assigned Date">
              <input type="date" className={baseInput} style={inputStyle} value={form.assigned_date} onChange={set("assigned_date")} required />
            </Field>
          </>
        ) : (
          <>
            <Field label="Shared Users" optional>
              <input className={baseInput} style={inputStyle} placeholder="Comma-separated names" value={form.shared_users} onChange={set("shared_users")} />
            </Field>
            <Field label="Assigned Date" optional>
              <input type="date" className={baseInput} style={inputStyle} value={form.assigned_date} onChange={set("assigned_date")} />
            </Field>
          </>
        )}
      </Section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/devices")}
          className="rounded-lg px-4 h-10 text-sm font-medium"
          style={{ border: `1px solid ${BORDER}`, color: INK }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg px-5 h-10 text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BRAND, color: "#FFFCDC" }}
        >
          Add Device
        </button>
      </div>
    </form>
  );
}