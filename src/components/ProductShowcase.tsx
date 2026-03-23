import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Brain, Vibrate, Shield, Target, Gauge, Crown, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import ProductQuickView from "@/components/ProductQuickView";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
    badge: null,
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
    badge: "MOST POPULAR",
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
    badge: "FLAGSHIP",
  },
];

const features = [
  { icon: Shield, title: "Foam-Core Hybrid", desc: "Max pop, minimal vibration. 16mm injected polymer foam with carbon fiber shell.", color: "lime" as const },
  { icon: Brain, title: "Neural-Grip Sensors", desc: "Real-time swing analytics. Embedded pressure mapping in the handle.", color: "pink" as const },
  { icon: Vibrate, title: "Haptic-Pulse", desc: "Tactile feedback for perfect sweet-spot contact. Feel every strike.", color: "lime" as const },
  { icon: Target, title: "Impact Mapping", desc: "Visualize exactly where the ball contacts. Heat-mapped precision data — syncs with your Courtana coaching profile.", color: "pink" as const },
  { icon: Gauge, title: "Velocity Tracking", desc: "Real-time swing speed up to 87mph. Benchmark against the pros.", color: "lime" as const },
  { icon: Zap, title: "Quick-Charge", desc: "30-minute USB-C charge for 40+ hours of sensor uptime.", color: "pink" as const },
];

const comparisonRows = [
  { feature: "Price", gen1: "$149", gen2: "$189", gen3: "$289" },
  { feature: "Core", gen1: "Polymer Foam", gen2: "Polymer Hybrid", gen3: "Carbon Fiber Hybrid" },
  { feature: "Weight", gen1: "7.8oz", gen2: "8.0oz", gen3: "8.2oz" },
  { feature: "Haptic Feedback", gen1: null, gen2: null, gen3: true },
  { feature: "Neural-Grip Sensors", gen1: null, gen2: null, gen3: "6-Axis" },
  { feature: "Impact Mapping", gen1: null, gen2: "Basic", gen3: "Full" },
  { feature: "Smart Court Compatible", gen1: null, gen2: "Basic", gen3: "Full Integration" },
  { feature: "Charge Time", gen1: "N/A", gen2: "N/A", gen3: "30 min" },
  { feature: "Sensor Battery", gen1: "N/A", gen2: "N/A", gen3: "40+ hrs" },
];

const CellValue = ({ value }: { value: string | boolean | null }) => {
  if (value === null) return <Minus className="w-3.5 h-3.5 text-muted-foreground mx-auto" />;
  if (value === true) return <Check className="w-4 h-4 text-neon-lime mx-auto" />;
  return <span>{value}</span>;
};

const ProductShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof paddles[0] | null>(null);
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
              onClick={() => setQuickViewProduct(paddle)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={paddle.image} alt={paddle.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
                <div className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border ${paddle.status === "Pre-Order" ? "border-neon-pink/30 bg-neon-pink/10 text-neon-pink" : "border-neon-lime/30 bg-neon-lime/10 text-neon-lime"}`}>
                  {paddle.status}
                </div>
                {paddle.badge && (
                  <div className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border ${paddle.badge === "FLAGSHIP" ? "border-neon-pink/40 bg-neon-pink/15 text-neon-pink" : "border-neon-lime/40 bg-neon-lime/15 text-neon-lime"}`}>
                    {paddle.badge}
                  </div>
                )}
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

        {/* Bridge text */}
        <p className="text-center text-sm sm:text-base text-muted-foreground font-mono max-w-2xl mx-auto mb-12">
          Most paddles are dumb. Ours have 6-axis sensors, haptic feedback, and a brain that talks to your AI coach.
        </p>

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

        {/* Radar Chart */}
        <div className={`mt-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex justify-center mb-8">
            <svg viewBox="0 0 300 300" className="w-64 h-64">
              {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                <polygon key={i} points={[0,1,2,3,4].map(j => { const a = (j * 72 - 90) * Math.PI/180; const d = r * 110; return `${150+d*Math.cos(a)},${150+d*Math.sin(a)}`; }).join(" ")} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
              ))}
              {["Pop","Control","Tech","Feel","Value"].map((label, i) => { const a = (i * 72 - 90) * Math.PI/180; return <text key={label} x={150 + 125*Math.cos(a)} y={150 + 125*Math.sin(a)} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>{label.toUpperCase()}</text>; })}
              <polygon points={[[6,0],[7,1],[1,2],[7,3],[9,4]].map(([v,i]) => { const a = (i * 72 - 90) * Math.PI/180; const d = (v/10) * 110; return `${150+d*Math.cos(a)},${150+d*Math.sin(a)}`; }).join(" ")} fill="hsl(var(--neon-lime) / 0.1)" stroke="hsl(var(--neon-lime) / 0.4)" strokeWidth="1" />
              <polygon points={[[7,0],[9,1],[3,2],[8,3],[7,4]].map(([v,i]) => { const a = (i * 72 - 90) * Math.PI/180; const d = (v/10) * 110; return `${150+d*Math.cos(a)},${150+d*Math.sin(a)}`; }).join(" ")} fill="hsl(var(--neon-pink) / 0.1)" stroke="hsl(var(--neon-pink) / 0.4)" strokeWidth="1" />
              <polygon points={[[9,0],[8,1],[10,2],[9,3],[6,4]].map(([v,i]) => { const a = (i * 72 - 90) * Math.PI/180; const d = (v/10) * 110; return `${150+d*Math.cos(a)},${150+d*Math.sin(a)}`; }).join(" ")} fill="hsl(var(--neon-lime) / 0.15)" stroke="hsl(var(--neon-lime))" strokeWidth="1.5" />
              <rect x="20" y="260" width="8" height="2" fill="hsl(var(--neon-lime) / 0.4)" /><text x="32" y="262" style={{ fontSize: 8, fontFamily: "var(--font-mono)" }} className="fill-muted-foreground" dominantBaseline="middle">Gen 1</text>
              <rect x="80" y="260" width="8" height="2" fill="hsl(var(--neon-pink) / 0.4)" /><text x="92" y="262" style={{ fontSize: 8, fontFamily: "var(--font-mono)" }} className="fill-muted-foreground" dominantBaseline="middle">Gen 2</text>
              <rect x="140" y="260" width="8" height="2" fill="hsl(var(--neon-lime))" /><text x="152" y="262" style={{ fontSize: 8, fontFamily: "var(--font-mono)" }} className="fill-muted-foreground" dominantBaseline="middle">Gen 3</text>
            </svg>
          </div>
        </div>

        {/* Comparison Table */}
        <div className={`mt-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <h3 className="text-xl font-display font-black text-foreground text-center mb-2 uppercase tracking-wider">Compare Models</h3>
          <p className="text-muted-foreground font-mono text-xs text-center mb-8">Side by side. No guesswork.</p>
          <div className="overflow-x-auto">
            <Table className="bg-card border border-border rounded">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Feature</TableHead>
                  <TableHead className="font-mono text-xs text-neon-lime uppercase tracking-widest text-center">Gen 1 OG</TableHead>
                  <TableHead className="font-mono text-xs text-neon-lime uppercase tracking-widest text-center">Gen 2 Trainer</TableHead>
                  <TableHead className="font-mono text-xs text-neon-lime uppercase tracking-widest text-center">Gen 3 Haptic Pro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.feature} className="border-border/50 hover:bg-surface/50">
                    <TableCell className="font-mono text-xs text-foreground">{row.feature}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground text-center"><CellValue value={row.gen1} /></TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground text-center"><CellValue value={row.gen2} /></TableCell>
                    <TableCell className="font-mono text-xs text-foreground text-center"><CellValue value={row.gen3} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
