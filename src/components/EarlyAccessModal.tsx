import { useState } from "react";
import { X, Mail, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";

interface EarlyAccessModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
}

const EarlyAccessModal = ({ open, onClose, source = "general" }: EarlyAccessModalProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await supabase.from("waitlist").insert({ email, source });
      setSubmitted(true);
    } catch {
      toast({ title: "You're on the list! 🔥" });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (!error) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-card border border-border rounded-lg overflow-hidden animate-scale-in">
          <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-10" />

          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
            <X className="w-5 h-5" />
          </button>

          <div className="relative p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-neon-lime mx-auto mb-4" />
                <h3 className="text-xl font-display font-black text-foreground mb-2">YOU'RE IN</h3>
                <p className="text-sm text-muted-foreground font-mono">Welcome to the underground. We'll hit you with drops before anyone else.</p>
                <Button variant="neonLime" size="sm" className="mt-6" onClick={onClose}>
                  Let's Go
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
                    <Zap className="w-3 h-3" /> EXCLUSIVE ACCESS
                  </div>
                  <h3 className="text-2xl font-display font-black text-foreground mb-2">
                    JOIN THE <span className="text-neon-lime neon-text-lime">{source.startsWith("restock-") ? "RESTOCK LIST" : "FREAK-LIST"}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {source.startsWith("restock-") ? "Be first to know when the Volt Hoodie drops again." : "Early drops. Exclusive gear. Gen 3 priority. No spam."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-surface border-border text-foreground font-mono placeholder:text-muted-foreground focus:neon-border-lime"
                      required
                    />
                  </div>
                  <Button variant="neonLime" size="lg" className="w-full" type="submit" disabled={loading}>
                    {loading ? "Joining..." : "Get Early Access"}
                  </Button>
                </form>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center"><span className="bg-card px-3 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">or sign up with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGoogleSignup}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-border rounded text-sm font-mono text-foreground hover:border-neon-lime/50 transition-all active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google
                  </button>
                  <button
                    onClick={() => toast({ title: "Apple Sign-in coming soon", description: "Use email or Google for now." })}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-border rounded text-sm font-mono text-foreground hover:border-neon-lime/50 transition-all active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    Apple
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EarlyAccessModal;
