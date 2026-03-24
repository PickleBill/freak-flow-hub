import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ShoppingBag, Heart, MessageCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import SocialPostModal from "@/components/SocialPostModal";
import athlete1 from "@/assets/athlete-1.jpg";
import athlete2 from "@/assets/athlete-2.jpg";
import athlete3 from "@/assets/athlete-3.jpg";
import athlete4 from "@/assets/athlete-4.jpg";
import athlete5 from "@/assets/athlete-5.jpg";
import paddleHero from "@/assets/paddle-hero.jpg";

const productSlugs: Record<string, { type: string; slug: string }> = {
  "Gen 3 Haptic Pro": { type: "product", slug: "gen3-haptic-pro" },
  "Renegade Tee": { type: "apparel", slug: "renegade-tee" },
  "Cyber-Mesh Shorts": { type: "apparel", slug: "cyber-mesh-shorts" },
  "Freakshow Tech-Hat": { type: "apparel", slug: "freakshow-tech-hat" },
};

const productImages: Record<string, string> = {
  "Gen 3 Haptic Pro": paddleHero,
  "Renegade Tee": athlete2,
  "Cyber-Mesh Shorts": athlete4,
  "Freakshow Tech-Hat": athlete5,
};

const productPrices: Record<string, number> = {
  "Gen 3 Haptic Pro": 289,
  "Renegade Tee": 65,
  "Cyber-Mesh Shorts": 78,
  "Freakshow Tech-Hat": 48,
};

const socialPosts = [
  { platform: "TikTok", handle: "@freakshow.pb", caption: "That haptic feedback hit different 🔥 #pickleballfreakshow #gen3", likes: "234K", comments: "1.2K", image: athlete1, product: "Gen 3 Haptic Pro", price: "$289", tall: true },
  { platform: "Instagram", handle: "@freakshow.pb", caption: "Dad bod energy meets court domination 🏓💪", likes: "312K", comments: "4.7K", image: "", product: "Renegade Tee", price: "$65", tall: false, video: flowVideoIG },
  { platform: "Instagram", handle: "@maya.strikes", caption: "Underground sessions with the crew. New paddle, new vibes.", likes: "89K", comments: "847", image: athlete2, product: "Renegade Tee", price: "$65", tall: false },
  { platform: "YouTube", handle: "FreakshowTV", caption: "THAT SHOT. The one that broke the internet. Full court angle 🎬", likes: "2.1M", comments: "31K", image: "", product: "Gen 3 Haptic Pro", price: "$289", tall: false, video: flowVideoYT },
  { platform: "YouTube", handle: "FreakshowTV", caption: "GEN 3 HAPTIC PRO — FULL REVIEW | Is this the future of pickleball?", likes: "1.4M", comments: "23K", image: athlete3, product: "Gen 3 Haptic Pro", price: "$289", tall: false },
  { platform: "TikTok", handle: "@dink.master", caption: "The Neural-Grip sensors are INSANE. My swing data is 📈", likes: "567K", comments: "3.4K", image: athlete4, product: "Cyber-Mesh Shorts", price: "$78", tall: true },
  { platform: "Instagram", handle: "@freakshow.pb", caption: "Drop 003 incoming. Are you ready? 👁️", likes: "156K", comments: "2.1K", image: athlete5, product: "Freakshow Tech-Hat", price: "$48", tall: false },
  { platform: "Instagram", handle: "@courtana.tech", caption: "Your Freakshow paddle data now syncs with your Courtana coaching profile. AI analysis meets next-gen hardware. 🧠🏓", likes: "42K", comments: "1.8K", image: athlete3, product: "Gen 3 Haptic Pro", price: "$289", tall: false },
];

const FreakFlowSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [selectedPost, setSelectedPost] = useState<typeof socialPosts[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );
    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleShopClick = (productName: string) => {
    const mapping = productSlugs[productName];
    if (mapping) navigate(`/${mapping.type}/${mapping.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent, post: typeof socialPosts[0]) => {
    e.stopPropagation();
    const mapping = productSlugs[post.product];
    addToCart({
      id: mapping?.slug || post.product,
      name: post.product,
      price: productPrices[post.product] || 0,
      priceLabel: post.price,
      image: productImages[post.product] || post.image,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="container px-6 lg:px-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-pink/30 bg-neon-pink/5 text-neon-pink text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-pulse-neon" />
            LIVE FEED
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            THE <span className="text-neon-pink neon-text-pink">FREAK-FLOW</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg">
            Shop the exact gear from our athletes' viral clips. The feed is the store.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Activity className="w-3.5 h-3.5 text-neon-lime animate-pulse-neon" />
            <span className="text-xs text-neon-lime font-mono">{socialPosts.length} new posts today</span>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {socialPosts.map((post, index) => (
            <div
              key={index}
              data-index={index}
              className={`break-inside-avoid group relative border border-border bg-card rounded overflow-hidden hover-glitch cursor-pointer transition-all duration-700 ${visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPost(post)}
            >
              <div className={`relative overflow-hidden ${post.tall ? "aspect-[3/4]" : "aspect-video"}`}>
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-neon-lime/20 flex items-center justify-center neon-glow-lime">
                    <Play className="w-6 h-6 text-neon-lime ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-background/80 text-xs font-mono text-neon-lime tracking-wider uppercase">{post.platform}</div>
              </div>

              <div className="p-4">
                <div className="text-xs text-neon-lime font-mono mb-1">{post.handle}</div>
                <p className="text-sm text-foreground/80 font-mono leading-relaxed mb-3">{post.caption}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-4">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comments}</span>
                </div>
                <div
                  className="flex items-center justify-between p-3 bg-surface rounded border border-border group-hover:neon-border-lime transition-all duration-300"
                  onClick={(e) => { e.stopPropagation(); handleShopClick(post.product); }}
                >
                  <div>
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Shop the Look</div>
                    <div className="text-sm text-foreground font-mono">{post.product} — <span className="text-neon-lime">{post.price}</span></div>
                  </div>
                  <Button variant="neonLime" size="sm" onClick={(e) => handleAddToCart(e, post)}>
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:neon-border-lime rounded transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      <SocialPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        productSlug={selectedPost ? productSlugs[selectedPost.product] : undefined}
      />
    </section>
  );
};

export default FreakFlowSection;
