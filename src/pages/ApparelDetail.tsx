import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Ruler, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import renegadeTee from "@/assets/renegade-tee.jpg";
import cyberMeshShorts from "@/assets/cyber-mesh-shorts.jpg";
import freakshowTechHat from "@/assets/freakshow-tech-hat.jpg";
import tropicalCourtShirt from "@/assets/tropical-court-shirt.jpg";
import chubbyFreakPants from "@/assets/chubby-freak-pants.jpg";
import electroBallPickleballs from "@/assets/electro-ball-pickleballs.jpg";
import neuralNetCourtBag from "@/assets/neural-net-court-bag.jpg";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const apparelData: Record<string, {
  name: string;
  tagline: string;
  price: string;
  priceNum: number;
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
    priceNum: 65,
    image: renegadeTee,
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
    priceNum: 78,
    image: cyberMeshShorts,
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
    priceNum: 48,
    image: freakshowTechHat,
    tag: "PRE-ORDER",
    available: true,
    sizes: ["One Size"],
    details: ["Structured 6-panel", "Embedded NFC chip", "Moisture-wicking sweatband", "Adjustable snapback", "Reflective logo patch"],
    material: "100% Ripstop Nylon",
  },
  "tropical-court-shirt": {
    name: "'Freakshow' Tropical Court Shirt",
    tagline: "Hawaiian-style button-up with neon paddle prints. UV-protective with mesh-back ventilation.",
    price: "$85",
    priceNum: 85,
    image: tropicalCourtShirt,
    tag: "DROP 004",
    available: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Relaxed camp-collar fit", "All-over neon paddle print", "UPF 50+ UV protection", "Mesh-back ventilation panel", "Coconut shell buttons"],
    material: "100% Rayon — UV-Treated",
  },
  "chubby-freak-pants": {
    name: "'Chubby Freak' Wide-Leg Pants",
    tagline: "Loud all-over Freakshow branding. Elastic waist, deep pockets, maximum court swagger.",
    price: "$92",
    priceNum: 92,
    image: chubbyFreakPants,
    tag: "DROP 004",
    available: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Relaxed wide-leg cut", "All-over graffiti print", "Elastic waistband with drawcord", "4 deep pockets", "Reinforced seams"],
    material: "100% Cotton Twill — 320gsm",
  },
  "electro-ball-pickleballs": {
    name: "'Electro-Ball' LED Pickleballs",
    tagline: "Glow-in-the-dark pickleballs with embedded LEDs. Tournament-weight, USB rechargeable.",
    price: "$34",
    priceNum: 34,
    image: electroBallPickleballs,
    tag: "NEW GEAR",
    available: true,
    sizes: ["3-Pack"],
    details: ["Tournament-weight (26g each)", "Multi-color LED modes", "USB-C rechargeable", "40-hole precision design", "8hr battery life per charge"],
    material: "Outdoor-grade polymer — USAPA spec",
  },
  "neural-net-court-bag": {
    name: "'Neural Net' Court Bag",
    tagline: "Tech-enabled duffel with paddle compartment, shoe pocket, NFC tag, and reflective branding.",
    price: "$120",
    priceNum: 120,
    image: neuralNetCourtBag,
    tag: "PRE-ORDER",
    available: true,
    sizes: ["One Size"],
    details: ["Dedicated paddle compartment (fits 2)", "Ventilated shoe pocket", "NFC quick-tap tag", "Reflective Freakshow branding", "Water-resistant base"],
    material: "1000D Cordura Nylon — DWR coated",
  },
};

const ApparelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const { addToCart, toggleCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    setSelectedSize(null);
  }, [slug]);

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

  const isPreorder = product.tag === "PRE-ORDER";
  const discountPrice = +(product.priceNum * 0.75).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id: `${slug}-${selectedSize}`,
      name: product.name,
      price: product.priceNum,
      priceLabel: product.price,
      image: product.image,
      size: selectedSize || undefined,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-muted-foreground hover:text-neon-lime transition-colors text-sm font-mono flex-shrink-0">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back</span>
          </button>
          <span className="font-display text-[10px] sm:text-xs tracking-widest uppercase text-foreground cursor-pointer truncate mx-2" onClick={() => navigate("/")}>
            <span className="hidden sm:inline">Pickleball</span><span className="text-neon-lime">Freakshow</span>
          </span>
          <Button variant="neonLime" size="sm" className="flex-shrink-0" onClick={toggleCart}>
            <ShoppingBag className="w-4 h-4 sm:mr-1" /> <span className="hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>

      <main className="pt-14">
        <div className="container px-6 lg:px-12 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative aspect-[4/5] bg-card rounded border border-border overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-mono tracking-widest uppercase ${isPreorder ? "bg-neon-pink/10 text-neon-pink border border-neon-pink/30" : product.tag === "NEW GEAR" ? "bg-neon-lime/10 text-neon-lime border border-neon-lime/30" : "bg-neon-pink/10 text-neon-pink border border-neon-pink/30"}`}>
                    {product.tag}
                  </span>
                </div>
              </div>
            </div>

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

              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-display font-bold text-foreground uppercase tracking-widest">Select Size</span>
                  <button onClick={() => toast({ title: "Size Guide", description: "When in doubt, size up — all pieces are oversized cut. Check product details for specific measurements." })} className="flex items-center gap-1 text-xs text-muted-foreground font-mono hover:text-neon-lime transition-colors">
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

              <Button variant="neonLime" size="xl" className="w-full mb-4" disabled={!selectedSize} onClick={handleAddToCart}>
                <ShoppingBag className="w-5 h-5 mr-2" />
                {selectedSize ? `Add to Cart — ${product.price}` : "Select a Size"}
              </Button>

              {isPreorder ? (
                <Button variant="neonPinkOutline" size="lg" className="w-full mb-4" onClick={() => navigate(`/preorder/${slug}`)}>
                  <Crown className="w-4 h-4 mr-2" />
                  Freak Member Pre-Order — <span className="line-through opacity-60 mx-1">{product.price}</span> ${discountPrice.toFixed(2)}
                </Button>
              ) : (
                <Button variant="neonPinkOutline" size="lg" className="w-full mb-4" disabled={!selectedSize} onClick={handleBuyNow}>
                  Buy Now — Instant Checkout
                </Button>
              )}

              <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-neon-lime" onClick={() => setShowEarlyAccess(true)}>
                Join the Freak-List for early drop access →
              </Button>

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

          {/* Cross-sell */}
          <div className="mt-24">
            <h2 className="text-2xl font-display font-black text-foreground mb-2 text-center">
              COMPLETE THE <span className="text-neon-pink neon-text-pink">KIT</span>
            </h2>
            <p className="text-xs text-muted-foreground font-mono text-center mb-10">Gear up head-to-toe. Underground issue only.</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(apparelData).filter(([s]) => s !== slug).slice(0, 6).map(([otherSlug, p]) => (
                <div
                  key={otherSlug}
                  onClick={() => navigate(`/apparel/${otherSlug}`)}
                  className="group p-4 bg-card border border-border rounded cursor-pointer hover:border-neon-pink/50 transition-all"
                >
                  <div className="aspect-[4/5] rounded overflow-hidden border border-border mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <h3 className="text-xs font-display font-bold text-foreground uppercase tracking-wider mb-1">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-display font-bold text-neon-lime">{p.price}</span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${p.tag === "PRE-ORDER" ? "text-neon-pink" : "text-neon-lime"}`}>
                      {p.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping CTA */}
          <div className="mt-16 text-center pb-12">
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <Button variant="neonLime" size="lg" onClick={() => navigate("/#drops")}>
                <ShoppingBag className="w-4 h-4 mr-2" /> Browse All Drops
              </Button>
              <Button variant="neonPinkOutline" size="lg" onClick={() => navigate("/#hardware")}>
                Shop Paddles
              </Button>
            </div>
          </div>
        </div>
      </main>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
    </div>
  );
};

export default ApparelDetail;
