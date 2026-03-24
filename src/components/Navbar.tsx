import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Zap, User, LogOut, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";

const scrollItems = [
  { label: "Hardware", id: "hardware" },
  { label: "Ecosystem", id: "ecosystem" },
  { label: "Data", id: "data" },
  { label: "Drops", id: "drops" },
  { label: "Flow", id: "flow" },
  { label: "Reviews", id: "reviews" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleCart, cartCount } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    }, 15000);
    const initial = setTimeout(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    }, 2000);
    return () => { clearInterval(interval); clearTimeout(initial); };
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6 lg:px-12 flex items-center justify-between h-14">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Zap className="w-5 h-5 text-neon-lime" />
            <span className={`font-display font-bold text-sm tracking-widest uppercase text-foreground ${glitchActive ? "glitch-active" : ""}`}>
              Pickleball<span className="text-neon-lime">Freakshow</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/shop")}
              className="text-xs font-mono tracking-widest uppercase text-neon-lime hover:text-neon-lime/80 transition-colors duration-200 font-bold"
            >
              Shop
            </button>
            {scrollItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-neon-lime transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs font-mono text-neon-lime truncate max-w-[120px]">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
                <button onClick={signOut} className="text-muted-foreground hover:text-neon-pink transition-colors p-1">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} className="hidden md:flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-neon-lime transition-colors">
                <User className="w-3.5 h-3.5" /> Sign In
              </button>
            )}
            <button onClick={toggleCart} className="relative text-foreground hover:text-neon-lime transition-colors p-2">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-lime text-background text-[10px] font-mono font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            <Button variant="neonLime" size="sm" className="hidden md:flex" onClick={() => navigate("/product/gen3-haptic-pro")}>
              Shop Now
            </Button>
            <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => { setIsOpen(false); navigate("/shop"); }}
                className="block text-sm font-mono tracking-widest uppercase text-neon-lime font-bold"
              >
                Shop All
              </button>
              {scrollItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.id)}
                  className="block text-sm font-mono tracking-widest uppercase text-muted-foreground hover:text-neon-lime transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <button onClick={() => { setIsOpen(false); signOut(); }} className="block text-sm font-mono text-neon-pink">
                  Sign Out
                </button>
              ) : (
                <button onClick={() => { setIsOpen(false); setShowAuth(true); }} className="block text-sm font-mono text-neon-lime">
                  Sign In / Sign Up
                </button>
              )}
              <Button variant="neonLime" size="sm" className="w-full mt-3" onClick={() => { setIsOpen(false); navigate("/product/gen3-haptic-pro"); }}>
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around h-14">
          <button onClick={() => scrollTo("hardware")} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-neon-lime transition-colors">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Shop</span>
          </button>
          <button onClick={() => scrollTo("flow")} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-neon-pink transition-colors">
            <Menu className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Flow</span>
          </button>
          <button onClick={toggleCart} className="relative flex flex-col items-center gap-0.5 text-neon-lime">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-1 w-4 h-4 bg-neon-lime text-background text-[10px] font-mono font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
          <button onClick={() => scrollTo("drops")} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-neon-pink transition-colors">
            <Crown className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Drops</span>
          </button>
        </div>
      </div>

      <CartDrawer />
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;
