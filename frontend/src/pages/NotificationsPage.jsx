import React, { useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, SURFACE, PAGE_BG, DANGER, SUCCESS, CARD } from "../theme";

const TONE_COLOR = { danger: DANGER, accent: ACCENT, success: SUCCESS, muted: MUTED };
const FILTERS = ["All", "Unread", "Alerts", "Updates"];

// Mock "API response" — replace this with a real fetch/query later.
// Shape mirrors what NotificationPanel already expects: id, unread, tone, title, body, time.
const MOCK_NOTIFICATIONS_RESPONSE = [
  {
    id: "ntf-101",
    unread: true,
    tone: "danger",
    title: "Device flagged as faulty",
    body: "HP LaserJet M428 (DV-0887) was marked faulty by Ayesha Khan.",
    time: "10m ago",
  },
  {
    id: "ntf-102",
    unread: true,
    tone: "accent",
    title: "Department transfer completed",
    body: "Dell PowerEdge R450 (DV-0231) moved from IT Infra to Data Center Ops.",
    time: "1h ago",
  },
  {
    id: "ntf-103",
    unread: true,
    tone: "success",
    title: "New device registered",
    body: "MacBook Pro 14\" (DV-0654) added and assigned to Sana Tariq.",
    time: "3h ago",
  },
  {
    id: "ntf-104",
    unread: false,
    tone: "muted",
    title: "Device retired",
    body: "ThinkPad T14 (DV-0112) was marked retired and removed from active inventory.",
    time: "Yesterday",
  },
  {
    id: "ntf-105",
    unread: false,
    tone: "accent",
    title: "Assignment updated",
    body: "UltraSharp U2723 (DV-1190) unassigned and returned to spare pool.",
    time: "2d ago",
  },
];

// Map notification "tone" to a filter bucket — adjust once you have a real category field.
const toneToCategory = (tone) => {
  if (tone === "danger") return "Alerts";
  return "Updates";
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS_RESPONSE);
  const [filter, setFilter] = useState("All");

  const markAsRead = (id) => {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((list) => list.map((n) => ({ ...n, unread: false })));
  };

  const remove = (id) => {
    setNotifications((list) => list.filter((n) => n.id !== id));
  };

  const rows = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return n.unread;
    return toneToCategory(n.tone) === filter;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Notifications</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>
            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-[12.5px] font-medium px-3 h-8 rounded-lg"
            style={{ color: ACCENT, border: `1px solid ${BORDER}` }}
          >
            <Check size={13} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-[12.5px] font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
            style={{
              backgroundColor: filter === f ? ACCENT : "#FFFFFF",
              color: filter === f ? "#FFFCDC" : MUTED,
              border: `1px solid ${filter === f ? ACCENT : BORDER}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="rounded-2xl overflow-hidden" style={CARD}>
        {rows.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 px-5 py-16 text-center">
            <Bell size={22} style={{ color: MUTED }} />
            <p className="text-sm" style={{ color: MUTED }}>No notifications here.</p>
          </div>
        )}

        {rows.map((n, i) => (
          <div
            key={n.id}
            className="group flex gap-3 px-5 py-4 transition-colors duration-150"
            style={{ borderBottom: i === rows.length - 1 ? "none" : `1px solid ${BORDER}` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 mt-1.5"
              style={{ backgroundColor: n.unread ? TONE_COLOR[n.tone] : "transparent" }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium leading-snug" style={{ color: INK }}>{n.title}</p>
              <p className="text-[12.5px] mt-0.5" style={{ color: MUTED }}>{n.body}</p>
              <p className="text-[11.5px] mt-1" style={{ color: MUTED }}>{n.time}</p>
            </div>

            <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
              {n.unread && (
                <button onClick={() => markAsRead(n.id)} title="Mark as read" className="p-1.5 rounded-md" style={{ color: MUTED }}>
                  <Check size={14} />
                </button>
              )}
              <button onClick={() => remove(n.id)} title="Delete" className="p-1.5 rounded-md" style={{ color: MUTED }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}