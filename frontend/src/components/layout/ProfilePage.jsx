import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Building2,
  Hash,
  User,
} from "lucide-react";

import { useAuth } from "../authContexts/AuthContext";
import { ROLE_LABELS } from "../../data";
import {
  INK,
  MUTED,
  BORDER,
  SURFACE,
  ACCENT,
  CREAM,
  DANGER,
  SUCCESS,
  CARD,
  FONT_DISPLAY,
  MONO,
} from "../../theme";

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

  const fatherName = user.father_name
    ? `${user.father_name.first} ${user.father_name.last}`
    : "—";

  const initials = `${user.name.first[0]}${user.name.last[0]}`.toUpperCase();

  const primaryEmail = (user.emails && user.emails[0]) || "—";

  const address = user.address
    ? [
        user.address.street,
        user.address.town,
        user.address.city,
        user.address.province,
        user.address.country,
      ]
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
    <div className="max-w-7xl space-y-6">

      {/* Header */}
      <div
        className="rounded-2xl p-6 flex items-center gap-4"
        style={CARD}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-semibold shrink-0"
          style={{
            background: "rgba(201,162,39,.16)",
            color: ACCENT,
            fontFamily: FONT_DISPLAY,
          }}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <h2
            className="text-xl font-semibold"
            style={{
              color: INK,
              fontFamily: FONT_DISPLAY,
            }}
          >
            {fullName}
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: MUTED }}
          >
            {user.designation || "—"}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase"
              style={{
                background: "rgba(201,162,39,.15)",
                color: ACCENT,
              }}
            >
              {ROLE_LABELS[user.role]}
            </span>

            <span
              className="text-xs"
              style={{
                color: MUTED,
                fontFamily: MONO,
              }}
            >
              {primaryEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Personal */}
        <div
          className="xl:col-span-7 rounded-2xl p-6"
          style={CARD}
        >
          <p
            className="text-sm font-semibold uppercase tracking-wide mb-5"
            style={{
              color: INK,
              fontFamily: FONT_DISPLAY,
            }}
          >
            Personal & Work Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard
              icon={User}
              label="Father's Name"
              value={fatherName}
            />

            <InfoCard
              icon={Hash}
              label="Personnel Number"
              value={user.p_number || "—"}
              mono
            />

            <InfoCard
              icon={Briefcase}
              label="Designation"
              value={user.designation || "—"}
            />

            <InfoCard
              icon={Building2}
              label="Department"
              value={user.department || "—"}
            />

            <InfoCard
              icon={Building2}
              label="Section"
              value={user.section || "—"}
            />

            <InfoCard
              icon={MapPin}
              label="Location"
              value={user.location || "—"}
            />

            <InfoCard
              icon={MapPin}
              label="Room"
              value={user.room || "—"}
            />

            <InfoCard
              icon={MapPin}
              label="Cabin"
              value={user.cabin || "—"}
            />
          </div>
        </div>

        {/* Contact */}
        <div
          className="xl:col-span-5 rounded-2xl p-6"
          style={CARD}
        >
          <p
            className="text-sm font-semibold uppercase tracking-wide mb-5"
            style={{
              color: INK,
              fontFamily: FONT_DISPLAY,
            }}
          >
            Contact
          </p>

          <div className="space-y-4">
            <InfoCard
              icon={Mail}
              label="Email"
              value={(user.emails || []).join(", ") || "—"}
              mono
            />

            <InfoCard
              icon={Phone}
              label="Phone"
              value={(user.phones || []).join(", ") || "—"}
              mono
            />

            <InfoCard
              icon={MapPin}
              label="Address"
              value={address}
            />
          </div>
        </div>
      </div>

      {/* Password */}
      <div
        className="rounded-2xl p-6"
        style={CARD}
      >
        <p
          className="text-sm font-semibold uppercase tracking-wide"
          style={{
            color: INK,
            fontFamily: FONT_DISPLAY,
          }}
        >
          Change Password
        </p>

        <p
          className="text-sm mt-1 mb-6"
          style={{ color: MUTED }}
        >
          You'll stay signed in after updating your password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md space-y-4"
        >
          <PasswordField
            label="Current Password"
            value={current}
            onChange={setCurrent}
            show={showCurrent}
            onToggleShow={() =>
              setShowCurrent((v) => !v)
            }
          />

          <PasswordField
            label="New Password"
            value={next}
            onChange={setNext}
            show={showNext}
            onToggleShow={() =>
              setShowNext((v) => !v)
            }
            hint="At least 6 characters."
          />

          <PasswordField
            label="Confirm Password"
            value={confirm}
            onChange={setConfirm}
            show={showNext}
          />

          {error && (
            <div
              className="rounded-lg px-3 py-2 text-sm"
              style={{
                color: DANGER,
                background: "rgba(214,67,31,.08)",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
              style={{
                color: SUCCESS,
                background: "rgba(30,158,69,.08)",
              }}
            >
              <CheckCircle2 size={16} />
              Password updated successfully.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl px-5 py-2.5 font-semibold disabled:opacity-60"
            style={{
              background: CREAM,
              color: "#FFFDF3",
              fontFamily: FONT_DISPLAY,
            }}
          >
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, mono }) {
  return (
    <div
      className="rounded-xl p-4 h-full transition-all duration-200 hover:shadow-sm"
      style={{
        backgroundColor: SURFACE,
        border: `1px solid ${BORDER}`,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          size={15}
          className="shrink-0"
          style={{ color: MUTED }}
        />

        <span
          className="text-[11px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: MUTED }}
        >
          {label}
        </span>
      </div>

      <div
        className="text-[14px] font-medium leading-6 break-words"
        style={{
          color: INK,
          fontFamily: mono ? MONO : undefined,
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggleShow,
  hint,
}) {
  return (
    <div>
      <label
        className="block mb-1.5 text-[12.5px] font-medium"
        style={{ color: INK }}
      >
        {label}
      </label>

      <div
        className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
        style={{
          backgroundColor: SURFACE,
          border: `1px solid ${BORDER}`,
        }}
      >
        <Lock size={16} style={{ color: MUTED }} />

        <input
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="flex-1 bg-transparent outline-none text-[13.5px]"
          style={{ color: INK, outline:"none" }}
        />

        {onToggleShow && (
          <button
            type="button"
            onClick={onToggleShow}
            className="hover:opacity-80"
            style={{ color: MUTED }}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {hint && (
        <p
          className="mt-1 text-[11px]"
          style={{ color: MUTED }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}