import AudioPlayer from "./components/AudioPlayer";
import Contact from "./components/Contact";
import FloatingCta from "./components/FloatingCta";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import Process from "./components/Process";
import ScrollStage from "./components/ScrollStage";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import { useFrameSequence } from "./hooks/useFrameSequence";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  const { store, progress, primed } = useFrameSequence();
  useReveal();

  return (
    <>
      <Preloader progress={progress} done={primed} />
      <Nav />
      <main>
        <ScrollStage store={store} />
        <Intro />
        <Services />
        <Stats />
        <Gallery />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
      <AudioPlayer />
    </>
  );
}
