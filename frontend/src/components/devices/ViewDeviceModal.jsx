import React from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, CARD } from "../../theme";
import { SPEC_SCHEMAS, ASSIGNMENT_SCHEMA } from "../deviceScheme";

const formatValue = (val, type) => {
  if (val === null || val === undefined || val === "") return "—";
  if (type === "boolean") return val ? "Yes" : "No";
  if (Array.isArray(val)) return val.length ? val.join(", ") : "—";
  return String(val);
};

export default function ViewDeviceModal({ device, onClose }) {
  const specSchema = SPEC_SCHEMAS[device.type] || [];
  const specs = device.specs || {};
  const assignment = device.assignment || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: INK }}>{device.manufacturer} {device.model}</p>
            <p className="text-[12px]" style={{ color: MUTED }}>{device.id} · {device.type}</p>
          </div>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <Section title="Overview">
          <Row label="Status" value={device.status} />
          <Row label="Department" value={device.dept} />
          <Row label="Assigned To" value={device.assignedTo} />
          <Row label="Last Updated" value={device.updated} />
        </Section>

        {specSchema.length > 0 && (
          <Section title="Specs">
            {specSchema.map((f) => (
              <Row key={f.key} label={f.label} value={formatValue(specs[f.key], f.type)} />
            ))}
          </Section>
        )}

        <Section title="Assignment">
          {ASSIGNMENT_SCHEMA
            .filter((f) => f.key !== "shared_users" || assignment.shared_users !== undefined)
            .map((f) => (
              <Row key={f.key} label={f.label} value={formatValue(assignment[f.key], f.type)} />
            ))}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>{title}</p>
      <div className="rounded-lg" style={{ border: `1px solid ${BORDER}` }}>{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 text-[12.5px]" style={{ borderBottom: `1px solid ${BORDER}` }}>
      <span style={{ color: MUTED }}>{label}</span>
      <span style={{ color: INK }}>{value}</span>
    </div>
  );
}