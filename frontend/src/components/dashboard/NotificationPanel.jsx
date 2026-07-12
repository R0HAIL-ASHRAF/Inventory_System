import React from "react";
import { INK, MUTED, BORDER, ACCENT, SURFACE, PAGE_BG, DANGER, SUCCESS } from "../../theme";

const TONE_COLOR = { danger: DANGER, accent: ACCENT, success: SUCCESS, muted: MUTED };

export default function NotificationPanel({ notifications, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 mt-2 w-80 rounded-xl overflow-hidden z-50"
        style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 12px 32px rgba(58,71,66,0.16)" }}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <p className="text-[13.5px] font-semibold" style={{ color: INK }}>Notifications</p>
          <button className="text-[12px] font-medium" style={{ color: ACCENT }}>Mark all as read</button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex gap-3 px-4 py-3 transition-colors duration-150 cursor-pointer"
              style={{ borderBottom: `1px solid ${BORDER}` }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: n.unread ? TONE_COLOR[n.tone] : "transparent" }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug" style={{ color: INK }}>{n.title}</p>
                <p className="text-[12px] mt-0.5" style={{ color: MUTED }}>{n.body}</p>
                <p className="text-[11px] mt-1" style={{ color: MUTED }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full text-center text-[12.5px] font-medium py-2.5"
          style={{ color: ACCENT, borderTop: `1px solid ${BORDER}` }}
        >
          View all notifications
        </button>
      </div>
    </>
  );
}