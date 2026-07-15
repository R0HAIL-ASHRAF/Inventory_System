import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, ShieldCheck } from "lucide-react";
import { INK, MUTED, BORDER, CARD, SURFACE, ACCENT, FONT_DISPLAY, CREAMt, DANGER } from "../theme";
import { DEPARTMENTS } from "../data";

const PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan", "Islamabad Capital Territory"];

const LOGIN_ROLES = [
  { value: "admin", label: "System Administrator" },
  { value: "it_manager", label: "IT Asset Manager" },
];

const inputStyle = {
  border: `1px solid ${BORDER}`,
  backgroundColor: SURFACE,
  color: INK,
};

const baseInput =
  "w-full rounded-lg px-3 h-9 text-sm outline-none transition-shadow duration-150 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.14)]";

function Field({ label, children, optional, required }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium mb-1.5 block" style={{ color: INK }}>
        {label}
        {required && <span style={{ color: DANGER, marginLeft: 3 }}>*</span>}
        {optional && <span className="font-normal ml-1" style={{ color: MUTED }}>(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Section({ title, subtitle, children, className = "" }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col ${className}`} style={CARD}>
      <p className="text-sm font-semibold mb-0.5" style={{ color: INK }}>{title}</p>
      {subtitle ? (
        <p className="text-[12px] mb-4" style={{ color: MUTED }}>{subtitle}</p>
      ) : (
        <div className="mb-4" />
      )}
      <div className="grid grid-cols-1 gap-3.5 flex-1">{children}</div>
    </div>
  );
}

export default function NewEmployee() {
  const navigate = useNavigate();
  const [hasLogin, setHasLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    father_first_name: "",
    father_last_name: "",
    designation: "",
    p_number: "",
    phones: "",
    emails: "",
    street: "",
    town: "",
    city: "",
    province: PROVINCES[0],
    country: "Pakistan",
    department: DEPARTMENTS[0],
    location: "",
    section: "",
    room: "",
    cabin: "",
    role: "admin",
    username: "",
    password: "",
  });

  const set = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const base = {
      id: `EMP-${Math.floor(2000 + Math.random() * 8000)}`,
      name: { first: form.first_name, last: form.last_name },
      father_name: { first: form.father_first_name, last: form.father_last_name },
      designation: form.designation,
      p_number: form.p_number,
      phones: form.phones.split(",").map((p) => p.trim()).filter(Boolean),
      emails: form.emails.split(",").map((e) => e.trim()).filter(Boolean),
      address: {
        street: form.street,
        town: form.town,
        city: form.city,
        province: form.province,
        country: form.country,
      },
      department: form.department,
      location: form.location,
      section: form.section,
      room: form.room,
      cabin: form.cabin,
    };

    const payload = hasLogin
      ? { ...base, role: form.role, username: form.username, password: form.password }
      : base;

    console.log("New employee payload:", payload);
    navigate("/employees");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-4 pb-10">
      {/* Header + login toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[33px] font-semibold" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>Add New Employee</p>
          <p className="text-[12.5px]" style={{ color: CREAMt }}>Register a new person on record</p>
        </div>

        <div className="rounded-2xl p-1.5 flex gap-1.5" style={CARD}>
          {[
            { key: false, label: "Employee Record", sub: "No system access" },
            { key: true, label: "Grant System Login", sub: "Admin or IT Asset Manager only" },
          ].map((opt) => {
            const active = hasLogin === opt.key;
            const Icon = opt.key ? ShieldCheck : UserRound;
            return (
              <button
                key={String(opt.key)}
                type="button"
                onClick={() => setHasLogin(opt.key)}
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-left transition-colors duration-150"
                style={{ backgroundColor: active ? ACCENT : "transparent", color: active ? "#FFFCDC" : INK }}
              >
                <Icon size={16} />
                <div>
                  <p className="text-[12.5px] font-medium leading-tight">{opt.label}</p>
                  <p className="text-[10.5px] leading-tight" style={{ color: active ? CREAMt : MUTED }}>{opt.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <Section title="Personal Info">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" required>
              <input className={baseInput} style={inputStyle} value={form.first_name} onChange={set("first_name")} required />
            </Field>
            <Field label="Last Name" required>
              <input className={baseInput} style={inputStyle} value={form.last_name} onChange={set("last_name")} required />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Father's First Name" optional>
              <input className={baseInput} style={inputStyle} value={form.father_first_name} onChange={set("father_first_name")} />
            </Field>
            <Field label="Father's Last Name" optional>
              <input className={baseInput} style={inputStyle} value={form.father_last_name} onChange={set("father_last_name")} />
            </Field>
          </div>
          <Field label="Designation" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. Front Desk Executive" value={form.designation} onChange={set("designation")} required />
          </Field>
          <Field label="Personnel Number" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. P-10256" value={form.p_number} onChange={set("p_number")} required />
          </Field>
          <Field label="Phone Numbers" required>
            <input className={baseInput} style={inputStyle} placeholder="Comma-separated, e.g. 0300-1234567" value={form.phones} onChange={set("phones")} required />
          </Field>
          <Field label="Emails" required>
            <input className={baseInput} style={inputStyle} placeholder="Comma-separated" value={form.emails} onChange={set("emails")} required />
          </Field>
        </Section>

        <Section title="Address">
          <Field label="Street" required>
            <input className={baseInput} style={inputStyle} placeholder="House / Street" value={form.street} onChange={set("street")} required />
          </Field>
          <Field label="Town" required>
            <input className={baseInput} style={inputStyle} value={form.town} onChange={set("town")} required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" required>
              <input className={baseInput} style={inputStyle} value={form.city} onChange={set("city")} required />
            </Field>
            <Field label="Province" required>
              <select className={baseInput} style={inputStyle} value={form.province} onChange={set("province")} required>
                {PROVINCES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Country" required>
            <input className={baseInput} style={inputStyle} value={form.country} onChange={set("country")} required />
          </Field>
        </Section>

        <Section title="Placement" >
          <Field label="Department" required>
            <select className={baseInput} style={inputStyle} value={form.department} onChange={set("department")} required>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Location" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. Head Office" value={form.location} onChange={set("location")} required />
          </Field>
          <Field label="Section" required>
            <input className={baseInput} style={inputStyle} placeholder="e.g. Customer Services" value={form.section} onChange={set("section")} required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Room" optional>
              <input className={baseInput} style={inputStyle} value={form.room} onChange={set("room")} />
            </Field>
            <Field label="Cabin" optional>
              <input className={baseInput} style={inputStyle} value={form.cabin} onChange={set("cabin")} />
            </Field>
          </div>

          {/* System access — only rendered when the toggle above is on */}
          {hasLogin && (
            <div className="rounded-xl p-3.5 mt-1" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
              <p className="text-[11.5px] font-semibold uppercase tracking-wide mb-3" style={{ color: ACCENT }}>
                System Access
              </p>

              <div className="space-y-3">
                <Field label="Role" required>
                  <select className={baseInput} style={inputStyle} value={form.role} onChange={set("role")} required>
                    {LOGIN_ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </Field>
                <Field label="Username" required>
                  <input className={baseInput} style={inputStyle} placeholder="e.g. bahmed.itmgr" value={form.username} onChange={set("username")} required />
                </Field>
                <Field label="Password" required>
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={baseInput}
                      style={inputStyle}
                      value={form.password}
                      onChange={set("password")}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="text-[11px] font-semibold shrink-0"
                      style={{ color: ACCENT }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </Field>
                <p className="text-[11px] leading-relaxed" style={{ color: MUTED }}>
                  Only Administrators and IT Asset Managers can sign in. Everyone else remains a
                  record-only employee with no system access.
                </p>
              </div>
            </div>
          )}
        </Section>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="rounded-lg px-4 h-10 text-sm font-medium"
          style={{ border: `1px solid ${BORDER}`, color: CREAMt, backgroundColor: ACCENT }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg px-5 h-10 text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT, color: CREAMt }}
        >
          Add Employee
        </button>
      </div>
    </form>
  );
}