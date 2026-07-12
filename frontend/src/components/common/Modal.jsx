import React from "react";
import { X } from "lucide-react";
import { INK, MUTED, BORDER, SURFACE } from "../../theme";

export default function Modal({ title, subtitle, onClose, children, footer, width = 480 }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(46,54,47,0.4)" }} onClick={onClose} />
      <div
        className="relative rounded-2xl w-full overflow-hidden"
        style={{ maxWidth: width, backgroundColor: SURFACE, boxShadow: "0 24px 60px rgba(46,54,47,0.25)" }}
      >
        <div className="flex items-start justify-between px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <p className="text-[15px] font-semibold" style={{ color: INK }}>{title}</p>
            {subtitle && <p className="text-[12.5px] mt-0.5" style={{ color: MUTED }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ color: MUTED }} className="shrink-0 p-1">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}