import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <div id="about" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">About placeholder</h2>
        </div>
        <div id="contact" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Contact placeholder</h2>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
