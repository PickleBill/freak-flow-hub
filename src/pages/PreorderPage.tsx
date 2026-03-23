import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Lock, CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import paddleHero from "@/assets/paddle-hero.jpg";
import paddleXray from "@/assets/paddle-xray.jpg";

const productCatalog: Record<string, { name: string; price: number; image: string }> = {
  "gen1-og": { name: "Freakshow Gen 1 OG", price: 149, image: paddleHero },
  "gen2-trainer": { name: "Freakshow Gen 2 Trainer", price: 189, image: paddleXray },
  "gen3-haptic-pro": { name: "Freakshow Gen 3 Haptic Pro", price: 289, image: paddleHero },
};

const PreorderPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const product = productCatalog[slug || ""];
  const discountPrice = product ? +(product.price * 0.75).toFixed(2) : 0;
  const savings = product ? +(product.price - discountPrice).toFixed(2) : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Product Not Found</h1>
          <Button variant="neonLime" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handlePreorder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }
    setSubmitting(true);
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          email: user.email || formData.get("email") as string,
          status: "preorder",
          total: discountPrice,
          shipping_address: {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
          },
        })
        .select()
        .single();

      if (orderError) throw orderError;

      await supabase.from("order_items").insert({
        order_id: order.id,
        product_slug: slug!,
        product_name: product.name,
        quantity: 1,
        unit_price: discountPrice,
      });

      setOrderId(order.id.slice(0, 8).toUpperCase());
      setOrderPlaced(true);
      toast({ title: "Pre-order confirmed! 🔥" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-scale-in">
          <CheckCircle className="w-20 h-20 text-neon-lime mx-auto mb-6" />
          <h1 className="text-3xl font-display font-black text-foreground mb-3">PRE-ORDER CONFIRMED</h1>
          <p className="text-sm text-muted-foreground font-mono mb-2">Order #FK-{orderId}</p>
          <p className="text-sm text-muted-foreground font-mono mb-2">{product.name}</p>
          <div className="inline-block px-4 py-2 bg-neon-lime/10 border border-neon-lime/30 rounded mb-4">
            <span className="text-neon-lime font-display font-bold">You saved ${savings.toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground font-mono mb-8">Expected ship date: Q3 2026. You'll get tracking before anyone else.</p>
          <Button variant="neonLime" size="lg" onClick={() => navigate("/")}>Back to Freakshow</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6 lg:px-12 flex items-center justify-between h-14">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-neon-lime transition-colors text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-lime" />
            <span className="font-display text-xs tracking-widest uppercase text-foreground">Pre-Order</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Secure</span>
          </div>
        </div>
      </div>

      <main className="pt-14">
        <div className="container px-6 lg:px-12 py-12 lg:py-20">
          <div className={`grid lg:grid-cols-5 gap-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="lg:col-span-3">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-xs font-mono tracking-widest uppercase">
                  <Zap className="w-3 h-3" /> FREAK MEMBER EXCLUSIVE
                </div>
                <h1 className="text-2xl font-display font-black text-foreground mb-2">PRE-ORDER — 25% OFF</h1>
                <p className="text-sm text-muted-foreground font-mono">
                  {user ? `Signed in as ${user.email}` : "Sign in to unlock your Freak Member discount."}
                </p>
              </div>

              {!user && !authLoading && (
                <div className="mb-8 p-6 bg-card border border-neon-pink/30 rounded">
                  <p className="text-sm text-foreground font-mono mb-4">Sign in to complete your pre-order with Freak Member pricing.</p>
                  <Button variant="neonPinkOutline" onClick={() => setShowAuth(true)}>
                    Sign In / Create Account
                  </Button>
                </div>
              )}

              {user && (
                <form onSubmit={handlePreorder} className="space-y-6">
                  <div>
                    <label className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-2 block">Email</label>
                    <Input name="email" defaultValue={user.email || ""} className="bg-surface border-border font-mono" required />
                  </div>
                  <div>
                    <label className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-2 block">Shipping Address</label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input name="first_name" placeholder="First name" defaultValue={user.user_metadata?.full_name?.split(" ")[0] || ""} className="bg-surface border-border font-mono" required />
                        <Input name="last_name" placeholder="Last name" defaultValue={user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || ""} className="bg-surface border-border font-mono" required />
                      </div>
                      <Input name="address" placeholder="Address" className="bg-surface border-border font-mono" required />
                      <div className="grid grid-cols-3 gap-3">
                        <Input name="city" placeholder="City" className="bg-surface border-border font-mono" required />
                        <Input name="state" placeholder="State" className="bg-surface border-border font-mono" required />
                        <Input name="zip" placeholder="ZIP" className="bg-surface border-border font-mono" required />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-2 block">Card Information</label>
                    <div className="space-y-3">
                      <Input placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" className="bg-surface border-border font-mono" required />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="12 / 28" defaultValue="12 / 28" className="bg-surface border-border font-mono" required />
                        <Input placeholder="123" defaultValue="123" className="bg-surface border-border font-mono" required />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono mt-2">Test mode — no real charges will be made.</p>
                  </div>
                  <Button variant="neonLime" size="xl" className="w-full" type="submit" disabled={submitting}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {submitting ? "Processing..." : `Confirm Pre-Order — $${discountPrice.toFixed(2)}`}
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-20 p-6 bg-card border border-border rounded">
                <h3 className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-6">Pre-Order Summary</h3>
                <div className="flex gap-4 mb-6">
                  <div className="w-20 h-20 rounded border border-border overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">Qty: 1</p>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Retail Price</span>
                    <span className="line-through">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-neon-pink">
                    <span>Freak Member Discount (25%)</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-neon-lime">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-display font-bold text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-neon-lime">${discountPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-neon-lime/5 border border-neon-lime/20 rounded">
                  <p className="text-[10px] text-neon-lime font-mono uppercase tracking-wider text-center">
                    🔥 You save ${savings.toFixed(2)} as a Freak Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} mode="signup" />
    </div>
  );
};

export default PreorderPage;
