type LogoProps = {
  /** El alto se da aquí (h-…); el ancho sale de la proporción del logo. */
  className?: string;
  /** Con «Cocktails & Drinks» debajo, como el logo original. */
  tagline?: boolean;
};

/**
 * Logo oficial de Etílico. Va como máscara para que tome el color del texto:
 * la cabecera lo pinta oscuro sobre las escenas claras.
 */
export default function Logo({ className = "", tagline = true }: LogoProps) {
  const src = tagline ? "/brand/etilico.png" : "/brand/etilico-mark.png";
  const mask = `url(${src}) center / contain no-repeat`;
  return (
    <span
      role="img"
      aria-label="Etílico Cocktails & Drinks"
      className={`inline-block bg-current align-middle ${className}`}
      style={{ aspectRatio: tagline ? "690 / 876" : "690 / 812", mask, WebkitMask: mask }}
    />
  );
}
