import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Ses seviyesini biraz kısalım ki rahatsız etmesin
    audio.volume = 0.3;

    const tryPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay prevented by browser, wait for user interaction
      });
    };

    const handleInteraction = () => {
      if (!interacted) {
        setInteracted(true);
        tryPlay();
      }
    };

    // İlk tıklama, dokunma veya kaydırma hareketinde sesi başlatıyoruz
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [interacted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/sigmaeffect-upbeat-pop-fun-happy-background-463387.mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-white/[0.05] to-white/[0.012] border border-white/[0.07] text-cream shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold-300 sm:bottom-8 sm:left-8"
        aria-label={isPlaying ? "Sesi Kapat" : "Sesi Aç"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M19.114 5.636a9 9 0 010 12.728M15.536 9.222a5 5 0 010 5.656M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cream/50">
            <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>
    </>
  );
}
