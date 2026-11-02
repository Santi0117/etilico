import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bars from "@/components/Bars";
import Services from "@/components/Services";
import Carta from "@/components/Carta";
import Events from "@/components/Events";
import Nights from "@/components/Nights";
import Process from "@/components/Process";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ToneWatcher from "@/components/ToneWatcher";

export default function Home() {
  return (
    <>
      <ToneWatcher />
      <Header />
      <main className="w-full max-w-full">
        <Hero />
        <Bars />
        <Services />
        <Carta />
        <Events />
        <Nights />
        <Process />
        <Reservation />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
