import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import IntroLoader from "./components/layout/IntroLoader";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import BrandPlayground from "./components/sections/BrandPlayground";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <IntroLoader />
      <CustomCursor />
      <SmoothScroll>
        <a href="#services" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Work />
        <About />
        <Process />
        <BrandPlayground />
        <Contact />
      </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

export default App;
