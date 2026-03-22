import heroImg from "@/assets/hero-vineyard.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center justify-center wave-divider overflow-hidden">
      <img
        src={heroImg}
        alt="Lush grape vineyard at sunrise"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="section-badge mb-6 inline-block animate-fade-in-up">
          🍇 Sustainable Viticulture Solutions
        </span>

        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-hero-foreground leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          Cultivating Excellence in Viticulture
        </h1>

        <p
          className="text-hero-foreground/80 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          AI powered grape farming guidance from pest control and disease management to complete nutrition lifecycle. Grow better grapes, sustainably.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
