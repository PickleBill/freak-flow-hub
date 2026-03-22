import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import apparelCollection from "@/assets/apparel-collection.jpg";
import athleteUrban from "@/assets/athlete-urban.jpg";
import { useState, useEffect } from "react";

const apparelData: Record<string, {
  name: string;
  tagline: string;
  price: string;
  image: string;
  tag: string;
  available: boolean;
  sizes: string[];
  details: string[];
  material: string;
}> = {
  "renegade-tee": {
    name: "'Renegade' Oversized Tee",
    tagline: "Underground issue. Oversized drop-shoulder cut with reflective Freakshow branding.",
    price: "$65",
    image: apparelCollection,
    tag: "DROP 003",
    available: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Oversized drop-shoulder fit", "Reflective logo print", "270gsm heavyweight cotton", "Pre-shrunk & garment dyed", "Ribbed collar"],
    material: "100% Organic Cotton — 270gsm",
  },
  "cyber-mesh-shorts": {
    name: "'Cyber-Mesh' Shorts",
    tagline: "Performance mesh with 4-way stretch. Laser-cut ventilation panels and hidden zip pocket.",
    price: "$78",
    image: athleteUrban,
    tag: "DROP 003",
    available: true,
    sizes: ["S", "M", "L", "XL"],
    details: ["4-way stretch mesh", "Laser-cut ventilation", "Hidden zip pocket", "Elastic waistband with drawcord", "7\" inseam"],
    material: "88% Polyester / 12% Spandex",
  },
  "freakshow-tech-hat": {
    name: "'Freakshow' Tech-Hat",
    tagline: "Structured 6-panel with embedded NFC chip. Tap to unlock exclusive content.",
    price: "$48",
    image: apparelCollection,
    tag: "SOLD OUT",
    available: false,
    sizes: ["One Size"],
    details: ["Structured 6-panel", "Embedded NFC chip", "Moisture-wicking sweatband", "Adjustable snapback", "Reflective logo patch"],
    material: "100% Ripstop Nylon",
  },
};

const ApparelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const product = apparelData[slug || ""];
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Item Not Found</h1>
          <Button variant="neonLime" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6 lg:px-12 flex items-center justify-between h-14">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-neon-lime transition-colors text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="font-display text-xs tracking-widest uppercase text-foreground">
            Pickleball<span className="text-neon-lime">Freakshow</span>
          </span>
          <Button variant="neonLime" size="sm">
            <ShoppingBag className="w-4 h-4 mr-1" /> Cart
          </Button>
        </div>
      </div>

      <main className="pt-14">
        <div className="container px-6 lg:px-12 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative aspect-[4/5] bg-card rounded border border-border overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-mono tracking-widest uppercase ${product.available ? "bg-neon-lime/10 text-neon-lime border border-neon-lime/30" : "bg-neon-pink/10 text-neon-pink border border-neon-pink/30"}`}>
                    {product.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse-neon" />
                GUERILLA DROP
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-black text-foreground mb-3 leading-tight">
                {product.name.toUpperCase()}
              </h1>
              <p className="text-muted-foreground font-mono text-sm mb-6">{product.tagline}</p>
              <div className="text-4xl font-display font-black text-neon-lime mb-8">{product.price}</div>

              {/* Size selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-display font-bold text-foreground uppercase tracking-widest">Select Size</span>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground font-mono hover:text-neon-lime transition-colors">
                    <Ruler className="w-3 h-3" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all active:scale-95 ${selectedSize === size ? "bg-neon-lime text-background border-neon-lime neon-glow-lime" : "bg-card text-foreground border-border hover:border-neon-lime/50"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {product.available ? (
                <>
                  <Button variant="neonLime" size="xl" className="w-full mb-4" disabled={!selectedSize}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {selectedSize ? `Add to Cart — ${product.price}` : "Select a Size"}
                  </Button>
                  <Button variant="neonPinkOutline" size="lg" className="w-full">
                    Buy Now — Instant Checkout
                  </Button>
                </>
              ) : (
                <Button variant="neonPinkOutline" size="xl" className="w-full" disabled>
                  Sold Out — Notify Me
                </Button>
              )}

              {/* Details */}
              <div className="mt-12 space-y-6">
                <div>
                  <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-widest mb-3">Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail) => (
                      <li key={detail} className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                        <span className="w-1 h-1 bg-neon-lime rounded-full flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Material: </span>
                  <span className="text-xs text-foreground font-mono">{product.material}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApparelDetail;
