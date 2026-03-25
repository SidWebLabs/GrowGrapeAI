import heroImg from "@/assets/hero-vineyard.jpg";

const HeroSection = () => {
  return (
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
      <div className="absolute top-0 left-8  z-20">
        <img
          src='/Logo.png'
          alt="GrowGrape AI Logo"
          className="h-[100px] w-auto object-contain"
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
          className="text-hero-foreground/90 text-xl md:text-xl font-semibold tracking-wide uppercase animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Grow Smarter. Harvest Better. Sustain Forever.
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
          nutrition management along with the AI chatbot{" "}
          <span className="text-hero-foreground font-semibold">"Dr. DRS"</span>.
          Designed for progressive farmers and agribusinesses, it minimizes
          risks, maximizes productivity, and builds a sustainable pathway toward
          high-quality grape production.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;