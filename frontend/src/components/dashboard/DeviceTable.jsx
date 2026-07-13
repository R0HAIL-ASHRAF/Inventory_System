import React, { useState } from "react";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, MONO, FONT_DISPLAY, DANGER, SUCCESS, PAGE_BG } from "../../theme";
import { RECENT_DEVICES, RECENT_PEOPLE } from "../../data";

// Component-specific context menu dropdown imports
import DeviceRowActionsMenu from "../devices/RowActionMenu";
import EmployeeRowActionsMenu from "../employees/RowActionsMenu";

// Device Modal System Imports
import ViewDeviceModal from "../devices/ViewDeviceModal";
import EditDeviceModal from "../devices/EditDeviceModal";
import TransferDepartmentModal from "../devices/TransferDepatModal";
import MarkFaultyModal from "../devices/MarkFaultyModal";
import DeleteDeviceModal from "../devices/DeleteDeviceModal";

// Employee Modal System Imports
import ViewEmployeeModal from "../employees/ViewEmployeeModal";
import EditEmployeeModal from "../employees/EditEmployeeModal";
import TransferPlacementModal from "../employees/TransferPlacementModal";
import DeleteEmployeeModal from "../employees/DeleteEmployeeModal";

export default function DeviceTable() {
  const [tab, setTab] = useState("devices");
  const [hoveredRow, setHoveredRow] = useState(null);
  
  // Action state management mirroring your core page modules
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // { type, item }

  const rows = tab === "devices" ? RECENT_DEVICES : RECENT_PEOPLE;

  const handleAction = (action, item) => setActiveModal({ type: action, item });
  const closeModal = () => setActiveModal(null);

  return (
    <div className="rounded-2xl p-6 transition-all duration-300" style={CARD}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-row { animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
        {[
          { key: "devices", label: "Recent Devices" },
          { key: "people", label: "Recent People" },
        ].map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setOpenMenuId(null);
              }}
              className="pb-3 text-[12.5px] font-semibold uppercase tracking-[0.03em] relative transition-all duration-200 ease-out"
              style={{ 
                color: isActive ? INK : MUTED, 
                fontFamily: FONT_DISPLAY,
                transform: isActive ? "scale(1.02)" : "scale(1)"
              }}
            >
              {t.label}
              <span 
                className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full transition-all duration-300 ease-out" 
                style={{ 
                  backgroundColor: ACCENT,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left"
                }} 
              />
            </button>
          );
        })}
      </div>

      {/* Rows Container */}
      <div className="space-y-1">
        {rows.map((r, idx) => {
          const Icon = r.icon;
          const up = r.change >= 0;
          const isHovered = hoveredRow === r.name;
          const isMenuOpen = openMenuId === r.name;

          return (
            <div
              key={`${tab}-${r.name}`}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 animate-row opacity-0"
              onMouseEnter={() => setHoveredRow(r.name)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                position: "relative",
                backgroundColor: isHovered || isMenuOpen ? PAGE_BG : "transparent",
                transform: isHovered ? "translateX(4px)" : "translateX(0px)",
                transition: "background-color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animationDelay: `${idx * 40}ms`,
                // FORCE ACTIVE DROPDOWN ROWS TO FLOATING TOP LEVEL LAYER
                zIndex: isMenuOpen ? 50 : isHovered ? 20 : 1,
              }}
            >
              {/* Icon Frame */}
              <div 
                className="flex items-center justify-center rounded-lg shrink-0 transition-transform duration-200" 
                style={{ 
                  width: 36, 
                  height: 36, 
                  backgroundColor: BRAND,
                  transform: isHovered ? "scale(1.08)" : "scale(1)"
                }}
              >
                {Icon ? <Icon size={16} color="#1d522a" /> : (
                  <span className="text-[11px] font-bold text-[#1d522a]">
                    {r.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>

              {/* Identity Block */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13.5px] font-semibold tracking-[-0.01em] truncate transition-colors duration-150" style={{ color: isHovered ? ACCENT : INK }}>
                    {r.name}
                  </p>
                  <ExternalLink 
                    size={12} 
                    className="transition-all duration-200"
                    style={{ 
                      color: MUTED, 
                      opacity: isHovered ? 1 : 0.3,
                      transform: isHovered ? "translate(1px, -1px)" : "none" 
                    }} 
                  />
                </div>
                <p className="text-[11.5px] truncate" style={{ color: MUTED, letterSpacing: "0.005em" }}>{r.sub}</p>
              </div>

              {/* Department Block */}
              <p className="text-[12.5px] w-28 shrink-0 hidden sm:block" style={{ color: MUTED, letterSpacing: "0.005em" }}>{r.dept}</p>

              {/* Status String */}
              <div className="flex items-center gap-1.5 w-20 shrink-0 justify-end">
                <span
                  className="text-[13px] font-medium"
                  style={{ color: INK, fontFamily: MONO, fontFeatureSettings: "'tnum'" }}
                >
                  {r.stat}
                </span>
              </div>

              {/* Metric Delta Tag */}
              {r.change !== 0 && (
                <div
                  className="flex items-center gap-0.5 text-[11.5px] font-medium px-1.5 py-0.5 rounded shrink-0 transition-transform duration-300"
                  style={{ 
                    color: up ? SUCCESS : DANGER, 
                    backgroundColor: up ? "rgba(92,130,100,0.12)" : "rgba(184,80,58,0.12)", 
                    fontFamily: MONO, 
                    fontFeatureSettings: "'tnum'",
                    transform: isHovered ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(r.change)}%
                </div>
              )}

              {/* Context Action Menu Dropdown Anchor */}
              <div className="relative shrink-0" style={{ zIndex: 60 }}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(isMenuOpen ? null : r.name);
                  }}
                  style={{ color: MUTED }} 
                  className="p-1 transition-transform duration-200 hover:rotate-90 block relative"
                >
                  <MoreHorizontal size={16} />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 z-50">
                    {tab === "devices" ? (
                      <DeviceRowActionsMenu device={r} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                    ) : (
                      <EmployeeRowActionsMenu employee={r} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modals Injection System */}
      {tab === "devices" && activeModal?.type === "view" && <ViewDeviceModal device={activeModal.item} onClose={closeModal} />}
      {tab === "devices" && activeModal?.type === "edit" && <EditDeviceModal device={activeModal.item} onClose={closeModal} onSave={closeModal} />}
      {tab === "devices" && activeModal?.type === "transfer" && <TransferDepartmentModal device={activeModal.item} onClose={closeModal} onTransfer={closeModal} />}
      {tab === "devices" && activeModal?.type === "flag-faulty" && <MarkFaultyModal device={activeModal.item} onClose={closeModal} onConfirm={closeModal} />}
      {tab === "devices" && activeModal?.type === "delete" && <DeleteDeviceModal device={activeModal.item} onClose={closeModal} onConfirm={closeModal} />}

      {tab === "people" && activeModal?.type === "view" && <ViewEmployeeModal employee={activeModal.item} onClose={closeModal} />}
      {tab === "people" && activeModal?.type === "edit" && <EditEmployeeModal employee={activeModal.item} onClose={closeModal} onSave={closeModal} />}
      {tab === "people" && activeModal?.type === "transfer" && <TransferPlacementModal employee={activeModal.item} onClose={closeModal} onTransfer={closeModal} />}
      {tab === "people" && activeModal?.type === "delete" && <DeleteEmployeeModal employee={activeModal.item} onClose={closeModal} onConfirm={closeModal} />}
    </div>
  );
}