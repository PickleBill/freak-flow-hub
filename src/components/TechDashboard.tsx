import { useEffect, useRef, useState } from "react";
import { Activity, Zap, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import appDashboard from "@/assets/app-dashboard.jpg";

const stats = [
  { icon: Zap, label: "Swing Velocity", value: "72.4", unit: "mph", trend: "+3.2%", color: "lime" },
  { icon: Target, label: "Sweet Spot %", value: "84.7", unit: "%", trend: "+5.1%", color: "pink" },
  { icon: Activity, label: "Health Score", value: "93", unit: "/100", trend: "+2.8%", color: "lime" },
  { icon: TrendingUp, label: "Sessions", value: "147", unit: "this mo.", trend: "+12%", color: "pink" },
];

const TechDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-lime/[0.01] to-transparent pointer-events-none" />

      <div className="container px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
            FREAK-PRO APP
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            YOUR <span className="text-neon-lime neon-text-lime">DATA</span>, YOUR DOMINANCE
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-xl mx-auto">
            Skate to where the puck is going. Real-time analytics from every swing, every session, every game.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-5 bg-card border border-border rounded hud-corner transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`w-5 h-5 mb-3 ${stat.color === "lime" ? "text-neon-lime" : "text-neon-pink"}`} />
              <div className="text-3xl font-display font-black text-foreground">
                {stat.value}
                <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{stat.label}</div>
              <div className={`text-xs font-mono mt-2 ${stat.color === "lime" ? "text-neon-lime" : "text-neon-pink"}`}>
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div
          className={`relative rounded border border-border overflow-hidden transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <img
            src={appDashboard}
            alt="Freak-Pro app dashboard showing swing velocity, impact map, and health score"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <Button variant="neonLime" size="lg">
              Download Freak-Pro — Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechDashboard;
