import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-midnight text-white">
        <h1 className="font-display text-6xl p-16 text-lime">Stamp</h1>
        <a href="#" className="px-16 text-lime underline" data-cursor-label="Click">
          Hover me to test cursor
        </a>
        <div className="h-[300vh]" />
      </div>
    </SmoothScroll>
  );
}

export default App;
