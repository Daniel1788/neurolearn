"use client"

import { useState } from "react"
import { Quote, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Array of motivational quotes
const quotes = [
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Education is not the filling of a pot but the lighting of a fire.",
    author: "W.B. Yeats",
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    author: "Abigail Adams",
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert",
  },
  {
    text: "Anyone who stops learning is old, whether at twenty or eighty.",
    author: "Henry Ford",
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch",
  },
]

export function MotivationalQuote() {
  // Get a random quote on component mount
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const [quote] = useState(quotes[randomIndex])

  const handleShare = async () => {
    const shareText = `"${quote.text}" — ${quote.author} #NeuroLearn #EducationQuote`

    try {
      if (navigator.share) {
        await navigator.share({
          title: "NeuroLearn Quote of the Day",
          text: shareText,
        })
        toast({
          title: "Citat distribuit",
          description: "Citatul a fost distribuit cu succes!",
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(shareText)
        toast({
          title: "Citat copiat",
          description: "Citatul a fost copiat în clipboard!",
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut distribui citatul. Încercați din nou.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-2 dark:border-zinc-800 h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
                <Quote className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Inspirația zilei</h3>
            </div>

            <blockquote className="border-l-4 border-primary pl-4 italic">
              <p className="text-lg">{quote.text}</p>
              <footer className="mt-2 text-sm text-muted-foreground">— {quote.author}</footer>
            </blockquote>
          </div>

          <div className="mt-6 pt-4 border-t flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Actualizat zilnic</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10 flex items-center gap-1"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Distribuie</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
