"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, CheckCircle, ArrowRight, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SQ3RMethodProps {
  onComplete: () => void
}

export function SQ3RMethod({ onComplete }: SQ3RMethodProps) {
  const [title, setTitle] = useState("")
  const [survey, setSurvey] = useState("")
  const [questions, setQuestions] = useState("")
  const [reading, setReading] = useState("")
  const [recite, setRecite] = useState("")
  const [review, setReview] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const [saved, setSaved] = useState(false)

  const steps = [
    {
      id: "survey",
      title: "Survey (Scanare)",
      description: "Scanează rapid materialul pentru a obține o imagine de ansamblu.",
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titlul materialului</Label>
            <Input
              id="title"
              placeholder="Ex: Capitolul 5: Fotosinteza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="survey">Notițe din scanare</Label>
            <Textarea
              id="survey"
              placeholder="Notează titlurile, subtitlurile, imaginile, graficele și concluziile..."
              value={survey}
              onChange={(e) => setSurvey(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>
      ),
    },
    {
      id: "question",
      title: "Question (Întrebări)",
      description: "Formulează întrebări despre conținut bazate pe titluri și subtitluri.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="questions">Întrebările tale</Label>
          <Textarea
            id="questions"
            placeholder="Transformă titlurile și subtitlurile în întrebări. Ex: Ce este fotosinteza? Care sunt etapele fotosintezei?"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
    {
      id: "read",
      title: "Read (Citire)",
      description: "Citește activ, căutând răspunsuri la întrebările tale.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="reading">Notițe din citire</Label>
          <Textarea
            id="reading"
            placeholder="Notează răspunsurile la întrebările tale și alte informații importante..."
            value={reading}
            onChange={(e) => setReading(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
    {
      id: "recite",
      title: "Recite (Recitare)",
      description: "Rezumă informațiile în propriile cuvinte, fără a te uita în text.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="recite">Recitarea ta</Label>
          <Textarea
            id="recite"
            placeholder="Încearcă să răspunzi la întrebările tale fără a te uita în notițe..."
            value={recite}
            onChange={(e) => setRecite(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
    {
      id: "review",
      title: "Review (Revizuire)",
      description: "Revizuiește materialul pentru a consolida învățarea.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="review">Notițe din revizuire</Label>
          <Textarea
            id="review"
            placeholder="Notează conceptele cheie, conexiunile între idei și orice întrebări rămase..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      handleSave()
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: "Metoda SQ3R salvată",
      description: "Notițele tale au fost salvate cu succes.",
    })
    setSaved(true)
  }

  const handleComplete = () => {
    onComplete()
  }

  const isStepComplete = () => {
    switch (activeStep) {
      case 0:
        return title.trim().length > 0 && survey.trim().length > 0
      case 1:
        return questions.trim().length > 0
      case 2:
        return reading.trim().length > 0
      case 3:
        return recite.trim().length > 0
      case 4:
        return review.trim().length > 0
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
              <List className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <CardTitle>Metoda SQ3R</CardTitle>
              <CardDescription>O strategie de citire activă: Survey, Question, Read, Recite, Review</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={`step-${activeStep}`} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={`step-${index}`}
                  onClick={() => setActiveStep(index)}
                  disabled={
                    index > 0 &&
                    !steps
                      .slice(0, index)
                      .every((_, i) =>
                        i === 0 ? title.trim().length > 0 && survey.trim().length > 0 : isStepComplete(),
                      )
                  }
                  className="relative"
                >
                  <span className="hidden md:inline">{step.title.split(" ")[0]}</span>
                  <span className="md:hidden">{step.title.split(" ")[0][0]}</span>
                  {isStepComplete() && index === activeStep && (
                    <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step, index) => (
              <TabsContent key={index} value={`step-${index}`}>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {step.component}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
            Înapoi
          </Button>
          <div className="flex gap-2">
            {activeStep === steps.length - 1 ? (
              <>
                <Button variant="outline" onClick={handleSave} disabled={saved || !isStepComplete()}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvează
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!saved}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Finalizează
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Continuă
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
