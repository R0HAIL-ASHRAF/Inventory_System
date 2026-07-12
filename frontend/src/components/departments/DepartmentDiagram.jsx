import React from "react";
import { X, User, DoorOpen, Cpu, Share2 } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG } from "../../theme";
import { EMPLOYEES, DEVICES } from "../../data";

const findEmployee = (id) => EMPLOYEES.find((e) => e.id === id);

// Personal device assigned to a specific employee (matched by name, since
// DEVICES.assignedTo is currently a display string — swap to an id match
// once devices carry a real employee_id).
const personalDevicesFor = (employeeId) =>
  DEVICES.filter((d) => !d.shared && d.assignedTo === employeeId);

export default function DepartmentDiagram({ department, onClose }) {
  const manager = department.manager_id ? findEmployee(department.manager_id) : null;

  const deptDevices = DEVICES.filter((d) => d.dept === department.name);
  const sharedDevices = deptDevices.filter((d) => d.shared);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <p className="text-sm font-semibold" style={{ color: INK }}>{department.name} — Structure Diagram</p>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        {/* Root: department + manager */}
        <div className="flex justify-center mb-4">
          <Block accent title={department.name} subtitle={manager ? `Manager: ${manager.name.first} ${manager.name.last}` : "No manager assigned"} icon={User} />
        </div>
        <Connector />

        
        <div className="rounded-2xl p-4" style={{ border: `1px dashed ${BORDER}` }}>
          {/* Locations row */}
          <div className="flex flex-wrap justify-center gap-6 mb-5">
            {department.locations.map((loc) => (
              <div key={loc.id} className="flex flex-col items-center">
                <Block title={loc.branch_location} subtitle="Location" />
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
                            const devices = personalDevicesFor(pid); // was personalDevicesFor(empName)
                            return (
                              <React.Fragment key={pid}>
                                <Tag>{emp.name.first} {emp.name.last}</Tag>
                                {devices.map((d) => (
                                  <Tag key={d.id} icon={Cpu} muted>{d.manufacturer} {d.model}</Tag>
                                ))}
                              </React.Fragment>
                            );
                          })}
                        </MiniBlock>
                      ))}
                      {sec.cabins.map((c) => {
                        const emp = c.person_id ? findEmployee(c.person_id) : null;
                        const devices = c.person_id ? personalDevicesFor(c.person_id) : []; // was personalDevicesFor(empName)
                        return (
                          <MiniBlock key={c.id} icon={User} label={c.name}>
                            {emp && <Tag>{emp.name.first} {emp.name.last}</Tag>}
                            {devices.map((d) => (
                              <Tag key={d.id} icon={Cpu} muted>{d.manufacturer} {d.model}</Tag>
                            ))}
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

          {/* Shared equipment — sits inside the department container, outside
              every room/cabin, since it isn't tied to one person. */}
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
                  <Tag key={d.id} icon={Cpu}>{d.manufacturer} {d.model} · {d.id}</Tag>
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
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function Tag({ children, icon: Icon, muted }) {
  return (
    <span
      className="flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full"
      style={{ backgroundColor: muted ? "#F0EEE4" : PAGE_BG, color: muted ? MUTED : ACCENT }}
    >
      {Icon && <Icon size={10} />}
      {children}
    </span>
  );
}