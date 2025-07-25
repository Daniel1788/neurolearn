"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle, BookOpen, PenLine } from "lucide-react"
import { motion } from "framer-motion"

interface StudyCompletionPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  methodName: string
}

export function StudyCompletionPopup({ open, onOpenChange, methodName }: StudyCompletionPopupProps) {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (open) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleGoToAgenda = () => {
    onOpenChange(false)
    router.push("/agenda")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Felicitări!</DialogTitle>
          <DialogDescription className="text-center">
            Ai finalizat cu succes o sesiune de studiu folosind <span className="font-medium">{methodName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </motion.div>

          <p className="text-center text-muted-foreground mb-4">
            Vrei să notezi progresul tău și să setezi obiective pentru următoarea sesiune?
          </p>

          <div className="flex flex-col gap-2 w-full">
            <Button onClick={handleGoToAgenda} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <PenLine className="mr-2 h-4 w-4" />
              Adaugă în Agenda ta
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <BookOpen className="mr-2 h-4 w-4" />
              Continuă să înveți
            </Button>
          </div>
        </div>

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  top: "0%",
                  left: `${Math.random() * 100}%`,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  top: "100%",
                  opacity: 0,
                  scale: 1,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut",
                }}
                style={{
                  width: `${5 + Math.random() * 10}px`,
                  height: `${5 + Math.random() * 10}px`,
                  backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF5", "#F5FF33"][
                    Math.floor(Math.random() * 6)
                  ],
                }}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
