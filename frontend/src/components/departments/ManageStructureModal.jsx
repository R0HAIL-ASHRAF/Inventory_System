import React, { useState } from "react";
import { X, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { INK, MUTED, BORDER, BRAND, DANGER, CARD, PAGE_BG } from "../../theme";

// Small helper: immutably update a nested location/section by id.
const updateLocation = (locations, locId, fn) =>
  locations.map((l) => (l.id === locId ? fn(l) : l));
const updateSection = (sections, secId, fn) =>
  sections.map((s) => (s.id === secId ? fn(s) : s));

export default function ManageStructureModal({ department, onClose, onSave }) {
  const [locations, setLocations] = useState(department.locations);
  const [expanded, setExpanded] = useState({}); // { [locId or secId]: bool }
  const [drafts, setDrafts] = useState({}); // input text per add-row key

  const toggle = (key) => setExpanded((e) => ({ ...e, [key]: !e[key] }));
  const setDraft = (key, value) => setDrafts((d) => ({ ...d, [key]: value }));

  const addSection = (locId) => {
    const key = `sec-${locId}`;
    const name = (drafts[key] || "").trim();
    if (!name) return;
    setLocations((locs) =>
      updateLocation(locs, locId, (l) => ({
        ...l,
        sections: [...l.sections, { id: `SEC-${Date.now()}`, name, rooms: [], cabins: [] }],
      }))
    );
    setDraft(key, "");
  };

  const removeSection = (locId, secId) => {
    setLocations((locs) =>
      updateLocation(locs, locId, (l) => ({ ...l, sections: l.sections.filter((s) => s.id !== secId) }))
    );
  };

  const addRoom = (locId, secId) => {
    const key = `room-${secId}`;
    const name = (drafts[key] || "").trim();
    if (!name) return;
    setLocations((locs) =>
      updateLocation(locs, locId, (l) => ({
        ...l,
        sections: updateSection(l.sections, secId, (s) => ({
          ...s,
          rooms: [...s.rooms, { id: `RM-${Date.now()}`, name, person_ids: [] }],
        })),
      }))
    );
    setDraft(key, "");
  };

  const removeRoom = (locId, secId, roomId) => {
    setLocations((locs) =>
      updateLocation(locs, locId, (l) => ({
        ...l,
        sections: updateSection(l.sections, secId, (s) => ({ ...s, rooms: s.rooms.filter((r) => r.id !== roomId) })),
      }))
    );
  };

  const addCabin = (locId, secId) => {
    const key = `cabin-${secId}`;
    const name = (drafts[key] || "").trim();
    if (!name) return;
    setLocations((locs) =>
      updateLocation(locs, locId, (l) => ({
        ...l,
        sections: updateSection(l.sections, secId, (s) => ({
          ...s,
          cabins: [...s.cabins, { id: `CAB-${Date.now()}`, name, person_id: null }],
        })),
      }))
    );
    setDraft(key, "");
  };

  const removeCabin = (locId, secId, cabinId) => {
    setLocations((locs) =>
      updateLocation(locs, locId, (l) => ({
        ...l,
        sections: updateSection(l.sections, secId, (s) => ({ ...s, cabins: s.cabins.filter((c) => c.id !== cabinId) })),
      }))
    );
  };

  const handleSave = () => {
    onSave({ ...department, locations });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl p-5 max-h-[85vh] overflow-y-auto" style={CARD} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: INK }}>Manage Structure</p>
            <p className="text-[12px]" style={{ color: MUTED }}>{department.name}</p>
          </div>
          <button onClick={onClose} style={{ color: MUTED }}><X size={16} /></button>
        </div>

        <div className="space-y-3">
          {locations.map((loc) => (
            <div key={loc.id} className="rounded-xl p-3" style={{ border: `1px solid ${BORDER}`, backgroundColor: PAGE_BG }}>
              <button
                onClick={() => toggle(loc.id)}
                className="w-full flex items-center gap-2 text-left mb-2"
                style={{ color: INK }}
              >
                {expanded[loc.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="text-[13px] font-medium">{loc.branch_location}</span>
                <span className="ml-auto text-[11.5px]" style={{ color: MUTED }}>
                  {loc.sections.length} section{loc.sections.length !== 1 ? "s" : ""}
                </span>
              </button>

              {expanded[loc.id] && (
                <div className="pl-5 space-y-3">
                  {loc.sections.map((sec) => (
                    <div key={sec.id} className="rounded-lg p-2.5" style={{ border: `1px solid ${BORDER}`, backgroundColor: "#FFFFFF" }}>
                      <div className="flex items-center justify-between mb-2">
                        <button onClick={() => toggle(sec.id)} className="flex items-center gap-2" style={{ color: INK }}>
                          {expanded[sec.id] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          <span className="text-[12.5px] font-medium">{sec.name}</span>
                        </button>
                        <button onClick={() => removeSection(loc.id, sec.id)} style={{ color: DANGER }}>
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {expanded[sec.id] && (
                        <div className="pl-5 space-y-2">
                          {/* Rooms */}
                          {sec.rooms.map((r) => (
                            <div key={r.id} className="flex items-center justify-between text-[12px]" style={{ color: MUTED }}>
                              <span>🚪 {r.name} {r.person_ids.length > 0 && `(${r.person_ids.length} occupant${r.person_ids.length > 1 ? "s" : ""})`}</span>
                              <button onClick={() => removeRoom(loc.id, sec.id, r.id)} style={{ color: DANGER }}><Trash2 size={12} /></button>
                            </div>
                          ))}
                          <AddRow
                            placeholder="Add room…"
                            value={drafts[`room-${sec.id}`] || ""}
                            onChange={(v) => setDraft(`room-${sec.id}`, v)}
                            onAdd={() => addRoom(loc.id, sec.id)}
                          />

                          {/* Cabins */}
                          {sec.cabins.map((c) => (
                            <div key={c.id} className="flex items-center justify-between text-[12px]" style={{ color: MUTED }}>
                              <span>🧑‍💼 {c.name} {c.person_id ? "(occupied)" : "(vacant)"}</span>
                              <button onClick={() => removeCabin(loc.id, sec.id, c.id)} style={{ color: DANGER }}><Trash2 size={12} /></button>
                            </div>
                          ))}
                          <AddRow
                            placeholder="Add cabin…"
                            value={drafts[`cabin-${sec.id}`] || ""}
                            onChange={(v) => setDraft(`cabin-${sec.id}`, v)}
                            onAdd={() => addCabin(loc.id, sec.id)}
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  <AddRow
                    placeholder="Add section…"
                    value={drafts[`sec-${loc.id}`] || ""}
                    onChange={(v) => setDraft(`sec-${loc.id}`, v)}
                    onAdd={() => addSection(loc.id)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="text-sm px-3.5 h-9 rounded-lg" style={{ color: MUTED, border: `1px solid ${BORDER}` }}>Cancel</button>
          <button onClick={handleSave} className="text-sm px-3.5 h-9 rounded-lg font-medium" style={{ backgroundColor: BRAND, color: "#FFFCDC" }}>Save Structure</button>
        </div>
      </div>
    </div>
  );
}

function AddRow({ placeholder, value, onChange, onAdd }) {
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder={placeholder}
        className="flex-1 px-2.5 h-8 rounded-md text-[12.5px] outline-none"
        style={{ border: `1px solid ${BORDER}` }}
      />
      <button onClick={onAdd} className="flex items-center justify-center rounded-md" style={{ width: 30, height: 30, border: `1px solid ${BORDER}` }}>
        <Plus size={13} />
      </button>
    </div>
  );
}