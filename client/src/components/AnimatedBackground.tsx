import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const [digits, setDigits] = useState<{ id: number; x: number; y: number; speed: number; val: string }[]>([]);

  useEffect(() => {
    // Generate random floating binary/hex
    const newDigits = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 10 + Math.random() * 30,
      val: Math.random() > 0.5 ? '0' : '1'
    }));
    setDigits(newDigits);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
      
      {/* Floating Digits */}
      {digits.map((d) => (
        <motion.div
          key={d.id}
          className="absolute text-primary/20 font-mono text-xs select-none"
          initial={{ x: `${d.x}vw`, y: `${d.y}vh`, opacity: 0 }}
          animate={{ 
            y: [`${d.y}vh`, `${d.y - 20}vh`],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: d.speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          {d.val}
        </motion.div>
      ))}
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary/5 to-transparent"></div>
    </div>
  );
}
