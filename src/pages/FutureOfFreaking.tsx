import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Brain, Activity, Target, TrendingUp, Wifi, Smartphone, Trophy, Users, Globe, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const roadmapPhases = [
  {
    phase: "PHASE 01",
    title: "NEURAL SYNC",
    timeline: "Q3 2026",
    color: "lime" as const,
    items: [
      { icon: Brain, text: "AI-powered swing coaching with real-time correction" },
      { icon: Activity, text: "Biometric integration — heart rate, grip pressure, fatigue scoring" },
      { icon: Smartphone, text: "Freak-Pro App v2 with multiplayer data battles" },
    ],
  },
  {
    phase: "PHASE 02",
    title: "FREAK NETWORK",
    timeline: "Q1 2027",
    color: "pink" as const,
    items: [
      { icon: Users, text: "Cross-court matchmaking — find your skill-level rivals" },
      { icon: Globe, text: "Global leaderboard with city-based rankings" },
      { icon: Trophy, text: "Tournament mode with live spectator data overlays" },
    ],
  },
  {
    phase: "PHASE 03",
    title: "FULL HAPTIC",
    timeline: "Q4 2027",
    color: "lime" as const,
    items: [
      { icon: Wifi, text: "Paddle-to-paddle communication — feel your opponent's power" },
      { icon: Sparkles, text: "AR court visualization through smart glasses integration" },
      { icon: Target, text: "Predictive shot placement — know where the ball goes before you swing" },
    ],
  },
];

const visionStats = [
  { value: "2.4M", label: "Projected Users", sub: "by 2028" },
  { value: "47", label: "Cities", sub: "launch targets" },
  { value: "∞", label: "Potential", sub: "we're just starting" },
];

const FutureOfFreaking = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visiblePhases, setVisiblePhases] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-phase"));
            setVisiblePhases((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );
    const phases = sectionRef.current?.querySelectorAll("[data-phase]");
    phases?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background" ref={sectionRef}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6 lg:px-12 flex items-center justify-between h-14">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-neon-lime transition-colors text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="font-display text-xs tracking-widest uppercase text-foreground">
            Pickleball<span className="text-neon-lime">Freakshow</span>
          </span>
          <Button variant="neonLime" size="sm" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>

      <main className="pt-14">
        {/* Hero */}
        <section className="relative py-24 lg:py-40 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-neon-lime/[0.03] via-transparent to-neon-pink/[0.03]" />
            <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-10" />
          </div>

          {/* HUD corners */}
          <div className="absolute top-6 left-6 w-20 h-20 border-t border-l border-neon-lime/20" />
          <div className="absolute top-6 right-6 w-20 h-20 border-t border-r border-neon-pink/20" />
          <div className="absolute bottom-6 left-6 w-20 h-20 border-b border-l border-neon-pink/20" />
          <div className="absolute bottom-6 right-6 w-20 h-20 border-b border-r border-neon-lime/20" />

          <div className="container px-6 lg:px-12 relative z-10 text-center">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
                TRANSMISSION INCOMING
              </div>
            </div>

            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tight mb-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-foreground">THE FUTURE</span><br />
              <span className="text-foreground">OF </span>
              <span className="text-neon-pink neon-text-pink">FREAK</span>
              <span className="text-neon-lime neon-text-lime">ING</span>
            </h1>

            <p className={`text-sm sm:text-base text-muted-foreground font-mono max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              We're not building a better paddle. We're building a new sport.<br className="hidden sm:block" />
              AI coaching. Biometric data. Cross-court multiplayer. The underground is going global.
            </p>

            {/* Vision stats */}
            <div className={`flex justify-center gap-12 lg:gap-20 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {visionStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-display font-black text-neon-lime">{stat.value}</div>
                  <div className="text-xs text-foreground font-mono uppercase tracking-wider mt-1">{stat.label}</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24 lg:py-32">
          <div className="container px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
                THE <span className="text-neon-lime neon-text-lime">ROADMAP</span>
              </h2>
              <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg mx-auto">
                Three phases. One vision. Total domination of the data-driven court.
              </p>
            </div>

            <div className="space-y-8">
              {roadmapPhases.map((phase, index) => (
                <div
                  key={phase.phase}
                  data-phase={index}
                  className={`relative p-8 lg:p-12 bg-card border border-border rounded hud-corner transition-all duration-700 ${visiblePhases.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                    <div className="flex-shrink-0">
                      <div className={`text-xs font-mono tracking-widest uppercase mb-1 ${phase.color === "lime" ? "text-neon-lime" : "text-neon-pink"}`}>
                        {phase.phase}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-display font-black text-foreground">{phase.title}</h3>
                      <div className={`inline-block mt-2 px-3 py-1 text-xs font-mono tracking-wider border ${phase.color === "lime" ? "border-neon-lime/30 bg-neon-lime/5 text-neon-lime" : "border-neon-pink/30 bg-neon-pink/5 text-neon-pink"}`}>
                        {phase.timeline}
                      </div>
                    </div>

                    <div className="flex-1 grid sm:grid-cols-3 gap-4">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex gap-3 p-4 bg-surface rounded border border-border/50">
                          <item.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${phase.color === "lime" ? "text-neon-lime" : "text-neon-pink"}`} />
                          <p className="text-xs text-muted-foreground font-mono leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32 border-t border-border">
          <div className="container px-6 lg:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6">
              THE UNDERGROUND<br />
              <span className="text-neon-lime neon-text-lime">GOES GLOBAL</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm max-w-xl mx-auto mb-10">
              Be first in line. Join the Freak-List to get early access to every phase as it drops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neonLime" size="xl" onClick={() => navigate("/")}>
                Shop the Revolution <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="neonPinkOutline" size="xl" onClick={() => navigate("/")}>
                Join the Freak-Flow
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FutureOfFreaking;
