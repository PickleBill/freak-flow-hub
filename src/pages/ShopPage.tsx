import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ShoppingBag, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

import paddleHero from "@/assets/paddle-hero.jpg";
import paddleXray from "@/assets/paddle-xray.jpg";
import renegadeTee from "@/assets/renegade-tee.jpg";
import cyberMeshShorts from "@/assets/cyber-mesh-shorts.jpg";
import freakshowTechHat from "@/assets/freakshow-tech-hat.jpg";
import tropicalCourtShirt from "@/assets/tropical-court-shirt.jpg";
import chubbyFreakPants from "@/assets/chubby-freak-pants.jpg";
import electroBallPickleballs from "@/assets/electro-ball-pickleballs.jpg";
import neuralNetCourtBag from "@/assets/neural-net-court-bag.jpg";

type Category = "All" | "Paddles" | "Apparel" | "Gear";

const catalog = [
  { name: "Gen 1 OG", slug: "gen1-og", price: 149, tag: "IN STOCK", category: "Paddles" as Category, image: paddleHero, route: "/product/gen1-og" },
  { name: "Gen 2 Trainer", slug: "gen2-trainer", price: 189, tag: "MOST POPULAR", category: "Paddles" as Category, image: paddleXray, route: "/product/gen2-trainer" },
  { name: "Gen 3 Haptic Pro", slug: "gen3-haptic-pro", price: 289, tag: "FLAGSHIP", category: "Paddles" as Category, image: paddleHero, route: "/product/gen3-haptic-pro" },
  { name: "'Renegade' Oversized Tee", slug: "renegade-tee", price: 65, tag: "DROP 003", category: "Apparel" as Category, image: renegadeTee, route: "/apparel/renegade-tee" },
  { name: "'Cyber-Mesh' Shorts", slug: "cyber-mesh-shorts", price: 78, tag: "DROP 003", category: "Apparel" as Category, image: cyberMeshShorts, route: "/apparel/cyber-mesh-shorts" },
  { name: "'Freakshow' Tech-Hat", slug: "freakshow-tech-hat", price: 48, tag: "PRE-ORDER", category: "Apparel" as Category, image: freakshowTechHat, route: "/apparel/freakshow-tech-hat" },
  { name: "'Freakshow' Tropical Court Shirt", slug: "tropical-court-shirt", price: 85, tag: "DROP 004", category: "Apparel" as Category, image: tropicalCourtShirt, route: "/apparel/tropical-court-shirt" },
  { name: "'Chubby Freak' Wide-Leg Pants", slug: "chubby-freak-pants", price: 92, tag: "DROP 004", category: "Apparel" as Category, image: chubbyFreakPants, route: "/apparel/chubby-freak-pants" },
  { name: "'Electro-Ball' LED Pickleballs", slug: "electro-ball-pickleballs", price: 34, tag: "NEW GEAR", category: "Gear" as Category, image: electroBallPickleballs, route: "/apparel/electro-ball-pickleballs" },
  { name: "'Neural Net' Court Bag", slug: "neural-net-court-bag", price: 120, tag: "PRE-ORDER", category: "Gear" as Category, image: neuralNetCourtBag, route: "/apparel/neural-net-court-bag" },
];

const categories: Category[] = ["All", "Paddles", "Apparel", "Gear"];

const ShopPage = () => {
  const [active, setActive] = useState<Category>("All");
  const navigate = useNavigate();
  const { addToCart, toggleCart, cartCount } = useCart();

  const filtered = active === "All" ? catalog : catalog.filter((p) => p.category === active);

  const handleAdd = (e: React.MouseEvent, item: typeof catalog[0]) => {
    e.stopPropagation();
    addToCart({
      id: item.slug,
      name: item.name,
      price: item.price,
      priceLabel: `$${item.price}`,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-neon-lime transition-colors p-1">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <Zap className="w-4 h-4 text-neon-lime" />
              <span className="font-display font-bold text-sm tracking-widest uppercase">
                <span className="hidden sm:inline">Pickleball</span><span className="text-neon-lime">Freakshow</span>
              </span>
            </div>
          </div>
          <button onClick={toggleCart} className="relative text-foreground hover:text-neon-lime transition-colors p-2">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon-lime text-background text-[10px] font-mono font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>

      <div className="container px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
            <Filter className="w-3 h-3" /> FULL CATALOG
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black">
            SHOP <span className="text-neon-lime">EVERYTHING</span>
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-2">{filtered.length} products</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase border rounded transition-all duration-200 ${
                active === cat
                  ? "bg-neon-lime text-background border-neon-lime font-bold"
                  : "bg-transparent text-muted-foreground border-border hover:border-neon-lime/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((item) => (
            <div
              key={item.slug}
              onClick={() => navigate(item.route)}
              className="group relative bg-card border border-border rounded overflow-hidden cursor-pointer hover:border-neon-lime/50 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <Badge className="absolute top-2 left-2 bg-neon-lime/90 text-background text-[10px] font-mono border-0">
                  {item.tag}
                </Badge>
              </div>
              <div className="p-3">
                <h3 className="text-xs sm:text-sm font-mono font-bold text-foreground leading-tight mb-1 line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-display font-bold text-neon-lime">${item.price}</span>
                  <Button
                    variant="neonLime"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={(e) => handleAdd(e, item)}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CartDrawer />
    </div>
  );
};

export default ShopPage;
