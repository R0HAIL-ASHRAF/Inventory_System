import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, ChevronDown, Plus, LogOut, Settings, UserCircle } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, SURFACE, PAGE_BG, MONO } from "../../theme";
import NotificationPanel from "../dashboard/NotificationPanel"
import { NOTIFICATIONS } from "../../data";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header
      className="sticky top-0 z-30 w-full flex items-center justify-between gap-4 px-6"
      style={{ height: 64, backgroundColor: SURFACE, borderBottom: `1.5px solid ${BRAND}`, boxShadow: "0 1px 2px rgba(58,71,66,0.05)" }}
    >
      {/* Left: title + search */}
      <div className="flex items-center gap-6 min-w-0 flex-1">
        <div
          className="hidden sm:flex items-center gap-2 rounded-lg px-3 h-9 w-full max-w-sm transition-shadow duration-150"
          style={{
            backgroundColor: PAGE_BG,
            border: `1px solid ${focused ? ACCENT : "transparent"}`,
            boxShadow: focused ? `0 0 0 3px rgba(201,162,39,0.14)` : "none",
          }}
        >
          <Search size={16} style={{ color: MUTED }} className="shrink-0" />
          <input
            type="text"
            placeholder="Search devices, people, departments…"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
            style={{ color: INK,
              outline:"none",
              boxShadow:"none"
             }}
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex items-center justify-center rounded-lg transition-colors duration-150"
            style={{ width: 36, height: 36 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Bell size={18} style={{ color: INK }} />
            {unreadCount > 0 && (
              <span
                className="absolute rounded-full"
                style={{ top: 8, right: 9, width: 7, height: 7, backgroundColor: "#B8503A", border: `2px solid ${SURFACE}` }}
              />
            )}
          </button>
          {notifOpen && <NotificationPanel notifications={NOTIFICATIONS} onClose={() => setNotifOpen(false)} />}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg pl-1 pr-2 h-9 transition-colors duration-150"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div
              className="flex items-center justify-center rounded-full text-[12px] font-semibold shrink-0"
              style={{ width: 30, height: 30, backgroundColor: BRAND, color: SURFACE }}
            >
              AR
            </div>
            <div className="hidden md:block text-left leading-tight">
              <p className="text-[13px] font-semibold" style={{ color: INK }}>Aisha Raza</p>
              <p className="text-[11px]" style={{ color: MUTED }}>IT Asset Manager</p>
            </div>
            <ChevronDown size={15} style={{ color: MUTED, transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden z-50"
                style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 12px 32px rgba(58,71,66,0.16)" }}
              >
                <div className="px-3.5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="text-[13px] font-semibold" style={{ color: INK }}>Aisha Raza</p>
                  <p className="text-[11.5px]" style={{ color: MUTED }}>aisha.raza@company.com</p>
                </div>
                <div className="py-1.5">
                  <MenuItem icon={UserCircle} label="My profile" />
                </div>
                <div className="py-1.5" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <MenuItem icon={LogOut} label="Sign out" tone="danger" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({ icon: Icon, label, tone }) {
  const color = tone === "danger" ? "#B8503A" : INK;
  return (
    <button
      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-left transition-colors duration-150"
      style={{ color }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAGE_BG)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}