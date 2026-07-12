import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { INK, MUTED, BORDER, DANGER, CARD } from "../../theme";

export default function DeleteEmployeeModal({ employee, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl p-5" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} style={{ color: DANGER }} />
            <p className="text-sm font-semibold" style={{ color: INK }}>Delete Employee</p>
          </div>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>
        <p className="text-[13px] mb-5" style={{ color: MUTED }}>
          This will permanently remove {employee.name.first} {employee.name.last} ({employee.id}) from records. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm px-3.5 h-9 rounded-lg" style={{ color: MUTED, border: `1px solid ${BORDER}` }}>Cancel</button>
          <button
            onClick={() => { onConfirm(employee); onClose(); }}
            className="text-sm px-3.5 h-9 rounded-lg font-medium"
            style={{ backgroundColor: DANGER, color: "#FFFFFF" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}