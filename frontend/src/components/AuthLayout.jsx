import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png";

const FLOATING_LETTERS = [
  {
    char: "A",
    top: "8%",
    left: "10%",
    size: "text-6xl",
    delay: 0,
    color: "text-purple-200",
  },
  {
    char: "b",
    top: "16%",
    left: "78%",
    size: "text-5xl",
    delay: 0.5,
    color: "text-teal-200",
  },
  {
    char: "O",
    top: "32%",
    left: "6%",
    size: "text-7xl",
    delay: 1,
    color: "text-yellow-200",
  },
  {
    char: "R",
    top: "54%",
    left: "84%",
    size: "text-6xl",
    delay: 0.3,
    color: "text-pink-200",
  },
  {
    char: "h",
    top: "74%",
    left: "12%",
    size: "text-5xl",
    delay: 0.8,
    color: "text-green-200",
  },
  {
    char: "P",
    top: "84%",
    left: "68%",
    size: "text-6xl",
    delay: 1.2,
    color: "text-orange-200",
  },
];

const STARS = [
  { top: "10%", left: "25%", size: "text-xl" },
  { top: "25%", left: "18%", size: "text-xl" },
  { top: "50%", left: "75%", size: "text-xl" },
  { top: "10%", left: "90%", size: "text-xl" },
  { top: "90%", left: "23%", size: "text-xl" },
  { top: "70%", left: "80%", size: "text-xl" },
  { top: "58%", left: "12%", size: "text-xl" },
  { top: "30%", left: "80%", size: "text-xl" },
  { top: "82%", left: "50%", size: "text-xl" },
  { top: "10%", left: "50%", size: "text-xl" },
  { top: "88%", left: "80%", size: "text-xl" },
];

const BOOKI_LETTERS = [
  { char: "B", color: "text-purple-200" },
  { char: "o", color: "text-teal-200" },
  { char: "o", color: "text-yellow-200" },
  { char: "k", color: "text-pink-200" },
  { char: "i", color: "text-green-200" },
  { char: "e", color: "text-orange-200" },
];

export default function AuthLayout({
  title,
  subtitle,
  footer,
  badge,
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left brand panel */}
      <div className="flex lg:w-1/2 relative overflow-hidden bg-[#3B0A5E] min-h-[380px] sm:min-h-[440px] lg:min-h-screen">
        {/* Gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a1d74] via-[#3B0A5E] to-[#1a0828]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl" />

        {/* Floating letters background */}
        {FLOATING_LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            className={`absolute ${letter.size} ${letter.color} font-heading font-bold select-none`}
            style={{ top: letter.top, left: letter.left, opacity: 0.5 }}
            animate={{ y: -10 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {letter.char}
          </motion.span>
        ))}

        {/* Stars */}
        {STARS.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className={`absolute ${star.size} text-yellow-300`}
            style={{ top: star.top, left: star.left }}
            animate={{
              scale: [0.7, 1.3, 0.7],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.div>
        ))}

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 sm:p-10 xl:p-16 w-full py-10 lg:py-0">
          {/* 👇 LOGO ANIMADO CON FLOTACIÓN Y BALANCEO 👇 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: [1, 1.03, 1],
              y: [0, -10, 0],
              rotate: [0, -1.5, 1.5, 0],
            }}
            transition={{
              // Entrada suave inicial
              opacity: { duration: 0.5, delay: 0.2 },
              // Animación continua infinita
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.08, rotate: 3 }} // Reacción al pasar el mouse
            className="mb-3 lg:mb-4 flex items-center justify-center w-full cursor-pointer"
          >
            <img
              src={Logo}
              alt="Booki"
              className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Título animado por letra */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight flex justify-center items-center">
            {BOOKI_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className={letter.color}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
              >
                <motion.span
                  animate={{ y: -10 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="inline-block px-[1px]"
                >
                  {letter.char}
                </motion.span>
              </motion.span>
            ))}
          </h1>

          {/* Línea divisora */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1.4 }}
            transition={{ delay: 1, duration: 1 }}
            className="h-1.5 w-full sm:w-40 my-5 lg:my-6 rounded-full bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 mx-auto"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-8 lg:py-12 relative bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8">
            {children}
          </div>

          {footer && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {footer}
            </p>
          )}

          {badge && (
            <div className="flex justify-center mt-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-medium">
                {badge}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
