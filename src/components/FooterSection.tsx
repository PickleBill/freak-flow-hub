import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Send, MapPin, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import EarlyAccessModal from "@/components/EarlyAccessModal";

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
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
              <p className="text-xs text-muted-foreground font-mono mt-1">Status: Coming Soon. We play by the rules — then break them.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-surface rounded border border-border cursor-pointer hover:neon-border-pink transition-all">
            <Users className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-display font-bold text-foreground uppercase tracking-wider">Affiliate Program</div>
              <p className="text-xs text-muted-foreground font-mono mt-1">Join the Freakshow roster. Earn on every freak you convert.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-surface rounded border border-border cursor-pointer hover:neon-border-lime transition-all">
            <MapPin className="w-5 h-5 text-neon-lime flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-display font-bold text-foreground uppercase tracking-wider">Underground Map</div>
              <p className="text-xs text-muted-foreground font-mono mt-1">Find your nearest dealer. The underground is everywhere.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Zap className="w-4 h-4 text-neon-lime" />
            <span className="font-display text-xs tracking-widest uppercase text-muted-foreground">
              Pickleball<span className="text-neon-lime">Freakshow</span> © 2026
            </span>
          </div>
          <div className="flex gap-6 text-xs font-mono text-muted-foreground">
            <a href="#" className="hover:text-neon-lime transition-colors">Privacy</a>
            <a href="#" className="hover:text-neon-lime transition-colors">Terms</a>
            <a href="#" className="hover:text-neon-lime transition-colors">Returns</a>
          </div>
        </div>
      </div>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
    </footer>
  );
};

export default FooterSection;
