import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import paddleHero from "@/assets/paddle-hero.jpg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(163, 230, 53, 0.6)";
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-[1]" />
        <img src={paddleHero} alt="Freakshow Gen 3 Haptic Pro paddle" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />
      <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-neon-lime/30" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-neon-lime/30" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-neon-lime/30" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-neon-lime/30" />
      <div className="absolute top-1/4 right-12 text-neon-lime/30 font-mono text-xs hidden lg:block animate-pulse-neon">
        SYS::ONLINE<br />HAPTIC::ARMED<br />SENSORS::6-AXIS
      </div>

      <div className="container relative z-10 px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 mb-8 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
            GEN 3 HAPTIC PRO — NOW LIVE
          </div>

          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tight mb-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-foreground">THE FUTURE</span><br />
            <span className="text-foreground">IS </span>
            <span className="text-neon-lime neon-text-lime neon-flicker">FREAKY</span>
            <span className="text-neon-pink neon-text-pink">.</span>
          </h1>

          <p className={`text-sm sm:text-base text-muted-foreground font-mono max-w-xl leading-relaxed mb-10 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Next-Gen Gen 3 Hybrid Paddles. Haptic Feedback. Pro Performance.<br className="hidden sm:block" />
            Welcome to the Underground.
          </p>

          <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <Button variant="neonLime" size="xl" onClick={() => navigate("/product/gen3-haptic-pro")}>
              Shop the Revolution
            </Button>
            <Button variant="neonPinkOutline" size="xl" onClick={() => setShowEarlyAccess(true)}>
              Get Early Access
            </Button>
          </div>

          <p className={`text-[11px] text-muted-foreground font-mono mt-4 transition-all duration-700 delay-650 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Free shipping on orders $200+ · 30-day returns · USAP submission Q3 2026
          </p>

          <div className={`flex flex-wrap items-center gap-4 sm:gap-6 mt-8 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
              <span className="text-[11px] text-muted-foreground font-mono">4,200+ on the Freak-List</span>
            </div>
            <span className="text-border text-xs">·</span>
            <span className="text-[11px] text-muted-foreground font-mono">234K TikTok views</span>
            <span className="text-border text-xs">·</span>
            <span className="text-[11px] text-muted-foreground font-mono">⭐⭐⭐⭐⭐ 5-star rated</span>
          </div>

          <div className={`flex flex-wrap gap-4 sm:gap-8 mt-16 pt-8 border-t border-border/50 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { value: "16mm", label: "Foam Core" },
              { value: "47.3g", label: "Handle Weight" },
              { value: "8.2oz", label: "Total Mass" },
              { value: "6-Axis", label: "Neural-Grip™" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-neon-lime">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
    </section>
  );
};

export default HeroSection;
