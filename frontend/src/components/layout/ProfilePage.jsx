import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, Mail, Phone, Briefcase, MapPin, Building2, Hash, User } from "lucide-react";
import { useAuth } from "../authContexts/AuthContext";
import { ROLE_LABELS } from "../../data";
import { INK, MUTED, BORDER, SURFACE, ACCENT, CREAM, DANGER, SUCCESS, CARD, FONT_DISPLAY, MONO } from "../../theme";

export default function Profile() {
  const { user, changePassword } = useAuth();

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!user) return null;

  const fullName = `${user.name.first} ${user.name.last}`;
  const fatherName = user.father_name ? `${user.father_name.first} ${user.father_name.last}` : "—";
  const initials = `${user.name.first[0]}${user.name.last[0]}`.toUpperCase();
  const address = user.address
    ? [user.address.street, user.address.town, user.address.city, user.address.province, user.address.country]
        .filter(Boolean)
        .join(", ")
    : "—";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (next !== confirm) {
      setError("New password and confirmation don't match.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const result = changePassword(current, next);
      setSubmitting(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    }, 400);
  }

  return (
    <div className="max-w-3xl space-y-5">
      {/* Identity header */}
      <div className="rounded-2xl p-6 flex items-center gap-4" style={CARD}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-[18px] font-semibold"
          style={{ backgroundColor: "rgba(201,162,39,0.16)", color: ACCENT, fontFamily: FONT_DISPLAY }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[19px] font-semibold" style={{ color: INK, fontFamily: FONT_DISPLAY }}>{fullName}</p>
          <p className="text-[13px] mt-0.5" style={{ color: MUTED }}>{user.designation}</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-[10.5px] font-semibold uppercase tracking-[0.02em] px-2 py-0.5 rounded-full"
              style={{ color: ACCENT, backgroundColor: "rgba(201,162,39,0.14)" }}
            >
              {ROLE_LABELS[user.role]}
            </span>
            <span className="text-[11.5px]" style={{ color: MUTED, fontFamily: MONO }}>@{user.username}</span>
          </div>
        </div>
      </div>

      {/* Personal & work details */}
      <div className="rounded-2xl p-6" style={CARD}>
        <p className="text-[13px] font-semibold uppercase tracking-[0.03em] mb-4" style={{ color: INK, fontFamily: FONT_DISPLAY }}>
          Personal &amp; work details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <InfoRow icon={User} label="Father's name" value={fatherName} />
          <InfoRow icon={Hash} label="Personnel number" value={user.p_number || "—"} mono />
          <InfoRow icon={Briefcase} label="Designation" value={user.designation || "—"} />
          <InfoRow icon={Building2} label="Department" value={user.department || "—"} />
          <InfoRow icon={Building2} label="Section" value={user.section || "—"} />
          <InfoRow icon={MapPin} label="Location" value={user.location || "—"} />
          <InfoRow icon={MapPin} label="Room" value={user.room || "—"} />
          <InfoRow icon={MapPin} label="Cabin" value={user.cabin || "—"} />
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl p-6" style={CARD}>
        <p className="text-[13px] font-semibold uppercase tracking-[0.03em] mb-4" style={{ color: INK, fontFamily: FONT_DISPLAY }}>
          Contact
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <InfoRow icon={Mail} label="Email" value={(user.emails || []).join(", ") || "—"} mono />
          <InfoRow icon={Phone} label="Phone" value={(user.phones || []).join(", ") || "—"} mono />
          <div className="sm:col-span-2">
            <InfoRow icon={MapPin} label="Address" value={address} />
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="rounded-2xl p-6" style={CARD}>
        <p className="text-[13px] font-semibold uppercase tracking-[0.03em] mb-1" style={{ color: INK, fontFamily: FONT_DISPLAY }}>
          Change password
        </p>
        <p className="text-[12.5px] mb-5" style={{ color: MUTED }}>
          You'll stay signed in after updating your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <PasswordField
            label="Current password"
            value={current}
            onChange={setCurrent}
            show={showCurrent}
            onToggleShow={() => setShowCurrent((v) => !v)}
          />
          <PasswordField
            label="New password"
            value={next}
            onChange={setNext}
            show={showNext}
            onToggleShow={() => setShowNext((v) => !v)}
            hint="At least 6 characters."
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            show={showNext}
          />

          {error && (
            <div className="text-[12.5px] font-medium rounded-lg px-3 py-2" style={{ color: DANGER, backgroundColor: "rgba(214,67,31,0.08)" }}>
              {error}
            </div>
          )}

          {success && (
            <div
              className="flex items-center gap-2 text-[12.5px] font-medium rounded-lg px-3 py-2"
              style={{ color: SUCCESS, backgroundColor: "rgba(30,158,69,0.08)" }}
            >
              <CheckCircle2 size={15} />
              Password updated.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl px-5 py-2.5 text-[13px] font-semibold transition-opacity duration-150 disabled:opacity-60"
            style={{ backgroundColor: CREAM, color: "#FFFDF3", fontFamily: FONT_DISPLAY }}
          >
            {submitting ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, mono }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="shrink-0 mt-0.5" style={{ color: MUTED }} />
      <div className="min-w-0">
        <p className="text-[11px]" style={{ color: MUTED }}>{label}</p>
        <p className="text-[13.5px] font-medium break-words" style={{ color: INK, fontFamily: mono ? MONO : undefined }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggleShow, hint }) {
  return (
    <div>
      <label className="text-[12.5px] font-medium block mb-1.5" style={{ color: INK }}>
        {label}
      </label>
      <div
        className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
        style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
      >
        <Lock size={16} style={{ color: MUTED }} />
        <input
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="flex-1 bg-transparent outline-none text-[13.5px]"
          style={{ color: INK }}
        />
        {onToggleShow && (
          <button type="button" onClick={onToggleShow} style={{ color: MUTED }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {hint && <p className="text-[11px] mt-1" style={{ color: MUTED }}>{hint}</p>}
    </div>
  );
}