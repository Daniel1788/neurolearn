"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function LoadingSplash() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-xl font-bold"
        >
          NeuroLearn
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground mt-2"
        >
          Se încarcă...
        </motion.p>
      </motion.div>
    </div>
  )
}
