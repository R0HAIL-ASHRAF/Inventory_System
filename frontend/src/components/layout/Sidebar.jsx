import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import piaLogo from "../../assets/12logo.png";
import {
  LayoutGrid,
  Laptop2,
  Users,
  Building2,
  ScrollText,
  ChevronsLeft,
  ChevronsRight,
  Bell,
  FolderOpen
} from "lucide-react";
import { CREAM, BRAND, BRAND_SOFT, SURFACE, MONO, ACCENT, CREAMt } from "../../theme";
import { useAuth } from "../authContexts/AuthContext";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutGrid, end: true, roles: ["admin", "it_manager"] },
    ],
  },
  {
    label: "Assets",
    items: [
      { path: "/devices", label: "Devices", icon: Laptop2, count: 214, roles: ["admin", "it_manager"] },
      { path: "/categories", label: "Categories", icon: FolderOpen, roles: ["admin", "it_manager"]},
      { path: "/employees", label: "Employees", icon: Users, count: 86, roles: ["admin"] },
      { path: "/departments", label: "Departments", icon: Building2, roles: ["admin"] },
    ],
  },
  {
    label: "System",
    items: [
      { path: "/logs", label: "Activity Logs", icon: ScrollText, roles: ["admin", "it_manager"] },
      { path: "/notification", label: "Notifications", icon: Bell, count: 31, roles: ["admin", "it_manager"] },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth(); // hook now called inside the component body, where it belongs

  // Sidebar only ever mounts inside ProtectedRoute (see the nesting note below),
  // but this guard keeps it from crashing on a null user during that first tick.
  if (!user) return null;

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.includes(user.role)),
  })).filter((group) => group.items.length > 0);

  return (
    <aside
      className="h-screen flex flex-col  transition-all duration-300 ease-in-out relative z-20"
      style={{ width: collapsed ? 76 : 256, backgroundColor: CREAM }}
    >
      {/* Floating Border Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-22 flex items-center justify-center rounded-full transition-transform hover:scale-110 z-30"
        style={{ width: 24, height: 24, backgroundColor: CREAM, color: BRAND, border: `1px solid ${BRAND}` }}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? <ChevronsRight size={14} strokeWidth={2.5} /> : <ChevronsLeft size={14} strokeWidth={2.5} />}
      </button>

      {/* Brand Header */}
      <div
        className="shrink-0 w-full"
        style={{
          backgroundColor: "#FFFFFF",
          height: collapsed ? "0px" : "80px",
          transition: "height 0.3s ease",
          paddingTop: collapsed ? 80 : "10px",
        }}
      >
        <img src={piaLogo} alt="PIA Logo" className="w-full h-full " style={{ objectPosition: "top center" }} />
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 mt-2">
        {visibleGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10.5px] font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: ACCENT }}>
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    title={collapsed ? item.label : undefined}
                    className="relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 group overflow-hidden"
                    style={({ isActive }) => ({ backgroundColor: isActive ? CREAMt : "transparent", color: isActive ? ACCENT : SURFACE })}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.backgroundColor = BRAND_SOFT;
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full" style={{ backgroundColor: CREAM }} />}
                        <Icon size={27} className="shrink-0" style={{ color: ACCENT }} />
                        {!collapsed && <span className="flex-1 text-left font-medium truncate text-[15px]">{item.label}</span>}
                        {!collapsed && item.count !== undefined && (
                          <span
                            className="text-[11px] px-1.5 py-0.5 rounded shrink-0 font-medium"
                            style={{ fontFamily: MONO, color: isActive ? BRAND : SURFACE, backgroundColor: ACCENT }}
                          >
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
} 