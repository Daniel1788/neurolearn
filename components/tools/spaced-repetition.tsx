"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Repeat, Plus, X, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface SpacedRepetitionProps {
  onComplete: () => void
}

interface FlashCard {
  id: string
  question: string
  answer: string
  nextReview: Date
  interval: number
}

export function SpacedRepetition({ onComplete }: SpacedRepetitionProps) {
  const [cards, setCards] = useState<FlashCard[]>([])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [mode, setMode] = useState<"create" | "review">("create")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completed, setCompleted] = useState(false)

  const addCard = () => {
    if (!question.trim() || !answer.trim()) {
      toast({
        title: "Eroare",
        description: "Completează atât întrebarea cât și răspunsul.",
        variant: "destructive",
      })
      return
    }

    const newCard: FlashCard = {
      id: Date.now().toString(),
      question,
      answer,
      nextReview: new Date(),
      interval: 1,
    }

    setCards([...cards, newCard])
    setQuestion("")
    setAnswer("")

    toast({
      title: "Card adăugat",
      description: "Cardul a fost adăugat cu succes.",
    })
  }

  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const startReview = () => {
    if (cards.length === 0) {
      toast({
        title: "Niciun card",
        description: "Adaugă cel puțin un card pentru a începe recapitularea.",
        variant: "destructive",
      })
      return
    }
    setMode("review")
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }

  const handleDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    const updatedCards = [...cards]
    const card = updatedCards[currentCardIndex]

    // Update interval based on difficulty
    switch (difficulty) {
      case "easy":
        card.interval *= 2.5
        break
      case "medium":
        card.interval *= 1.5
        break
      case "hard":
        card.interval = 1
        break
    }

    // Set next review date
    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + card.interval)
    card.nextReview = nextReview

    setCards(updatedCards)
    nextCard()
  }

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowAnswer(false)
    } else {
      finishReview()
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setShowAnswer(false)
    }
  }

  const finishReview = () => {
    setMode("create")
    toast({
      title: "Recapitulare finalizată",
      description: `Ai recapitulat ${cards.length} carduri.`,
    })
    setCompleted(true)
  }

  const handleComplete = () => {
    onComplete()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <Repeat className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle>Repetiția Spațiată</CardTitle>
              <CardDescription>
                Creează carduri flash și recapitulează-le la intervale optime pentru memorare pe termen lung
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mode === "create" ? (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Întrebare</Label>
                  <Input
                    id="question"
                    placeholder="Scrie întrebarea aici..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Răspuns</Label>
                  <Textarea
                    id="answer"
                    placeholder="Scrie răspunsul aici..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button onClick={addCard} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Adaugă card
                </Button>
              </div>

              {cards.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Cardurile tale ({cards.length})</h3>
                    <Button onClick={startReview} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Începe recapitularea
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto p-2">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50"
                      >
                        <div className="truncate flex-1 mr-2">
                          <p className="font-medium truncate">{card.question}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeCard(card.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Card {currentCardIndex + 1} din {cards.length}
                </span>
                <Button variant="outline" size="sm" onClick={() => setMode("create")}>
                  Înapoi la carduri
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[200px] flex flex-col"
                >
                  <Card className="flex-1 flex flex-col">
                    <CardContent className="pt-6 flex-1 flex flex-col">
                      <div className="text-lg font-medium mb-4">{cards[currentCardIndex]?.question}</div>

                      {showAnswer ? (
                        <div className="mt-4 p-4 bg-muted rounded-md flex-1">
                          <p>{cards[currentCardIndex]?.answer}</p>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <Button onClick={() => setShowAnswer(true)}>Arată răspunsul</Button>
                        </div>
                      )}
                    </CardContent>
                    {showAnswer && (
                      <CardFooter className="flex-col gap-4">
                        <div className="text-sm text-muted-foreground">Cât de bine ai știut acest răspuns?</div>
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="outline"
                            className="flex-1 border-red-500 hover:bg-red-500/10"
                            onClick={() => handleDifficulty("hard")}
                          >
                            Greu
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-yellow-500 hover:bg-yellow-500/10"
                            onClick={() => handleDifficulty("medium")}
                          >
                            Mediu
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 border-green-500 hover:bg-green-500/10"
                            onClick={() => handleDifficulty("easy")}
                          >
                            Ușor
                          </Button>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevCard} disabled={currentCardIndex === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button variant="outline" onClick={nextCard}>
                  Următorul
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {completed && (
            <Button onClick={handleComplete} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <CheckCircle className="mr-2 h-4 w-4" />
              Finalizează sesiunea
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
