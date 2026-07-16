import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INK, MUTED, BORDER, ACCENT, CREAMt, SURFACE, MONO, FONT_SANS } from "../../theme";

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  loading = false,
}) {
  if (totalPages <= 1) return null;

  const canPrev = page > 1 && !loading;
  const canNext = page < totalPages && !loading;

  const start = totalItems ? (page - 1) * pageSize + 1 : null;
  const end = totalItems ? Math.min(page * pageSize, totalItems) : null;

  const pages = [];
  const add = (v) => pages.push(v);
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) add(i);
  } else {
    add(1);
    if (page > 3) add("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) add(i);
    if (page < totalPages - 2) add("…");
    add(totalPages);
  }

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pt-1" style={{ fontFamily: FONT_SANS }}>
      {totalItems != null ? (
        <p className="text-[12px]" style={{ color: MUTED, opacity: 0.65 }}>
          Showing <span style={{ fontFamily: MONO, fontWeight: 600 }}>{start}–{end}</span> of{" "}
          <span style={{ fontFamily: MONO, fontWeight: 600 }}>{totalItems}</span>
        </p>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => canPrev && onPageChange(page - 1)}
          disabled={!canPrev}
          className="flex items-center justify-center rounded-lg transition-colors duration-150 disabled:opacity-30"
          style={{ width: 30, height: 30, border: `1px solid ${BORDER}`, color: INK, background: SURFACE }}
        >
          <ChevronLeft size={14} />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1.5 text-[12px]" style={{ color: MUTED, opacity: 0.5 }}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => !loading && onPageChange(p)}
              disabled={loading}
              className="flex items-center justify-center rounded-lg text-[12.5px] font-semibold transition-colors duration-150"
              style={{
                width: 30,
                height: 30,
                background: p === page ? ACCENT : SURFACE,
                color: p === page ? CREAMt : INK,
                border: `1px solid ${p === page ? ACCENT : BORDER}`,
              }}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => canNext && onPageChange(page + 1)}
          disabled={!canNext}
          className="flex items-center justify-center rounded-lg transition-colors duration-150 disabled:opacity-30"
          style={{ width: 30, height: 30, border: `1px solid ${BORDER}`, color: INK, background: SURFACE }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}