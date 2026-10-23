import { NextResponse } from "next/server";

/** Guarda la cotización de barra en el panel de Etílico. */
export async function POST(request: Request) {
  const clave = process.env.ONVISION_PORTAL_KEY;
  const base = (process.env.ONVISION_PORTAL_URL ?? "https://panel.onvisiondigital.com").replace(/\/$/, "");
  if (!clave) {
    return NextResponse.json({ error: "El panel todavía no está conectado." }, { status: 503 });
  }

  let body: Partial<{
    date: string;
    guests: number;
    hours: number;
    eventType: string;
    barName: string;
    province: string;
    canton: string;
    name: string;
    phone: string;
    notes: string;
  }>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "La cotización no es válida." }, { status: 400 });
  }

  const nombre = body.name?.trim().slice(0, 120) ?? "";
  if (nombre.length < 2) return NextResponse.json({ error: "Falta el nombre." }, { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date ?? "")) {
    return NextResponse.json({ error: "Falta la fecha del evento." }, { status: 400 });
  }

  const personas = Math.floor(Number(body.guests));
  const horas = Math.floor(Number(body.hours));
  if (!Number.isFinite(personas) || personas < 1 || personas > 600) {
    return NextResponse.json({ error: "La cantidad de personas no es válida." }, { status: 400 });
  }
  if (!Number.isFinite(horas) || horas < 1 || horas > 12) {
    return NextResponse.json({ error: "Las horas de servicio no son válidas." }, { status: 400 });
  }

  const tipo = body.eventType?.trim().slice(0, 80) || "Evento";
  const barra = body.barName?.trim().slice(0, 80) || "A recomendación de Etílico";
  const provincia = body.province?.trim().slice(0, 40) ?? "";
  const canton = body.canton?.trim().slice(0, 80) ?? "";
  const notas = body.notes?.trim().slice(0, 500) ?? "";
  const telefono = body.phone?.trim().slice(0, 40) ?? "";
  const lugar = [canton, provincia].filter(Boolean).join(", ");
  const mensaje = [
    `Barra: ${barra}`,
    lugar && `Lugar: ${lugar}`,
    `Horas de servicio: ${horas}`,
    notas && `Detalle: ${notas}`,
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 5000);

  const origen = new URL(request.url).origin;
  const respuesta = await fetch(`${base}/api/v1/envios`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${clave}` },
    body: JSON.stringify({
      tipo: "reserva",
      formulario: "Cotización de barra",
      nombre,
      telefono: telefono || undefined,
      fecha: `${body.date}T12:00:00-06:00`,
      personas,
      duracion: horas * 60,
      servicio: tipo,
      mensaje,
      origen: `${origen}/#cotizar`,
    }),
  });

  if (!respuesta.ok) {
    console.error("[reservas] el panel respondió", respuesta.status);
    return NextResponse.json({ error: "No se pudo guardar la cotización." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
