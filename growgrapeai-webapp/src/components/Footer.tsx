import { Grape } from "lucide-react";

const Footer = () => (
  <footer id="about" className="hero-gradient text-hero-foreground py-16">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <Grape className="h-10 w-10 text-secondary mx-auto mb-4" />
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Growing Smarter, Together
      </h2>
      <p className="text-hero-foreground/70 max-w-lg mx-auto mb-8">
        GrowGrape.AI brings AI powered insights to every stage of grape cultivation empowering farmers with the knowledge to grow healthier, more productive vineyards.
      </p>
      <div className="border-t border-hero-foreground/15 pt-6 mt-6 text-sm text-hero-foreground/50">
        <p>© 2026 GrowGrape.AI | Sustainable Viticulture Solutions</p>
        <p className="mt-1">Developed by Siddhesh Kulkarni</p>
      </div>
    </div>
  </footer>
);

export default Footer;
