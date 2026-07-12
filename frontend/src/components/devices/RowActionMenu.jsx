import React from "react";
import { Eye, Pencil, ArrowRightLeft, AlertTriangle, Trash2 } from "lucide-react";
import { INK, MUTED, BORDER, SURFACE, PAGE_BG, DANGER } from "../../theme";

export default function RowActionsMenu({ device, onClose, onAction }) {
  const items = [
    { key: "view", label: "View Details", icon: Eye },
    { key: "edit", label: "Edit Device", icon: Pencil },
    { key: "transfer", label: "Transfer Department", icon: ArrowRightLeft },
    ...(device.status !== "faulty" ? [{ key: "flag-faulty", label: "Mark as Faulty", icon: AlertTriangle }] : []),
    { key: "delete", label: "Delete Device", icon: Trash2, danger: true },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 top-full mt-1 w-52 rounded-xl overflow-hidden z-50"
        style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 12px 32px rgba(58,71,66,0.16)" }}
      >
        <div className="py-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const color = item.danger ? DANGER : INK;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onAction(item.key, device);
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-left transition-colors duration-150"
                style={{ color }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}