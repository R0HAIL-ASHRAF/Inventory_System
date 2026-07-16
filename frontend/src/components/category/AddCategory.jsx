import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Laptop2,
  Computer,
  Monitor,
  Printer,
  Server,
  Router,
  Smartphone,
  Tablet,
  HardDrive,
  Wifi,
  Camera,
  Keyboard,
  Cpu,
  Plus,
  Trash2,
  GripVertical,
  Info,
} from "lucide-react";
import { INK, MUTED, BORDER, CARD, SURFACE, ACCENT, ACCENT_SOFT, FONT_DISPLAY, CREAMt, DANGER, MONO, PAGE_BG } from "../../theme";

const ICONS = [
  { key: "Laptop2", Icon: Laptop2 },
  { key: "Computer", Icon: Computer },
  { key: "Monitor", Icon: Monitor },
  { key: "Printer", Icon: Printer },
  { key: "Server", Icon: Server },
  { key: "Router", Icon: Router },
  { key: "Smartphone", Icon: Smartphone },
  { key: "Tablet", Icon: Tablet },
  { key: "HardDrive", Icon: HardDrive },
  { key: "Wifi", Icon: Wifi },
  { key: "Camera", Icon: Camera },
  { key: "Keyboard", Icon: Keyboard },
];

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Yes / No" },
  { value: "select", label: "Dropdown" },
];

// These exist on every device regardless of category — forced at the schema
// level, not editable here. Shown for reference so nobody re-adds them.
const FORCED_BASE_FIELDS = [
  "id", "manufacturer", "model", "status", "dept", "assignedTo", "shared", "updated",
  "assignment.location", "assignment.section", "assignment.room", "assignment.cabin",
  "assignment.shared_users", "assignment.assigned_date",
];

const slugify = (label) =>
  label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

let uid = 0;
const nextId = () => `f${uid++}`;

const emptyField = () => ({
  id: nextId(),
  label: "",
  key: "",
  keyTouched: false,
  type: "text",
  required: false,
  options: "",
});

const inputStyle = { border: `1px solid ${BORDER}`, backgroundColor: SURFACE, color: INK };
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
    <div className={`rounded-2xl p-5 ${className}`} style={CARD}>
      <p className="text-sm font-semibold mb-0.5" style={{ color: INK }}>{title}</p>
      {subtitle ? <p className="text-[12px] mb-4" style={{ color: MUTED }}>{subtitle}</p> : <div className="mb-4" />}
      {children}
    </div>
  );
}

export default function NewCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState("Router");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([emptyField()]);

  const updateField = (id, patch) => {
    setFields((list) =>
      list.map((f) => {
        if (f.id !== id) return f;
        const next = { ...f, ...patch };
        // Auto-slug the key from the label until the user edits the key by hand.
        if (patch.label !== undefined && !next.keyTouched) {
          next.key = slugify(patch.label);
        }
        if (patch.key !== undefined) {
          next.keyTouched = true;
        }
        return next;
      })
    );
  };

  const addField = () => setFields((list) => [...list, emptyField()]);
  const removeField = (id) => setFields((list) => list.filter((f) => f.id !== id));

  const specSchema = fields
    .filter((f) => f.label.trim() && f.key.trim())
    .map((f) => ({
      key: f.key,
      label: f.label,
      type: f.type,
      required: f.required,
      ...(f.type === "select"
        ? { options: f.options.split(",").map((o) => o.trim()).filter(Boolean) }
        : {}),
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: name.trim(),
      icon: iconKey,
      description: description.trim() || undefined,
      spec_schema: specSchema,
    };
    // Wire this up to your API — e.g. POST /categories, then push
    // payload.category into CATEGORIES and payload.spec_schema into
    // SPEC_SCHEMAS[payload.category] so NewDevice picks it up immediately.
    console.log("New category payload:", payload);
    navigate("/devices");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-4 pb-10">
      {/* Header */}
      <div>
        <p className="text-[28px] font-semibold" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>
          Add Device Category
        </p>
        <p className="text-[12.5px]" style={{ color: CREAMt }}>
          Define a new device type and the attributes it should track
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Category basics */}
        <Section title="Category Basics" className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-3.5">
            <Field label="Category Name" required>
              <input
                className={baseInput}
                style={inputStyle}
                placeholder="e.g. Switch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

            <Field label="Description" optional>
              <input
                className={baseInput}
                style={inputStyle}
                placeholder="e.g. Managed network switches"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            <Field label="Icon" required>
              <div className="grid grid-cols-6 gap-2">
                {ICONS.map(({ key, Icon }) => {
                  const active = iconKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setIconKey(key)}
                      title={key}
                      className="aspect-square rounded-lg flex items-center justify-center transition-all duration-150"
                      style={{
                        background: active ? ACCENT : PAGE_BG,
                        border: `1px solid ${active ? ACCENT : BORDER}`,
                        color: active ? "#FFFCDC" : MUTED,
                      }}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
              </div>
            </Field>
          </div>

          
        </Section>

        {/* Dynamic spec fields */}
        <Section title="Specification Fields" subtitle="Attributes specific to this category — added at runtime" className="lg:col-span-2">
          <div className="space-y-3">
            {fields.map((f, idx) => (
              <div
                key={f.id}
                className="rounded-xl p-3.5"
                style={{ background: PAGE_BG, border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-start gap-2">
                  <div className="pt-2.5 shrink-0" style={{ color: MUTED, opacity: 0.4 }}>
                    <GripVertical size={15} />
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    <div className="sm:col-span-2">
                      <span className="text-[11px] font-medium mb-1 block" style={{ color: MUTED }}>Field label</span>
                      <input
                        className={baseInput}
                        style={inputStyle}
                        placeholder="e.g. Port Count"
                        value={f.label}
                        onChange={(e) => updateField(f.id, { label: e.target.value })}
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-medium mb-1 block" style={{ color: MUTED }}>Key</span>
                      <input
                        className={baseInput}
                        style={{ ...inputStyle, fontFamily: MONO, fontSize: 12.5 }}
                        placeholder="auto"
                        value={f.key}
                        onChange={(e) => updateField(f.id, { key: slugify(e.target.value) })}
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-medium mb-1 block" style={{ color: MUTED }}>Type</span>
                      <select
                        className={baseInput}
                        style={inputStyle}
                        value={f.type}
                        onChange={(e) => updateField(f.id, { type: e.target.value })}
                      >
                        {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>

                    {f.type === "select" && (
                      <div className="sm:col-span-4">
                        <span className="text-[11px] font-medium mb-1 block" style={{ color: MUTED }}>
                          Options <span style={{ opacity: 0.6 }}>(comma-separated)</span>
                        </span>
                        <input
                          className={baseInput}
                          style={inputStyle}
                          placeholder="e.g. Managed, Unmanaged, PoE"
                          value={f.options}
                          onChange={(e) => updateField(f.id, { options: e.target.value })}
                        />
                      </div>
                    )}

                    <div className="sm:col-span-4 flex items-center justify-between pt-0.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={f.required}
                          onChange={(e) => updateField(f.id, { required: e.target.checked })}
                        />
                        <span className="text-[12px] font-medium" style={{ color: INK }}>Required</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => removeField(f.id)}
                        disabled={fields.length === 1}
                        className="flex items-center gap-1 text-[12px] font-medium disabled:opacity-30"
                        style={{ color: DANGER }}
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addField}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-semibold transition-colors duration-150"
              style={{ border: `1.5px dashed ${BORDER}`, color: ACCENT }}
            >
              <Plus size={14} />
              Add another field
            </button>
          </div>

          {/* Live schema preview — reassures this maps cleanly onto a Mongo doc */}
          {specSchema.length > 0 && (
            <div className="rounded-xl p-3.5 mt-4" style={{ background: INK }}>
              <p className="text-[10.5px] font-semibold uppercase tracking-wide mb-2" style={{ color: CREAMt, opacity: 0.5 }}>
                specs schema preview
              </p>
              <pre
                className="text-[11px] leading-relaxed overflow-x-auto"
                style={{ fontFamily: MONO, color: ACCENT_SOFT }}
              >
{JSON.stringify(specSchema, null, 2)}
              </pre>
            </div>
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
          Create Category
        </button>
      </div>
    </form>
  );
}