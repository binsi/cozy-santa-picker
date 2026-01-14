import { motion } from "framer-motion";

interface ChristmasTreeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ChristmasTree = ({ className = "", size = "md" }: ChristmasTreeProps) => {
  const sizeClasses = {
    sm: "w-20 h-32",
    md: "w-32 h-48",
    lg: "w-48 h-72",
  };

  const lights = [
    { x: 50, y: 15, delay: 0, color: "christmas-gold" },
    { x: 30, y: 30, delay: 0.3, color: "christmas-red" },
    { x: 70, y: 30, delay: 0.6, color: "christmas-gold" },
    { x: 20, y: 50, delay: 0.9, color: "christmas-gold" },
    { x: 50, y: 45, delay: 1.2, color: "christmas-red" },
    { x: 80, y: 50, delay: 1.5, color: "christmas-gold" },
    { x: 15, y: 70, delay: 1.8, color: "christmas-red" },
    { x: 40, y: 65, delay: 2.1, color: "christmas-gold" },
    { x: 60, y: 65, delay: 2.4, color: "christmas-red" },
    { x: 85, y: 70, delay: 2.7, color: "christmas-gold" },
  ];

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Tree SVG */}
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Star */}
        <motion.path
          d="M50 0 L53 8 L62 8 L55 13 L58 22 L50 17 L42 22 L45 13 L38 8 L47 8 Z"
          className="fill-christmas-gold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ filter: "drop-shadow(0 0 8px hsl(42 90% 55%))" }}
        />

        {/* Tree layers */}
        <path
          d="M50 18 L70 45 L58 45 L78 70 L62 70 L90 100 L10 100 L38 70 L22 70 L42 45 L30 45 Z"
          className="fill-christmas-green"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        />

        {/* Trunk */}
        <rect x="42" y="100" width="16" height="15" rx="2" className="fill-amber-800" />
      </svg>

      {/* Twinkling lights */}
      {lights.map((light, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            light.color === "christmas-gold" ? "bg-christmas-gold" : "bg-christmas-red"
          }`}
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            boxShadow: light.color === "christmas-gold" 
              ? "0 0 8px hsl(42 90% 55%), 0 0 16px hsl(42 90% 55% / 0.5)"
              : "0 0 8px hsl(0 72% 50%), 0 0 16px hsl(0 72% 50% / 0.5)",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: light.delay,
          }}
        />
      ))}

      {/* Presents under the tree */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        <motion.div
          className="w-6 h-5 bg-christmas-red rounded-sm relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-1 bg-christmas-gold -translate-x-1/2" />
          <div className="absolute inset-x-0 top-1/2 h-1 bg-christmas-gold -translate-y-1/2" />
        </motion.div>
        <motion.div
          className="w-5 h-6 bg-christmas-green rounded-sm relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-1 bg-christmas-red -translate-x-1/2" />
          <div className="absolute inset-x-0 top-1/2 h-1 bg-christmas-red -translate-y-1/2" />
        </motion.div>
        <motion.div
          className="w-4 h-4 bg-christmas-gold rounded-sm relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-christmas-red -translate-x-1/2" />
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-christmas-red -translate-y-1/2" />
        </motion.div>
      </div>
    </div>
  );
};

export default ChristmasTree;
