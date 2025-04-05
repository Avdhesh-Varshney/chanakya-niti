import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ChanakyaAudio from "./pages/ChanakyaAudio";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF06]">

      <div className="navbar bg-[#dfdfb0]">
        <div className="w-full max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl px-4 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources/audio" element={<ChanakyaAudio />} />
        </Routes>
      </main>

      <div className="footer bg-[#dfdfb0] mt-8">
        <div className="w-full max-w-7xl mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
