import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ShoppingBag, Crown, AlertTriangle } from "lucide-react";
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

const products = [
  { name: "'Renegade' Oversized Tee", price: "$65", priceNum: 65, status: "available" as const, tag: "DROP 003", sizes: "S — XXL", slug: "renegade-tee", image: renegadeTee },
  { name: "'Cyber-Mesh' Shorts", price: "$78", priceNum: 78, status: "available" as const, tag: "DROP 003", sizes: "S — XL", slug: "cyber-mesh-shorts", image: cyberMeshShorts },
  { name: "'Freakshow' Tech-Hat", price: "$48", priceNum: 48, status: "preorder" as const, tag: "PRE-ORDER", sizes: "One Size", slug: "freakshow-tech-hat", image: freakshowTechHat },
  { name: "'Freakshow' Tropical Court Shirt", price: "$85", priceNum: 85, status: "available" as const, tag: "DROP 004", sizes: "S — XXL", slug: "tropical-court-shirt", image: tropicalCourtShirt },
  { name: "'Chubby Freak' Wide-Leg Pants", price: "$92", priceNum: 92, status: "available" as const, tag: "DROP 004", sizes: "S — XXL", slug: "chubby-freak-pants", image: chubbyFreakPants },
  { name: "'Electro-Ball' LED Pickleballs", price: "$34", priceNum: 34, status: "available" as const, tag: "NEW GEAR", sizes: "3-Pack", slug: "electro-ball-pickleballs", image: electroBallPickleballs },
  { name: "'Neural Net' Court Bag", price: "$120", priceNum: 120, status: "preorder" as const, tag: "PRE-ORDER", sizes: "One Size", slug: "neural-net-court-bag", image: neuralNetCourtBag },
];

const DROP_END = new Date("2026-04-20T23:59:59Z").getTime();

const calcRemaining = () => {
  const diff = Math.max(0, DROP_END - Date.now());
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
};

const CountdownTimer = () => {
  const [time, setTime] = useState(calcRemaining);
  useEffect(() => {
    const interval = setInterval(() => setTime(calcRemaining), 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const expired = time.h === 0 && time.m === 0 && time.s === 0;
  return (
    <div>
      {expired ? (
        <div className="text-xs text-neon-pink font-mono uppercase tracking-wider">DROP CLOSED — Join restock list ↓</div>
      ) : (
        <>
          <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1.5">Drop closes in</div>
          <div className="flex items-center gap-1 font-mono text-neon-pink text-sm">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span key={`h-${pad(time.h)}`} className="bg-neon-pink/10 px-2 py-0.5 rounded tabular-nums transition-all duration-150">{pad(time.h)}</span>:<span key={`m-${pad(time.m)}`} className="bg-neon-pink/10 px-2 py-0.5 rounded tabular-nums transition-all duration-150">{pad(time.m)}</span>:<span key={`s-${pad(time.s)}`} className="bg-neon-pink/10 px-2 py-0.5 rounded tabular-nums transition-all duration-150">{pad(time.s)}</span>
          </div>
        </>
      )}
    </div>
  );
};

const GuerillaDropSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    addToCart({
      id: product.slug,
      name: product.name,
      price: product.priceNum,
      priceLabel: product.price,
      image: product.image,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container px-6 lg:px-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse-neon" />
            LIMITED DROP
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            THE <span className="text-neon-pink neon-text-pink">GUERILLA</span> DROP
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg">
            Underground streetwear. Limited runs. When it's gone, it's gone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <div className="relative aspect-[4/5] rounded overflow-hidden border border-border bg-card">
                <div className="grid grid-cols-2 grid-rows-2 h-full">
                  {products.slice(0, 4).map((product, i) => (
                    <div key={i} className="relative overflow-hidden cursor-pointer group/img hover-glitch" onClick={() => navigate(`/apparel/${product.slug}`)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                      <div className="absolute inset-0 bg-background/40 group-hover/img:bg-background/20 transition-colors" />
                      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-neon-lime tracking-widest uppercase">{product.name}</div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
              </div>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product.name}
                className={`group p-6 bg-card border border-border rounded hover:neon-border-pink hover-glitch transition-all duration-500 cursor-pointer ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
                onClick={() => navigate(`/apparel/${product.slug}`)}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase mb-2 ${product.status === "preorder" ? "bg-neon-pink/10 text-neon-pink border border-neon-pink/30" : "bg-neon-lime/10 text-neon-lime border border-neon-lime/30"}`}>
                      {product.tag}
                    </span>
                    <h3 className="text-sm sm:text-lg font-display font-bold text-foreground">{product.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{product.sizes}</p>
                  </div>
                  <div className="text-xl font-display font-bold text-neon-lime">{product.price}</div>
                </div>

                {product.status === "preorder" ? (
                  <div className="space-y-3">
                    <CountdownTimer />
                    <Button variant="neonPinkOutline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/apparel/${product.slug}`); }}>
                      <Crown className="w-3.5 h-3.5 mr-2" /> Pre-Order — {product.price}
                    </Button>
                  </div>
                ) : (
                  <Button variant="neonLime" size="sm" className="w-full" onClick={(e) => handleAddToCart(e, product)}>
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart — {product.price}
                  </Button>
                )}
              </div>
            ))}

            {/* Sold out past drop */}
            <div className={`p-6 bg-card/50 border border-border/50 rounded transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "560ms" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase mb-2 bg-muted text-muted-foreground border border-border">
                    DROP 002 — SOLD OUT
                  </span>
                  <h3 className="text-lg font-display font-bold text-muted-foreground">'Volt' Performance Hoodie</h3>
                </div>
                <AlertTriangle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
              <Button variant="ghost" size="sm" className="w-full text-neon-pink hover:text-neon-pink/80" onClick={(e) => { e.stopPropagation(); setShowEarlyAccess(true); }}>
                Join Waitlist for Restock
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} source="restock-volt-hoodie" />
    </section>
  );
};

export default GuerillaDropSection;
