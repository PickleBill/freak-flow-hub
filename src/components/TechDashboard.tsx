import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Zap, Target, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EarlyAccessModal from "@/components/EarlyAccessModal";

const stats = [
  { icon: Zap, label: "Swing Velocity", value: "72.4", unit: "mph", trend: "+3.2%", color: "lime" },
  { icon: Target, label: "Sweet Spot %", value: "84.7", unit: "%", trend: "+5.1%", color: "pink" },
  { icon: Activity, label: "Health Score", value: "93", unit: "/100", trend: "+2.8%", color: "lime" },
  { icon: TrendingUp, label: "Sessions", value: "147", unit: "this mo.", trend: "+12%", color: "pink" },
];

const TechDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
            THE FUTURE OF FREAKING
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            YOUR <span className="text-neon-lime neon-text-lime">DATA</span>, YOUR DOMINANCE
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-xl mx-auto">
            Skate to where the puck is going. Real-time analytics from every swing, every session, every game.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-5 bg-card border border-border rounded hud-corner hover-glitch transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`w-5 h-5 mb-3 ${stat.color === "lime" ? "text-neon-lime" : "text-neon-pink"}`} />
              <div className="text-3xl font-display font-black text-foreground tabular-nums">
                {stat.value}<span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{stat.label}</div>
              <div className={`text-xs font-mono mt-2 ${stat.color === "lime" ? "text-neon-lime" : "text-neon-pink"}`}>{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Clean HUD Dashboard Mockup */}
        <div className={`relative rounded border border-border overflow-hidden bg-card transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="p-6 lg:p-8">
            {/* App Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-neon-lime" />
                </div>
                <div>
                  <div className="text-xs font-display font-bold text-foreground uppercase tracking-widest">Freak-Pro</div>
                  <div className="text-[10px] text-muted-foreground font-mono">v2.0 — Session Active</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-lime rounded-full animate-pulse-neon" />
                <span className="text-[10px] text-neon-lime font-mono uppercase tracking-wider">Live</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Paddle Impact Map */}
              <div className="lg:col-span-1 p-5 bg-surface rounded border border-border/50">
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-4">Impact Map</div>
                <div className="relative aspect-[3/4] flex items-center justify-center">
                  {/* SVG Paddle Silhouette with impact zones */}
                  <svg viewBox="0 0 120 180" className="w-full h-full max-w-[160px]">
                    <rect x="30" y="10" width="60" height="80" rx="12" fill="none" stroke="hsl(var(--neon-lime) / 0.3)" strokeWidth="1.5" />
                    <rect x="48" y="90" width="24" height="70" rx="6" fill="none" stroke="hsl(var(--neon-lime) / 0.2)" strokeWidth="1" />
                    {/* Sweet spot */}
                    <ellipse cx="60" cy="45" rx="18" ry="22" fill="hsl(var(--neon-lime) / 0.15)" stroke="hsl(var(--neon-lime) / 0.4)" strokeWidth="1" />
                    <ellipse cx="60" cy="45" rx="10" ry="12" fill="hsl(var(--neon-lime) / 0.3)" />
                    {/* Hit markers */}
                    <circle cx="58" cy="42" r="2" fill="hsl(var(--neon-lime))" />
                    <circle cx="63" cy="48" r="2" fill="hsl(var(--neon-lime))" />
                    <circle cx="55" cy="50" r="1.5" fill="hsl(var(--neon-lime) / 0.7)" />
                    <circle cx="65" cy="38" r="1.5" fill="hsl(var(--neon-pink))" />
                    <circle cx="50" cy="55" r="1.5" fill="hsl(var(--neon-pink) / 0.7)" />
                    <circle cx="60" cy="44" r="1" fill="hsl(var(--neon-lime))" />
                    <circle cx="62" cy="41" r="1.5" fill="hsl(var(--neon-lime))" />
                    {/* Sensor dots on handle */}
                    <circle cx="56" cy="110" r="1.5" fill="hsl(var(--neon-lime) / 0.5)" className="animate-pulse-neon" />
                    <circle cx="64" cy="110" r="1.5" fill="hsl(var(--neon-lime) / 0.5)" className="animate-pulse-neon" />
                    <circle cx="56" cy="130" r="1.5" fill="hsl(var(--neon-lime) / 0.3)" />
                    <circle cx="64" cy="130" r="1.5" fill="hsl(var(--neon-lime) / 0.3)" />
                  </svg>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-mono">Sweet Spot Hits</span>
                  <span className="text-xs text-neon-lime font-mono font-bold">84.7%</span>
                </div>
              </div>

              {/* Swing Data */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface rounded border border-border/50">
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-2">Avg Swing Speed</div>
                    <div className="text-3xl font-display font-black text-neon-lime tabular-nums">72.4<span className="text-sm text-muted-foreground ml-1">mph</span></div>
                    <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-neon-lime rounded-full" style={{ width: "72%" }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground font-mono">0</span>
                      <span className="text-[10px] text-muted-foreground font-mono">100 mph</span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded border border-border/50">
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-2">Health Score</div>
                    <div className="text-3xl font-display font-black text-foreground tabular-nums">93<span className="text-sm text-muted-foreground ml-1">/100</span></div>
                    <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-neon-lime rounded-full" style={{ width: "93%" }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground font-mono">Recovery</span>
                      <span className="text-[10px] text-neon-lime font-mono">Optimal</span>
                    </div>
                  </div>
                </div>

                {/* Session Timeline */}
                <div className="p-4 bg-surface rounded border border-border/50">
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-3">Session Timeline</div>
                  <div className="flex items-end gap-1 h-16">
                    {[35, 52, 68, 45, 72, 58, 64, 78, 55, 71, 63, 80, 72, 68, 75, 82, 70, 65, 73, 77].map((v, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${v}%`, background: v > 70 ? 'hsl(var(--neon-lime) / 0.7)' : 'hsl(var(--neon-lime) / 0.2)' }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground font-mono">0:00</span>
                    <span className="text-[10px] text-muted-foreground font-mono">47:23</span>
                  </div>
                </div>

                {/* Wrist Angle */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-surface rounded border border-border/50 text-center">
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Spin Rate</div>
                    <div className="text-lg font-display font-bold text-neon-pink tabular-nums">1,847</div>
                    <div className="text-[10px] text-neon-pink font-mono">rpm</div>
                  </div>
                  <div className="p-3 bg-surface rounded border border-border/50 text-center">
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Impact Force</div>
                    <div className="text-lg font-display font-bold text-neon-lime tabular-nums">284</div>
                    <div className="text-[10px] text-neon-lime font-mono">newtons</div>
                  </div>
                  <div className="p-3 bg-surface rounded border border-border/50 text-center">
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Wrist Angle</div>
                    <div className="text-lg font-display font-bold text-foreground tabular-nums">12.3°</div>
                    <div className="text-[10px] text-muted-foreground font-mono">optimal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-10" />

          <div className="border-t border-border p-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="neonLime" size="lg" onClick={() => navigate("/future")}>
              Explore the Future <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="neonPinkOutline" size="lg" onClick={() => setShowEarlyAccess(true)}>
              Get Early Access — Freak-Pro App
            </Button>
          </div>
        </div>
      </div>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
    </section>
  );
};

export default TechDashboard;
