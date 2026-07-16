import React from "react";
import {
  X,
  User,
  DoorOpen,
  Cpu,
  Share2,
  Laptop,
  Monitor,
  Printer,
  ScanLine,
  Server,
  Tablet,
  Router,
  HardDrive,
} from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, CREAM } from "../../theme";
import { EMPLOYEES, DEVICES } from "../../data";

const findEmployee = (id) => EMPLOYEES.find((e) => e.id === id);

const personalDevicesFor = (employeeId) =>
  DEVICES.filter((d) => !d.shared && d.assignedTo === employeeId);

const DEVICE_ICON_MAP = {
  laptop: Laptop,
  notebook: Laptop,
  desktop: Monitor,
  monitor: Monitor,
  printer: Printer,
  scanner: ScanLine,
  server: Server,
  tablet: Tablet,
  router: Router,
  storage: HardDrive,
  nas: HardDrive,
};

function getDeviceIcon(type) {
  if (!type) return Cpu;
  return DEVICE_ICON_MAP[type.toLowerCase().trim()] || Cpu;
}

export default function DepartmentDiagram({ department, onClose }) {
  const manager = department.manager_id ? findEmployee(department.manager_id) : null;

  const deptDevices = DEVICES.filter((d) => d.dept === department.name);
  const sharedDevices = deptDevices.filter((d) => d.shared);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <p className="text-sm font-semibold" style={{ color: INK }}>{department.name} - Structure Diagram</p>
          <button onClick={onClose} style={{ color: CREAM }}><X size={16} /></button>
        </div>

        {/* Root: department + manager */}
        <div className="flex justify-center mb-4" style={{color: CREAM}}>
          <Block CREAM title={department.name} 
          subtitle={manager ? `Manager: ${manager.name.first} ${manager.name.last}` : "No manager assigned"} icon={User} />
        </div>
        <Connector />

        
        <div className="rounded-2xl p-4" style={{ border: `1px dashed ${BORDER}` }}>
          {/* Locations row */}
          <div className="flex flex-wrap justify-center gap-6 mb-5">
            {department.locations.map((loc) => (
              <div key={loc.id} className="flex flex-col items-center">
                <Block title={loc.branch_location}  />
                <Connector small />

                <div className="flex flex-wrap justify-center gap-4">
                  {loc.sections.map((sec) => (
                    <div key={sec.id} className="flex flex-col items-center rounded-xl p-3" style={{ border: `1px dashed ${BORDER}`, backgroundColor: PAGE_BG }}>
                      <p className="text-[12px] font-semibold mb-2" style={{ color: INK }}>{sec.name}</p>

                      <div className="flex flex-col gap-2">
                        {sec.rooms.map((r) => (
                        <MiniBlock key={r.id} icon={DoorOpen} label={r.name}>
                          {r.person_ids.map((pid) => {
                            const emp = findEmployee(pid);
                            if (!emp) return null;
                            const devices = personalDevicesFor(pid);
                            const userName = `${emp.name.first} ${emp.name.last}`;
                            if (devices.length === 0) {
                              return <PersonTag key={pid}>{userName}</PersonTag>;
                            }
                            return devices.map((d) => (
                              <DeviceCard key={d.id} device={d} userName={userName} />
                            ));
                          })}
                        </MiniBlock>
                      ))}
                      {sec.cabins.map((c) => {
                        const emp = c.person_id ? findEmployee(c.person_id) : null;
                        const devices = c.person_id ? personalDevicesFor(c.person_id) : [];
                        const userName = emp ? `${emp.name.first} ${emp.name.last}` : null;
                        return (
                          <MiniBlock key={c.id} icon={User} label={c.name}>
                            {devices.length > 0 ? (
                              devices.map((d) => <DeviceCard key={d.id} device={d} userName={userName} />)
                            ) : (
                              emp && <PersonTag>{userName}</PersonTag>
                            )}
                          </MiniBlock>
                        );
                      })}
                                          
                        {sec.rooms.length === 0 && sec.cabins.length === 0 && (
                          <p className="text-[11px]" style={{ color: MUTED }}>Empty</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {loc.sections.length === 0 && (
                    <p className="text-[11.5px]" style={{ color: MUTED }}>No sections</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          
          {sharedDevices.length > 0 && (
            <div className="flex flex-col items-center pt-3" style={{ borderTop: `1px dashed ${BORDER}` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Share2 size={12} style={{ color: MUTED }} />
                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
                  Shared Equipment — {department.name}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {sharedDevices.map((d) => (
                  <DeviceCard key={d.id} device={d} />
                ))}
              </div>
            </div>
          )}

          {department.locations.length === 0 && sharedDevices.length === 0 && (
            <p className="text-[12.5px] text-center py-4" style={{ color: MUTED }}>No structure or devices yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
function Connector({ small }) {
  return <div style={{ width: 1, height: small ? 10 : 16, backgroundColor: BORDER, margin: "0 auto" }} />;
}
function Block({ title, subtitle, icon: Icon, accent }) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-4 py-2.5"
      style={{
        backgroundColor: accent ? BRAND : "#FFFFFF",
        border: `1px solid ${accent ? BRAND : BORDER}`,
        color: accent ? "#FFFCDC" : INK,
      }}
    >
      {Icon && <Icon size={14} />}
      <div>
        <p className="text-[13px] font-semibold leading-tight">{title}</p>
        {subtitle && <p className="text-[11px] leading-tight" style={{ color: accent ? "#F0EBC8" : MUTED }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function MiniBlock({ icon: Icon, label, children }) {
  return (
    <div className="rounded-lg px-2.5 py-2" style={{ border: `1px solid ${BORDER}`, backgroundColor: "#FFFFFF" }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={11} style={{ color: MUTED }} />
        <span className="text-[11.5px] font-medium" style={{ color: INK }}>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function DeviceCard({ device, userName }) {
  const Icon = getDeviceIcon(device.type);
  return (
    <div
      className="flex flex-col items-center text-center rounded-lg px-2 py-2 gap-0.5"
      style={{ border: `1px solid ${BORDER}`, backgroundColor: PAGE_BG, minWidth: 78, maxWidth: 96 }}
    >
      <Icon size={16} style={{ color: ACCENT }} />
      <p className="text-[10px] font-medium leading-tight break-words" style={{ color: INK }}>
        {device.manufacturer} {device.model}
      </p>
      <p className="text-[9px] leading-tight" style={{ color: userName ? MUTED : ACCENT, fontStyle: userName ? "normal" : "italic" }}>
        {userName || "Shared"}
      </p>
    </div>
  );
}

function PersonTag({ children }) {
  return (
    <span
      className="flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full"
      style={{ backgroundColor: PAGE_BG, color: ACCENT }}
    >
      <User size={10} />
      {children}
    </span>
  );
}