import React, { useState } from "react";
import Modal from "../common/Modal";
import { AlertTriangle } from "lucide-react";
import { INK, MUTED, BORDER, DANGER, SURFACE } from "../../theme";

const inputStyle = { border: `1px solid ${BORDER}`, backgroundColor: SURFACE, color: INK };
const baseInput = "w-full rounded-lg px-3 h-9 text-sm outline-none transition-shadow duration-150";

export default function MarkFaultyModal({ device, onClose, onConfirm }) {
  const [issue, setIssue] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [cost, setCost] = useState("");

  const handleConfirm = () => {
    // Matches device_logs "fault" variant: issue (required), action_taken (optional), cost (optional)
    onConfirm({
      device_id: device.id,
      issue,
      action_taken: actionTaken || undefined,
      cost: cost ? Number(cost) : undefined,
      timestamp: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Modal
      title="Mark as Faulty"
      subtitle={`${device.manufacturer} ${device.model} · ${device.id}`}
      onClose={onClose}
      width={440}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg px-4 h-9 text-sm font-medium" style={{ border: `1px solid ${BORDER}`, color: INK }}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!issue.trim()}
            className="rounded-lg px-4 h-9 text-sm font-medium disabled:opacity-40"
            style={{ backgroundColor: DANGER, color: "#FFFFFF" }}
          >
            Flag as Faulty
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3 rounded-lg p-3 mb-4" style={{ backgroundColor: `${DANGER}12` }}>
        <AlertTriangle size={17} style={{ color: DANGER }} className="shrink-0 mt-0.5" />
        <p className="text-[12.5px]" style={{ color: INK }}>
          This will change the device's status to <strong>faulty</strong> and log a fault event with the details below.
        </p>
      </div>

      <label className="block mb-3">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>Issue *</span>
        <textarea
          className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
          style={inputStyle}
          rows={2}
          placeholder="What's wrong with the device?"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        />
      </label>

      <label className="block mb-3">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>
          Action Taken <span style={{ color: MUTED, fontWeight: 400 }}>(optional)</span>
        </span>
        <input className={baseInput} style={inputStyle} placeholder="e.g. Technician dispatched" value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} />
      </label>

      <label className="block">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>
          Repair Cost <span style={{ color: MUTED, fontWeight: 400 }}>(optional)</span>
        </span>
        <input type="number" className={baseInput} style={inputStyle} placeholder="0" value={cost} onChange={(e) => setCost(e.target.value)} />
      </label>
    </Modal>
  );
}