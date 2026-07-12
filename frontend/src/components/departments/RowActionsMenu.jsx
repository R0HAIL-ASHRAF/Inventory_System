import React from "react";
import { Eye, Pencil, Layers, GitBranch, Trash2 } from "lucide-react";
import { INK, MUTED, BORDER, SURFACE, PAGE_BG, DANGER } from "../../theme";

const ACTIONS = [
  { key: "view", label: "View Structure", icon: Eye },
  { key: "edit", label: "Edit Department", icon: Pencil },
  { key: "structure", label: "Manage Structure", icon: Layers },
  { key: "diagram", label: "View Diagram", icon: GitBranch },
  { key: "delete", label: "Delete", icon: Trash2, danger: true },
];

export default function RowActionsMenu({ department, onClose, onAction }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 mt-1 w-52 rounded-lg overflow-hidden z-50"
        style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 12px 32px rgba(58,71,66,0.16)" }}
      >
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.key}
              onClick={() => { onAction(a.key, department); onClose(); }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-left transition-colors duration-150"
              style={{ color: a.danger ? DANGER : INK }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Icon size={14} />
              {a.label}
            </button>
          );
        })}
      </div>
    </>
  );
}