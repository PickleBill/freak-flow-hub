import { useEffect, useRef, useState } from "react";
import { Star, StarHalf } from "lucide-react";

const reviews = [
  {
    stars: 5,
    quote: "The haptic feedback changed everything. I can FEEL the sweet spot now.",
    handle: "@NeonDinker",
    dupr: "4.3",
  },
  {
    stars: 5,
    quote: "My Courtana coach recommended the Gen 3. The paddle data syncs right into my curriculum. Insane.",
    handle: "@CourtKingBryan",
    dupr: "4.7",
  },
  {
    stars: 4.5,
    quote: "Best paddle I've owned. The sensor data is addicting. Only wish it came in more colors.",
    handle: "@PicklePro_TX",
    dupr: "3.9",
  },
  {
    stars: 5,
    quote: "Gen 2 for drills, Gen 3 for matches. The trainer model is underrated.",
    handle: "@DinkMaster_ATX",
    dupr: "4.1",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-neon-lime text-neon-lime" />
      ))}
      {hasHalf && <StarHalf className="w-3.5 h-3.5 fill-neon-lime text-neon-lime" />}
    </div>
  );
};

const ReviewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-neon-lime/30 bg-neon-lime/5 text-neon-lime text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse-neon" />
            VERIFIED FREAKS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            WHAT THE <span className="text-neon-lime neon-text-lime">FREAKS</span> ARE SAYING
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-3">
            Real players. Real feedback. No filter.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 p-4 bg-card border border-border/50 rounded max-w-sm mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-black text-neon-lime">4.9</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {[1,2,3,4,5].map(i => <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-neon-lime text-neon-lime" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-mono mt-1">Avg Rating</div>
          </div>
          <div className="w-px h-10 sm:h-12 bg-border" />
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-display font-bold text-foreground">847</div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-mono mt-1">Verified</div>
          </div>
          <div className="w-px h-10 sm:h-12 bg-border" />
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-display font-bold text-neon-pink">94%</div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-mono mt-1">Recommend</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.handle}
              className={`p-6 bg-card border border-border rounded relative overflow-hidden group hover-glitch transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-lime/0 via-neon-lime/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              {/* Neon quote mark */}
              <span className="absolute top-3 right-4 text-4xl font-display text-neon-lime/10 leading-none select-none pointer-events-none">"</span>

              <StarRating rating={review.stars} />
              <p className="text-sm text-foreground/80 font-mono leading-relaxed mt-4 mb-5 relative z-10">
                "{review.quote}"
              </p>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs text-neon-lime font-mono">{review.handle}</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 bg-neon-lime/10 text-neon-lime border border-neon-lime/20 rounded">
                  {review.dupr} DUPR
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
