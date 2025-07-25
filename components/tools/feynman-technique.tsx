"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, CheckCircle, ArrowRight, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface FeynmanTechniqueProps {
  onComplete: () => void
}

export function FeynmanTechnique({ onComplete }: FeynmanTechniqueProps) {
  const [concept, setConcept] = useState("")
  const [explanation, setExplanation] = useState("")
  const [gaps, setGaps] = useState("")
  const [refinedExplanation, setRefinedExplanation] = useState("")
  const [activeStep, setActiveStep] = useState(0)
  const [saved, setSaved] = useState(false)

  const steps = [
    {
      title: "Pasul 1: Alege conceptul",
      description: "Selectează un concept sau o idee pe care vrei să o înțelegi mai bine.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="concept">Conceptul de învățat</Label>
          <Input
            id="concept"
            placeholder="Ex: Legea lui Ohm, Fotosinteza, etc."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
        </div>
      ),
    },
    {
      title: "Pasul 2: Explică simplu",
      description: "Explică conceptul ca și cum ai preda unui copil, folosind termeni simpli.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="explanation">Explicația ta simplă</Label>
          <Textarea
            id="explanation"
            placeholder="Explică conceptul folosind cuvinte simple și exemple concrete..."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
    {
      title: "Pasul 3: Identifică lacunele",
      description: "Identifică părțile pe care nu le poți explica bine sau unde te-ai blocat.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="gaps">Lacune în înțelegere</Label>
          <Textarea
            id="gaps"
            placeholder="Ce părți ale conceptului sunt încă neclare pentru tine?"
            value={gaps}
            onChange={(e) => setGaps(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      ),
    },
    {
      title: "Pasul 4: Rafinează explicația",
      description: "Revizuiește și simplifică explicația ta, adresând lacunele identificate.",
      component: (
        <div className="space-y-4">
          <Label htmlFor="refinedExplanation">Explicația rafinată</Label>
          <Textarea
            id="refinedExplanation"
            placeholder="Rescrie explicația ta, adresând lacunele identificate..."
            value={refinedExplanation}
            onChange={(e) => setRefinedExplanation(e.target.value)}
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
      title: "Tehnica Feynman salvată",
      description: "Explicația ta a fost salvată cu succes.",
    })
    setSaved(true)
  }

  const handleComplete = () => {
    onComplete()
  }

  const isStepComplete = () => {
    switch (activeStep) {
      case 0:
        return concept.trim().length > 0
      case 1:
        return explanation.trim().length > 0
      case 2:
        return gaps.trim().length > 0
      case 3:
        return refinedExplanation.trim().length > 0
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <CardTitle>Tehnica Feynman</CardTitle>
              <CardDescription>Învață orice concept explicându-l în termeni simpli, ca pentru un copil</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={`step-${activeStep}`} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={`step-${index}`}
                  onClick={() => setActiveStep(index)}
                  disabled={index > 0 && !steps.slice(0, index).every((_, i) => isStepComplete())}
                  className="relative"
                >
                  <span className="hidden md:inline">{`Pasul ${index + 1}`}</span>
                  <span className="md:hidden">{index + 1}</span>
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
