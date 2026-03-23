import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Send, MapPin, Users, Shield, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EarlyAccessModal from "@/components/EarlyAccessModal";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.77-1.83V6.69h3.77z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        await supabase.from("waitlist").insert({ email, source: "footer" });
      } catch {}
      toast({ title: "You're on the list! 🔥", description: "We'll hit you with drops before anyone else." });
      setEmail("");
    }
  };

  return (
    <footer className="relative border-t border-border bg-card py-16 lg:py-24">
      <div className="container px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-display font-black text-foreground mb-3">
            JOIN THE <span className="text-neon-lime neon-text-lime">FREAK-LIST</span>
          </h3>
          <p className="text-sm text-muted-foreground font-mono mb-6">
            Early access to Gen 3 drops. Exclusive gear. No spam — just heat.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border-border text-foreground font-mono placeholder:text-muted-foreground focus:neon-border-lime"
              required
            />
            <Button variant="neonLime" size="default" type="submit">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <button
            onClick={() => setShowEarlyAccess(true)}
            className="mt-4 text-xs text-neon-pink font-mono hover:text-neon-lime transition-colors underline underline-offset-4"
          >
            Or sign up with Google / Apple →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="flex items-start gap-3 p-4 bg-surface rounded border border-border cursor-pointer hover:neon-border-lime transition-all" onClick={() => navigate("/future")}>
            <Shield className="w-5 h-5 text-neon-lime flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-display font-bold text-foreground uppercase tracking-wider">USAP Compliance</div>
              <p className="text-xs text-muted-foreground font-mono mt-1">USAP submission filed Q3 2026. Gen 3 certified for sanctioned play upon approval.</p>
            </div>
          </div>
          <div
            className="flex items-start gap-3 p-4 bg-surface rounded border border-border cursor-pointer hover:neon-border-pink transition-all"
            onClick={() => toast({ title: "🤝 Affiliate program launching Q3 2026.", description: "Drop your email in the Freak-List to get notified." })}
          >
            <Users className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-display font-bold text-foreground uppercase tracking-wider">Affiliate Program</div>
              <p className="text-xs text-muted-foreground font-mono mt-1">Join the Freakshow roster. Earn on every freak you convert.</p>
            </div>
          </div>
          <div
            className="flex items-start gap-3 p-4 bg-surface rounded border border-border cursor-pointer hover:neon-border-lime transition-all"
            onClick={() => toast({ title: "📍 Underground map coming soon.", description: "For now, all orders ship direct from Freakshow HQ." })}
          >
            <MapPin className="w-5 h-5 text-neon-lime flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-display font-bold text-foreground uppercase tracking-wider">Underground Map</div>
              <p className="text-xs text-muted-foreground font-mono mt-1">Find your nearest dealer. The underground is everywhere.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-8 border-t border-border/50 gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Zap className="w-4 h-4 text-neon-lime" />
            <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">
              Pickleball<span className="text-neon-lime">Freakshow</span> © 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex gap-4 sm:gap-6 text-xs font-mono text-muted-foreground">
              <button onClick={() => toast({ title: "Coming Soon", description: "Legal pages are being finalized. Email support@pickleballfreakshow.com for questions." })} className="hover:text-neon-lime transition-colors">Privacy</button>
              <button onClick={() => toast({ title: "Coming Soon", description: "Legal pages are being finalized. Email support@pickleballfreakshow.com for questions." })} className="hover:text-neon-lime transition-colors">Terms</button>
              <button onClick={() => toast({ title: "Coming Soon", description: "Legal pages are being finalized. Email support@pickleballfreakshow.com for questions." })} className="hover:text-neon-lime transition-colors">Returns</button>
            </div>
            <div className="flex gap-3">
              <a href="https://instagram.com/pickleballfreakshow" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-lime transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="https://tiktok.com/@pickleballfreakshow" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-lime transition-colors"><TikTokIcon /></a>
              <a href="https://x.com/pickleballfreakshow" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-lime transition-colors"><XIcon /></a>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
            <span>Part of the</span>
            <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:text-neon-lime transition-colors">
              Courtana Ecosystem
            </a>
          </div>
        </div>
      </div>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} source="footer" />
    </footer>
  );
};

export default FooterSection;
