import { site } from "@/lib/site";

const greeting =
  "Hola Etílico, quiero cotizar una barra para mi evento.";

export default function WhatsAppFloat() {
  const href = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(greeting)}`
    : `https://wa.me/?text=${encodeURIComponent(greeting)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed right-4 bottom-4 z-[80] flex items-center gap-0 overflow-hidden rounded-full border border-white/15 bg-noche/85 py-3 pr-3 pl-3 text-ink shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-luxe)] hover:border-lima/60 hover:text-lima md:right-6 md:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.4-1.41a10.1 10.1 0 0 0 4.64 1.16h.04c5.46 0 9.89-4.4 9.89-9.84C21.97 6.4 17.5 2 12.04 2Zm5.76 14.08c-.24.68-1.4 1.3-1.94 1.34-.5.04-1.12.06-1.81-.11-.42-.11-.95-.3-1.64-.59-2.88-1.24-4.76-4.14-4.9-4.33-.14-.2-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.36.24-.26.64-.38 1.02-.38.12 0 .24 0 .34.02.3.02.45.03.65.5.24.6.82 2.08.9 2.23.07.15.12.32.02.52-.1.2-.14.32-.28.5-.14.17-.3.38-.42.5-.14.15-.28.3-.12.58.16.28.7 1.16 1.5 1.88 1.04.92 1.9 1.2 2.18 1.34.28.14.44.12.6-.07.17-.2.7-.8.88-1.08.18-.28.36-.23.6-.14.24.1 1.54.72 1.8.86.27.13.44.2.5.3.08.12.08.68-.17 1.36Z" />
      </svg>
      <span className="max-w-0 overflow-hidden text-[10px] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-500 ease-[var(--ease-luxe)] group-hover:max-w-[9rem] group-hover:pl-2.5">
        WhatsApp
      </span>
    </a>
  );
}
