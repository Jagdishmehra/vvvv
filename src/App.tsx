import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const AUDIO_SRC = `${import.meta.env.BASE_URL}Perfect.mp3`;

export default function App() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [noLabel, setNoLabel] = useState("No 😢");

  const [musicPlayed, setMusicPlayed] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicStarting = useRef(false);
  const musicPlayedRef = useRef(false);

  // 🔐 Secret link check
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.get("love") === "forever") setAllowed(true);
  // }, []);

  // 🎞 Tenor script

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
   return () => {
  document.body.removeChild(script);
};
  }, []);

  useEffect(() => {
    if (!accepted) return;
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
  document.body.removeChild(script);
};
  }, [accepted]);

  // ❤️ Floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Date.now()]);
      setTimeout(() => setHearts((prev) => prev.slice(1)), 4000);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // 🎵 Stable autoplay music (single source to avoid AbortError)
  const startMusic = useCallback(() => {
    if (musicPlayedRef.current || musicStarting.current) return;
    musicStarting.current = true;
  if (musicPlayed) return;
    const audio = audioRef.current;
    if (!audio) {
      musicStarting.current = false;
      return;
    }

    audio.volume = 0.7;
    audio.muted = false;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          musicPlayedRef.current = true;
          setMusicPlayed(true);
          musicStarting.current = false;
        })
        .catch((err) => {
          console.warn("Audio play failed", err);
          musicStarting.current = false;
        });
    } else {
      musicStarting.current = false;
    }
  }, []);

  const audioElement = (
    <audio
      ref={audioRef}
      src={AUDIO_SRC}
      preload="auto"
      loop
      playsInline
      style={{ display: "none" }}
    />
  );

  // 📧 Email (simple text payload to avoid color parsing issues)
  const sendLoveEmail = async () => {
    const time = new Date().toLocaleString();
    try {
      await emailjs.send(
        "service_k886x9n",
        "template_mq7ihg2",
        {
          subject: "Oh My Love.",
          message: "She said YES ❤️",
          time,
          to_email: "sushmasingh92k@gmail.com",
          to_name: "Sushma",
          from_name: "Valentine App",
          reply_to: "sushmasingh92k@gmail.com",
          screenshot: "",
        },
        "YdwOy9l0MbjAiMn8L"
      );
      setEmailSent(true);
    } catch (e) {
      console.error("Email failed:", e);
    }
  };

  // Trigger email once when accepted screen shows
  useEffect(() => {
    if (!accepted || emailSent) return;
    sendLoveEmail();
  }, [accepted, emailSent]);

  // 😈 Moving NO button
  const moveNoButton = () => {
    setNoLabel((prev) => {
      const labels = [
        "No 😢",
        "Laadle 😏",
        "achaa bete 🫶",
        "na munna na 💋",
        "beta masti nhi👋",
        "na kre janab esa na kare😘",
      ];
      const i = labels.indexOf(prev);
      return labels[i === -1 ? 0 : (i + 1) % labels.length];
    });

    const padding = 60;
    setNoPosition({
      x: Math.random() * (window.innerWidth - padding * 8),
      y: Math.random() * (window.innerHeight - padding * 8),
    });
  };

  // 🔐 Block page if wrong link

  // ================= ACCEPTED SCREEN =================
  if (accepted) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #ef4444 100%)" }}
      >
        {audioElement}
        
        {/* 🌌 Stars */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Floating hearts */}
        {hearts.map((id) => (
          <motion.div
            key={id}
            initial={{ y: 100, opacity: 0, x: Math.random() * window.innerWidth - window.innerWidth / 2 }}
            animate={{ y: -window.innerHeight, opacity: 1 }}
            transition={{ duration: 4, ease: "linear" }}
            className="absolute text-6xl"
          >
            💖💘💘
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl p-12 text-center max-w-md"
        >
          <motion.h1 className="text-5xl font-extrabold text-rose-500 mb-4">
            Yaaay! ❤️
          </motion.h1>

          <p className="text-lg text-gray-700">
            Like you and me, some things are just meant to be.
            <br />Mjaaa ayegaaa baby 💕
          </p>

          <div
            className="tenor-gif-embed mt-6"
            data-postid="12990929232305329070"
            data-share-method="host"
            data-aspect-ratio="1"
            data-width="100%"
          />

          <div className="mt-8 text-6xl">💘</div>
        </motion.div>
      </div>
    );
  }

  // ================= MAIN SCREEN =================
    return (
      <div
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f9a8d4 0%, #f472b6 50%, #f43f5e 100%)" }}
      >
      {audioElement}

      {/* 🌌 Stars */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      {hearts.map((id) => (
        <motion.div
          key={id}
          initial={{ y: 100, opacity: 0, x: Math.random() * window.innerWidth - window.innerWidth / 2 }}
          animate={{ y: -window.innerHeight, opacity: 1 }}
          transition={{ duration: 4 }}
          className="absolute text-6xl"
        >
          💗💐
        </motion.div>
      ))}

      {/* GIF */}
        <div
          className="tenor-gif-embed mb-6"
          data-postid="9462431602803970437"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="220px"
        />

        <motion.div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(255,0,100,0.25)] p-12 text-center max-w-lg">
        <motion.h1 className="text-5xl font-extrabold text-rose-500 mb-8">
          Baby Will you be my Valentine? 💘
        </motion.h1>

        <div className="flex items-center justify-center gap-8 mt-6 relative">
          
          {/* YES */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              startMusic();
              setAccepted(true);
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-semibold shadow-xl"
          >
            Yes 💖
          </motion.button>

          {/* NO */}
          <motion.button
            onMouseEnter={moveNoButton}
            animate={{ left: noPosition.x, top: noPosition.y }}
            transition={{ type: "spring", stiffness: 250, damping: 12 }}
            style={{ position: "fixed" }}
            className="px-8 py-4 rounded-2xl bg-pink-200 text-rose-600 text-lg font-semibold shadow-lg cursor-not-allowed"
          >
            {noLabel}
          </motion.button>
        </div>

        {/* {!musicPlayed && (
          <button
            onClick={startMusic}
            className="mt-4 text-sm text-rose-700 underline"
          >
            Play music 🎵
          </button>
        )} */}
      </motion.div>
    </div>
  );
}
