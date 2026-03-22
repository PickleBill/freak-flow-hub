import { useState } from "react";
import { Menu, X, ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-6 lg:px-12 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-lime" />
            <span className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
              Pickleball<span className="text-neon-lime">Freakshow</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Hardware", "Drops", "Flow", "Data"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-neon-lime transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-neon-lime">
              <ShoppingBag className="w-4 h-4" />
            </Button>
            <Button variant="neonLime" size="sm" className="hidden md:flex">
              Shop Now
            </Button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-6 py-4 space-y-3">
              {["Hardware", "Drops", "Flow", "Data"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm font-mono tracking-widest uppercase text-muted-foreground hover:text-neon-lime transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button variant="neonLime" size="sm" className="w-full mt-3">
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around h-14">
          <a href="#hardware" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-neon-lime transition-colors">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Shop</span>
          </a>
          <a href="#flow" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-neon-pink transition-colors">
            <Menu className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Flow</span>
          </a>
          <div className="flex flex-col items-center gap-0.5 text-neon-lime">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Cart</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
