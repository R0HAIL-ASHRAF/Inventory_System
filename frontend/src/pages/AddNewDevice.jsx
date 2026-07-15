import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Laptop2, Printer } from "lucide-react";
import { INK, MUTED, BORDER, CARD, SURFACE, ACCENT, FONT_DISPLAY, CREAMt, DANGER } from "../theme";
import { DEPARTMENTS } from "../data";
import { CATEGORIES, SPEC_SCHEMAS, defaultSpecsFor } from "../components/deviceScheme";

const STATUSES = ["dispatched", "in-use", "spare", "faulty", "retired", "service-able"];

const MANUFACTURERS = [
  "Dell",
  "HP",
  "Lenovo",
  "Apple",
  "Microsoft",
  "Asus",
  "Acer",
  "Cisco",
  "Canon",
  "Epson",
  "Samsung",
  "Other",
];

const inputStyle = {
  border: `1px solid ${BORDER}`,
  backgroundColor: SURFACE,
  color: INK,
};

const baseInput =
  "w-full rounded-lg px-3 h-9 text-sm outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.14)]";

function Field({ label, children, optional, required }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium mb-1.5 block" style={{ color: INK }}>
        {label}
        {required && <span style={{ color: DANGER, marginLeft: 3 }}>*</span>}
        {optional && <span className="font-normal ml-1" style={{ color: MUTED }}>(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Section({ title, subtitle, children, className = "" }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col ${className}`} style={CARD}>
      <p className="text-sm font-semibold mb-0.5" style={{ color: INK }}>{title}</p>
      {subtitle ? (
        <p className="text-[12px] mb-4" style={{ color: MUTED }}>{subtitle}</p>
      ) : (
        <div className="mb-4" />
      )}
      <div className="grid grid-cols-1 gap-3.5 flex-1">{children}</div>
    </div>
  );
}

function SpecField({ field, value, onChange }) {
  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-[13px]" style={{ color: INK }}>
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <Field label={field.label} required={field.required}>
        <select className={baseInput} style={inputStyle} value={value ?? ""} onChange={(e) => onChange(e.target.value)} required={field.required}>
          <option value="" disabled>Select…</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
    );
  }
  if (field.type === "number") {
    return (
      <Field label={field.label} required={field.required}>
        <input
          type="number"
          className={baseInput}
          style={inputStyle}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          required={field.required}
        />
      </Field>
    );
  }
  return (
    <Field label={field.label} required={field.required}>
      <input className={baseInput} style={inputStyle} value={value ?? ""} onChange={(e) => onChange(e.target.value)} required={field.required} />
    </Field>
  );
}

export default function NewDevice() {
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);
  const [deviceType, setDeviceType] = useState(CATEGORIES[0]);
  const [manufacturerChoice, setManufacturerChoice] = useState(""); // dropdown value, may be "Other"

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
  const isCustomManufacturer = manufacturerChoice === "Other";

  const handleTypeChange = (newType) => {
    const fresh = defaultSpecsFor(newType);
    const carried = Object.keys(fresh).reduce((acc, k) => {
      acc[k] = form.specs[k] !== undefined ? form.specs[k] : fresh[k];
      return acc;
    }, {});
    setDeviceType(newType);
    setForm((f) => ({ ...f, specs: carried }));
  };

  const handleManufacturerSelect = (e) => {
    const value = e.target.value;
    setManufacturerChoice(value);
    setForm((f) => ({ ...f, manufacturer: value === "Other" ? "" : value }));
  };

  const set = (key) => (e) => {
    const value = e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const setSpec = (key, value) => setForm((f) => ({ ...f, specs: { ...f.specs, [key]: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-4 pb-10">
      {/* Header + type toggle, side by side to save vertical space */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[28px] font-semibold" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>Add New Device</p>
          <p className="text-[12.5px]" style={{ color: CREAMt }}>Register a new asset in the inventory</p>
        </div>

        <div className="rounded-2xl p-1.5 flex gap-1.5" style={CARD}>
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
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-left transition-colors duration-150"
                style={{ backgroundColor: active ? ACCENT : "transparent", color: active ? "#FFFCDC" : INK }}
              >
                <Icon size={16} />
                <div>
                  <p className="text-[12.5px] font-medium leading-tight">{opt.label}</p>
                  <p className="text-[10.5px] leading-tight" style={{ color: active ? CREAMt : MUTED }}>{opt.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Three sections side by side — Basic Info / Specifications / Assignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
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

          <Field label="Manufacturer" required>
            <select className={baseInput} style={inputStyle} value={manufacturerChoice} onChange={handleManufacturerSelect} required>
              <option value="" disabled>Select…</option>
              {MANUFACTURERS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          {isCustomManufacturer && (
            <Field label="Manufacturer name" required>
              <input
                className={baseInput}
                style={inputStyle}
                placeholder="Type manufacturer…"
                value={form.manufacturer}
                onChange={set("manufacturer")}
                required
                autoFocus
              />
            </Field>
          )}

          <Field label="Model" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. Latitude 5440" value={form.model} onChange={set("model")} required />
          </Field>
        </Section>

        {specSchema.length > 0 ? (
          <Section title="Specifications" subtitle={`${deviceType}-specific fields`}>
            {specSchema.map((f) => (
              <SpecField key={f.key} field={f} value={form.specs[f.key]} onChange={(v) => setSpec(f.key, v)} />
            ))}
          </Section>
        ) : (
          <div className="rounded-2xl p-5 flex items-center justify-center text-center" style={CARD}>
            <p className="text-[12.5px]" style={{ color: MUTED }}>
              No extra specification fields for this device type.
            </p>
          </div>
        )}

        <Section title="Assignment" subtitle={isShared ? "Where this shared device lives" : "Who this device is assigned to"}>
          <Field label="Department">
            <select className={baseInput} style={inputStyle} value={form.department} onChange={set("department")}>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Location" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. Head Office" value={form.location} onChange={set("location")} required />
          </Field>
          <Field label="Section" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. 2nd Floor" value={form.section} onChange={set("section")} required />
          </Field>
          <Field label={isShared ? "Room" : "Room / Cabin"} optional>
            <input className={baseInput} style={inputStyle} placeholder="e.g. Room 204" value={form.room_or_cabin} onChange={set("room_or_cabin")} />
          </Field>

         {!isShared ? (
          <>
            {(form.status === "spare" || form.status === "faulty") ? (
              <div className="sm:col-span-2 rounded-lg px-3 py-2.5 text-[12px]" style={{ background: `${MUTED}0d`, color: MUTED }}>
                {form.status === "spare"
                  ? "Spare devices aren't assigned to anyone yet — set an owner later from the Devices table once it's issued."
                  : "Faulty devices are held for repair — reassign it from the Devices table once it's back in service."}
              </div>
            ) : (
              <>
                <Field label="Assigned To" required>
                  <input
                    className={baseInput}
                    style={inputStyle}
                    placeholder="Search employee…"
                    value={form.assigned_to}
                    onChange={set("assigned_to")}
                    required
                  />
                </Field>
                <Field label="Assigned Date" required>
                  <input
                    type="date"
                    className={baseInput}
                    style={inputStyle}
                    value={form.assigned_date}
                    onChange={set("assigned_date")}
                    required
                  />
                </Field>
              </>
            )}
          </>
        ) : (
          <>
            {(form.status === "spare" || form.status === "faulty") ? (
              <div className="sm:col-span-2 rounded-lg px-3 py-2.5 text-[12px]" style={{ background: `${MUTED}0d`, color: MUTED }}>
                {form.status === "spare"
                  ? "Spare equipment isn't placed with users yet — add shared users later from the Devices table once it's in use."
                  : "Faulty equipment is held for repair — add shared users from the Devices table once it's back in service."}
              </div>
            ) : (
              <>
                <Field label="Shared Users" optional>
                  <input
                    className={baseInput}
                    style={inputStyle}
                    placeholder="Comma-separated names"
                    value={form.shared_users}
                    onChange={set("shared_users")}
                  />
                </Field>
                <Field label="Assigned Date" optional>
                  <input
                    type="date"
                    className={baseInput}
                    style={inputStyle}
                    value={form.assigned_date}
                    onChange={set("assigned_date")}
                  />
                </Field>
              </>
            )}
          </>
        )}
        </Section>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => navigate("/devices")}
          className="rounded-lg px-4 h-10 text-sm font-medium"
          style={{ border: `1px solid ${BORDER}`, color: CREAMt, backgroundColor: ACCENT }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg px-5 h-10 text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT, color: CREAMt }}
        >
          Add Device
        </button>
      </div>
    </form>
  );
}