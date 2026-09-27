import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import Bars from "@/components/Bars";
import Services from "@/components/Services";
import Carta from "@/components/Carta";
import Events from "@/components/Events";
import Packages from "@/components/Packages";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import InstagramFloat from "@/components/InstagramFloat";
import ToneWatcher from "@/components/ToneWatcher";

export default function Home() {
  return (
    <>
      <ToneWatcher />
      <Header />
      <main className="w-full max-w-full">
        <Hero />
        <TrustMarquee />
        <Bars />
        <Services />
        <Carta />
        <Events />
        <Packages />
        <Process />
        <About />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
      <InstagramFloat />
    </>
  );
}
