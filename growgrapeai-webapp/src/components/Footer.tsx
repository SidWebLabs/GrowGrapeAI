const Footer = () => (
  <footer id="about" className="hero-gradient text-hero-foreground py-16">
    <div className="container mx-auto px-4 max-w-4xl text-center">

      {/* Logo — mix-blend-mode:screen drops the black background */}
      <div className="flex justify-center mb-5">
        <img
          src='/Logo.png'
          alt="GrowGrape AI Logo"
          className="h-[120px] w-auto object-contain"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Empowering the Future of Viticulture
      </h2>

      <p className="text-hero-foreground/70 max-w-lg mx-auto mb-6">
        GrowGrape AI is built to revolutionize grape cultivation through
        intelligent, data-driven decision support. From pest and disease
        management to precision nutrition, we empower farmers with actionable
        insights that enhance productivity, improve crop quality, and ensure
        sustainable vineyard management.
      </p>

      {/* Founder line */}
      <div className="flex flex-col items-center gap-1 mb-6">
        <p className="text-hero-foreground/90 text-sm font-semibold tracking-wide">
          A Vision by{" "}
          <span className="font-bold text-hero-foreground">Shivam Satyawan Madrewar</span>
        </p>
        <p className="text-hero-foreground/55 text-xs">
          Founder, Taginus Innovations (OPC) Pvt. Ltd.
        </p>
      </div>

      {/* Closing line */}
      <p className="text-hero-foreground/80 text-sm font-medium italic tracking-wide mb-8">
        Driven by Knowledge. Powered by AI. Built for Farmers.
      </p>

      {/* Divider + footer note */}
      <div className="border-t border-hero-foreground/15 pt-6 mt-2 text-xs text-hero-foreground/50 space-y-1">
        <p>© 2026 GrowGrape AI | A Product of Taginus Innovations (OPC) Pvt. Ltd.</p>
        <p>AI Engine Developed by Siddhesh Kulkarni</p>
      </div>

    </div>
  </footer>
);

export default Footer;