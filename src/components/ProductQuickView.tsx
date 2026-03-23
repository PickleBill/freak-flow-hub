import { X, ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface QuickViewProduct {
  slug: string;
  name: string;
  price: string;
  priceNum: number;
  status: "In Stock" | "Pre-Order";
  desc: string;
  image: string;
  badge: string | null;
}

interface ProductQuickViewProps {
  product: QuickViewProduct | null;
  onClose: () => void;
}

const ProductQuickView = ({ product, onClose }: ProductQuickViewProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  if (!product) return null;
  return (
    <>
      <div className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[71] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="relative w-full max-w-lg bg-card border border-border rounded-t-lg sm:rounded-lg overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-3 z-10 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="grid sm:grid-cols-2">
            <div className="relative aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
              <div className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border ${product.status === "Pre-Order" ? "border-neon-pink/30 bg-neon-pink/10 text-neon-pink" : "border-neon-lime/30 bg-neon-lime/10 text-neon-lime"}`}>
                {product.status}
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-display font-black text-foreground uppercase tracking-wider mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground font-mono mb-4">{product.desc}</p>
                <div className="text-2xl font-display font-black text-neon-lime">{product.price}</div>
              </div>
              <div className="mt-6 space-y-2">
                <Button variant="neonLime" size="lg" className="w-full" onClick={() => { addToCart({ id: product.slug, name: `Freakshow ${product.name}`, price: product.priceNum, priceLabel: product.price, image: product.image }); onClose(); }}>
                  <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
                <button onClick={() => { onClose(); navigate(`/product/${product.slug}`); }} className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground font-mono hover:text-neon-lime transition-colors">
                  View Full Details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;
