"use client";

import { useMemo, useState } from "react";
import EventCalendar, { formatLong } from "./EventCalendar";
import Reveal from "./Reveal";
import { bars } from "@/lib/bars";
import { cantons, provinces, type Province } from "@/lib/costa-rica";
import { site } from "@/lib/site";

const eventTypes = [
  "Boda",
  "Corporativo",
  "XV años",
  "Graduación",
  "Cumpleaños",
  "Fiesta privada",
];

const extras = [
  "Welcome drink",
  "Coctelería de autor",
  "Opciones sin alcohol",
  "Show de barra",
  "Barra vestida",
  "Cristalería premium",
];

const GUEST_PRESETS = [50, 100, 150, 250];
const HOUR_PRESETS = [3, 4, 5, 6];

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  step,
  presets,
  suffix,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  presets: number[];
  suffix: string;
  onChange: (n: number) => void;
}) {
  const set = (n: number) => onChange(Math.min(max, Math.max(min, n)));

  return (
    <div className="card p-6 sm:p-7">
      <p className="micro text-lima">{label}</p>
      <p className="mt-2 text-xs text-ink-faint">{hint}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          className="step-btn"
          onClick={() => set(value - step)}
          disabled={value <= min}
          aria-label={`Menos ${label}`}
        >
          −
        </button>
        <p className="font-display text-5xl text-ink tabular-nums md:text-6xl">
          {value}
          <span className="ml-1 align-middle text-base text-ink-faint">{suffix}</span>
        </p>
        <button
          type="button"
          className="step-btn"
          onClick={() => set(value + step)}
          disabled={value >= max}
          aria-label={`Más ${label}`}
        >
          +
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => set(preset)}
            className={`chip ${value === preset ? "is-on" : ""}`}
          >
            {preset}
            {suffix === "h" ? " h" : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

function Block({
  n,
  title,
  children,
  delay = 0,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="border-t border-white/10 pt-8">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="micro text-lima tabular-nums">{n}</span>
        <h3 className="font-display text-2xl text-ink md:text-3xl">{title}</h3>
      </div>
      {children}
    </Reveal>
  );
}

export default function Reservation() {
  const [date, setDate] = useState<string | null>(null);
  const [guests, setGuests] = useState(100);
  const [hours, setHours] = useState(4);
  const [eventType, setEventType] = useState("");
  const [barId, setBarId] = useState("sugerida");
  const [picked, setPicked] = useState<string[]>([]);
  const [province, setProvince] = useState("");
  const [canton, setCanton] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState(false);

  const cantonOptions = province ? cantons[province as Province] : [];
  const barName = bars.find((b) => b.id === barId)?.name ?? "A recomendación de Etílico";

  const estimate = useMemo(
    () => ({
      drinks: Math.round((guests * (hours + 1)) / 10) * 10,
      bartenders: Math.max(1, Math.ceil(guests / 60)),
    }),
    [guests, hours],
  );

  const message = useMemo(
    () =>
      [
        "Hola Etílico, quiero reservar una barra para mi evento.",
        date && `Fecha: ${formatLong(date)}`,
        `Personas: ${guests}`,
        `Horas de servicio: ${hours}`,
        eventType && `Tipo de evento: ${eventType}`,
        `Barra: ${barName}`,
        picked.length ? `Extras: ${picked.join(", ")}` : "",
        province && `Lugar: ${canton}, ${province}`,
        name && `Nombre: ${name}`,
        phone && `WhatsApp: ${phone}`,
        notes && `Detalle: ${notes}`,
      ]
        .filter(Boolean)
        .join("\n"),
    [date, guests, hours, eventType, barName, picked, province, canton, name, phone, notes],
  );

  const missing = !date || !name.trim() || !province || !canton;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (missing) {
      if (!date) document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setConfirmed(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  const summary = [
    { label: "Fecha", value: date ? formatLong(date) : "Sin elegir" },
    { label: "Personas", value: `${guests} invitados` },
    { label: "Servicio", value: `${hours} horas de barra` },
    { label: "Evento", value: eventType || "Por definir" },
    { label: "Barra", value: barName },
    { label: "Lugar", value: province ? `${canton}, ${province}` : "Por definir" },
  ];

  if (confirmed) {
    return (
      <section id="cotizar" className="section-pad relative overflow-hidden bg-noche">
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 h-[45vh] w-[70vw] -translate-x-1/2 rounded-full bg-lima/10 blur-[120px]"
          aria-hidden
        />
        <div className="section-wrap relative">
          <div className="swap-in mx-auto max-w-lg text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-lima/40 text-2xl text-lima">
              ✓
            </span>
            <h2 className="display-lg mt-8 text-ink">Reserva enviada</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted md:text-base">
              Ya tenemos tu fecha, el tamaño del evento y las horas de barra. El último
              paso es hablarlo con calma para cerrar el montaje.
            </p>

            <dl className="mt-10 text-left">
              {summary.slice(0, 3).map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-t border-white/10 py-4 last:border-b"
                >
                  <dt className="micro text-ink-faint">{row.label}</dt>
                  <dd className="text-right text-sm text-ink first-letter:uppercase">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3">
              {site.whatsapp ? (
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Seguir por WhatsApp
                </a>
              ) : (
                <a
                  href={site.instagramDm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Enviar por Instagram
                </a>
              )}
              <button type="button" onClick={copy} className="btn-secondary text-ink">
                {copied ? "Resumen copiado ✓" : "Copiar resumen del evento"}
              </button>
              <button
                type="button"
                className="micro mt-2 text-ink-faint transition hover:text-ink"
                onClick={() => {
                  setConfirmed(false);
                  setDate(null);
                  setEventType("");
                  setPicked([]);
                  setProvince("");
                  setCanton("");
                  setName("");
                  setPhone("");
                  setNotes("");
                  setGuests(100);
                  setHours(4);
                  setTouched(false);
                }}
              >
                Hacer otra reserva
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cotizar" className="section-pad relative overflow-hidden bg-noche">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-lima/[0.06] blur-[130px]"
        aria-hidden
      />

      <div className="section-wrap relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow text-lima">Reserva</span>
              <h2 className="display-lg mt-5 text-ink">
                Contanos del evento
                <span className="block text-ink-faint italic">y armamos la barra.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
              Fecha, cuánta gente y cuántas horas de servicio. Con esos tres datos ya
              podemos cotizar el montaje completo.
            </p>
          </div>
        </Reveal>

        <form onSubmit={submit} className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- columna del formulario ---------------- */}
          <div className="space-y-12 lg:col-span-7">
            <Block n="01" title="La fecha">
              <div className="card p-5 sm:p-7">
                <EventCalendar value={date} onChange={setDate} />
                <p
                  className={`mt-6 border-t border-white/10 pt-5 text-center text-sm first-letter:uppercase ${
                    date ? "text-lima" : touched ? "text-red-300/80" : "text-ink-faint"
                  }`}
                >
                  {date ? formatLong(date) : "Elegí el día de tu evento"}
                </p>
              </div>
            </Block>

            <Block n="02" title="El tamaño" delay={60}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Stepper
                  label="Cantidad de personas"
                  hint="Invitados aproximados que van a tomar."
                  value={guests}
                  min={10}
                  max={600}
                  step={10}
                  presets={GUEST_PRESETS}
                  suffix=""
                  onChange={setGuests}
                />
                <Stepper
                  label="Horas de servicio"
                  hint="Cuánto tiempo queda abierta la barra."
                  value={hours}
                  min={2}
                  max={12}
                  step={1}
                  presets={HOUR_PRESETS}
                  suffix="h"
                  onChange={setHours}
                />
              </div>
            </Block>

            <Block n="03" title="El evento" delay={60}>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(eventType === type ? "" : type)}
                    className={`chip ${eventType === type ? "is-on" : ""}`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <p className="micro mt-9 text-ink-faint">¿Cuál barra querés?</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {bars.map((bar) => (
                  <button
                    key={bar.id}
                    type="button"
                    onClick={() => setBarId(bar.id)}
                    className={`svc-card ${barId === bar.id ? "is-on" : ""}`}
                    aria-pressed={barId === bar.id}
                  >
                    <span
                      className="flex aspect-[4/3] items-end justify-center p-2"
                      style={{ background: bar.bg }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bar.image}
                        alt=""
                        loading="lazy"
                        className="max-h-full w-auto object-contain"
                      />
                    </span>
                    <span className="block px-3 py-3 text-left">
                      <span className="block text-sm font-semibold text-ink">{bar.name}</span>
                      <span className="micro mt-1 block text-ink-faint">{bar.index}</span>
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setBarId("sugerida")}
                  className={`svc-card flex flex-col items-start justify-end p-3 text-left ${
                    barId === "sugerida" ? "is-on" : ""
                  }`}
                  aria-pressed={barId === "sugerida"}
                >
                  <span className="text-sm font-semibold text-ink">Que la elijan ustedes</span>
                  <span className="micro mt-1 text-ink-faint">Según el espacio</span>
                </button>
              </div>

              <p className="micro mt-9 text-ink-faint">Extras (podés marcar varios)</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {extras.map((extra) => {
                  const on = picked.includes(extra);
                  return (
                    <button
                      key={extra}
                      type="button"
                      onClick={() =>
                        setPicked((prev) =>
                          on ? prev.filter((x) => x !== extra) : [...prev, extra],
                        )
                      }
                      className={`chip ${on ? "is-on" : ""}`}
                    >
                      {extra}
                    </button>
                  );
                })}
              </div>
            </Block>

            <Block n="04" title="El lugar" delay={60}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="micro block text-ink-faint">
                  Provincia
                  <select
                    required
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setCanton("");
                    }}
                    className="input-field mt-2 normal-case"
                  >
                    <option value="">Elegí provincia</option>
                    {provinces.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="micro block text-ink-faint">
                  Cantón
                  <select
                    required
                    value={canton}
                    onChange={(e) => setCanton(e.target.value)}
                    disabled={!province}
                    className="input-field mt-2 normal-case disabled:opacity-40"
                  >
                    <option value="">{province ? "Elegí cantón" : "Primero la provincia"}</option>
                    {cantonOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </Block>

            <Block n="05" title="Tus datos" delay={60}>
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="micro block text-ink-faint">
                    Nombre
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field mt-2 normal-case"
                      placeholder="Tu nombre"
                      autoComplete="name"
                    />
                  </label>
                  <label className="micro block text-ink-faint">
                    WhatsApp
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field mt-2 normal-case"
                      placeholder="+506 …"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>
                </div>
                <label className="micro block text-ink-faint">
                  Algo más que debamos saber
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-field mt-2 min-h-28 resize-y normal-case"
                    placeholder="Hora de inicio, si hay espacio techado, tragos que no pueden faltar…"
                  />
                </label>
              </div>
            </Block>
          </div>

          {/* ---------------- resumen ---------------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={120}>
                <div className="card overflow-hidden">
                  <div className="border-b border-white/10 px-6 py-5 sm:px-7">
                    <p className="micro text-lima">Tu evento</p>
                  </div>

                  <dl className="px-6 py-2 sm:px-7">
                    {summary.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] py-3.5 last:border-b-0"
                      >
                        <dt className="micro shrink-0 text-ink-faint">{row.label}</dt>
                        <dd className="text-right text-sm text-ink first-letter:uppercase">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="border-t border-white/10 bg-white/[0.02] px-6 py-6 sm:px-7">
                    <p className="micro text-ink-faint">Estimación de servicio</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-display text-4xl text-ink tabular-nums">
                          {estimate.drinks}
                        </p>
                        <p className="micro mt-1.5 text-ink-faint">Tragos aprox.</p>
                      </div>
                      <div>
                        <p className="font-display text-4xl text-ink tabular-nums">
                          {estimate.bartenders}
                        </p>
                        <p className="micro mt-1.5 text-ink-faint">
                          Bartender{estimate.bartenders > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                      Cálculo de referencia: dos tragos la primera hora y uno por hora
                      después. Lo afinamos en la cotización.
                    </p>
                  </div>

                  <div className="border-t border-white/10 p-6 sm:p-7">
                    <button type="submit" className="btn-primary w-full">
                      Solicitar reserva
                    </button>
                    {touched && missing && (
                      <p className="mt-4 text-center text-xs text-red-300/80">
                        Falta la fecha, tu nombre o el lugar del evento.
                      </p>
                    )}
                    <p className="mt-4 text-center text-xs text-ink-faint">
                      Sin compromiso. Te respondemos con el detalle del montaje.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
