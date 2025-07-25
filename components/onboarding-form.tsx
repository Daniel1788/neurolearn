"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import ProgressBar from "@/components/progress-bar"
import { CheckCircle } from "lucide-react"

// Learning style questions
const questions = [
  {
    id: 1,
    question: "When learning something new, I prefer to:",
    options: [
      { id: "visual_1", text: "See diagrams, charts, or demonstrations", type: "visual" },
      { id: "auditory_1", text: "Listen to explanations and discussions", type: "auditory" },
      { id: "kinesthetic_1", text: "Try it out hands-on and learn by doing", type: "kinesthetic" },
    ],
  },
  {
    id: 2,
    question: "When reading, I tend to:",
    options: [
      { id: "visual_2", text: "Enjoy books with pictures, diagrams, and visual elements", type: "visual" },
      { id: "auditory_2", text: "Read out loud or hear the words in my head", type: "auditory" },
      { id: "kinesthetic_2", text: "Prefer stories with action and movement", type: "kinesthetic" },
    ],
  },
  {
    id: 3,
    question: "When trying to concentrate, I find it easier when:",
    options: [
      { id: "visual_3", text: "My environment is visually organized and neat", type: "visual" },
      { id: "auditory_3", text: "It's quiet or there's consistent background noise", type: "auditory" },
      { id: "kinesthetic_3", text: "I can move around or fidget with something", type: "kinesthetic" },
    ],
  },
  {
    id: 4,
    question: "I remember things best by:",
    options: [
      { id: "visual_4", text: "Visualizing them in my mind", type: "visual" },
      { id: "auditory_4", text: "Repeating them out loud or in my head", type: "auditory" },
      { id: "kinesthetic_4", text: "Associating them with movements or actions", type: "kinesthetic" },
    ],
  },
  {
    id: 5,
    question: "When explaining something to someone, I tend to:",
    options: [
      { id: "visual_5", text: "Draw a diagram or show a picture", type: "visual" },
      { id: "auditory_5", text: "Explain it verbally in detail", type: "auditory" },
      { id: "kinesthetic_5", text: "Demonstrate how it works or use gestures", type: "kinesthetic" },
    ],
  },
]

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const totalSteps = questions.length + 1 // Questions + results page

  const handleOptionSelect = (optionType: string) => {
    setSelectedOption(optionType)
  }

  const handleContinue = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [currentStep]: selectedOption })
      setSelectedOption(null)
      setCurrentStep(currentStep + 1)
    }
  }

  const calculateLearningStyle = () => {
    const counts = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
    }

    Object.values(answers).forEach((type) => {
      if (type in counts) {
        counts[type as keyof typeof counts]++
      }
    })

    // Find the learning style with the highest count
    let maxCount = 0
    let learningStyle = ""

    for (const [style, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count
        learningStyle = style
      }
    }

    return {
      style: learningStyle,
      counts,
    }
  }

  const renderLearningStyleDescription = (style: string) => {
    switch (style) {
      case "visual":
        return {
          title: "Visual Learner",
          description:
            "You learn best through seeing and visualizing information. Charts, diagrams, and written instructions work well for you.",
          tips: [
            "Use color-coding and highlighting in your notes",
            "Create mind maps and diagrams",
            "Watch video demonstrations",
            "Use flashcards and visual aids",
          ],
        }
      case "auditory":
        return {
          title: "Auditory Learner",
          description:
            "You learn best through listening and verbal communication. Discussions, lectures, and audio materials are effective for you.",
          tips: [
            "Record lectures and listen to them again",
            "Read material out loud",
            "Participate in group discussions",
            "Use verbal repetition to memorize information",
          ],
        }
      case "kinesthetic":
        return {
          title: "Kinesthetic Learner",
          description:
            "You learn best through physical activities and hands-on experiences. Practical exercises and movement help you understand concepts.",
          tips: [
            "Take frequent breaks to move around",
            "Use physical objects to understand concepts",
            "Engage in role-playing and simulations",
            "Take notes while standing or walking",
          ],
        }
      default:
        return {
          title: "Mixed Learning Style",
          description: "You have a balanced approach to learning, utilizing multiple styles effectively.",
          tips: [
            "Combine visual, auditory, and hands-on approaches",
            "Experiment with different learning techniques",
            "Adapt your approach based on the subject matter",
            "Use your flexibility as an advantage",
          ],
        }
    }
  }

  const isLastQuestion = currentStep === questions.length - 1
  const isResultPage = currentStep === questions.length

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">NeuroLearn</h1>
        <ThemeToggle />
      </div>

      <Card className="border-2 dark:border-zinc-800">
        <CardContent className="p-6">
          {!isResultPage && (
            <div className="mb-8">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps - 1} />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isResultPage ? (
                <div className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  {(() => {
                    const result = calculateLearningStyle()
                    const learningStyleInfo = renderLearningStyleDescription(result.style)

                    return (
                      <>
                        <h2 className="text-2xl font-bold text-center mb-2">
                          Your Learning Style: <span className="text-primary">{learningStyleInfo.title}</span>
                        </h2>
                        <p className="text-center mb-6">{learningStyleInfo.description}</p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {Object.entries(result.counts).map(([style, count]) => (
                            <div
                              key={style}
                              className={`p-4 rounded-lg ${
                                style === result.style ? "bg-primary/10 border-2 border-primary" : "bg-muted"
                              }`}
                            >
                              <div className="text-center">
                                <h3 className="capitalize font-medium">{style}</h3>
                                <div className="text-2xl font-bold">{count}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h3 className="font-bold mb-2">Learning Tips:</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {learningStyleInfo.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className="w-full mt-4"
                          onClick={() => {
                            setCurrentStep(0)
                            setAnswers({})
                          }}
                        >
                          Start Over
                        </Button>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-6">{questions[currentStep].question}</h2>

                  <div className="space-y-4 mb-8">
                    {questions[currentStep].options.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedOption === option.type
                            ? "border-primary bg-primary/10"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => handleOptionSelect(option.type)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              selectedOption === option.type ? "border-primary" : "border-muted-foreground"
                            }`}
                          >
                            {selectedOption === option.type && <div className="w-3 h-3 rounded-full bg-primary" />}
                          </div>
                          <span>{option.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentStep > 0) {
                          setCurrentStep(currentStep - 1)
                          setSelectedOption(answers[currentStep - 1] || null)
                        }
                      }}
                      disabled={currentStep === 0}
                    >
                      Back
                    </Button>
                    <Button onClick={handleContinue} disabled={!selectedOption}>
                      {isLastQuestion ? "See Results" : "Continue"}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Bauhaus-inspired decorative elements */}
      <div className="fixed -z-10 top-0 left-0 w-40 h-40 bg-yellow-500 dark:bg-yellow-600 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed -z-10 bottom-0 right-0 w-60 h-60 bg-blue-500 dark:bg-blue-600 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
      <div className="fixed -z-10 top-1/2 right-1/4 w-20 h-20 bg-red-500 dark:bg-red-600 opacity-20"></div>
    </div>
  )
}
