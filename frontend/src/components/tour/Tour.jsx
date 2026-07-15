import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ACCENT, INK, MUTED, BORDER, SURFACE, CREAMt, FONT_SANS, FONT_DISPLAY, MONO } from "../../theme";

const TourContext = createContext(null);

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used within a TourProvider");
  return ctx;
}

const PAD = 8;

export function TourProvider({ children }) {
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [rect, setRect] = useState(null);
  const [tourId, setTourId] = useState(null);

  const measure = useCallback(() => {
    const step = steps[stepIndex];
    if (!step) return;
    const el = document.querySelector(step.target);
    if (!el) { setRect(null); return; }
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    });
  }, [steps, stepIndex]);

  useEffect(() => {
    if (!active) return;
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, measure]);

  const startTour = useCallback((id, tourSteps) => {
    setTourId(id);
    setSteps(tourSteps);
    setStepIndex(0);
    setActive(true);
  }, []);

  const endTour = useCallback((completed) => {
    if (tourId) localStorage.setItem(`tour:${tourId}`, completed ? "done" : "skipped");
    setActive(false);
    setSteps([]);
    setRect(null);
  }, [tourId]);

  const next = useCallback(() => {
    setStepIndex((i) => {
      if (i + 1 >= steps.length) { endTour(true); return i; }
      return i + 1;
    });
  }, [steps.length, endTour]);

  const back = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);

  const hasSeenTour = useCallback(
    (id) => typeof window !== "undefined" && !!localStorage.getItem(`tour:${id}`),
    []
  );

  return (
    <TourContext.Provider value={{ startTour, endTour, hasSeenTour, active }}>
      {children}
      {active && rect && steps[stepIndex] &&
        createPortal(
          <TourOverlay
            rect={rect}
            step={steps[stepIndex]}
            index={stepIndex}
            total={steps.length}
            onNext={next}
            onBack={back}
            onSkip={() => endTour(false)}
          />,
          document.body
        )}
    </TourContext.Provider>
  );
}

function TourOverlay({ rect, step, index, total, onNext, onBack, onSkip }) {
  const top = rect.top - PAD;
  const left = rect.left - PAD;
  const width = rect.width + PAD * 2;
  const height = rect.height + PAD * 2;

  const spaceBelow = window.innerHeight - (top + height);
  const placeBelow = spaceBelow > 180 || top < 180;

  const tooltipStyle = placeBelow
    ? { top: top + height + 14, left: Math.max(16, Math.min(left, window.innerWidth - 340)) }
    : { top: Math.max(16, top - 14), left: Math.max(16, Math.min(left, window.innerWidth - 340)), transform: "translateY(-100%)" };

  const panelStyle = { position: "fixed", background: "rgba(0,0,0,0.6)", transition: "all 220ms ease", zIndex: 998 };

  return (
    <>
      <div style={{ ...panelStyle, top: 0, left: 0, right: 0, height: Math.max(0, top) }} />
      <div style={{ ...panelStyle, top: top + height, left: 0, right: 0, bottom: 0 }} />
      <div style={{ ...panelStyle, top, left: 0, width: Math.max(0, left), height }} />
      <div style={{ ...panelStyle, top, left: left + width, right: 0, height }} />

      <div
        style={{
          position: "fixed", top, left, width, height,
          border: `2px solid ${ACCENT}`,
          boxShadow: "0 0 0 12px rgba(201,162,39,0.25), 0 0 24ppx rgba(201,162,39,0.35)",
          transition: "all 220ms ease"
        }}
      />

      <div
        style={{
          position: "fixed", width: 320, background: SURFACE, border: `1px solid ${BORDER}`,
          borderRadius: 16, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.35)",
          padding: "18px 20px", zIndex: 1000, transition: "top 220ms ease, left 220ms ease",
          ...tooltipStyle,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED, opacity: 0.55 }}>
            Step {index + 1} of {total}
          </span>
          <button onClick={onSkip} style={{ background: "none", border: "none", fontFamily: FONT_SANS, fontSize: 12, color: MUTED, opacity: 0.6, cursor: "pointer" }}>
            Skip tour
          </button>
        </div>
        <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15.5, fontWeight: 600, color: INK, margin: "0 0 6px" }}>
          {step.title}
        </h4>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: MUTED, opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
          {step.body}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === index ? 16 : 6, height: 6, borderRadius: 999,
                  background: i === index ? ACCENT : BORDER, transition: "all 200ms ease",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {index > 0 && (
              <button
                onClick={onBack}
                style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${BORDER}`, background: "transparent", fontFamily: FONT_SANS, fontSize: 12.5, fontWeight: 600, color: INK, cursor: "pointer" }}
              >
                Back
              </button>
            )}
            <button
              onClick={onNext}
              style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: ACCENT, fontFamily: FONT_SANS, fontSize: 12.5, fontWeight: 700, color: CREAMt, cursor: "pointer" }}
            >
              {index + 1 === total ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}