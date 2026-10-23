export type ReservaPortal = {
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
};

/** Manda la cotización al panel. Si el panel no responde, el cliente igual puede escribir por WhatsApp. */
export async function enviarReservaAlPortal(input: ReservaPortal): Promise<string | null> {
  try {
    const respuesta = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(input),
    });
    if (respuesta.ok) return null;
    return "No se pudo guardar la cotización.";
  } catch {
    return "No se pudo guardar la cotización.";
  }
}
