"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Clock, List, Repeat, Lightbulb } from "lucide-react"

interface StudyMethod {
  id: string
  name: string
  icon: React.ElementType
  description: string
  steps: string[]
  tips: string[]
}

const studyMethods: StudyMethod[] = [
  {
    id: "pomodoro",
    name: "Tehnica Pomodoro",
    icon: Clock,
    description:
      "O metodă de gestionare a timpului care împarte munca în intervale de 25 de minute, urmate de pauze scurte.",
    steps: [
      "Setează un cronometru pentru 25 de minute",
      "Lucrează concentrat până când sună cronometrul",
      "Ia o pauză scurtă de 5 minute",
      "După 4 cicluri, ia o pauză mai lungă de 15-30 de minute",
    ],
    tips: [
      "Elimină toate distragerile în timpul sesiunilor de lucru",
      "Folosește o listă de sarcini pentru a urmări progresul",
      "Ajustează durata sesiunilor dacă este necesar",
      "Folosește pauza pentru a te mișca și a te relaxa",
    ],
  },
  {
    id: "spaced",
    name: "Repetiția spațiată",
    icon: Repeat,
    description:
      "O tehnică de învățare care implică revizuirea materialului la intervale de timp din ce în ce mai mari.",
    steps: [
      "Învață materialul inițial",
      "Revizuiește după 1 zi",
      "Revizuiește din nou după 3 zile",
      "Continuă să revizuiești la intervale din ce în ce mai mari (7 zile, 14 zile, etc.)",
    ],
    tips: [
      "Folosește carduri flash pentru revizuire",
      "Testează-te în loc să recitești pasiv materialul",
      "Programează revizuirile în calendar",
      "Concentrează-te mai mult pe materialul dificil",
    ],
  },
  {
    id: "feynman",
    name: "Tehnica Feynman",
    icon: Lightbulb,
    description:
      "O strategie de învățare care implică explicarea unui concept în termeni simpli pentru a demonstra înțelegerea.",
    steps: [
      "Alege conceptul pe care vrei să-l înveți",
      "Explică-l ca și cum ai preda unui copil",
      "Identifică lacunele în înțelegerea ta",
      "Revizuiește și simplifică explicația",
    ],
    tips: [
      "Scrie explicația pe hârtie",
      "Folosește analogii și exemple simple",
      "Evită jargonul și termenii tehnici",
      "Predă conceptul altcuiva pentru feedback",
    ],
  },
  {
    id: "mindmap",
    name: "Hărți mentale",
    icon: Brain,
    description: "O metodă vizuală de organizare a informațiilor care arată relațiile dintre concepte.",
    steps: [
      "Scrie conceptul principal în centrul paginii",
      "Adaugă ramuri pentru subteme și idei conexe",
      "Folosește culori, imagini și cuvinte cheie",
      "Extinde harta adăugând mai multe detalii",
    ],
    tips: [
      "Păstrează cuvintele cheie scurte și concise",
      "Folosește culori diferite pentru categorii diferite",
      "Adaugă imagini pentru a îmbunătăți memoria vizuală",
      "Revizuiește și actualizează harta pe măsură ce înveți mai multe",
    ],
  },
  {
    id: "sq3r",
    name: "Metoda SQ3R",
    icon: List,
    description: "O strategie de citire activă care stă pentru Survey, Question, Read, Recite, Review.",
    steps: [
      "Survey: Scanează rapid materialul pentru a obține o imagine de ansamblu",
      "Question: Formulează întrebări despre conținut",
      "Read: Citește activ, căutând răspunsuri la întrebările tale",
      "Recite: Rezumă informațiile în propriile cuvinte",
      "Review: Revizuiește materialul pentru a consolida învățarea",
    ],
    tips: [
      "Ia notițe în timpul fiecărei etape",
      "Transformă titlurile și subtitlurile în întrebări",
      "Citește cu un scop clar în minte",
      "Testează-te după ce ai terminat de citit",
    ],
  },
]

export function StudyMethods() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Metode eficiente de studiu</CardTitle>
          <CardDescription>
            Descoperă și aplică tehnici dovedite științific pentru a-ți îmbunătăți învățarea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pomodoro">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
              {studyMethods.map((method) => (
                <TabsTrigger key={method.id} value={method.id}>
                  <method.icon className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">{method.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {studyMethods.map((method) => (
              <TabsContent key={method.id} value={method.id}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="flex items-center gap-2 mb-4">
                      <method.icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold">{method.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{method.description}</p>

                    <h4 className="font-semibold mb-2">Pași:</h4>
                    <ol className="list-decimal pl-5 mb-6 space-y-2">
                      {method.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="md:w-1/2">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Sfaturi pentru {method.name}:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {method.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
