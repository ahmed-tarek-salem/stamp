import SmoothScroll from "./components/layout/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-midnight text-white">
        <h1 className="font-display text-6xl p-16 text-lime">Stamp</h1>
        <p className="font-body text-lg px-16 text-gray">
          Don't just be existing, be identified.
        </p>
        {/* Spacer to test scroll */}
        <div className="h-[300vh]" />
      </div>
    </SmoothScroll>
  );
}

export default App;
