import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "../authContexts/AuthContext";
import { INK, MUTED, BORDER, SURFACE, ACCENT, CREAM, FONT_DISPLAY } from "../../theme";
import { ROLE_LABELS } from "../../data";

export default function UserMenu() {
  const { user, logout } = useAuth(); // hook called inside the component — this is the fix from last time
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) return null;

  const fullName = `${user.name.first} ${user.name.last}`;
  const initials = `${user.name.first[0]}${user.name.last[0]}`.toUpperCase();
  const primaryEmail = (user.emails && user.emails[0]) || "—";

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full pl-1 pr-2.5 py-1 transition-colors duration-150"
        style={{ backgroundColor: open ? "#F3EFE0" : "transparent" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[12px] font-semibold"
          style={{ backgroundColor: "rgba(201,162,39,0.16)", color: ACCENT, fontFamily: FONT_DISPLAY }}
        >
          {initials}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[13px] font-semibold leading-tight" style={{ color: INK }}>{fullName}</p>
          <p className="text-[11px] leading-tight" style={{ color: MUTED }}>{ROLE_LABELS[user.role]}</p>
        </div>
        <ChevronDown size={15} style={{ color: MUTED, transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl overflow-hidden z-50"
          style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: "0 8px 24px rgba(20,32,26,0.12)" }}
        >
          <div className="px-3.5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <p className="text-[13px] font-semibold" style={{ color: INK }}>{fullName}</p>
            <p className="text-[11.5px] mt-0.5" style={{ color: MUTED }}>{primaryEmail}</p>
            <span
              className="inline-block mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.02em] px-2 py-0.5 rounded-full"
              style={{ color: ACCENT, backgroundColor: "rgba(201,162,39,0.14)" }}
            >
              {ROLE_LABELS[user.role]}
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-[#F3EFE0]"
            style={{ color: INK }}
          >
            <User size={15} style={{ color: MUTED }} />
            View profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-[#FBEAE5]"
            style={{ color: "#D6431F" }}
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}