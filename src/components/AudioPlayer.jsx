import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ses seviyesini ayarlıyoruz (0.3 rahatsız etmeyen seviye)
    audio.volume = 0.3;

    let played = false;

    const tryPlay = () => {
      if (played) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          played = true;
          removeListeners();
        })
        .catch(() => {
          // Tarayıcı autoplay politikası engellediyse ilk etkileşimi bekleyecek
        });
    };

    const handleInteraction = () => {
      tryPlay();
    };

    const events = [
      "click",
      "scroll",
      "touchstart",
      "pointerdown",
      "mousemove",
      "keydown",
      "wheel",
    ];

    const addListeners = () => {
      events.forEach((evt) =>
        window.addEventListener(evt, handleInteraction, { passive: true })
      );
    };

    const removeListeners = () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, handleInteraction)
      );
    };

    // 1. Sayfa açılır açılmaz çalmayı dene
    tryPlay();

    // 2. Tarayıcı engellediyse ilk hareket veya tıklamada başlatmak için dinleyicileri ekle
    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Ses çalma hatası:", err);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/sigmaeffect-upbeat-pop-fun-happy-background-463387.mp3"
        autoPlay
        loop
        playsInline
      />
      <button
        onClick={togglePlay}
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-white/[0.05] to-white/[0.012] border border-white/[0.07] text-cream shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold-300 sm:bottom-8 sm:left-8"
        aria-label={isPlaying ? "Sesi Kapat" : "Sesi Aç"}
      >
        {isPlaying ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M19.114 5.636a9 9 0 010 12.728M15.536 9.222a5 5 0 010 5.656M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-cream/50"
          >
            <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>
    </>
  );
}

