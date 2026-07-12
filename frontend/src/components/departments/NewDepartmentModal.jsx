import React, { useState } from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, CARD } from "../../theme";

export default function NewDepartmentModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate({ id: `DEP-${Date.now()}`, name: name.trim(), locations: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl p-5" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-semibold" style={{ color: INK }}>New Department</p>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>
        <label className="block">
          <span className="text-[12px]" style={{ color: MUTED }}>Department Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Marketing"
            className="w-full mt-1 px-3 h-9 rounded-lg text-sm outline-none"
            style={{ border: `1px solid ${BORDER}`, color: INK }}
            autoFocus
          />
        </label>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="text-sm px-3.5 h-9 rounded-lg" style={{ color: MUTED, border: `1px solid ${BORDER}` }}>Cancel</button>
          <button onClick={handleSubmit} className="text-sm px-3.5 h-9 rounded-lg font-medium" style={{ backgroundColor: BRAND, color: "#FFFCDC" }}>Create</button>
        </div>
      </div>
    </div>
  );
}