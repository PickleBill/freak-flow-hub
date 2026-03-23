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

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.handle}
              className={`p-6 bg-card border border-border rounded hover-glitch transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <StarRating rating={review.stars} />
              <p className="text-sm text-foreground/80 font-mono leading-relaxed mt-4 mb-5">
                "{review.quote}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neon-lime font-mono">{review.handle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-neon-lime/10 text-neon-lime border border-neon-lime/20 rounded">
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
