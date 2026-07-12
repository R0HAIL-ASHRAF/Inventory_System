import React, { useState } from "react";
import Modal from "../common/Modal";
import { ArrowRight } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, SURFACE } from "../../theme";
import { DEPARTMENTS } from "../../data";

const inputStyle = { border: `1px solid ${BORDER}`, backgroundColor: SURFACE, color: INK };
const baseInput = "w-full rounded-lg px-3 h-9 text-sm outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.14)]";

export default function TransferDepartmentModal({ device, onClose, onTransfer }) {
  const [newDept, setNewDept] = useState(DEPARTMENTS.find((d) => d !== device.dept) ?? DEPARTMENTS[0]);
  const [room, setRoom] = useState("");
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onTransfer({
      device_id: device.id,
      prev_department: device.dept,
      new_department: newDept,
      new_room: room,
      description: reason,
      timestamp: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Modal
      title="Transfer Department"
      subtitle={`${device.manufacturer} ${device.model} · ${device.id}`}
      onClose={onClose}
      width={460}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg px-4 h-9 text-sm font-medium" style={{ border: `1px solid ${BORDER}`, color: INK }}>
            Cancel
          </button>
          <button onClick={handleConfirm} className="rounded-lg px-4 h-9 text-sm font-medium" style={{ backgroundColor: BRAND, color: SURFACE }}>
            Confirm Transfer
          </button>
        </>
      }
    >
      <div className="flex items-center justify-center gap-3 mb-5 text-sm font-medium">
        <span
          className="px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: "#EFEAD8", color: INK }}
        >
          {device.dept}
        </span>
        <ArrowRight size={16} style={{ color: ACCENT }} />
        <span
          className="px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: `${ACCENT}18`, color: ACCENT }}
        >
          {newDept}
        </span>
      </div>

      <label className="block mb-3">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>New Department</span>
        <select className={baseInput} style={inputStyle} value={newDept} onChange={(e) => setNewDept(e.target.value)}>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </label>

      <label className="block mb-3">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>New Room / Location</span>
        <input className={baseInput} style={inputStyle} placeholder="e.g. Room 204" value={room} onChange={(e) => setRoom(e.target.value)} />
      </label>

      <label className="block">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>Reason (optional)</span>
        <textarea
          className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
          style={inputStyle}
          rows={2}
          placeholder="Why is this device being transferred?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </label>
      <p className="text-[11.5px] mt-3" style={{ color: MUTED }}>
        This will be recorded as a transfer event in the device's activity log.
      </p>
    </Modal>
  );
}