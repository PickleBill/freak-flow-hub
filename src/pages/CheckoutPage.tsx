import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const placeOrder = async (email: string, formData?: FormData) => {
    setSubmitting(true);
    try {
      const insertData: any = {
        email,
        status: "confirmed",
        total: cartTotal,
        shipping_address: formData ? {
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          address: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state"),
          zip: formData.get("zip"),
        } : null,
      };
      if (user?.id) insertData.user_id = user.id;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(insertData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = state.items.map((item) => ({
        order_id: order.id,
        product_slug: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        size: item.size || null,
      }));

      await supabase.from("order_items").insert(orderItems);

      setOrderId(order.id.slice(0, 8).toUpperCase());
      setOrderPlaced(true);
      clearCart();
      toast({ title: "Order Confirmed! 🔥", description: "Your Freakshow gear is on its way." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleExpressCheckout = () => {
    placeOrder(user?.email || "guest@freakshow.com");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    placeOrder(formData.get("email") as string, formData);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-scale-in">
          <CheckCircle className="w-20 h-20 text-neon-lime mx-auto mb-6" />
          <h1 className="text-3xl font-display font-black text-foreground mb-3">ORDER CONFIRMED</h1>
          <p className="text-sm text-muted-foreground font-mono mb-2">Order #FK-{orderId}</p>
          <p className="text-sm text-muted-foreground font-mono mb-8">Welcome to the underground. Your gear ships within 48 hours.</p>
          <Button variant="neonLime" size="lg" onClick={() => navigate("/")}>
            Back to Freakshow
          </Button>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Cart is Empty</h1>
          <Button variant="neonLime" onClick={() => navigate("/")}>Shop Now</Button>
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
            <span className="font-display text-xs tracking-widest uppercase text-foreground">Checkout</span>
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
              <div className="mb-10">
                <h2 className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-4">Express Checkout</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleExpressCheckout}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 h-12 bg-foreground text-background rounded font-mono text-sm hover:opacity-90 transition-opacity active:scale-[0.97] disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    Apple Pay
                  </button>
                  <button
                    onClick={handleExpressCheckout}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 h-12 bg-foreground text-background rounded font-mono text-sm hover:opacity-90 transition-opacity active:scale-[0.97] disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google Pay
                  </button>
                </div>
              </div>

              <div className="relative mb-10">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="bg-background px-4 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">or pay with card</span></div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <label className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-2 block">Email</label>
                  <Input name="email" defaultValue={user?.email || ""} placeholder="freak@example.com" className="bg-surface border-border font-mono" required />
                </div>
                <div>
                  <label className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-2 block">Shipping Address</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input name="first_name" placeholder="First name" defaultValue={user?.user_metadata?.full_name?.split(" ")[0] || ""} className="bg-surface border-border font-mono" required />
                      <Input name="last_name" placeholder="Last name" defaultValue={user?.user_metadata?.full_name?.split(" ").slice(1).join(" ") || ""} className="bg-surface border-border font-mono" required />
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
                    <Input placeholder="Card number" className="bg-surface border-border font-mono" required />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="MM / YY" className="bg-surface border-border font-mono" required />
                      <Input placeholder="CVV" className="bg-surface border-border font-mono" required />
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono mt-2">Stripe integration coming soon. Your order will be reserved and confirmed — you'll be contacted before any charge.</p>
                </div>
                <Button variant="neonLime" size="xl" className="w-full" type="submit" disabled={submitting}>
                  {submitting ? "Processing..." : `Place Order — $${cartTotal.toFixed(2)}`}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-20 p-6 bg-card border border-border rounded">
                <h3 className="text-xs font-display font-bold text-foreground uppercase tracking-widest mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded overflow-hidden border border-border flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-lime rounded-full flex items-center justify-center text-background text-[10px] font-mono font-bold">{item.quantity}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-foreground truncate">{item.name}</p>
                        {item.size && <p className="text-[10px] text-muted-foreground font-mono">Size: {item.size}</p>}
                      </div>
                      <p className="text-xs font-mono text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Shipping</span><span className="text-neon-lime">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-display font-bold text-foreground pt-2 border-t border-border">
                    <span>Total</span><span className="text-neon-lime">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
