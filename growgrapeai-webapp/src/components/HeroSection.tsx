import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-vineyard.jpg";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ animation: "splashFadeOut 0.5s ease-in-out 1.8s forwards" }}
    >
      <style>{`
        @keyframes splashFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; pointer-events: none; }
        }
        @keyframes logoPop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes taglineSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <img
        src="/Logo.png"
        alt="GrowGrape AI"
        className="h-36 w-auto object-contain"
        style={{
          animation: "logoPop 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
        }}
      />

      <p
        className="mt-3 text-sm font-semibold tracking-widest uppercase text-gray-400"
        style={{ animation: "taglineSlide 0.5s ease-out 0.8s both" }}
      >
        Grow Smarter. Harvest Better.
      </p>

      <div className="mt-8 w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500"
          style={{ animation: "barGrow 1.6s ease-in-out 0.3s both" }}
        />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const showSplash = !imgLoaded || !timerDone;

  // Preload hero image immediately on mount
  useEffect(() => {
    const img = new Image();
    img.src = heroImg;
    img.onload = () => setImgLoaded(true);
    // If image is already cached, onload may not fire — check complete
    if (img.complete) setImgLoaded(true);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setTimerDone(true)} />}

      <section
        id="hero"
        className="relative min-h-[70vh] flex items-center justify-center wave-divider overflow-hidden"
      >
        <img
          src={heroImg}
          alt="Lush grape vineyard at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Logo — top left corner */}
        <div className="absolute top-4 left-4 z-20">
          <img
            src="/Logo.png"
            alt="GrowGrape AI Logo"
            className="h-16 w-auto object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-4">
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-hero-foreground leading-tight tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            GrowGrape AI
          </h1>

          <p
            className="text-hero-foreground/90 text-xl font-semibold tracking-wide animate-fade-in-up italic"
            style={{ animationDelay: "0.3s" }}
          >
            "Grow Smarter. Harvest Better. Sustain Forever."
          </p>

          <div
            className="w-16 h-0.5 bg-hero-foreground/50 mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          />

          <p
            className="text-hero-foreground/75 text-sm leading-relaxed max-w-2xl animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            GrowGrape AI is redefining the future of grape farming by combining
            artificial intelligence with deep agricultural expertise. From
            analyzing images of pests and diseases, our intelligence suggests
            management practices based purely on{" "}
            <span className="text-hero-foreground font-semibold">
              sustainable and residue-free solutions
            </span>
            . We provide guidance on pest management, disease management, and
            nutrition management — along with the AI chatbot{" "}
            <span className="text-hero-foreground font-semibold">
              "Dr. DRS"
            </span>
            . Designed for progressive farmers and agribusinesses, it minimizes
            risks, maximizes productivity, and builds a sustainable pathway
            toward high-quality grape production.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
