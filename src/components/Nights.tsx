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
  { src: "/nights/slat-corporate.webp", alt: "Barra de listones en un evento corporativo" },
  { src: "/nights/kombi.webp", alt: "Barra Kombi amarilla de Etílico" },
  { src: "/nights/case-blue.webp", alt: "Barra Case con licores y copas" },
  { src: "/nights/graduation.webp", alt: "Barra Case en una graduación" },
  { src: "/nights/kitchen.webp", alt: "Montaje de barra en una cocina" },
  { src: "/nights/case-well.webp", alt: "Estación de bartender lista para servir" },
  { src: "/nights/case-lights.webp", alt: "Barra Case vestida con luces" },
  { src: "/nights/terrace.webp", alt: "Barra lista con vista a la montaña" },
  { src: "/nights/case-night.webp", alt: "Barra Case en una fiesta de noche" },
  { src: "/nights/awning.webp", alt: "Barra con toldo en un jardín" },
  { src: "/nights/orchids.webp", alt: "Barra de listones con orquídeas" },
  { src: "/nights/goldframe.webp", alt: "Barra de marco dorado en una boda" },
  { src: "/nights/woodlands.webp", alt: "Barra de madera en un evento" },
];

export default function Nights() {
  return (
    <section id="galeria" className="relative overflow-hidden bg-noche pb-16 md:pb-24">
      <div className="section-wrap">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-md text-ink">Así se ve una noche con Etílico</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:mt-4">
              Barra vestida, servicio a la vista y copas que se recuerdan.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="night-dome mt-8 md:mt-10">
        <DomeGallery
          images={images}
          grayscale={false}
          overlayBlurColor="#08090a"
          fit={0.5}
          fitBasis="auto"
          minRadius={400}
          padFactor={0.2}
          segments={26}
          imageBorderRadius="30px"
          openedImageBorderRadius="30px"
          openedImageWidth="min(88vw, 540px)"
          openedImageHeight="min(88vw, 540px)"
          dragSensitivity={20}
          maxVerticalRotationDeg={5}
          dragDampening={2}
        />
      </div>

      <p className="micro mt-4 text-center text-ink-faint">
        Arrastra para girar · toca para ver de cerca
      </p>
    </section>
  );
}
