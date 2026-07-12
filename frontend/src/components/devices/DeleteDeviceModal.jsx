import React, { useState } from "react";
import Modal from "../common/Modal";
import { Trash2 } from "lucide-react";
import { INK, MUTED, BORDER, DANGER } from "../../theme";

export default function DeleteDeviceModal({ device, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const matches = confirmText.trim() === device.id;

  return (
    <Modal
      title="Delete Device"
      onClose={onClose}
      width={420}
      footer={
        <>
          <button onClick={onClose} className="rounded-lg px-4 h-9 text-sm font-medium" style={{ border: `1px solid ${BORDER}`, color: INK }}>
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(device);
              onClose();
            }}
            disabled={!matches}
            className="rounded-lg px-4 h-9 text-sm font-medium disabled:opacity-40"
            style={{ backgroundColor: DANGER, color: "#FFFFFF" }}
          >
            Delete Permanently
          </button>
        </>
      }
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 40, height: 40, backgroundColor: `${DANGER}18` }}>
          <Trash2 size={18} style={{ color: DANGER }} />
        </div>
        <p className="text-[13.5px]" style={{ color: INK }}>
          This will permanently remove <strong>{device.manufacturer} {device.model}</strong> ({device.id}) from
          the inventory. This cannot be undone.
        </p>
      </div>

      <label className="block">
        <span className="text-[12px] font-medium mb-1.5 block" style={{ color: INK }}>
          Type <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{device.id}</span> to confirm
        </span>
        <input
          className="w-full rounded-lg px-3 h-9 text-sm outline-none"
          style={{ border: `1px solid ${BORDER}`, color: INK }}
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={device.id}
        />
      </label>
    </Modal>
  );
}