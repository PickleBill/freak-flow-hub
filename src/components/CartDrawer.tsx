import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { state, dispatch, toggleCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!state.isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm" onClick={toggleCart} />
      <div className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-md bg-card border-l border-border flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-sm font-display font-bold tracking-widest uppercase text-foreground">
            Cart <span className="text-neon-lime">({cartCount})</span>
          </h2>
          <button onClick={toggleCart} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground font-mono">Your cart is empty</p>
              <Button variant="neonLime" size="sm" className="mt-4" onClick={() => { toggleCart(); navigate("/"); }}>
                Shop Now
              </Button>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-surface rounded border border-border">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-display font-bold text-foreground uppercase tracking-wider truncate">{item.name}</h3>
                  {item.size && <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Size: {item.size}</p>}
                  <p className="text-sm text-neon-lime font-mono mt-1">{item.priceLabel}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })}
                      className="w-6 h-6 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-neon-lime/50 transition-colors rounded-sm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono text-foreground w-6 text-center tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })}
                      className="w-6 h-6 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-neon-lime/50 transition-colors rounded-sm"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total</span>
              <span className="text-lg font-display font-bold text-neon-lime">${cartTotal.toFixed(2)}</span>
            </div>
            <Button variant="neonLime" size="lg" className="w-full" onClick={() => { toggleCart(); navigate("/checkout"); }}>
              Checkout
            </Button>
            <Button variant="neonPinkOutline" size="sm" className="w-full" onClick={toggleCart}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
