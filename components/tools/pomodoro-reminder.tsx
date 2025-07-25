"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Coffee, Brain, Droplets, Dumbbell, Eye, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

interface BreakTip {
  title: string
  description: string
}

interface PomodoroReminderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isBreak: boolean
  breakDuration: number
  message?: string
  currentTip?: BreakTip
}

const breakActivities = [
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Hidratează-te",
    description: "Bea un pahar cu apă pentru a te menține hidratat.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Relaxează-ți mintea",
    description: "Închide ochii și respiră adânc timp de un minut.",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Odihnește-ți ochii",
    description: "Privește în depărtare pentru a reduce oboseala ochilor.",
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    title: "Mișcă-te puțin",
    description: "Fă câteva exerciții de întindere pentru a-ți relaxa corpul.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Privește în depărtare",
    description: "Privește la un obiect aflat la cel puțin 6 metri distanță timp de 20 de secunde.",
  },
  {
    icon: <ArrowUp className="h-6 w-6" />,
    title: "Ridică-te de pe scaun",
    description: "Ridică-te și fă câțiva pași pentru a-ți reactiva circulația.",
  },
]

export function PomodoroReminder({
  open,
  onOpenChange,
  isBreak,
  breakDuration,
  message,
  currentTip,
}: PomodoroReminderProps) {
  const [activity, setActivity] = useState(breakActivities[0])

  useEffect(() => {
    // Select a random activity when the dialog opens
    if (open) {
      const randomIndex = Math.floor(Math.random() * breakActivities.length)
      setActivity(breakActivities[randomIndex])
    }
  }, [open])

  if (!isBreak && !message) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{message ? "Notificare" : `Timp de pauză! (${breakDuration} minute)`}</DialogTitle>
          <DialogDescription>
            {message || "Folosește această pauză pentru a te relaxa și a-ți reîncărca bateriile."}
          </DialogDescription>
        </DialogHeader>

        {isBreak && (
          <div className="flex flex-col items-center py-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4"
            >
              {currentTip?.title.includes("Ridică") ? (
                <ArrowUp className="h-8 w-8 text-accent" />
              ) : currentTip?.title.includes("Privește") ? (
                <Eye className="h-8 w-8 text-accent" />
              ) : (
                activity.icon
              )}
            </motion.div>

            <motion.h3
              className="text-lg font-medium mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentTip?.title || activity.title}
            </motion.h3>
            <motion.p
              className="text-center text-muted-foreground"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentTip?.description || activity.description}
            </motion.p>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all"
            >
              Am înțeles
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
