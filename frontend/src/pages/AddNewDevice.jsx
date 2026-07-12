import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Laptop2, Printer, ArrowLeft } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, BRAND, CARD, PAGE_BG, SURFACE, MONO } from "../theme";
import { DEPARTMENTS } from "../data";

const DEVICE_TYPES = ["Laptop", "Desktop", "Monitor", "Server", "Printer", "Switch", "Projector"];
const STATUSES = ["dispatched", "in-use", "spare", "faulty"];
const DISK_TYPES = ["SSD", "HDD"];

const inputStyle = {
  border: `1px solid ${BORDER}`,
  backgroundColor: SURFACE,
  color: INK,
};

function Field({ label, children, optional }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium mb-1.5 block" style={{ color: INK }}>
        {label}
        {optional && <span className="font-normal ml-1" style={{ color: MUTED }}>(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl p-6" style={CARD}>
      <p className="text-sm font-semibold mb-0.5" style={{ color: INK }}>{title}</p>
      {subtitle && <p className="text-[12px] mb-4" style={{ color: MUTED }}>{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

const baseInput =
  "w-full rounded-lg px-3 h-9 text-sm outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.14)]";

export default function NewDevice() {
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);
  const [form, setForm] = useState({
    device_type: "Laptop",
    manufacturer: "",
    model: "",
    status: "spare",
    // personal specs
    cpu: "",
    ram_gb: "",
    disk_type: "SSD",
    storage_gb: "",
    os: "",
    // shared specs
    technology: "",
    color: false,
    ppm_speed: "",
    paper_capacity: "",
    duplex: false,
    // common
    ip_address: "",
    mac_address: "",
    department: DEPARTMENTS[0],
    location: "",
    section: "",
    room_or_cabin: "",
    assigned_to: "",
    shared_users: "",
    assigned_date: "",
  });

  const set = (key) => (e) => {
    const value = e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your API — this just logs the shape that would be sent.
    const payload = {
      device_type: form.device_type,
      is_shared: isShared,
      manufacturer: form.manufacturer,
      model: form.model,
      status: form.status,
      specs: isShared
        ? {
            technology: form.technology,
            color: form.color,
            ppm_speed: form.ppm_speed,
            paper_capacity: Number(form.paper_capacity),
            duplex: form.duplex,
            ip_address: form.ip_address || undefined,
            mac_address: form.mac_address || undefined,
          }
        : {
            cpu: form.cpu,
            ram_gb: Number(form.ram_gb),
            disk_type: form.disk_type,
            storage_gb: Number(form.storage_gb),
            os: form.os,
            ip_address: form.ip_address || undefined,
            mac_address: form.mac_address || undefined,
          },
      assignment: isShared
        ? {
            department_id: form.department,
            location_id: form.location,
            section_id: form.section,
            room_id: form.room_or_cabin || undefined,
            shared_users: form.shared_users ? form.shared_users.split(",").map((s) => s.trim()) : [],
            assigned_date: form.assigned_date || undefined,
          }
        : {
            user_id: form.assigned_to,
            department_id: form.department,
            location_id: form.location,
            section_id: form.section,
            room_id: form.room_or_cabin || undefined,
            assigned_date: form.assigned_date,
          },
    };
    console.log("New device payload:", payload);
    navigate("/devices");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/devices")}
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{ width: 34, height: 34, border: `1px solid ${BORDER}`, color: MUTED }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="text-lg font-semibold" style={{ color: INK }}>Add New Device</p>
          <p className="text-[12.5px]" style={{ color: MUTED }}>Register a new asset in the inventory</p>
        </div>
      </div>

      {/* Device type toggle */}
      <div className="rounded-2xl p-2 flex gap-2" style={CARD}>
        {[
          { key: false, label: "Personal Device", sub: "Assigned to one person", icon: Laptop2 },
          { key: true, label: "Shared Equipment", sub: "Printers, switches, shared gear", icon: Printer },
        ].map((opt) => {
          const Icon = opt.icon;
          const active = isShared === opt.key;
          return (
            <button
              key={String(opt.key)}
              type="button"
              onClick={() => setIsShared(opt.key)}
              className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-150"
              style={{ backgroundColor: active ? BRAND : "transparent", color: active ? "#FFFCDC" : INK }}
            >
              <Icon size={18} />
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-[11.5px]" style={{ color: active ? "#C7D1CB" : MUTED }}>{opt.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Basic info */}
      <Section title="Basic Info">
        <Field label="Device Type">
          <select className={baseInput} style={inputStyle} value={form.device_type} onChange={set("device_type")}>
            {DEVICE_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={baseInput} style={inputStyle} value={form.status} onChange={set("status")}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Manufacturer">
          <input className={baseInput} style={inputStyle} placeholder="e.g. Dell" value={form.manufacturer} onChange={set("manufacturer")} required />
        </Field>
        <Field label="Model">
          <input className={baseInput} style={inputStyle} placeholder="e.g. Latitude 5440" value={form.model} onChange={set("model")} required />
        </Field>
      </Section>

      {/* Specs — conditional on isShared */}
      {!isShared ? (
        <Section title="Specifications" subtitle="Personal device — CPU, storage, OS">
          <Field label="CPU">
            <input className={baseInput} style={inputStyle} placeholder="e.g. Intel i7-1355U" value={form.cpu} onChange={set("cpu")} required />
          </Field>
          <Field label="RAM (GB)">
            <input type="number" className={baseInput} style={inputStyle} placeholder="16" value={form.ram_gb} onChange={set("ram_gb")} required />
          </Field>
          <Field label="Disk Type">
            <select className={baseInput} style={inputStyle} value={form.disk_type} onChange={set("disk_type")}>
              {DISK_TYPES.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Storage (GB)">
            <input type="number" className={baseInput} style={inputStyle} placeholder="512" value={form.storage_gb} onChange={set("storage_gb")} required />
          </Field>
          <Field label="Operating System">
            <input className={baseInput} style={inputStyle} placeholder="e.g. Windows 11 Pro" value={form.os} onChange={set("os")} required />
          </Field>
          <Field label="IP Address" optional>
            <input className={baseInput} style={inputStyle} placeholder="192.168.1.20" value={form.ip_address} onChange={set("ip_address")} />
          </Field>
          <Field label="MAC Address" optional>
            <input className={baseInput} style={inputStyle} placeholder="00:1B:44:11:3A:B7" value={form.mac_address} onChange={set("mac_address")} />
          </Field>
        </Section>
      ) : (
        <Section title="Specifications" subtitle="Shared equipment — printer / switch style fields">
          <Field label="Technology">
            <input className={baseInput} style={inputStyle} placeholder="e.g. Laser" value={form.technology} onChange={set("technology")} required />
          </Field>
          <Field label="PPM Speed" optional>
            <input className={baseInput} style={inputStyle} placeholder="e.g. 40ppm" value={form.ppm_speed} onChange={set("ppm_speed")} />
          </Field>
          <Field label="Paper Capacity">
            <input type="number" className={baseInput} style={inputStyle} placeholder="250" value={form.paper_capacity} onChange={set("paper_capacity")} required />
          </Field>
          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 text-[13px]" style={{ color: INK }}>
              <input type="checkbox" checked={form.color} onChange={set("color")} />
              Color
            </label>
            <label className="flex items-center gap-2 text-[13px]" style={{ color: INK }}>
              <input type="checkbox" checked={form.duplex} onChange={set("duplex")} />
              Duplex
            </label>
          </div>
          <Field label="IP Address" optional>
            <input className={baseInput} style={inputStyle} placeholder="192.168.1.50" value={form.ip_address} onChange={set("ip_address")} />
          </Field>
          <Field label="MAC Address" optional>
            <input className={baseInput} style={inputStyle} placeholder="00:1B:44:11:3A:B7" value={form.mac_address} onChange={set("mac_address")} />
          </Field>
        </Section>
      )}

      {/* Assignment */}
      <Section title="Assignment" subtitle={isShared ? "Where this shared device lives" : "Who this device is assigned to"}>
        <Field label="Department">
          <select className={baseInput} style={inputStyle} value={form.department} onChange={set("department")}>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Location">
          <input className={baseInput} style={inputStyle} placeholder="e.g. Head Office" value={form.location} onChange={set("location")} required />
        </Field>
        <Field label="Section">
          <input className={baseInput} style={inputStyle} placeholder="e.g. 2nd Floor" value={form.section} onChange={set("section")} required />
        </Field>
        <Field label={isShared ? "Room" : "Room / Cabin"} optional>
          <input className={baseInput} style={inputStyle} placeholder="e.g. Room 204" value={form.room_or_cabin} onChange={set("room_or_cabin")} />
        </Field>

        {!isShared ? (
          <>
            <Field label="Assigned To">
              <input className={baseInput} style={inputStyle} placeholder="Search employee…" value={form.assigned_to} onChange={set("assigned_to")} required />
            </Field>
            <Field label="Assigned Date">
              <input type="date" className={baseInput} style={inputStyle} value={form.assigned_date} onChange={set("assigned_date")} required />
            </Field>
          </>
        ) : (
          <>
            <Field label="Shared Users" optional>
              <input className={baseInput} style={inputStyle} placeholder="Comma-separated names" value={form.shared_users} onChange={set("shared_users")} />
            </Field>
            <Field label="Assigned Date" optional>
              <input type="date" className={baseInput} style={inputStyle} value={form.assigned_date} onChange={set("assigned_date")} />
            </Field>
          </>
        )}
      </Section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate("/devices")}
          className="rounded-lg px-4 h-10 text-sm font-medium"
          style={{ border: `1px solid ${BORDER}`, color: INK }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg px-5 h-10 text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BRAND, color: "#FFFCDC" }}
        >
          Add Device
        </button>
      </div>
    </form>
  );
}