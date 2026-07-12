import React from "react";
import { ACCENT, MUTED, DANGER, SUCCESS } from "../../theme";

const STATUS_STYLES = {
  dispatched: { label: "Dispatched", color: ACCENT },
  "in-use": { label: "In Use", color: SUCCESS },
  spare: { label: "Spare", color: MUTED },
  faulty: { label: "Faulty", color: DANGER },
  retired: { label: "Retired", color: MUTED },
};

export default function StatusBadge({ status }) {
  const { label, color } =
    STATUS_STYLES[status] ?? STATUS_STYLES.spare;

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium tracking-wide border"
      style={{
        color,
        background: `linear-gradient(180deg, ${color}12, ${color}08)`,
        border: `1px solid ${color}35`,
      }}
    >
      <span
        className="mr-2 h-2 w-2 rounded-full animate-pulse"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}