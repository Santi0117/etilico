import Reveal from "./Reveal";
import DomeGallery from "./DomeGallery";

const images = [
  { src: "/nights/pool.webp", alt: "Barra Etílico junto a una piscina" },
  { src: "/nights/wedding.webp", alt: "Brindis en una boda al atardecer" },
  { src: "/nights/tools.webp", alt: "Kit de bartender Etílico" },
  { src: "/nights/lamp.webp", alt: "Barra vestida bajo lámpara" },
  { src: "/nights/floral.webp", alt: "Barra Etílico en una casa con jardín" },
  { src: "/nights/balloons.webp", alt: "Barra Etílico en una fiesta privada" },
  { src: "/nights/menu.webp", alt: "Barra Case con menú de cocteles" },
  { src: "/nights/bottles.webp", alt: "Licores listos sobre la barra" },
  { src: "/nights/team.webp", alt: "Equipo de bartenders Etílico" },
  { src: "/nights/rustic.webp", alt: "Montaje en un espacio rústico" },
  { src: "/nights/mask.webp", alt: "Servicio de barra en una fiesta" },
];

export default function Nights() {
  return (
    <section id="galeria" className="relative overflow-hidden bg-noche pb-16 md:pb-24">
      <div className="section-wrap">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-md text-ink">Así se ve una noche con Etílico</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:mt-4">
              Barra vestida, servicio a la vista y copas que se recuerdan. El after se siente,
              no se improvisa.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="night-dome mt-8 md:mt-10">
        <DomeGallery
          images={images}
          grayscale={false}
          overlayBlurColor="#08090a"
          fit={0.78}
          fitBasis="min"
          minRadius={240}
          maxRadius={780}
          padFactor={0.08}
          segments={12}
          imageBorderRadius="18px"
          openedImageBorderRadius="22px"
          openedImageWidth="min(88vw, 540px)"
          openedImageHeight="min(88vw, 540px)"
          dragSensitivity={16}
          maxVerticalRotationDeg={10}
          dragDampening={0.45}
        />
      </div>

      <p className="micro mt-4 text-center text-ink-faint">
        Arrastrá para girar · tocá para ver de cerca
      </p>
    </section>
  );
}
