import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Vertical click-to-play video card: poster + play button until tapped, then
 * native controls with sound. Video bytes only load on play (preload="none").
 */
export function ReelCard({
  src,
  poster,
  title,
  caption,
  testId,
}: {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  testId?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    trackEvent("video_play", { video_title: title });
    // let the controls render before playing
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <figure className="w-full max-w-xs mx-auto" data-testid={testId}>
      <div className="relative rounded-2xl overflow-hidden border border-border aspect-[9/16] bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          className="w-full h-full object-cover"
          aria-label={title}
        />
        {!playing && (
          <button
            onClick={start}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={`Play: ${title}`}
            data-testid={testId ? `${testId}-play` : undefined}
          >
            <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-colors">
              <Play className="w-7 h-7 text-[#071B2C] ml-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
