import React from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, CARD } from "../../theme";

export default function ViewEmployeeModal({ employee, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: INK }}>
              {employee.name.first} {employee.name.last}
            </p>
            <p className="text-[12px]" style={{ color: MUTED }}>{employee.id} · {employee.designation}</p>
          </div>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <Section title="Personal">
          <Row label="Father's Name" value={`${employee.father_name.first} ${employee.father_name.last}`} />
          <Row label="P. Number" value={employee.p_number} />
          <Row label="Phone" value={employee.phones.join(", ")} />
          <Row label="Email" value={employee.emails.join(", ")} />
        </Section>

        <Section title="Address">
          <Row label="Street" value={employee.address.street} />
          <Row label="Town" value={employee.address.town} />
          <Row label="City" value={employee.address.city} />
          <Row label="Province" value={employee.address.province} />
          <Row label="Country" value={employee.address.country} />
        </Section>

        <Section title="Placement">
          <Row label="Department" value={employee.department} />
          <Row label="Location" value={employee.location} />
          <Row label="Section" value={employee.section} />
          <Row label="Room" value={employee.room || "—"} />
          <Row label="Cabin" value={employee.cabin || "—"} />
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
      <span style={{ color: INK, textAlign: "right" }}>{value}</span>
    </div>
  );
}