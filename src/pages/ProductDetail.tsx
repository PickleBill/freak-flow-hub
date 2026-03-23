import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Zap, Shield, Brain, Vibrate, Target, Gauge, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import paddleXray from "@/assets/paddle-xray.jpg";
import paddleHero from "@/assets/paddle-hero.jpg";
import { useState, useEffect } from "react";

const productData: Record<string, {
  name: string;
  tagline: string;
  price: string;
  priceNum: number;
  status: "instock" | "preorder";
  images: string[];
  features: { icon: typeof Zap; title: string; desc: string; color: "lime" | "pink" }[];
  specs: { label: string; value: string }[];
  reviews: { name: string; rating: number; text: string }[];
}> = {
  "gen1-og": {
    name: "Freakshow Gen 1 OG",
    tagline: "The original that started the underground. Standard foam core. Pure feel. No frills.",
    price: "$149",
    priceNum: 149,
    status: "instock",
    images: [paddleHero, paddleXray],
    features: [
      { icon: Shield, title: "Foam-Core Standard", desc: "14mm polymer foam core. Classic feel with reliable pop.", color: "lime" },
      { icon: Target, title: "Wide Body", desc: "Standard face size for forgiving contact and consistent play.", color: "pink" },
      { icon: Gauge, title: "Lightweight Build", desc: "7.8oz total weight for fast hands at the kitchen.", color: "lime" },
    ],
    specs: [
      { label: "Core", value: "14mm Polymer Foam" },
      { label: "Face", value: "Fiberglass" },
      { label: "Weight", value: "7.8 oz" },
      { label: "Handle", value: "5.0\" Standard" },
    ],
    reviews: [
      { name: "Alex R.", rating: 5, text: "Solid entry paddle. Great feel and the price is unbeatable for this quality." },
      { name: "Sam K.", rating: 4, text: "Love the simplicity. No gimmicks, just a well-built paddle." },
    ],
  },
  "gen2-trainer": {
    name: "Freakshow Gen 2 Trainer",
    tagline: "Smaller face, tighter control. Built for drills, designed for precision freaks.",
    price: "$189",
    priceNum: 189,
    status: "instock",
    images: [paddleXray, paddleHero],
    features: [
      { icon: Target, title: "Compact Face", desc: "Reduced hitting surface forces precision — train your sweet spot.", color: "pink" },
      { icon: Shield, title: "Thin Profile", desc: "13mm core for a thinner, faster profile with enhanced feedback.", color: "lime" },
      { icon: Gauge, title: "Featherweight", desc: "7.4oz — the lightest Freakshow. Built for speed drills and reaction training.", color: "pink" },
      { icon: Brain, title: "Grip Texture", desc: "Enhanced perforated grip for extended drill sessions.", color: "lime" },
    ],
    specs: [
      { label: "Core", value: "13mm Polymer Foam" },
      { label: "Face", value: "Carbon Fiber" },
      { label: "Weight", value: "7.4 oz" },
      { label: "Handle", value: "5.25\" Extended" },
    ],
    reviews: [
      { name: "Jordan M.", rating: 5, text: "My coach recommended this and my accuracy improved in two weeks. Incredible training tool." },
      { name: "Casey L.", rating: 5, text: "The smaller face forces you to be better. Then you switch to the Gen 3 and feel unstoppable." },
    ],
  },
  "gen3-haptic-pro": {
    name: "Freakshow Gen 3 Haptic Pro",
    tagline: "The paddle that plays back. Haptic feedback meets foam-core hybrid tech.",
    price: "$289",
    priceNum: 289,
    status: "preorder",
    images: [paddleHero, paddleXray],
    features: [
      { icon: Shield, title: "Foam-Core Hybrid", desc: "16mm injected polymer foam with carbon fiber shell. Max pop, minimal vibration.", color: "lime" },
      { icon: Brain, title: "Neural-Grip Sensors", desc: "Embedded 6-axis pressure mapping in the handle for real-time swing analytics.", color: "pink" },
      { icon: Vibrate, title: "Haptic-Pulse", desc: "Tactile vibration feedback on sweet-spot contact. Feel every perfect strike.", color: "lime" },
      { icon: Target, title: "Impact Mapping", desc: "Visualize exactly where the ball contacts. Heat-mapped precision data synced to app.", color: "pink" },
      { icon: Gauge, title: "Velocity Tracking", desc: "Real-time swing speed measurement up to 87mph. Benchmark against pros.", color: "lime" },
      { icon: Zap, title: "Quick-Charge", desc: "30-minute USB-C charge for 40+ hours of continuous sensor uptime.", color: "pink" },
    ],
    specs: [
      { label: "Core", value: "16mm Polymer Foam" },
      { label: "Face", value: "T700 Carbon Fiber" },
      { label: "Weight", value: "8.2 oz" },
      { label: "Handle", value: "5.5\" Neural-Grip" },
      { label: "Sensors", value: "6-Axis IMU + Piezo" },
      { label: "Battery", value: "40+ hrs" },
      { label: "Charging", value: "USB-C (30 min)" },
      { label: "Connectivity", value: "BLE 5.3" },
    ],
    reviews: [
      { name: "Kai T.", rating: 5, text: "The haptic feedback is actually insane. I can feel when I nail the sweet spot every time. Game changer." },
      { name: "Morgan V.", rating: 5, text: "Best paddle I've ever owned. The sensor data synced to my phone and I improved my spin rate 12% in a week." },
      { name: "River S.", rating: 4, text: "Foam core gives incredible pop. Handle took a session to get used to but now I won't play with anything else." },
    ],
  },
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const { addToCart, toggleCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  const product = productData[slug || "gen3-haptic-pro"];
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

  const discountPrice = +(product.priceNum * 0.75).toFixed(2);

  const handleAddToCart = () => {
    addToCart({
      id: slug || "gen3-haptic-pro",
      name: product.name,
      price: product.priceNum,
      priceLabel: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-muted-foreground hover:text-neon-lime transition-colors text-sm font-mono flex-shrink-0">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back</span>
          </button>
          <span className="font-display text-[10px] sm:text-xs tracking-widest uppercase text-foreground cursor-pointer truncate mx-2" onClick={() => navigate("/")}>
            <span className="hidden sm:inline">Pickleball</span><span className="text-neon-lime">Freakshow</span>
          </span>
          <Button variant="neonLime" size="sm" className="flex-shrink-0" onClick={toggleCart}>
            <ShoppingBag className="w-4 h-4 sm:mr-1" /> <span className="hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>

      <main className="pt-14">
        <div className="container px-6 lg:px-12 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative aspect-square bg-card rounded border border-border overflow-hidden mb-4">
                <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />
              </div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded border overflow-hidden transition-all ${activeImage === i ? "border-neon-lime neon-glow-lime" : "border-border opacity-50 hover:opacity-80"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 border text-xs font-mono tracking-widest uppercase ${product.status === "preorder" ? "border-neon-pink/30 bg-neon-pink/5 text-neon-pink" : "border-neon-lime/30 bg-neon-lime/5 text-neon-lime"}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse-neon ${product.status === "preorder" ? "bg-neon-pink" : "bg-neon-lime"}`} />
                {product.status === "preorder" ? "PRE-ORDER" : "IN STOCK"}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-black text-foreground mb-3 leading-tight">
                {product.name.toUpperCase()}
              </h1>
              <p className="text-muted-foreground font-mono text-sm mb-6">{product.tagline}</p>
              <div className="text-4xl font-display font-black text-neon-lime mb-8">{product.price}</div>

              <Button variant="neonLime" size="xl" className="w-full mb-4" onClick={handleAddToCart}>
                <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart — {product.price}
              </Button>

              <Button
                variant="neonPinkOutline"
                size="lg"
                className="w-full mb-4"
                onClick={() => navigate(`/preorder/${slug}`)}
              >
                <Crown className="w-4 h-4 mr-2" />
                Freak Member Pre-Order — <span className="line-through opacity-60 mx-1">{product.price}</span> ${discountPrice.toFixed(2)}
              </Button>

              <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-neon-lime" onClick={() => setShowEarlyAccess(true)}>
                Join the Freak-List for early access →
              </Button>

              <div className="mt-12">
                <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-widest mb-4">Technical Specs</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{spec.label}</span>
                      <span className="text-xs text-foreground font-mono">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-display font-black text-foreground mb-12 text-center">
              THE <span className="text-neon-lime neon-text-lime">TECH</span> INSIDE
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`p-6 bg-card border border-border rounded hud-corner hover-glitch transition-all duration-500 hover:neon-border-lime ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${600 + index * 80}ms` }}
                >
                  <div className={`w-10 h-10 rounded flex items-center justify-center border mb-4 ${feature.color === "lime" ? "border-neon-lime/30 bg-neon-lime/5 text-neon-lime" : "border-neon-pink/30 bg-neon-pink/5 text-neon-pink"}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-display font-bold text-foreground uppercase tracking-wider mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-display font-black text-foreground mb-12 text-center">
              FREAK <span className="text-neon-pink neon-text-pink">REVIEWS</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {product.reviews.map((review, i) => (
                <div key={i} className="p-6 bg-card border border-border rounded hover-glitch">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-neon-lime fill-neon-lime" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 font-mono leading-relaxed mb-4">"{review.text}"</p>
                  <div className="text-xs text-neon-lime font-mono uppercase tracking-wider">— {review.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-sell: Other Paddles */}
          <div className="mt-24">
            <h2 className="text-2xl font-display font-black text-foreground mb-2 text-center">
              COMPARE THE <span className="text-neon-lime neon-text-lime">LINEUP</span>
            </h2>
            <p className="text-xs text-muted-foreground font-mono text-center mb-10">Every freak has a favorite. Find yours.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {Object.entries(productData).filter(([s]) => s !== slug).map(([otherSlug, p]) => (
                <div
                  key={otherSlug}
                  onClick={() => navigate(`/product/${otherSlug}`)}
                  className="group p-4 bg-card border border-border rounded cursor-pointer hover:border-neon-lime/50 transition-all"
                >
                  <div className="aspect-square rounded overflow-hidden border border-border mb-3">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xs font-display font-bold text-foreground uppercase tracking-wider mb-1">{p.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono mb-2 line-clamp-2">{p.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-display font-bold text-neon-lime">{p.price}</span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${p.status === "preorder" ? "text-neon-pink" : "text-neon-lime"}`}>
                      {p.status === "preorder" ? "Pre-Order" : "In Stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping CTA */}
          <div className="mt-16 text-center pb-12">
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <Button variant="neonLime" size="lg" onClick={() => navigate("/#hardware")}>
                <ShoppingBag className="w-4 h-4 mr-2" /> Browse All Hardware
              </Button>
              <Button variant="neonPinkOutline" size="lg" onClick={() => navigate("/#drops")}>
                Shop Guerilla Drops
              </Button>
            </div>
          </div>
        </div>
      </main>

      <EarlyAccessModal open={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
    </div>
  );
};

export default ProductDetail;
