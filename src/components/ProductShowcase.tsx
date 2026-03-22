import { useEffect, useRef, useState } from "react";
import { Zap, Brain, Vibrate, Shield, Target, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import paddleXray from "@/assets/paddle-xray.jpg";

const features = [
  {
    icon: Shield,
    title: "Foam-Core Hybrid",
    desc: "Max pop, minimal vibration. 16mm injected polymer foam with carbon fiber shell.",
    color: "lime" as const,
  },
  {
    icon: Brain,
    title: "Neural-Grip Sensors",
    desc: "Real-time swing analytics. Embedded pressure mapping in the handle.",
    color: "pink" as const,
  },
  {
    icon: Vibrate,
    title: "Haptic-Pulse",
    desc: "Tactile feedback for perfect sweet-spot contact. Feel every strike.",
    color: "lime" as const,
  },
  {
    icon: Target,
    title: "Impact Mapping",
    desc: "Visualize exactly where the ball contacts. Heat-mapped precision data.",
    color: "pink" as const,
  },
  {
    icon: Gauge,
    title: "Velocity Tracking",
    desc: "Real-time swing speed up to 87mph. Benchmark against the pros.",
    color: "lime" as const,
  },
  {
    icon: Zap,
    title: "Quick-Charge",
    desc: "30-minute USB-C charge for 40+ hours of sensor uptime.",
    color: "pink" as const,
  },
];

const ProductShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeView, setActiveView] = useState<"exterior" | "xray">("exterior");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-lime/[0.02] to-transparent pointer-events-none" />

      <div className="container px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
            THE HARDWARE
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            FREAKSHOW <span className="text-neon-lime neon-text-lime">GEN 3</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg">
            Haptic Pro — The paddle that plays back. $289 USD.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Product image */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="relative aspect-square bg-surface rounded border border-border overflow-hidden group">
              <img
                src={paddleXray}
                alt="Freakshow Gen 3 Haptic Pro X-ray view"
                className={`w-full h-full object-cover transition-all duration-500 ${activeView === "xray" ? "opacity-100" : "opacity-70 saturate-50"}`}
              />

              {/* HUD overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 text-neon-lime/50 text-[10px] font-mono">
                  MODEL::GEN3-HP<br />
                  SERIAL::FK-2024-0847<br />
                  STATUS::CERTIFIED
                </div>
                <div className="absolute bottom-4 right-4 text-neon-pink/50 text-[10px] font-mono text-right">
                  FOAM::16MM POLY<br />
                  SENSORS::6-AXIS<br />
                  HAPTIC::ENABLED
                </div>
              </div>

              {/* View toggle */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onClick={() => setActiveView("exterior")}
                  className={`px-3 py-1 text-xs font-mono tracking-wider uppercase transition-all ${activeView === "exterior" ? "bg-neon-lime text-background" : "bg-surface text-muted-foreground border border-border"}`}
                >
                  Exterior
                </button>
                <button
                  onClick={() => setActiveView("xray")}
                  className={`px-3 py-1 text-xs font-mono tracking-wider uppercase transition-all ${activeView === "xray" ? "bg-neon-lime text-background" : "bg-surface text-muted-foreground border border-border"}`}
                >
                  X-Ray
                </button>
              </div>

              {/* Scanlines */}
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />
            </div>
          </div>

          {/* Features grid */}
          <div className="space-y-1">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group flex gap-4 p-4 rounded border border-transparent hover:border-border hover:bg-surface/50 transition-all duration-500 cursor-default ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center border ${
                    feature.color === "lime"
                      ? "border-neon-lime/30 bg-neon-lime/5 text-neon-lime"
                      : "border-neon-pink/30 bg-neon-pink/5 text-neon-pink"
                  }`}
                >
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-foreground tracking-wider uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 pl-4">
              <Button variant="neonLime" size="lg">
                Add to Cart — $289
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
