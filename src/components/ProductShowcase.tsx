import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Brain, Vibrate, Shield, Target, Gauge, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import paddleXray from "@/assets/paddle-xray.jpg";
import paddleHero from "@/assets/paddle-hero.jpg";

const paddles = [
  {
    slug: "gen1-og",
    name: "Gen 1 OG",
    price: "$149",
    priceNum: 149,
    status: "In Stock" as const,
    desc: "The original. Standard foam core.",
    image: paddleHero,
    color: "lime" as const,
  },
  {
    slug: "gen2-trainer",
    name: "Gen 2 Trainer",
    price: "$189",
    priceNum: 189,
    status: "In Stock" as const,
    desc: "Compact face for precision drills.",
    image: paddleXray,
    color: "pink" as const,
  },
  {
    slug: "gen3-haptic-pro",
    name: "Gen 3 Haptic Pro",
    price: "$289",
    priceNum: 289,
    status: "Pre-Order" as const,
    desc: "Haptic feedback. Neural-grip sensors.",
    image: paddleHero,
    color: "lime" as const,
  },
];

const features = [
  { icon: Shield, title: "Foam-Core Hybrid", desc: "Max pop, minimal vibration. 16mm injected polymer foam with carbon fiber shell.", color: "lime" as const },
  { icon: Brain, title: "Neural-Grip Sensors", desc: "Real-time swing analytics. Embedded pressure mapping in the handle.", color: "pink" as const },
  { icon: Vibrate, title: "Haptic-Pulse", desc: "Tactile feedback for perfect sweet-spot contact. Feel every strike.", color: "lime" as const },
  { icon: Target, title: "Impact Mapping", desc: "Visualize exactly where the ball contacts. Heat-mapped precision data.", color: "pink" as const },
  { icon: Gauge, title: "Velocity Tracking", desc: "Real-time swing speed up to 87mph. Benchmark against the pros.", color: "lime" as const },
  { icon: Zap, title: "Quick-Charge", desc: "30-minute USB-C charge for 40+ hours of sensor uptime.", color: "pink" as const },
];

const ProductShowcase = () => {
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

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-lime/[0.02] to-transparent pointer-events-none" />
      <div className="container px-6 lg:px-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
            THE HARDWARE
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            THE <span className="text-neon-lime neon-text-lime">LINEUP</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg">
            Three paddles. One mission. From OG to next-gen haptic tech.
          </p>
        </div>

        {/* Paddle Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {paddles.map((paddle, index) => (
            <div
              key={paddle.slug}
              className={`group bg-card border border-border rounded overflow-hidden hover-glitch cursor-pointer transition-all duration-500 hover:neon-border-lime ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
              onClick={() => navigate(`/product/${paddle.slug}`)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={paddle.image} alt={paddle.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
                <div className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border ${paddle.status === "Pre-Order" ? "border-neon-pink/30 bg-neon-pink/10 text-neon-pink" : "border-neon-lime/30 bg-neon-lime/10 text-neon-lime"}`}>
                  {paddle.status}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-wider">{paddle.name}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">{paddle.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-display font-bold text-neon-lime">{paddle.price}</span>
                  <Button
                    variant="neonLime"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ id: paddle.slug, name: `Freakshow ${paddle.name}`, price: paddle.priceNum, priceLabel: paddle.price, image: paddle.image });
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gen 3 Feature Deep-Dive */}
        <div className="mb-12">
          <h3 className="text-2xl font-display font-black text-foreground text-center mb-2">
            GEN 3 <span className="text-neon-pink neon-text-pink">HAPTIC PRO</span> — DEEP DIVE
          </h3>
          <p className="text-muted-foreground font-mono text-xs text-center mb-8">The flagship. Here's what's under the hood.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-1">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group flex gap-4 p-4 rounded border border-transparent hover:border-border hover:bg-surface/50 hover-glitch transition-all duration-500 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${500 + index * 80}ms` }}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center border ${feature.color === "lime" ? "border-neon-lime/30 bg-neon-lime/5 text-neon-lime" : "border-neon-pink/30 bg-neon-pink/5 text-neon-pink"}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-foreground tracking-wider uppercase">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
            <div className="pt-6 pl-4 flex flex-wrap gap-3">
              <Button variant="neonLime" size="lg" onClick={() => navigate("/product/gen3-haptic-pro")}>
                View Gen 3 Details
              </Button>
              <Button variant="neonPinkOutline" size="lg" onClick={() => navigate("/preorder/gen3-haptic-pro")}>
                <Crown className="w-4 h-4 mr-2" /> Pre-Order — $216.75
              </Button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            onClick={() => navigate("/product/gen3-haptic-pro")}
          >
            <div className="relative aspect-square bg-surface rounded border border-border overflow-hidden group">
              <img src={paddleXray} alt="Freakshow Gen 3 Haptic Pro X-ray" className="w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 text-neon-lime/50 text-[10px] font-mono">MODEL::GEN3-HP<br />SERIAL::FK-2024-0847<br />STATUS::CERTIFIED</div>
                <div className="absolute bottom-4 right-4 text-neon-pink/50 text-[10px] font-mono text-right">FOAM::16MM POLY<br />SENSORS::6-AXIS<br />HAPTIC::ENABLED</div>
              </div>
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-lime" onClick={() => setShowEarlyAccess(true)}>
            Join the Freak-List for early access to new drops →
          </Button>
        </div>
      </div>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
    </section>
  );
};

export default ProductShowcase;
