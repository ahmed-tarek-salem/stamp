import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <div className="h-screen flex items-center justify-center">
          <h1 className="font-display text-6xl text-lime">Hero placeholder</h1>
        </div>
        <div id="services" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Services placeholder</h2>
        </div>
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
