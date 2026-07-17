import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut, UserCircle } from "lucide-react";
import piaLogo from "../../assets/12logo.png";
import { INK, MUTED, BORDER, ACCENT, BRAND, SURFACE, PAGE_BG, MONO } from "../../theme";
import NotificationPanel from "../dashboard/NotificationPanel";
import { NOTIFICATIONS } from "../../data";
import { useAuth } from "../authContexts/AuthContext";
import { ROLE_LABELS } from "../../data";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  if (!user) return null;

  const fullName = `${user.name.first} ${user.name.last}`;
  const initials = `${user.name.first[0]}${user.name.last[0]}`.toUpperCase();
  const primaryEmail = (user.emails && user.emails[0]) || "—";

  function goToProfile() {
    setMenuOpen(false);
    navigate("/profile");
  }

  function handleSignOut() {
    setMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header
      className="relative w-full flex items-center justify-between gap-4 px-6 transition-all duration-300 z-20"
      style={{
        height: 80,
        backgroundColor: SURFACE,
        borderBottom: `1.5px solid ${BRAND}`,
        boxShadow: "0 4px 20px rgba(58,71,66,0.02)",
      }}
    >
      <style>{`
        @keyframes bellRing {
          0%, 100% { transform: rotate(0deg); }
          20%, 60% { transform: rotate(15deg); }
          40%, 80% { transform: rotate(-15deg); }
        }
        .hover-ring:hover svg {
          animation: bellRing 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes subtlePulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .live-heartbeat {
          animation: subtlePulse 2s infinite ease-in-out;
        }
        @keyframes menuReveal {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown {
          animation: menuReveal 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }
      `}</style>

      <div className="flex items-center gap-4 min-w-0 flex-1">
        <img
          src={piaLogo}
          alt="PIA Logo"
          className="h-29 w-55 shrink-0 object-contain"
        />

        <div
          className="hidden sm:flex items-center gap-2 rounded-xl px-3.5 h-10 w-full max-w-sm transition-all duration-200"
          style={{
            backgroundColor: PAGE_BG,
            border: `1.5px solid ${focused ? ACCENT : "transparent"}`,
            boxShadow: focused ? `0 0 0 4px rgba(201,162,39,0.12)` : "none",
            transform: focused ? "translateY(-1px)" : "none"
          }}
        >
          <Search
            size={16}
            style={{ color: focused ? ACCENT : MUTED }}
            className="shrink-0 transition-colors duration-150"
          />
          <input
            type="text"
            placeholder="Search devices, people, departments…"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-medium"
            style={{
              color: INK,
              outline: "none",
              boxShadow: "none"
            }}
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/10 bg-emerald-500/5 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-heartbeat" />
          <span className="text-[11px] font-semibold tracking-wide uppercase text-emerald-600" style={{ fontFamily: MONO }}>
            Live Sync
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex items-center justify-center rounded-xl transition-all duration-200 hover-ring hover:shadow-sm"
            style={{ width: 40, height: 40, backgroundColor: notifOpen ? PAGE_BG : "transparent" }}
            onMouseEnter={(e) => { if(!notifOpen) e.currentTarget.style.backgroundColor = PAGE_BG; }}
            onMouseLeave={(e) => { if(!notifOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <Bell size={19} style={{ color: notifOpen ? ACCENT : INK }} className="transition-colors duration-150" />
            {unreadCount > 0 && (
              <span
                className="absolute rounded-full ping-badge transition-transform duration-300"
                style={{
                  top: 9,
                  right: 10,
                  width: 8,
                  height: 8,
                  backgroundColor: "#B8503A",
                  border: `2px solid ${SURFACE}`,
                  boxShadow: "0 0 0 2px rgba(184,80,58,0.2)"
                }}
              />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 z-50 animate-dropdown">
              <NotificationPanel notifications={NOTIFICATIONS} onClose={() => setNotifOpen(false)} />
            </div>
          )}
        </div>

        {/* User Card with Smooth Panel Slide */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-xl pl-1.5 pr-3 h-11 transition-all duration-200 hover:shadow-sm"
            style={{ backgroundColor: menuOpen ? PAGE_BG : "transparent" }}
            onMouseEnter={(e) => { if(!menuOpen) e.currentTarget.style.backgroundColor = PAGE_BG; }}
            onMouseLeave={(e) => { if(!menuOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <div
              className="flex items-center justify-center rounded-lg text-[12px] font-bold shrink-0 transition-transform duration-200"
              style={{
                width: 32,
                height: 32,
                backgroundColor: BRAND,
                color: "#1d522a",
                transform: menuOpen ? "scale(1.05)" : "scale(1)"
              }}
            >
              {initials}
            </div>
            <div className="hidden md:block text-left leading-tight">
              <p className="text-[13px] font-bold tracking-[-0.01em]" style={{ color: INK }}>{fullName}</p>
              <p className="text-[10.5px] font-medium" style={{ color: MUTED }}>{ROLE_LABELS[user.role]}</p>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: MUTED,
                transform: menuOpen ? "rotate(180deg)" : "none",
                transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden z-50 animate-dropdown"
                style={{
                  backgroundColor: SURFACE,
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 16px 40px rgba(58,71,66,0.12)"
                }}
              >
                {/* Profile Brief header section */}
                <div className="px-4 py-3.5 bg-gradient-to-b from-transparent to-black/[0.01]" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="text-[13px] font-bold" style={{ color: INK }}>{fullName}</p>
                  <p className="text-[11px] font-medium mt-0.5" style={{ color: MUTED }}>{primaryEmail}</p>
                </div>

                {/* Menu Action Links Container */}
                <div className="p-1.5 space-y-0.5">
                  <MenuItem icon={UserCircle} label="My profile" onClick={goToProfile} />
                  <div style={{ borderTop: `1px solid ${BORDER}`, margin: "4px 0" }} />
                  <MenuItem icon={LogOut} label="Sign out" tone="danger" onClick={handleSignOut} />
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

function MenuItem({ icon: Icon, label, tone, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isDanger = tone === "danger";

  const defaultColor = isDanger ? "#B8503A" : INK;
  const hoverBgColor = isDanger ? "#B8503A" : ACCENT;
  const hoverTextColor = isDanger ? "#FFFFFF" : "#FFFCDC";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-semibold text-left rounded-lg transition-all duration-150"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? hoverTextColor : defaultColor,
        backgroundColor: hovered ? hoverBgColor : "transparent",
        transform: hovered ? "translateX(2px)" : "translateX(0px)"
      }}
    >
      <Icon size={15} className="shrink-0" />
      <span>{label}</span>
    </button>
  );
}