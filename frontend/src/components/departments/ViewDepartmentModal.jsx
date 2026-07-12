import React from "react";
import { X, MapPin, Layers, DoorOpen, User } from "lucide-react";
import { INK, MUTED, BORDER, CARD, PAGE_BG } from "../../theme";

export default function ViewDepartmentModal({ department, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-semibold" style={{ color: INK }}>{department.name}</p>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <div className="space-y-3">
          {department.locations.map((loc) => (
            <div key={loc.id} className="rounded-xl p-3" style={{ border: `1px solid ${BORDER}`, backgroundColor: PAGE_BG }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={13} style={{ color: MUTED }} />
                <p className="text-[13px] font-medium" style={{ color: INK }}>{loc.branch_location}</p>
              </div>

              <div className="pl-5 space-y-2">
                {loc.sections.map((sec) => (
                  <div key={sec.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <Layers size={12} style={{ color: MUTED }} />
                      <p className="text-[12.5px] font-medium" style={{ color: INK }}>{sec.name}</p>
                    </div>
                    <div className="pl-5 space-y-1">
                      {sec.rooms.map((r) => (
                        <Row key={r.id} icon={DoorOpen} name={r.name} count={r.person_ids.length} />
                      ))}
                      {sec.cabins.map((c) => (
                        <Row key={c.id} icon={User} name={c.name} count={c.person_id ? 1 : 0} />
                      ))}
                      {sec.rooms.length === 0 && sec.cabins.length === 0 && (
                        <p className="text-[11.5px]" style={{ color: MUTED }}>No rooms or cabins yet.</p>
                      )}
                    </div>
                  </div>
                ))}
                {loc.sections.length === 0 && (
                  <p className="text-[11.5px]" style={{ color: MUTED }}>No sections yet.</p>
                )}
              </div>
            </div>
          ))}
          {department.locations.length === 0 && (
            <p className="text-[12.5px] text-center py-6" style={{ color: MUTED }}>No locations added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, name, count }) {
  return (
    <div className="flex items-center justify-between text-[12px]" style={{ color: MUTED }}>
      <span className="flex items-center gap-1.5">
        <Icon size={11} />
        {name}
      </span>
      <span>{count > 0 ? `${count} occupant${count > 1 ? "s" : ""}` : "vacant"}</span>
    </div>
  );
}