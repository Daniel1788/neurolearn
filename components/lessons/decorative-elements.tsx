"use client"

import { motion } from "framer-motion"

export function DecorativeElements() {
  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Bauhaus-inspired geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circle */}
        <motion.div
          className="absolute top-4 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Triangle */}
        <motion.div
          className="absolute top-12 left-12 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-yellow-400/30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Rectangle */}
        <motion.div
          className="absolute bottom-8 left-1/4 w-16 h-10 bg-gradient-to-r from-red-400/20 to-orange-500/20 rounded-sm"
          animate={{
            x: [0, 50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Small circles */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-green-400/30"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-12 right-12 w-6 h-6 rounded-full bg-purple-400/30"
          animate={{
            x: [0, -30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Lines */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-20 h-0.5 bg-gradient-to-r from-blue-500/30 to-transparent"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent" />
    </div>
  )
}
