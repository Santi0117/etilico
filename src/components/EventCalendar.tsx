"use client";

import { useMemo, useState } from "react";

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

export function toKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatLong(key: string) {
  return parseKey(key).toLocaleDateString("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: { key: string; day: number; inMonth: boolean }[] = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push({ key: `pad-start-${i}`, day: 0, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ key: toKey(new Date(year, month, d)), day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ key: `pad-end-${cells.length}`, day: 0, inMonth: false });
  }
  return cells;
}

type EventCalendarProps = {
  value: string | null;
  onChange: (key: string) => void;
};

export default function EventCalendar({ value, onChange }: EventCalendarProps) {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const todayKey = toKey(today);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const grid = useMemo(() => buildGrid(year, month), [year, month]);
  const title = new Date(year, month, 1).toLocaleDateString("es-CR", {
    month: "long",
    year: "numeric",
  });

  const go = (delta: number) => {
    const next = new Date(year, month + delta, 1);
    if (next < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const atFirstMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atFirstMonth}
          className="step-btn"
          aria-label="Mes anterior"
        >
          ←
        </button>
        <p className="font-display text-lg text-ink first-letter:uppercase sm:text-xl md:text-2xl">{title}</p>
        <button type="button" onClick={() => go(1)} className="step-btn" aria-label="Mes siguiente">
          →
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1 text-center text-[10px] tracking-[0.2em] text-ink-faint">
            {day}
          </div>
        ))}
      </div>

      <div key={`${year}-${month}`} className="grid grid-cols-7 gap-1">
        {grid.map((cell, i) => {
          if (!cell.inMonth) return <div key={cell.key} className="aspect-square" />;
          const past = cell.key < todayKey;
          const selected = cell.key === value;

          return (
            <button
              key={cell.key}
              type="button"
              disabled={past}
              onClick={() => onChange(cell.key)}
              aria-pressed={selected}
              style={{ animationDelay: `${i * 8}ms` }}
              className={`calendar-day swap-in ${
                past
                  ? "cursor-not-allowed text-ink-faint/40"
                  : selected
                    ? "bg-lima font-semibold text-noche shadow-[0_0_28px_-8px_rgba(212,228,74,0.8)]"
                    : cell.key === todayKey
                      ? "border border-lima/50 text-lima hover:bg-white/10"
                      : "text-ink-soft hover:bg-white/10"
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
