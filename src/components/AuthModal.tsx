import { useState } from "react";
import { X, Mail, Lock, Zap, CheckCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "signin" | "signup";
}

const AuthModal = ({ open, onClose, mode: initialMode = "signin" }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  if (!open) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({ title: "Check your email!", description: "We sent you a confirmation link." });
        setSuccess(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back! 🔥" });
        onClose();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "Error", description: String(error), variant: "destructive" });
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
            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-neon-lime mx-auto mb-4" />
                <h3 className="text-xl font-display font-black text-foreground mb-2">CHECK YOUR EMAIL</h3>
                <p className="text-sm text-muted-foreground font-mono">Click the link we sent to verify your account.</p>
                <Button variant="neonLime" size="sm" className="mt-6" onClick={onClose}>Got It</Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
                    <Zap className="w-3 h-3" /> {mode === "signin" ? "WELCOME BACK" : "JOIN THE FREAKS"}
                  </div>
                  <h3 className="text-2xl font-display font-black text-foreground">
                    {mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-border rounded text-sm font-mono text-foreground hover:border-neon-lime/50 transition-all active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Continue with Google
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center"><span className="bg-card px-3 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">or with email</span></div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-3">
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 bg-surface border-border text-foreground font-mono" required />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-surface border-border text-foreground font-mono" required />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 bg-surface border-border text-foreground font-mono" required minLength={6} />
                  </div>
                  <Button variant="neonLime" size="lg" className="w-full" type="submit" disabled={loading}>
                    {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Account"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                    className="text-xs text-muted-foreground font-mono hover:text-neon-lime transition-colors"
                  >
                    {mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
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

export default AuthModal;
