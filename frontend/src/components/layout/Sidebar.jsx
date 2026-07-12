import React, { useState } from "react";
import piaLogo from "../../assets/logo.png";
import {
  LayoutGrid,
  Laptop2,
  Printer,
  Users,
  Building2,
  ScrollText,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  CircleUser,
} from "lucide-react";

const THEME = {
  sidebarBg: "#fffcdc",
  brandDark: "#3A4742",
  brandDarkHover: "rgba(58, 71, 66, 0.08)", 
  textMuted: "#71807A",        
  headerBg: "#FFFFFF",
  line: "#fffcdc"
};

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ key: "dashboard", label: "Dashboard", icon: LayoutGrid }],
  },
  {
    label: "Assets",
    items: [
      { key: "devices", label: "Devices", icon: Laptop2, count: 214 },
      { key: "shared", label: "Shared Equipment", icon: Printer, count: 18 },
    ],
  },
  {
    label: "People",
    items: [
      { key: "employees", label: "Employees", icon: Users, count: 86 },
      { key: "departments", label: "Departments", icon: Building2 },
    ],
  },
  {
    label: "System",
    items: [
      { key: "logs", label: "Activity Logs", icon: ScrollText },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <aside
      className="h-screen flex flex-col shrink-0 transition-all duration-300 ease-in-out relative z-20"
      style={{
        width: collapsed ? 76 : 256,
        backgroundColor: THEME.sidebarBg,
        //borderRight: `1px solid ${THEME.brandDark}`,
      }}
    >
      {/* Floating Border Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 flex items-center justify-center rounded-full transition-transform hover:scale-110 z-30"
        style={{
          width: 24,
          height: 24,
          backgroundColor: THEME.sidebarBg,
          color: THEME.brandDark,
          border: `1px solid ${THEME.brandDark}`,
        }}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? <ChevronsRight size={14} strokeWidth={2.5} /> : <ChevronsLeft size={14} strokeWidth={2.5} />}
      </button>

      {/* 2. Brand Header */}
      <div
        className="shrink-0 w-full overflow-hidden relative"
        style={{ 
          backgroundColor: THEME.headerBg, 
          height: collapsed ? "0px" : "158px",
          transition: "height 0.3s ease",
          paddingTop:collapsed ? 0 : "14px",
        }}
      >
        <img 
          src={piaLogo} 
          alt="PIA Logo" 
          className="w-full h-full object-cover"
          style={{
            objectPosition: "top center",
          }}
        />
      </div>

      {/* Nav Menu*/}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 mt-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p
                className="px-3 mb-2 text-[10.5px] font-semibold uppercase tracking-wider whitespace-nowrap"
                style={{ color: THEME.textMuted }}
              >
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    title={collapsed ? item.label : undefined}
                    className="relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 group overflow-hidden"
                    style={{
                      backgroundColor: isActive ? THEME.brandDark : "transparent",
                      color: isActive ? THEME.headerBg : THEME.brandDark,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = THEME.brandDarkHover;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full"
                        style={{ backgroundColor: THEME.line }}
                      />
                    )}
                    <Icon size={18} strokeWidth={2.25} className="shrink-0" />
                    {!collapsed && (
                      <span className="flex-1 text-left font-medium truncate">
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.count !== undefined && (
                      <span
                        className="text-[11px] px-1.5 py-0.5 rounded shrink-0 font-medium"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: isActive ? THEME.brandDark : THEME.headerBg,
                          backgroundColor: isActive ? THEME.headerBg : THEME.brandDark,
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Profile */}
      <div className="px-3 py-3" style={{ borderTop: `1px solid rgba(58, 71, 66, 0.15)` }}>
        <div
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 overflow-hidden transition-colors"
          style={{ backgroundColor: THEME.brandDarkHover }}
        >
          <CircleUser size={22} style={{ color: THEME.brandDark }} className="shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: THEME.brandDark }}>Aisha Raza</p>
              <p className="text-[11px] truncate font-medium" style={{ color: THEME.textMuted }}>
                IT Asset Manager
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}