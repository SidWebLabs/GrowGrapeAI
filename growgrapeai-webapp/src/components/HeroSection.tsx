import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-vineyard.jpg";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ animation: "splashFadeOut 0.6s ease-in-out 2.1s forwards" }}
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
          style={{ animation: "barGrow 2s ease-in-out 0.3s both" }}
        />
      </div>
    </div>
  );
};

/* ── Live Viewer Badge ── */
const RANDOM_JUMPS = [2, 3, 5, 7, 8, 10, 12, 15, 2, 4, 6, 9, 11];

const LiveViewerBadge = () => {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 20) + 15);
  const [bump, setBump] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const interval = setInterval(
      () => {
        const jump =
          RANDOM_JUMPS[Math.floor(Math.random() * RANDOM_JUMPS.length)];
        const goUp = Math.random() < 0.6;

        setCount((prev) => {
          const next = goUp ? prev + jump : prev - jump;
          if (next > 50) {
            setDirection("down");
            return prev - jump < 5 ? 5 : prev - jump;
          }
          if (next < 5) {
            setDirection("up");
            return prev + jump > 50 ? 50 : prev + jump;
          }
          setDirection(goUp ? "up" : "down");
          return next;
        });

        setBump(true);
        setTimeout(() => setBump(false), 400);
      },
      Math.floor(Math.random() * 4000) + 3000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <div
      className="fixed bottom-5 left-4 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-lg shadow-black/10"
      style={{
        animation: "badgeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 3s both",
      }}
    >
      <style>{`
        @keyframes badgeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes countBump {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>

      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          style={{ animation: "pulse-dot 1.4s ease-in-out infinite" }}
        />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>

      <p className="text-xs font-semibold text-gray-700 whitespace-nowrap">
        <span
          className={`inline-block font-bold ${direction === "up" ? "text-green-600" : "text-orange-500"}`}
          style={{ animation: bump ? "countBump 0.4s ease-in-out" : "none" }}
        >
          {count}
        </span>{" "}
        people viewing now
      </p>
    </div> */}
    </>
  );
};

const HeroSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const showSplash = !imgLoaded || !timerDone;

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setTimerDone(true)} />}

      <LiveViewerBadge />

      <section
        id="hero"
        className="relative min-h-[70vh] flex items-center justify-center wave-divider overflow-hidden"
      >
        {/* Hero background image */}
        <img
          src={heroImg}
          alt="Lush grape vineyard at sunrise"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Fallback dark bg while image loads */}
        <div className="absolute inset-0 bg-green-950 -z-10" />

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

        <div className="relative z-10 text-center !px-3 lg:!px-6 max-w-3xl mx-auto flex flex-col items-center gap-2 lg:gap-4">
          <h1
            className="font-display text-2xl sm:text-6xl md:text-7xl font-extrabold text-hero-foreground leading-tight tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            GrowGrape AI
          </h1>

          <p
            className="text-hero-foreground/90 text-base font-semibold tracking-wide animate-fade-in-up italic"
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
