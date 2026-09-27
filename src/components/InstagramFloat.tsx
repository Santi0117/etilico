import { site } from "@/lib/site";

export default function InstagramFloat() {
  return (
    <a
      href={site.instagramDm}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por Instagram"
      className="group fixed right-4 bottom-4 z-[80] flex items-center gap-0 overflow-hidden rounded-full border border-white/15 bg-noche/85 py-3 pr-3 pl-3 text-ink shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-luxe)] hover:border-lima/60 hover:text-lima md:right-6 md:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2.25a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V6.5a.75.75 0 0 1 .75-.75ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      </svg>
      <span className="max-w-0 overflow-hidden text-[10px] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-500 ease-[var(--ease-luxe)] group-hover:max-w-[9rem] group-hover:pl-2.5">
        Escribinos
      </span>
    </a>
  );
}
