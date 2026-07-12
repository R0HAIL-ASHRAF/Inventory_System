import React from "react";

export default function Sparkline({ points = [4, 8, 5, 9, 7, 10] }) {
  const w = 260;
  const h = 46;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v) => h - ((v - min) / (max - min || 1)) * h;
  const step = w / (points.length - 1);
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${norm(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-11">
      <path d={path} fill="none" stroke="rgba(255,252,220,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}