import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { type InvitationData } from "@/lib/api";

export default function MusicButton({ data }: { data: InvitationData }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    ref.current = new Audio(data.musicUrl);
    ref.current.loop = true;
    ref.current.volume = 0.5;
    return () => {
      ref.current?.pause();
      ref.current = null;
    };
  }, [data.musicUrl]);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      aria-label="music"
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
    >
      <div className="flex items-end gap-[2px] h-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-[3px] bg-primary-foreground rounded-full"
            animate={playing ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "30%" }}
            transition={
              playing ? { duration: 0.9, repeat: Infinity, delay: i * 0.12 } : { duration: 0.2 }
            }
          />
        ))}
      </div>
    </button>
  );
}
