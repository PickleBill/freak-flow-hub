import { useEffect, useRef, useState } from "react";
import { Activity, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Activity,
    title: "Smart Paddle Data",
    desc: "Every swing generates impact force, spin rate, and sweet spot data. Your Gen 3 sends it all to your Courtana profile automatically.",
  },
  {
    icon: Brain,
    title: "AI Coaching Integration",
    desc: "Courtana's AI engine analyzes your paddle metrics alongside your video sessions. Get insights no human coach could spot alone.",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    desc: "Watch your metrics improve over time. Your paddle data + your court data + your coaching curriculum = the complete picture.",
  },
];

const CourtanaIntegration = () => {
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-pink/[0.015] to-transparent pointer-events-none" />
      <div className="container px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse-neon" />
            THE PERFORMANCE STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            HARDWARE <span className="text-neon-pink neon-text-pink">×</span> SOFTWARE
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-xl mx-auto">
            Your Freakshow paddle talks to Courtana's AI. Together, they make you dangerous.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-6 bg-card border border-border rounded hover-glitch transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-10 h-10 rounded bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-neon-pink" />
              </div>
              <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-wider mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="neonLime" size="lg" asChild>
            <a href="https://courtana.com" target="_blank" rel="noopener noreferrer">
              Explore Courtana Coaching →
            </a>
          </Button>
          <Button variant="ghost" size="lg" className="text-neon-lime hover:text-neon-lime/80">
            Already on Courtana? Connect your paddle →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourtanaIntegration;
