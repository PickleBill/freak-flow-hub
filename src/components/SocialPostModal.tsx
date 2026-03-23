import { X, Heart, MessageCircle, Share2, Bookmark, Play, ThumbsUp, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SocialPost {
  platform: string;
  handle: string;
  caption: string;
  likes: string;
  comments: string;
  image: string;
  product: string;
  price: string;
}

interface SocialPostModalProps {
  post: SocialPost | null;
  onClose: () => void;
  productSlug?: { type: string; slug: string };
}

const SocialPostModal = ({ post, onClose, productSlug }: SocialPostModalProps) => {
  const navigate = useNavigate();
  if (!post) return null;

  const handleShop = () => {
    onClose();
    if (productSlug) navigate(`/${productSlug.type}/${productSlug.slug}`);
  };

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-card border border-border rounded-lg overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground hover:text-neon-lime transition-colors">
            <X className="w-4 h-4" />
          </button>

          {post.platform === "TikTok" && (
            <>
              <div className="relative aspect-[9/16] max-h-[60vh] bg-background">
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                  <p className="text-xs font-mono text-foreground mb-1">{post.handle}</p>
                  <p className="text-xs font-mono text-foreground/80">{post.caption}</p>
                </div>
                <div className="absolute right-3 bottom-24 flex flex-col gap-4 items-center">
                  <button className="flex flex-col items-center gap-1"><Heart className="w-6 h-6 text-foreground" /><span className="text-[10px] font-mono text-foreground">{post.likes}</span></button>
                  <button className="flex flex-col items-center gap-1"><MessageCircle className="w-6 h-6 text-foreground" /><span className="text-[10px] font-mono text-foreground">{post.comments}</span></button>
                  <button className="flex flex-col items-center gap-1"><Share2 className="w-6 h-6 text-foreground" /><span className="text-[10px] font-mono text-foreground">Share</span></button>
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 bg-background/80 text-[10px] font-mono text-neon-pink tracking-widest uppercase rounded">TikTok</div>
            </>
          )}

          {post.platform === "Instagram" && (
            <>
              <div className="p-3 flex items-center gap-3 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-lime flex items-center justify-center text-background text-xs font-bold">PF</div>
                <div>
                  <p className="text-xs font-mono text-foreground font-bold">{post.handle}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Sponsored</p>
                </div>
              </div>
              <div className="relative aspect-square bg-background">
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <Heart className="w-5 h-5 text-foreground cursor-pointer hover:text-neon-pink transition-colors" />
                    <MessageCircle className="w-5 h-5 text-foreground cursor-pointer" />
                    <Share2 className="w-5 h-5 text-foreground cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 text-foreground cursor-pointer" />
                </div>
                <p className="text-xs font-mono text-foreground"><span className="font-bold">{post.likes}</span> likes</p>
                <p className="text-xs font-mono text-foreground/80"><span className="font-bold text-foreground">{post.handle}</span> {post.caption}</p>
              </div>
            </>
          )}

          {post.platform === "YouTube" && (
            <>
              <div className="relative aspect-video bg-background">
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-12 rounded-xl bg-destructive flex items-center justify-center">
                    <Play className="w-6 h-6 text-foreground ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-background/80 text-[10px] font-mono text-foreground">12:47</div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-mono text-foreground font-bold leading-snug">{post.caption}</h3>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-lime/20 flex items-center justify-center text-neon-lime text-xs font-bold">FS</div>
                  <div>
                    <p className="text-xs font-mono text-foreground">{post.handle}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">247K subscribers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-surface rounded-full text-xs font-mono text-foreground"><ThumbsUp className="w-3.5 h-3.5" /> {post.likes}</button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-surface rounded-full text-xs font-mono text-foreground"><Share2 className="w-3.5 h-3.5" /> Share</button>
                </div>
              </div>
            </>
          )}

          {/* Shop the Look CTA */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between p-3 bg-surface rounded border border-neon-lime/20">
              <div>
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Shop the Look</div>
                <div className="text-sm text-foreground font-mono">{post.product} — <span className="text-neon-lime">{post.price}</span></div>
              </div>
              <Button variant="neonLime" size="sm" onClick={handleShop}>
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialPostModal;
