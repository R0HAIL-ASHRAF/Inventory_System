import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../components/authContexts/AuthContext";
import { LOGIN_ENABLED_EMPLOYEES, ROLE_LABELS } from "../data";
import piaLogo from "../assets/12logo.png";
import {
  INK,
  MUTED,
  BORDER,
  CREAM,
  PAGE_BG,
  SURFACE,
  ACCENT,
  DANGER,
  FONT_DISPLAY,
  FONT_SANS,
  MONO,
} from "../theme";

function AmbientTrend() {
  const points = [22, 34, 28, 45, 38, 52, 44, 60, 50, 68, 58, 74];
  const w = 520;
  const h = 220;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v) => h - ((v - min) / (max - min || 1)) * h;
  const step = w / (points.length - 1);
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(v)}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="absolute bottom-0 left-0 w-full opacity-[0.14]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E94B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F5E94B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#trendFade)" />
      <path d={path} fill="none" stroke="#F5E94B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}


export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Simulated latency so it doesn't feel like a client-side stub
    setTimeout(() => {
      const result = login(email, password);
      setSubmitting(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate("/dashboard");
    }, 450);
  }

  function fillDemo(person) {
    setEmail(person.emails[0]);
    setPassword(person.password);
    setError("");
  }

  return (
    <div className="min-h-screen w-full flex" style={{ fontFamily: FONT_SANS, backgroundColor: PAGE_BG }}>
      {/* Left panel — brand + live system pulse */}
      <div
        className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ backgroundColor: CREAM }}
      >
        <AmbientTrend />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(245,233,75,0.16)" }}
            >
              <ShieldCheck size={20} style={{ color: "#F5E94B" }} />
            </div>
            <div>
              <p className="text-[15px] font-semibold tracking-tight" style={{ color: "#FFFDF3", fontFamily: FONT_DISPLAY }}>
                PIA Asset Manager
              </p>
              <p className="text-[11.5px]" style={{ color: "rgba(255,253,243,0.6)" }}>
                IT Devices &amp; People Registry
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p
            className="text-[65px] leading-snug font-semibold max-w-sm mb-2"
            style={{ color: ACCENT, fontFamily: FONT_DISPLAY, letterSpacing: "-0.01em" }}
          >
            Every device, every handoff, tracked in one place.
          </p>
          <p className="text-[13.5px] max-w-sm" style={{ color: "rgba(255,253,243,0.65)" }}>
            Sign in with your assigned role to view devices, employees, and activity across the fleet.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,253,243,0.14)" }}>
          
        </div>
      </div>

      {/* Right panel — sign-in form */}
      <div className="flex-1 flex  justify-center p-6 sm:p-10">
        <div className="w-full max-w-[380px]">
          <img
            src={piaLogo}
            alt="Pakistan International Airlines"
            className="h-63 w-auto mb-3 object-contain"
          />


          <div className="mb-9">
            <p className="text-[23px] font-semibold uppercase tracking-[0.03em] mb-2" style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}>
              Welcome back
            </p>
            <h1 className="text-[26px] font-semibold tracking-tight" style={{ color: INK, fontFamily: FONT_DISPLAY }}>
              Sign in to your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[12.5px] font-medium block mb-1.5" style={{ color: INK }}>
                Email address
              </label>
              <div
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
              >
                <Mail size={16} style={{ color: MUTED }} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@pia.com"
                  className="flex-1 bg-transparent outline-none text-[13.5px]"
                  style={{ color: INK,
                    outline:"none"
                   }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12.5px] font-medium" style={{ color: INK }}>
                  Password
                </label>
                <button type="button" className="text-[12px] font-medium" style={{ color: ACCENT }}>
                  Forgot password?
                </button>
              </div>
              <div
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
              >
                <Lock size={16} style={{ color: MUTED }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none text-[13.5px]"
                  style={{ color: INK, outline:"none" }}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ color: MUTED }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-[12.5px] font-medium rounded-lg px-3 py-2"
                style={{ color: DANGER, backgroundColor: "rgba(214,67,31,0.08)" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13.5px] font-semibold transition-opacity duration-150 disabled:opacity-60"
              style={{ backgroundColor: CREAM, color: "#FFFDF3", fontFamily: FONT_DISPLAY }}
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}