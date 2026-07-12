import React, { useState } from "react";
import { Search, Bell, ChevronDown, Plus, LogOut, Settings, UserCircle } from "lucide-react";

const INK = "#3A4742";
const MUTED = "#3A4742";
const BORDER = "#3A4742";
const ACCENT = "#3A4742";
const NAVY = "#3A4742";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 w-full flex items-center justify-between gap-4 bg-white px-6"
      style={{ height: 64, borderBottom: `1.5px solid ${BORDER}`, boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}
    >
      {/*search */}
      <div className="flex items-center gap-6 min-w-0 flex-1">
        <div
          className="hidden sm:flex items-center gap-2 rounded-lg px-3 h-9 w-full max-w-sm transition-shadow duration-150"
          style={{
            backgroundColor: "#F5F7FA",
            border: `1px solid ${focused ? ACCENT : "transparent"}`,
            
          }}
        >
          <Search size={16} style={{ color: MUTED }} className="shrink-0" />
          <input
            type="text"
            placeholder="Search devices, people, departments…"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
            style={{ 
              color: INK,
              outline: "none",
              boxShadow: "none"
             }}
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 h-9 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <Plus size={15} strokeWidth={2.5} />
          New Device
        </button>

        <div style={{ width: 1, height: 24, backgroundColor: BORDER }} />

        <button
          className="relative flex items-center justify-center rounded-lg transition-colors duration-150"
          style={{ width: 36, height: 36 }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F7FA")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <Bell size={18} style={{ color: INK }} />
          <span
            className="absolute rounded-full"
            style={{ top: 8, right: 9, width: 7, height: 7, backgroundColor: "#DC5B4C", border: "2px solid white" }}
          />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg pl-1 pr-2 h-9 transition-colors duration-150"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F7FA")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div
              className="flex items-center justify-center rounded-full text-white text-[12px] font-semibold shrink-0"
              style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${ACCENT}, ${NAVY})` }}
            >
              AR
            </div>
            <div className="hidden md:block text-left leading-tight">
              <p className="text-[13px] font-semibold" style={{ color: INK }}>
                Ali Raza
              </p>
              <p className="text-[11px]" style={{ color: MUTED }}>
                IT Asset Manager
              </p>
            </div>
            <ChevronDown
              size={15}
              style={{ color: MUTED, transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform 150ms" }}
            />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 mt-2 w-52 rounded-xl bg-white overflow-hidden z-50"
                style={{ border: `1px solid ${BORDER}`, boxShadow: "0 12px 32px rgba(16,24,40,0.14)" }}
              >
                <div className="px-3.5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="text-[13px] font-semibold" style={{ color: INK }}>
                    Ali Raza
                  </p>
                  <p className="text-[11.5px]" style={{ color: MUTED }}>
                    ali.raza@piac.com
                  </p>
                </div>
                <div className="py-1.5">
                  <MenuItem icon={UserCircle} label="My profile" />
                  <MenuItem icon={Settings} label="Preferences" />
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
  const color = tone === "danger" ? "#C0392B" : INK;
  return (
    <button
      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-left transition-colors duration-150"
      style={{ color }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5F7FA")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}